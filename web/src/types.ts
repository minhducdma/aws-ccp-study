export type Letter = 'A' | 'B' | 'C' | 'D' | 'E';

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

export interface Content {
  generatedAt: string;
  exam: {
    code: string;
    totalQuestions: number;
    scoredQuestions: number;
    durationMin: number;
    passScore: number;
    maxScore: number;
  };
  phases: Phase[];
  mockExams: MockExam[];
  warnings: string[];
}

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

export interface Progress {
  notesRead: Record<string, boolean>;
  practice: Record<string, PracticeState>;
  attempts: Attempt[];
  wrong: Record<string, number>;
  freeMode: boolean;
}
