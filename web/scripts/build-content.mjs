// Turns the markdown files at the repo root into content.json for the web app.
// Runs automatically before `npm run dev` and `npm run build`.
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const OUT_DIR = join(HERE, '..', 'src', 'generated');
const VERBOSE = process.argv.includes('--verbose');

const warnings = [];
const warn = (msg) => warnings.push(msg);

const PHASE_CONFIG = [
  {
    id: 'phase-1',
    slug: 'phase-1-cloud-concepts',
    order: 1,
    title: 'Cloud Concepts',
    domain: 1,
    weight: 24,
    estimatedHours: 2.9,
    quiz: { count: 20, passScore: 16, timeLimitMin: 30 },
  },
  {
    id: 'phase-2',
    slug: 'phase-2-security',
    order: 2,
    title: 'Security & Compliance',
    domain: 2,
    weight: 30,
    estimatedHours: 3.6,
    quiz: { count: 25, passScore: 20, timeLimitMin: 35 },
  },
  {
    id: 'phase-3',
    slug: 'phase-3-technology',
    order: 3,
    title: 'Cloud Technology & Services',
    domain: 3,
    weight: 34,
    estimatedHours: 4.1,
    quiz: { count: 30, passScore: 24, timeLimitMin: 45 },
  },
  {
    id: 'phase-4',
    slug: 'phase-4-billing',
    order: 4,
    title: 'Billing, Pricing & Support',
    domain: 4,
    weight: 12,
    estimatedHours: 1.4,
    quiz: { count: 15, passScore: 12, timeLimitMin: 20 },
  },
];

const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);

const MULTI_HINTS = [
  /\(choose\s+two\)/i,
  /\(select\s+two\)/i,
  /\(choose\s+three\)/i,
  /\(select\s+three\)/i,
  /chọn\s+hai/i,
  /chọn\s+ba/i,
];

/** Splits off the <details> block holding the answers, returning [questions, answers]. */
function splitAtAnswerBlock(markdown) {
  const idx = markdown.indexOf('<details>');
  if (idx === -1) return [markdown, ''];
  return [markdown.slice(0, idx), markdown.slice(idx)];
}

// A source citation may be written as `(Exam 8 - Q8)`, *(Exam 8 - Q8)* or (Exam 8 - Q8).
const SOURCE_RE = /\((Exam\s*\d+\s*-\s*Q\d+)\)/i;

function cleanQuestionText(raw) {
  return raw
    .replace(/[`*]*\(Exam\s*\d+\s*-\s*Q\d+\)[`*]*/gi, '')
    .replace(/\**\(Chọn\s+(?:HAI|BA)\)\**/gi, '')
    // Upstream exams use <br/> for line breaks; the app renders plain text, so collapse to a space.
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractSource(raw) {
  const m = raw.match(SOURCE_RE);
  return m ? m[1].replace(/\s+/g, ' ') : null;
}

/**
 * Reads the question blocks, tolerating several formatting variants:
 *   **1.** Question text  `(Exam 8 - Q8)`
 *   - A. option
 * or with the marker and the citation on their own lines:
 *   **1.** Question text
 *   > **(Chọn HAI)**
 *   - A. option
 *   *(Exam 15 - Q29)*
 */
function parseQuestions(markdown, { idPrefix, fileLabel }) {
  const lines = markdown.split('\n');
  const questions = [];
  let current = null;

  const flush = () => {
    if (!current) return;
    if (current.options.length < 2) {
      warn(`${fileLabel}: câu ${current.num} chỉ có ${current.options.length} lựa chọn, bỏ qua.`);
    } else {
      questions.push(current);
    }
    current = null;
  };

  for (const line of lines) {
    const header = line.match(/^\*\*(\d+)\.\*\*\s*(.*)$/);
    if (header) {
      flush();
      current = {
        num: Number(header[1]),
        text: header[2],
        meta: header[2],
        options: [],
      };
      continue;
    }

    if (!current) continue;

    const option = line.match(/^\s*[-*]\s+([A-E])[.)]\s*(.*)$/);
    if (option) {
      current.options.push({ letter: option[1], text: option[2].trim() });
      continue;
    }

    // A heading, separator or answer block ends the current question.
    if (/^(#{1,6}\s|---\s*$|<details)/.test(line)) {
      flush();
      continue;
    }

    const body = line.replace(/^\s*>\s?/, '').trim();
    if (!body) continue;

    // Every trailing line goes into meta so the "(Chọn HAI)" marker and the citation can be
    // detected, but only lines before the option list belong to the question text.
    current.meta += ' ' + body;
    if (current.options.length === 0) current.text += ' ' + body;
  }
  flush();

  return questions.map((q) => ({
    id: `${idPrefix}-${q.num}`,
    num: q.num,
    text: cleanQuestionText(q.text),
    options: q.options,
    source: extractSource(q.meta),
    multiHint: MULTI_HINTS.some((re) => re.test(q.meta)),
  }));
}

/** The "1D, 2BE, 3C, ..." line — the most reliable source of answers. */
function parseQuickAnswerTable(markdown) {
  const map = new Map();
  for (const line of markdown.split('\n')) {
    const trimmed = line.trim();
    if (!/^\d+[A-E]+(\s*,\s*\d+[A-E]+)+\s*$/.test(trimmed)) continue;
    for (const m of trimmed.matchAll(/(\d+)([A-E]+)/g)) {
      map.set(Number(m[1]), m[2].split(''));
    }
  }
  return map;
}

/**
 * Per-question explanations, in either of two formats:
 *   **1. Đáp án: D** — `(Exam 1 - Q2)`
 *   ### Câu 1 — Đáp án: A, E
 */
function parseExplanations(markdown) {
  const result = new Map();
  const pattern =
    /^(?:###\s*Câu\s*(\d+)\s*[—\-–]\s*Đáp\s*án\s*:\s*([^\n]+)|\*\*(\d+)\.\s*Đáp\s*án\s*:\s*([^*\n]+)\*\*([^\n]*))$/gim;

  const hits = [];
  for (const m of markdown.matchAll(pattern)) {
    // Drop the trailing "(Chọn HAI)" marker and accept standalone letters only, otherwise the
    // C in "Chọn" and the A in "HAI" would be counted as answers.
    const lettersText = (m[2] ?? m[4]).split('(')[0].replace(/\*/g, '');
    hits.push({
      num: Number(m[1] ?? m[3]),
      letters: lettersText.match(/\b[A-E]\b/g) ?? [],
      start: m.index,
      headerEnd: m.index + m[0].length,
    });
  }

  hits.forEach((hit, i) => {
    const end = i + 1 < hits.length ? hits[i + 1].start : markdown.length;
    // Some files keep the citation in the answer key rather than the question, so it stays
    // hidden while the exam is being taken.
    const source = extractSource(markdown.slice(hit.start, end));
    const body = markdown
      .slice(hit.headerEnd, end)
      .replace(/<\/details>[\s\S]*$/i, '')
      .split('\n')
      .filter((l) => !l.trim().startsWith('>')) // drop the quoted copy of the question
      .join('\n')
      .replace(/`\(Exam\s*\d+\s*-\s*Q\d+\)`/gi, '')
      .replace(/^[\s—\-–]+/, '')
      .trim();
    result.set(hit.num, { letters: hit.letters, explanation: body, source });
  });

  return result;
}

/** The question-number to domain table found in the mock exam answer files. */
function parseDomainMap(markdown) {
  const map = new Map();
  for (const line of markdown.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(?:Domain\s*)?([1-4])\b/i);
    if (m) map.set(Number(m[1]), Number(m[2]));
  }
  return map;
}

function buildQuestionSet({ questionsMarkdown, answersMarkdown, idPrefix, fileLabel, defaultDomain }) {
  if (!questionsMarkdown) return null;

  const [questionPart] = splitAtAnswerBlock(questionsMarkdown);
  const parsed = parseQuestions(questionPart, { idPrefix, fileLabel });
  if (parsed.length === 0) {
    warn(`${fileLabel}: không tìm thấy câu hỏi nào.`);
    return null;
  }

  const answerSource = answersMarkdown ?? splitAtAnswerBlock(questionsMarkdown)[1];
  const quick = parseQuickAnswerTable(answerSource);
  const explanations = parseExplanations(answerSource);
  const domains = parseDomainMap(answerSource);

  const questions = parsed.map((q) => {
    const fromQuick = quick.get(q.num);
    const fromExplanation = explanations.get(q.num);
    const correct = fromQuick ?? fromExplanation?.letters ?? [];

    if (correct.length === 0) {
      warn(`${fileLabel}: câu ${q.num} không tìm được đáp án.`);
    } else if (
      fromQuick &&
      fromExplanation?.letters?.length &&
      fromQuick.join('') !== fromExplanation.letters.join('')
    ) {
      warn(
        `${fileLabel}: câu ${q.num} lệch đáp án — bảng nhanh "${fromQuick.join('')}" vs giải thích "${fromExplanation.letters.join('')}".`,
      );
    }

    const validLetters = new Set(q.options.map((o) => o.letter));
    const unknown = correct.filter((l) => !validLetters.has(l));
    if (unknown.length) {
      warn(`${fileLabel}: câu ${q.num} có đáp án ${unknown.join('')} không nằm trong lựa chọn.`);
    }

    return {
      id: q.id,
      num: q.num,
      text: q.text,
      options: q.options,
      correct,
      multi: correct.length > 1 || q.multiHint,
      explanation: fromExplanation?.explanation ?? '',
      source: q.source ?? fromExplanation?.source ?? null,
      domain: domains.get(q.num) ?? defaultDomain ?? null,
    };
  });

  return questions;
}

function loadPhase(config) {
  const dir = join(ROOT, config.slug);
  if (!existsSync(dir)) {
    warn(`Thiếu thư mục ${config.slug} — phase này sẽ hiện là "đang soạn".`);
    return { ...config, notes: [], practice: null, gateQuiz: null, ready: false };
  }

  const notes = [];
  const notesMarkdown = read(join(dir, '01-notes.md'));
  if (notesMarkdown) {
    notes.push({ id: `${config.id}-notes`, title: 'Kiến thức trọng tâm', markdown: notesMarkdown });
  } else {
    warn(`${config.slug}: chưa có 01-notes.md.`);
  }

  const cheatsheet = read(join(dir, '04-service-cheatsheet.md'));
  if (cheatsheet) {
    notes.push({ id: `${config.id}-cheatsheet`, title: 'Cheat sheet tra nhanh', markdown: cheatsheet });
  }

  const practiceMarkdown = read(join(dir, '02-practice-questions.md'));
  const practiceQuestions = buildQuestionSet({
    questionsMarkdown: practiceMarkdown,
    answersMarkdown: null,
    idPrefix: `${config.id}-practice`,
    fileLabel: `${config.slug}/02-practice-questions.md`,
    defaultDomain: config.domain,
  });

  const quizMarkdown = read(join(dir, '03-gate-quiz.md'));
  const quizAnswers = read(join(dir, '03-gate-quiz-ANSWERS.md'));
  const quizQuestions = buildQuestionSet({
    questionsMarkdown: quizMarkdown,
    answersMarkdown: quizAnswers,
    idPrefix: `${config.id}-quiz`,
    fileLabel: `${config.slug}/03-gate-quiz.md`,
    defaultDomain: config.domain,
  });

  if (quizQuestions && quizQuestions.length !== config.quiz.count) {
    warn(
      `${config.slug}: gate quiz có ${quizQuestions.length} câu, kế hoạch là ${config.quiz.count} câu.`,
    );
  }

  return {
    id: config.id,
    slug: config.slug,
    order: config.order,
    title: config.title,
    domain: config.domain,
    weight: config.weight,
    estimatedHours: config.estimatedHours,
    notes,
    practice: practiceQuestions ? { id: `${config.id}-practice`, questions: practiceQuestions } : null,
    gateQuiz: quizQuestions
      ? {
          id: `${config.id}-quiz`,
          questions: quizQuestions,
          passScore: Math.min(config.quiz.passScore, quizQuestions.length),
          timeLimitMin: config.quiz.timeLimitMin,
        }
      : null,
    ready: Boolean(notesMarkdown && practiceQuestions && quizQuestions),
  };
}

function loadMockExams() {
  const dir = join(ROOT, 'mock-exam');
  if (!existsSync(dir)) return [];

  const files = readdirSync(dir)
    .filter((f) => /^mock-exam-\d+\.md$/.test(f))
    .sort();

  return files
    .map((file) => {
      const num = Number(file.match(/(\d+)/)[1]);
      const questions = buildQuestionSet({
        questionsMarkdown: read(join(dir, file)),
        answersMarkdown: read(join(dir, file.replace('.md', '-ANSWERS.md'))),
        idPrefix: `mock-${num}`,
        fileLabel: `mock-exam/${file}`,
        defaultDomain: null,
      });
      if (!questions) return null;
      return {
        id: `mock-${num}`,
        title: `Mock Exam ${num}`,
        questions,
        passScore: Math.ceil(questions.length * 0.7),
        timeLimitMin: 90,
      };
    })
    .filter(Boolean);
}

const phases = PHASE_CONFIG.map(loadPhase);
const mockExams = loadMockExams();

const content = {
  generatedAt: new Date().toISOString(),
  exam: {
    code: 'CLF-C02',
    totalQuestions: 65,
    scoredQuestions: 50,
    durationMin: 90,
    passScore: 700,
    maxScore: 1000,
  },
  phases,
  mockExams,
  warnings,
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'content.json'), JSON.stringify(content, null, 2));

const totalQuestions =
  phases.reduce(
    (sum, p) => sum + (p.practice?.questions.length ?? 0) + (p.gateQuiz?.questions.length ?? 0),
    0,
  ) + mockExams.reduce((sum, m) => sum + m.questions.length, 0);

console.log(`content.json: ${phases.filter((p) => p.ready).length}/${phases.length} phase sẵn sàng, ${mockExams.length} mock exam, ${totalQuestions} câu hỏi.`);
for (const phase of phases) {
  console.log(
    `  ${phase.slug.padEnd(24)} notes:${phase.notes.length} practice:${phase.practice?.questions.length ?? 0} quiz:${phase.gateQuiz?.questions.length ?? 0}`,
  );
}
for (const mock of mockExams) {
  console.log(`  ${mock.id.padEnd(24)} ${mock.questions.length} câu`);
}
if (warnings.length) {
  console.log(`\n${warnings.length} cảnh báo:`);
  const shown = VERBOSE ? warnings : warnings.slice(0, 12);
  for (const w of shown) console.log(`  - ${w}`);
  if (shown.length < warnings.length) {
    console.log(`  ... còn ${warnings.length - shown.length} cảnh báo, chạy \`npm run check\` để xem hết.`);
  }
}
