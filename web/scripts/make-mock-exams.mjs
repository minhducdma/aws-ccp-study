// Sinh file mock exam từ practice exam gốc.
// Câu hỏi, lựa chọn và đáp án được lấy nguyên văn từ đề gốc nên không thể sai;
// phần phân loại domain và giải thích tiếng Việt đọc từ mock-annotations.json.
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = join(HERE, '..', '.cache', 'exams');
const OUT = join(HERE, '..', '..', 'mock-exam');
const RAW_BASE =
  'https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/master/practice-exam';

const DOMAIN_NAMES = {
  1: 'Cloud Concepts',
  2: 'Security & Compliance',
  3: 'Cloud Technology & Services',
  4: 'Billing, Pricing & Support',
};
const DOMAIN_NOTES = {
  1: 'phase-1-cloud-concepts/01-notes.md',
  2: 'phase-2-security/01-notes.md',
  3: 'phase-3-technology/01-notes.md',
  4: 'phase-4-billing/01-notes.md',
};

const MOCKS = [
  { mockNum: 1, examNum: 20 },
  { mockNum: 2, examNum: 21 },
];

async function loadExam(num) {
  mkdirSync(CACHE, { recursive: true });
  const cached = join(CACHE, `exam-${num}.md`);
  if (existsSync(cached)) return readFileSync(cached, 'utf8');
  const res = await fetch(`${RAW_BASE}/practice-exam-${num}.md`);
  if (!res.ok) throw new Error(`Không tải được exam ${num}: HTTP ${res.status}`);
  const text = await res.text();
  writeFileSync(cached, text);
  return text;
}

/**
 * Đề gốc có nhiều biến thể: số câu có thể là "1." cho mọi câu (markdown auto-numbering),
 * lựa chọn có thể thụt lề, dòng đáp án có thể là "Correct answer: A, D" hoặc "Correct Answer: AC".
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

    // Đề gốc có chỗ viết đáp án bằng chữ thường ("Correct Answer: Ac"), phải chuẩn hoá về chữ hoa.
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

function renderAnswers({ mockNum, examNum, questions, annotations }) {
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
  const realWeights = { 1: '24%', 2: '30%', 3: '34%', 4: '12%' };
  for (const domain of [1, 2, 3, 4]) {
    const count = domainCounts.get(domain) ?? 0;
    lines.push(
      `| ${domain} — ${DOMAIN_NAMES[domain]} | ${count} | ${realWeights[domain]} | \`${DOMAIN_NOTES[domain]}\` |`,
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

const annotationsPath = join(HERE, 'mock-annotations.json');
const allAnnotations = existsSync(annotationsPath)
  ? JSON.parse(readFileSync(annotationsPath, 'utf8'))
  : {};

mkdirSync(OUT, { recursive: true });

for (const { mockNum, examNum } of MOCKS) {
  const questions = parseExam(await loadExam(examNum));
  const annotations = allAnnotations[String(examNum)] ?? {};

  const missingAnswers = questions.filter((q) => !q.correct?.length);
  const missingOptions = questions.filter((q) => q.options.length < 2);
  // Đề gốc đôi khi ghi "(Choose two.)" nhưng đáp án chỉ có một chữ — cần biết để không dạy sai.
  const inconsistentMulti = questions.filter(
    (q) => MULTI_RE.test(q.text) && (q.correct?.length ?? 0) < 2,
  );

  writeFileSync(join(OUT, `mock-exam-${mockNum}.md`), renderExam({ mockNum, examNum, questions }));
  writeFileSync(
    join(OUT, `mock-exam-${mockNum}-ANSWERS.md`),
    renderAnswers({ mockNum, examNum, questions, annotations }),
  );

  const annotated = questions.filter((q) => annotations[q.num]?.domain).length;
  console.log(
    `Mock Exam ${mockNum} (từ Exam ${examNum}): ${questions.length} câu, ${annotated} câu đã gán domain/giải thích.`,
  );
  if (missingAnswers.length) {
    console.log(`  ! thiếu đáp án ở câu: ${missingAnswers.map((q) => q.num).join(', ')}`);
  }
  if (missingOptions.length) {
    console.log(`  ! thiếu lựa chọn ở câu: ${missingOptions.map((q) => q.num).join(', ')}`);
  }
  if (inconsistentMulti.length) {
    console.log(
      `  ! đề gốc ghi "choose two" nhưng chỉ có 1 đáp án ở câu: ${inconsistentMulti.map((q) => q.num).join(', ')}`,
    );
  }
  const unannotated = questions.filter((q) => !annotations[q.num]?.explanation);
  if (unannotated.length) {
    console.log(`  ! chưa có giải thích ở câu: ${unannotated.map((q) => q.num).join(', ')}`);
  }
}
