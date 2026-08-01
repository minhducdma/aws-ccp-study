/**
 * Schema of the content bundle generated from courses/ by scripts/build.mjs.
 * The runtime export is generated/content.json; this file is the only hand-written
 * description of its shape, so consumers stay in sync with the generator.
 */

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E';

/** A course with authored material is "available"; one that only has a manifest is "planned". */
export type CourseStatus = 'available' | 'planned';

export interface Option {
  letter: Letter;
  text: string;
}

export interface Question {
  id: string;
  num: number;
  text: string;
  options: Option[];
  correct: Letter[];
  multi: boolean;
  explanation: string;
  source: string | null;
  domain: number | null;
}

export interface NoteDoc {
  id: string;
  title: string;
  markdown: string;
}

export interface QuestionSet {
  id: string;
  questions: Question[];
}

export interface GateQuiz extends QuestionSet {
  passScore: number;
  timeLimitMin: number;
}

export interface Phase {
  id: string;
  slug: string;
  order: number;
  title: string;
  domain: number;
  weight: number;
  estimatedHours: number;
  notes: NoteDoc[];
  practice: QuestionSet | null;
  gateQuiz: GateQuiz | null;
  ready: boolean;
}

export interface MockExam {
  id: string;
  title: string;
  questions: Question[];
  passScore: number;
  timeLimitMin: number;
}

export interface ExamInfo {
  code: string;
  totalQuestions: number;
  scoredQuestions: number;
  durationMin: number;
  passScore: number;
  maxScore: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  provider: string;
  level: string;
  levelOrder: number;
  status: CourseStatus;
  summary: string;
  estimatedHours: number;
  exam: ExamInfo;
  domainLabels: Record<string, string>;
  phases: Phase[];
  mockExams: MockExam[];
  questionCount: number;
  warnings: string[];
}

export interface ContentBundle {
  generatedAt: string;
  courses: Course[];
  warnings: string[];
}

declare const content: ContentBundle;
export default content;
