// Checks every answer in content.json against the upstream practice exams on GitHub.
// This is the ground-truth layer: if the study material records a wrong answer, it shows up here.
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = join(HERE, '..', '.cache', 'exams');
const RAW_BASE =
  'https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/master/practice-exam';

const content = JSON.parse(readFileSync(join(HERE, '..', 'src', 'generated', 'content.json'), 'utf8'));

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
 * Reads an upstream exam: "1. Question" + " - A. ..." + "Correct answer: D".
 * Questions are numbered by order of appearance rather than by the number written in the
 * file, because some exams rely on markdown auto-numbering and write "1." for every question.
 */
function parseUpstream(markdown) {
  const map = new Map();
  let currentNum = null;
  let counter = 0;
  for (const line of markdown.split('\n')) {
    const header = line.match(/^\d+\.\s+(\S.*)$/);
    if (header) {
      counter += 1;
      currentNum = counter;
      map.set(currentNum, { text: header[1].trim(), correct: null });
      continue;
    }
    // Upstream uses "Correct answer: A, D", "Correct Answer: AC" and even lower case "Ac".
    const answer = line.match(/Correct\s*answer:\s*([A-E](?:\s*[,&]?\s*[A-E])*)/i);
    if (answer && currentNum != null) {
      const entry = map.get(currentNum);
      if (entry && !entry.correct) {
        entry.correct = answer[1].match(/[A-E]/gi)?.map((l) => l.toUpperCase()) ?? null;
      }
    }
  }
  return map;
}

const questions = [];
for (const phase of content.phases) {
  for (const q of phase.practice?.questions ?? []) questions.push({ q, where: `${phase.slug}/practice` });
  for (const q of phase.gateQuiz?.questions ?? []) questions.push({ q, where: `${phase.slug}/gate-quiz` });
}
for (const mock of content.mockExams) {
  for (const q of mock.questions) questions.push({ q, where: mock.id });
}

const examNums = [
  ...new Set(
    questions
      .map(({ q }) => q.source?.match(/Exam\s*(\d+)/i)?.[1])
      .filter(Boolean)
      .map(Number),
  ),
].sort((a, b) => a - b);

console.log(`Đối chiếu ${questions.length} câu với ${examNums.length} đề gốc: ${examNums.join(', ')}\n`);

const upstream = new Map();
for (const num of examNums) {
  try {
    upstream.set(num, parseUpstream(await loadExam(num)));
  } catch (error) {
    console.error(`  ! ${error.message}`);
  }
}

let checked = 0;
const missingCitation = [];
const notFoundUpstream = [];
const mismatches = [];

for (const { q, where } of questions) {
  const m = q.source?.match(/Exam\s*(\d+)\s*-\s*Q(\d+)/i);
  if (!m) {
    missingCitation.push(`${where} · "${q.text.slice(0, 70)}…"`);
    continue;
  }
  const exam = upstream.get(Number(m[1]));
  const original = exam?.get(Number(m[2]));
  if (!original?.correct) {
    notFoundUpstream.push(`${where} · ${q.source}`);
    continue;
  }

  checked += 1;
  const ours = [...q.correct].sort().join('');
  const theirs = [...original.correct].sort().join('');
  if (ours !== theirs) {
    mismatches.push({ where, source: q.source, ours, theirs, text: q.text.slice(0, 90) });
  }
}

console.log(`Đã đối chiếu: ${checked} câu`);
console.log(`Thiếu trích dẫn nguồn: ${missingCitation.length}`);
console.log(`Không tìm thấy câu gốc theo trích dẫn: ${notFoundUpstream.length}`);
console.log(`Lệch đáp án: ${mismatches.length}\n`);

for (const item of mismatches) {
  console.log(`  ${item.where} · ${item.source}`);
  console.log(`    tài liệu: ${item.ours}  |  đề gốc: ${item.theirs}`);
  console.log(`    "${item.text}…"\n`);
}

if (missingCitation.length) {
  console.log('Thiếu trích dẫn:');
  for (const item of missingCitation.slice(0, 15)) console.log(`  - ${item}`);
}
if (notFoundUpstream.length) {
  console.log('Trích dẫn không khớp câu nào trong đề gốc:');
  for (const item of notFoundUpstream.slice(0, 15)) console.log(`  - ${item}`);
}

process.exit(mismatches.length > 0 ? 1 : 0);
