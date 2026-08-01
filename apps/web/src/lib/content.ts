import bundle from '@study/content';
import type { I18n } from '../i18n';
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

/** A manifest may name a mock exam; otherwise it is numbered in the reader's language. */
export function mockExamTitle(mock: MockExam, i18n: I18n): string {
  return i18n.localized(mock.title) || i18n.t('exam.mockTitle', { number: mock.num });
}

/** A gate quiz or a mock exam; both are rendered by the same exam screen. */
export function getExam(course: Course, examId: string | undefined, i18n: I18n) {
  const phase = course.phases.find((p) => p.gateQuiz?.id === examId);
  if (phase?.gateQuiz) {
    return {
      kind: 'gate' as const,
      id: phase.gateQuiz.id,
      label: i18n.t('exam.gateLabel', {
        order: phase.order,
        title: i18n.localized(phase.title),
      }),
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
      label: mockExamTitle(mock, i18n),
      questions: mock.questions,
      passScore: mock.passScore,
      timeLimitMin: mock.timeLimitMin,
      phase: undefined,
    };
  }
  return undefined;
}

/**
 * Where a question came from, kept as data rather than as a sentence, so the same index serves
 * every language.
 */
export type QuestionOrigin =
  | { kind: 'practice' | 'gate'; phase: Phase }
  | { kind: 'mock'; mock: MockExam };

export interface QuestionEntry {
  question: Question;
  origin: QuestionOrigin;
}

// Built once per course on first lookup: question ids are only unique within a course.
const questionIndexes = new Map<string, Map<string, QuestionEntry>>();

function questionIndex(course: Course): Map<string, QuestionEntry> {
  const cached = questionIndexes.get(course.id);
  if (cached) return cached;

  const index = new Map<string, QuestionEntry>();
  for (const phase of course.phases) {
    for (const q of phase.practice?.questions ?? []) {
      index.set(q.id, { question: q, origin: { kind: 'practice', phase } });
    }
    for (const q of phase.gateQuiz?.questions ?? []) {
      index.set(q.id, { question: q, origin: { kind: 'gate', phase } });
    }
  }
  for (const mock of course.mockExams) {
    for (const q of mock.questions) {
      index.set(q.id, { question: q, origin: { kind: 'mock', mock } });
    }
  }
  questionIndexes.set(course.id, index);
  return index;
}

export function lookupQuestion(course: Course, id: string): QuestionEntry | undefined {
  return questionIndex(course).get(id);
}

export function originLabel(origin: QuestionOrigin, i18n: I18n): string {
  if (origin.kind === 'mock') return mockExamTitle(origin.mock, i18n);
  const params = { order: origin.phase.order, title: i18n.localized(origin.phase.title) };
  return i18n.t(origin.kind === 'gate' ? 'content.gateQuizContext' : 'content.practiceContext', params);
}

export function domainLabel(course: Course, domain: number | null, i18n: I18n): string {
  if (domain == null) return i18n.t('content.unclassifiedDomain');
  const label = i18n.localized(course.domainLabels[String(domain)]);
  return label || i18n.t('content.domain', { domain });
}

export function isCorrect(question: Question, selected: string[] | undefined): boolean {
  if (!selected || selected.length === 0) return false;
  if (selected.length !== question.correct.length) return false;
  return question.correct.every((letter) => selected.includes(letter));
}

/** MM:SS, which reads the same in every language this app supports. */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
