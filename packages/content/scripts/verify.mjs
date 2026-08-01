// Checks every answer in generated/content.json against the upstream exams it cites.
// This is the ground-truth layer: if the study material records a wrong answer, it shows up here.
// A course opts in by declaring an "upstream" block in its course.json.
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(HERE, '..');
const COURSES_DIR = join(PACKAGE_DIR, '..', '..', 'courses');

const content = JSON.parse(readFileSync(join(PACKAGE_DIR, 'generated', 'content.json'), 'utf8'));

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

function collectQuestions(course) {
  const questions = [];
  for (const phase of course.phases) {
    for (const q of phase.practice?.questions ?? []) {
      questions.push({ q, where: `${phase.slug}/practice` });
    }
    for (const q of phase.gateQuiz?.questions ?? []) {
      questions.push({ q, where: `${phase.slug}/gate-quiz` });
    }
  }
  for (const mock of course.mockExams) {
    for (const q of mock.questions) questions.push({ q, where: mock.id });
  }
  return questions;
}

async function verifyCourse(course) {
  const manifestPath = join(COURSES_DIR, course.id, 'course.json');
  const upstream = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')).upstream : null;
  if (!upstream) {
    console.log(`${course.id}: no upstream source declared, skipped.\n`);
    return 0;
  }

  const questions = collectQuestions(course);
  const examNums = [
    ...new Set(
      questions
        .map(({ q }) => q.source?.match(/Exam\s*(\d+)/i)?.[1])
        .filter(Boolean)
        .map(Number),
    ),
  ].sort((a, b) => a - b);

  console.log(`${course.id} · source: ${upstream.label ?? upstream.rawBase}`);
  console.log(`Checking ${questions.length} questions against ${examNums.length} upstream exams: ${examNums.join(', ')}\n`);

  const cacheDir = join(PACKAGE_DIR, '.cache', course.id);
  const exams = new Map();
  for (const num of examNums) {
    try {
      exams.set(num, parseUpstream(await loadExam(upstream, cacheDir, num)));
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
    const original = exams.get(Number(m[1]))?.get(Number(m[2]));
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

  console.log(`Checked: ${checked} questions`);
  console.log(`Missing a source citation: ${missingCitation.length}`);
  console.log(`Citation points at no upstream question: ${notFoundUpstream.length}`);
  console.log(`Answer mismatches: ${mismatches.length}\n`);

  for (const item of mismatches) {
    console.log(`  ${item.where} · ${item.source}`);
    console.log(`    ours: ${item.ours}  |  upstream: ${item.theirs}`);
    console.log(`    "${item.text}…"\n`);
  }
  if (missingCitation.length) {
    console.log('Missing citations:');
    for (const item of missingCitation.slice(0, 15)) console.log(`  - ${item}`);
  }
  if (notFoundUpstream.length) {
    console.log('Citations with no matching upstream question:');
    for (const item of notFoundUpstream.slice(0, 15)) console.log(`  - ${item}`);
  }

  return mismatches.length;
}

let totalMismatches = 0;
for (const course of content.courses.filter((c) => c.status === 'available')) {
  totalMismatches += await verifyCourse(course);
}

process.exit(totalMismatches > 0 ? 1 : 0);
