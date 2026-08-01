// Generates the mock exam files from the upstream practice exams a course cites.
// Questions, options and answers are copied verbatim from the source so they cannot drift;
// the domain classification and the Vietnamese explanations come from the course's
// mock-exams/annotations.json.
//
//   node scripts/make-mock-exams.mjs [courseId]   (default: every course that configures one)
import { readFileSync, existsSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(HERE, '..');
const COURSES_DIR = join(PACKAGE_DIR, '..', '..', 'courses');

// The files written here are Vietnamese, so manifest fields that may carry several
// translations are read in Vietnamese first.
function vi(value) {
  if (value == null) return '';
  return typeof value === 'string' ? value : (value.vi ?? Object.values(value)[0] ?? '');
}

async function loadExam(upstream, cacheDir, num) {
  mkdirSync(cacheDir, { recursive: true });
  const cached = join(cacheDir, `exam-${num}.md`);
  if (existsSync(cached)) return readFileSync(cached, 'utf8');
  const file = upstream.filePattern.replace('{n}', String(num));
  const res = await fetch(`${upstream.rawBase}/${file}`);
  if (!res.ok) throw new Error(`Could not download exam ${num}: HTTP ${res.status}`);
  const text = await res.text();
  writeFileSync(cached, text);
  return text;
}

/**
 * The upstream exams vary: every question may be numbered "1." (markdown auto-numbering),
 * options may be indented, and the answer line may read "Correct answer: A, D" or
 * "Correct Answer: AC".
 */
function parseExam(markdown) {
  const questions = [];
  let current = null;

  for (const line of markdown.split('\n')) {
    const header = line.match(/^\d+\.\s+(\S.*)$/);
    if (header) {
      current = { text: header[1].trim(), options: [], correct: null };
      questions.push(current);
      continue;
    }
    if (!current) continue;

    const option = line.match(/^\s*[-*]\s+([A-E])[.)]\s*(.*)$/);
    if (option) {
      current.options.push({ letter: option[1], text: option[2].trim() });
      continue;
    }

    // Some answers are written in lower case upstream ("Correct Answer: Ac"), so normalise them.
    const answer = line.match(/Correct\s*answer:\s*([A-E](?:\s*[,&]?\s*[A-E])*)/i);
    if (answer && !current.correct) {
      current.correct = answer[1].match(/[A-E]/gi)?.map((l) => l.toUpperCase()) ?? null;
    }
  }

  return questions.map((q, i) => ({ ...q, num: i + 1 }));
}

const MULTI_RE = /\((?:choose|select)\s+(?:two|three)\.?\)/i;

function renderExam({ mockNum, examNum, questions }) {
  const lines = [
    `# Mock Exam ${mockNum} — Đề mô phỏng đầy đủ`,
    '',
    '> ## Điều kiện làm bài',
    '>',
    '> | | |',
    '> |---|---|',
    `> | **Số câu** | ${questions.length} |`,
    '> | **Thời gian** | **90 phút** |',
    `> | **Điểm pass** | **≥ ${Math.ceil(questions.length * 0.7)}/${questions.length} (70%)** |`,
    '> | **Định dạng trả lời** | `1D, 2B, 3AC, ...` |',
    '>',
    '> - Làm liền mạch 90 phút, bấm giờ thật, không tra tài liệu và không mở notes.',
    '> - Câu chưa trả lời tính là sai và không bị trừ điểm thêm, nên hãy đoán hết chứ đừng bỏ trống.',
    '> - Câu nhiều đáp án phải chọn đúng tất cả mới được tính điểm.',
    `> - Nguồn: Practice Exam ${examNum} (giữ nguyên thứ tự và câu chữ gốc).`,
    '>',
    `> Làm xong mới mở \`mock-exam-${mockNum}-ANSWERS.md\`.`,
    '',
    '---',
    '',
  ];

  for (const q of questions) {
    const multi = MULTI_RE.test(q.text) || (q.correct?.length ?? 0) > 1;
    const marker = multi ? '  **(Chọn HAI)**' : '';
    lines.push(`**${q.num}.** ${q.text}${marker}  \`(Exam ${examNum} - Q${q.num})\``, '');
    for (const option of q.options) {
      lines.push(`- ${option.letter}. ${option.text}`);
    }
    lines.push('');
  }

  lines.push(
    '---',
    '',
    '## Phiếu trả lời',
    '',
    'Ghi đáp án của bạn vào đây trước khi mở file đáp án.',
    '',
    '```',
    ...chunk(questions.map((q) => `${q.num}.`), 10).map((row) => row.join('  ')),
    '```',
    '',
  );

  return lines.join('\n');
}

function chunk(items, size) {
  const rows = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

function renderAnswers({ mockNum, examNum, questions, annotations, course }) {
  const quick = questions.map((q) => `${q.num}${(q.correct ?? []).join('')}`).join(', ');

  const domainCounts = new Map();
  for (const q of questions) {
    const domain = annotations[q.num]?.domain;
    if (domain) domainCounts.set(domain, (domainCounts.get(domain) ?? 0) + 1);
  }

  const lines = [
    `# Mock Exam ${mockNum} — Đáp án & Phân tích`,
    '',
    `> Đáp án cho ${questions.length} câu trong \`mock-exam-${mockNum}.md\`. **Chỉ mở sau khi đã làm xong toàn bộ đề.**`,
    `> Mọi đáp án đối chiếu nguyên văn với dòng \`Correct answer\` của Practice Exam ${examNum}.`,
    '',
    '## Bảng đáp án nhanh',
    '',
    quick,
    '',
    `**Cần đúng ≥ ${Math.ceil(questions.length * 0.7)}/${questions.length} (70%)** để coi như sẵn sàng thi thật.`,
    '',
    '## Phân tích theo domain',
    '',
    'Đánh dấu những câu bạn làm sai, rồi xem chúng dồn vào domain nào.',
    '',
    '| Câu | Domain | Chủ đề |',
    '|---|---|---|',
  ];

  for (const q of questions) {
    const a = annotations[q.num];
    lines.push(`| ${q.num} | ${a?.domain ?? '—'} | ${a?.topic ?? '—'} |`);
  }

  lines.push('', '## Tổng hợp domain', '', '| Domain | Số câu trong đề | Tỉ lệ đề thật | Nếu sai nhiều thì ôn lại |', '|---|---|---|---|');
  for (const phase of course.phases) {
    const count = domainCounts.get(phase.domain) ?? 0;
    const notesFile = vi((phase.notes ?? [{ file: 'notes.md' }])[0].file) || 'notes.md';
    lines.push(
      `| ${phase.domain} — ${vi(course.domainLabels[phase.domain])} | ${count} | ${phase.weight}% | \`phases/${phase.dir}/${notesFile}\` |`,
    );
  }

  lines.push(
    '',
    '> Domain nào bạn làm đúng dưới 70% thì đọc lại notes của phase tương ứng trước khi thi thật.',
    `> Nếu tổng điểm dưới 70%, làm tiếp Practice Exam ${examNum === 20 ? '21, 22, 23' : '22, 23'} trong repo gốc.`,
    '>',
    '> Lưu ý: tỉ lệ domain của đề luyện này không trùng khớp tỉ lệ đề thi thật (đề gốc vốn không được',
    '> soạn theo đúng trọng số). Vì vậy hãy đọc kết quả theo **tỉ lệ đúng trong từng domain**, đừng suy',
    '> ra điểm thi thật chỉ từ tổng số câu đúng.',
    '',
    '## Giải thích từng câu',
    '',
  );

  for (const q of questions) {
    const a = annotations[q.num];
    lines.push(`### Câu ${q.num} — Đáp án: ${(q.correct ?? []).join(', ')}`, '');
    lines.push(`> ${q.text}  \`(Exam ${examNum} - Q${q.num})\``, '');
    lines.push(a?.explanation ?? '_Chưa có giải thích._', '');
  }

  return lines.join('\n');
}

async function generateForCourse(courseId) {
  const courseDir = join(COURSES_DIR, courseId);
  const course = JSON.parse(readFileSync(join(courseDir, 'course.json'), 'utf8'));
  const plan = course.mockExams?.generateFrom ?? [];
  if (plan.length === 0) return false;

  if (!course.upstream) {
    console.log(`${courseId}: declares generateFrom but has no "upstream" block, skipped.`);
    return false;
  }

  const outDir = join(courseDir, 'mock-exams');
  mkdirSync(outDir, { recursive: true });
  const cacheDir = join(PACKAGE_DIR, '.cache', courseId);

  const annotationsPath = join(outDir, 'annotations.json');
  const allAnnotations = existsSync(annotationsPath)
    ? JSON.parse(readFileSync(annotationsPath, 'utf8'))
    : {};

  for (const { mock: mockNum, upstreamExam: examNum } of plan) {
    const questions = parseExam(await loadExam(course.upstream, cacheDir, examNum));
    const annotations = allAnnotations[String(examNum)] ?? {};

    const missingAnswers = questions.filter((q) => !q.correct?.length);
    const missingOptions = questions.filter((q) => q.options.length < 2);
    // Upstream sometimes says "(Choose two.)" while listing a single answer letter; surface that
    // so a known-bad question is not taught as fact.
    const inconsistentMulti = questions.filter(
      (q) => MULTI_RE.test(q.text) && (q.correct?.length ?? 0) < 2,
    );

    writeFileSync(join(outDir, `mock-${mockNum}.md`), renderExam({ mockNum, examNum, questions }));
    writeFileSync(
      join(outDir, `mock-${mockNum}.answers.md`),
      renderAnswers({ mockNum, examNum, questions, annotations, course }),
    );

    const annotated = questions.filter((q) => annotations[q.num]?.domain).length;
    console.log(
      `${courseId} · Mock Exam ${mockNum} (from Exam ${examNum}): ${questions.length} questions, ${annotated} annotated with a domain and explanation.`,
    );
    if (missingAnswers.length) {
      console.log(`  ! no answer for question: ${missingAnswers.map((q) => q.num).join(', ')}`);
    }
    if (missingOptions.length) {
      console.log(`  ! no options for question: ${missingOptions.map((q) => q.num).join(', ')}`);
    }
    if (inconsistentMulti.length) {
      console.log(
        `  ! upstream says "choose two" but lists a single answer for question: ${inconsistentMulti.map((q) => q.num).join(', ')}`,
      );
    }
    const unannotated = questions.filter((q) => !annotations[q.num]?.explanation);
    if (unannotated.length) {
      console.log(`  ! no explanation yet for question: ${unannotated.map((q) => q.num).join(', ')}`);
    }
  }
  return true;
}

const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
const courseIds = requested.length
  ? requested
  : readdirSync(COURSES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

let generated = 0;
for (const courseId of courseIds) {
  if (await generateForCourse(courseId)) generated += 1;
}
if (generated === 0) {
  console.log('No course declares mockExams.generateFrom.');
}
