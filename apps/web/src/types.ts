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

export interface ExamProgressState {
  index: number;
  answers: Record<string, Letter[]>;
  flagged: string[];
  startedAt: number;
  deadline: number;
}

export interface CourseProgress {
  notesRead: Record<string, boolean>;
  practice: Record<string, PracticeState>;
  exams: Record<string, ExamProgressState>;
  attempts: Attempt[];
  wrong: Record<string, number>;
  freeMode: boolean;
  /** Epoch ms of the last local change to this course's non-attempt fields. */
  updatedAt: number;
}

/** Pre-v3 Firestore shape, retained only so existing course documents can be migrated. */
export type LegacyCourseProgressFields = Omit<CourseProgress, 'attempts' | 'exams'>;

export interface CourseProgressSummary {
  freeMode: boolean;
  updatedAt: number;
}

export interface ProgressStore {
  version: 2;
  courses: Record<string, CourseProgress>;
}
