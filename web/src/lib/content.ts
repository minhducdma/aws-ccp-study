import raw from '../generated/content.json';
import type { Content, MockExam, Phase, Question } from '../types';

export const content = raw as unknown as Content;

export const phases = content.phases;
export const mockExams = content.mockExams;

export function getPhase(phaseId: string | undefined): Phase | undefined {
  return phases.find((p) => p.id === phaseId);
}

export function getMockExam(examId: string | undefined): MockExam | undefined {
  return mockExams.find((m) => m.id === examId);
}

/** A gate quiz or a mock exam; both are rendered by the same exam screen. */
export function getExam(examId: string | undefined) {
  const phase = phases.find((p) => p.gateQuiz?.id === examId);
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
  const mock = getMockExam(examId);
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

const allQuestions = new Map<string, { question: Question; context: string }>();
for (const phase of phases) {
  const label = `Phase ${phase.order} — ${phase.title}`;
  for (const q of phase.practice?.questions ?? []) {
    allQuestions.set(q.id, { question: q, context: `${label} · Luyện tập` });
  }
  for (const q of phase.gateQuiz?.questions ?? []) {
    allQuestions.set(q.id, { question: q, context: `${label} · Gate Quiz` });
  }
}
for (const mock of mockExams) {
  for (const q of mock.questions) {
    allQuestions.set(q.id, { question: q, context: mock.title });
  }
}

export function lookupQuestion(id: string) {
  return allQuestions.get(id);
}

export const DOMAIN_LABELS: Record<number, string> = {
  1: 'Cloud Concepts',
  2: 'Security & Compliance',
  3: 'Cloud Technology & Services',
  4: 'Billing, Pricing & Support',
};

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
