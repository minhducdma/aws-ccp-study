/**
 * Schema of the content bundle generated from courses/ by scripts/build.mjs.
 * The runtime export is generated/content.json; this file is the only hand-written
 * description of its shape, so consumers stay in sync with the generator.
 */

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E';

/** A course with authored material is "available"; one that only has a manifest is "planned". */
export type CourseStatus = 'available' | 'planned';

/**
 * Authored text keyed by locale. A manifest may write a plain string, which the generator
 * normalises to `{ [defaultLocale]: text }`, so a reader always finds the same shape. A locale
 * is present only when someone wrote that translation, so readers must fall back.
 */
export type LocalizedText = Record<string, string>;

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
  title: LocalizedText;
  /** One markdown body per translated file. Untranslated notes hold the default locale only. */
  markdown: LocalizedText;
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
  title: LocalizedText;
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
  num: number;
  /** Null unless the manifest names it; the app then numbers it in the reader's language. */
  title: LocalizedText | null;
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
  title: LocalizedText;
  shortTitle: LocalizedText;
  provider: string;
  /** A stable key such as "Foundational"; the app names it in the reader's language. */
  level: string;
  levelOrder: number;
  status: CourseStatus;
  summary: LocalizedText;
  estimatedHours: number;
  exam: ExamInfo;
  domainLabels: Record<string, LocalizedText>;
  phases: Phase[];
  mockExams: MockExam[];
  questionCount: number;
  warnings: string[];
}

export interface ContentBundle {
  generatedAt: string;
  /** Locale keys the generator accepts in a manifest, most preferred fallback first. */
  locales: string[];
  defaultLocale: string;
  courses: Course[];
  warnings: string[];
}

declare const content: ContentBundle;
export default content;
