// The content schema lives in @study/content next to the generator that produces it.
// Re-exported here so app code has a single import site for both content and progress types.
export type {
  ContentBundle,
  Course,
  CourseStatus,
  ExamInfo,
  GateQuiz,
  Letter,
  LocalizedText,
  MockExam,
  NoteDoc,
  Option,
  Phase,
  Question,
  QuestionSet,
} from '@study/content';

import type { Letter } from '@study/content';

export type ExamKind = 'gate' | 'mock';

export interface Attempt {
  id: string;
  examId: string;
  kind: ExamKind;
  label: string;
  startedAt: number;
  finishedAt: number;
  score: number;
  total: number;
  passScore: number;
  passed: boolean;
  answers: Record<string, Letter[]>;
}

export interface PracticeState {
  index: number;
  answers: Record<string, Letter[]>;
  checked: string[];
}

/** Progress for a single course. Question ids are unique within a course, not across courses. */
export interface CourseProgress {
  notesRead: Record<string, boolean>;
  practice: Record<string, PracticeState>;
  attempts: Attempt[];
  wrong: Record<string, number>;
  freeMode: boolean;
}

export interface ProgressStore {
  version: 2;
  courses: Record<string, CourseProgress>;
}
