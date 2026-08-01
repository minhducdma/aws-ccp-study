import bundle from '@study/content';
import type { Course, MockExam, Phase, Question } from '../types';

export const content = bundle;
export const courses = bundle.courses;

export function getCourse(courseId: string | undefined): Course | undefined {
  return courses.find((c) => c.id === courseId);
}

export function getPhase(course: Course, phaseId: string | undefined): Phase | undefined {
  return course.phases.find((p) => p.id === phaseId);
}

export function getMockExam(course: Course, examId: string | undefined): MockExam | undefined {
  return course.mockExams.find((m) => m.id === examId);
}

/** A gate quiz or a mock exam; both are rendered by the same exam screen. */
export function getExam(course: Course, examId: string | undefined) {
  const phase = course.phases.find((p) => p.gateQuiz?.id === examId);
  if (phase?.gateQuiz) {
    return {
      kind: 'gate' as const,
      id: phase.gateQuiz.id,
      label: `Gate Quiz — Phase ${phase.order}: ${phase.title}`,
      questions: phase.gateQuiz.questions,
      passScore: phase.gateQuiz.passScore,
      timeLimitMin: phase.gateQuiz.timeLimitMin,
      phase,
    };
  }
  const mock = getMockExam(course, examId);
  if (mock) {
    return {
      kind: 'mock' as const,
      id: mock.id,
      label: mock.title,
      questions: mock.questions,
      passScore: mock.passScore,
      timeLimitMin: mock.timeLimitMin,
      phase: undefined,
    };
  }
  return undefined;
}

type QuestionEntry = { question: Question; context: string };

// Built once per course on first lookup: question ids are only unique within a course.
const questionIndexes = new Map<string, Map<string, QuestionEntry>>();

function questionIndex(course: Course): Map<string, QuestionEntry> {
  const cached = questionIndexes.get(course.id);
  if (cached) return cached;

  const index = new Map<string, QuestionEntry>();
  for (const phase of course.phases) {
    const label = `Phase ${phase.order} — ${phase.title}`;
    for (const q of phase.practice?.questions ?? []) {
      index.set(q.id, { question: q, context: `${label} · Luyện tập` });
    }
    for (const q of phase.gateQuiz?.questions ?? []) {
      index.set(q.id, { question: q, context: `${label} · Gate Quiz` });
    }
  }
  for (const mock of course.mockExams) {
    for (const q of mock.questions) {
      index.set(q.id, { question: q, context: mock.title });
    }
  }
  questionIndexes.set(course.id, index);
  return index;
}

export function lookupQuestion(course: Course, id: string): QuestionEntry | undefined {
  return questionIndex(course).get(id);
}

export function domainLabel(course: Course, domain: number | null): string {
  if (domain == null) return 'Chưa phân loại';
  return course.domainLabels[String(domain)] ?? `Domain ${domain}`;
}

export function isCorrect(question: Question, selected: string[] | undefined): boolean {
  if (!selected || selected.length === 0) return false;
  if (selected.length !== question.correct.length) return false;
  return question.correct.every((letter) => selected.includes(letter));
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
