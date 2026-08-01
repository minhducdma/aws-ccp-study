// Turns the markdown under courses/ into generated/content.json for the web app.
// Every course is described by its own courses/<id>/course.json manifest, so adding a
// course never requires touching this script.
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(HERE, '..');
const ROOT = join(PACKAGE_DIR, '..', '..');
const COURSES_DIR = join(ROOT, 'courses');
const OUT_DIR = join(PACKAGE_DIR, 'generated');
const VERBOSE = process.argv.includes('--verbose');

const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

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
function parseQuestions(markdown, { idPrefix, fileLabel, warn }) {
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

function buildQuestionSet({ questionsMarkdown, answersMarkdown, idPrefix, fileLabel, defaultDomain, warn }) {
  if (!questionsMarkdown) return null;

  const [questionPart] = splitAtAnswerBlock(questionsMarkdown);
  const parsed = parseQuestions(questionPart, { idPrefix, fileLabel, warn });
  if (parsed.length === 0) {
    warn(`${fileLabel}: không tìm thấy câu hỏi nào.`);
    return null;
  }

  const answerSource = answersMarkdown ?? splitAtAnswerBlock(questionsMarkdown)[1];
  const quick = parseQuickAnswerTable(answerSource);
  const explanations = parseExplanations(answerSource);
  const domains = parseDomainMap(answerSource);

  return parsed.map((q) => {
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
}

function loadPhase(courseDir, courseId, phaseConfig, order, warn) {
  const dir = join(courseDir, 'phases', phaseConfig.dir);
  const label = `${courseId}/${phaseConfig.dir}`;

  if (!existsSync(dir)) {
    warn(`${label}: thiếu thư mục phase, phase này sẽ hiện là "đang soạn".`);
    return { ...phaseConfig, order, notes: [], practice: null, gateQuiz: null, ready: false };
  }

  const notes = [];
  for (const note of phaseConfig.notes ?? [{ file: 'notes.md', title: 'Kiến thức trọng tâm' }]) {
    const markdown = read(join(dir, note.file));
    if (markdown) {
      notes.push({
        id: `${phaseConfig.id}-${note.file.replace(/\.md$/, '')}`,
        title: note.title,
        markdown,
      });
    } else {
      warn(`${label}: thiếu ${note.file}.`);
    }
  }

  const practiceQuestions = buildQuestionSet({
    questionsMarkdown: read(join(dir, 'practice.md')),
    answersMarkdown: null,
    idPrefix: `${phaseConfig.id}-practice`,
    fileLabel: `${label}/practice.md`,
    defaultDomain: phaseConfig.domain,
    warn,
  });

  const quizQuestions = buildQuestionSet({
    questionsMarkdown: read(join(dir, 'gate-quiz.md')),
    answersMarkdown: read(join(dir, 'gate-quiz.answers.md')),
    idPrefix: `${phaseConfig.id}-quiz`,
    fileLabel: `${label}/gate-quiz.md`,
    defaultDomain: phaseConfig.domain,
    warn,
  });

  const quiz = phaseConfig.quiz ?? {};
  if (quizQuestions && quiz.count && quizQuestions.length !== quiz.count) {
    warn(`${label}: gate quiz có ${quizQuestions.length} câu, manifest khai báo ${quiz.count} câu.`);
  }

  return {
    id: phaseConfig.id,
    slug: phaseConfig.dir,
    order,
    title: phaseConfig.title,
    domain: phaseConfig.domain,
    weight: phaseConfig.weight,
    estimatedHours: phaseConfig.estimatedHours,
    notes,
    practice: practiceQuestions ? { id: `${phaseConfig.id}-practice`, questions: practiceQuestions } : null,
    gateQuiz: quizQuestions
      ? {
          id: `${phaseConfig.id}-quiz`,
          questions: quizQuestions,
          passScore: Math.min(quiz.passScore ?? Math.ceil(quizQuestions.length * 0.8), quizQuestions.length),
          timeLimitMin: quiz.timeLimitMin ?? 30,
        }
      : null,
    ready: Boolean(notes.length && practiceQuestions && quizQuestions),
  };
}

function loadMockExams(courseDir, courseId, config, warn) {
  const dir = join(courseDir, 'mock-exams');
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) => /^mock-\d+\.md$/.test(f))
    .sort()
    .map((file) => {
      const num = Number(file.match(/(\d+)/)[1]);
      const questions = buildQuestionSet({
        questionsMarkdown: read(join(dir, file)),
        answersMarkdown: read(join(dir, file.replace('.md', '.answers.md'))),
        idPrefix: `mock-${num}`,
        fileLabel: `${courseId}/mock-exams/${file}`,
        defaultDomain: null,
        warn,
      });
      if (!questions) return null;
      return {
        id: `mock-${num}`,
        title: `Mock Exam ${num}`,
        questions,
        passScore: Math.ceil(questions.length * (config.passRatio ?? 0.7)),
        timeLimitMin: config.timeLimitMin ?? 90,
      };
    })
    .filter(Boolean);
}

function loadCourse(courseId) {
  const courseDir = join(COURSES_DIR, courseId);
  const manifestPath = join(courseDir, 'course.json');
  if (!existsSync(manifestPath)) return null;

  const manifest = readJson(manifestPath);
  const warnings = [];
  const warn = (msg) => warnings.push(msg);

  const base = {
    id: manifest.id ?? courseId,
    code: manifest.code,
    title: manifest.title,
    shortTitle: manifest.shortTitle ?? manifest.title,
    provider: manifest.provider ?? 'AWS',
    level: manifest.level ?? 'Foundational',
    levelOrder: manifest.levelOrder ?? 1,
    status: manifest.status ?? 'planned',
    summary: manifest.summary ?? '',
    estimatedHours: manifest.estimatedHours ?? 0,
    exam: { code: manifest.code, ...manifest.exam },
    domainLabels: manifest.domainLabels ?? {},
  };

  // A planned course only has a manifest; the catalog shows it locked.
  if (base.status !== 'available') {
    return { ...base, phases: [], mockExams: [], questionCount: 0, warnings };
  }

  const phases = (manifest.phases ?? []).map((phase, i) =>
    loadPhase(courseDir, courseId, phase, i + 1, warn),
  );
  const mockExams = loadMockExams(courseDir, courseId, manifest.mockExams ?? {}, warn);

  const questionCount =
    phases.reduce(
      (sum, p) => sum + (p.practice?.questions.length ?? 0) + (p.gateQuiz?.questions.length ?? 0),
      0,
    ) + mockExams.reduce((sum, m) => sum + m.questions.length, 0);

  return { ...base, phases, mockExams, questionCount, warnings };
}

const courseIds = readdirSync(COURSES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const courses = courseIds.map(loadCourse).filter(Boolean);
courses.sort((a, b) => a.levelOrder - b.levelOrder || a.code.localeCompare(b.code));

const warnings = courses.flatMap((c) => c.warnings);

const content = {
  generatedAt: new Date().toISOString(),
  courses,
  warnings,
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'content.json'), JSON.stringify(content, null, 2));

const available = courses.filter((c) => c.status === 'available');
console.log(
  `content.json: ${courses.length} khoá học (${available.length} sẵn sàng, ${courses.length - available.length} sắp có).`,
);
for (const course of available) {
  const ready = course.phases.filter((p) => p.ready).length;
  console.log(
    `  ${course.id.padEnd(14)} ${ready}/${course.phases.length} phase · ${course.mockExams.length} mock exam · ${course.questionCount} câu`,
  );
}
if (warnings.length) {
  console.log(`\n${warnings.length} cảnh báo:`);
  const shown = VERBOSE ? warnings : warnings.slice(0, 12);
  for (const w of shown) console.log(`  - ${w}`);
  if (shown.length < warnings.length) {
    console.log(`  ... còn ${warnings.length - shown.length} cảnh báo, chạy \`npm run check\` để xem hết.`);
  }
}
