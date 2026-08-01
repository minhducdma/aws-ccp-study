import { useCallback, useEffect, useState } from 'react';
import type { Attempt, Course, CourseProgress, Letter, PracticeState, ProgressStore } from '../types';
import { isCorrect, lookupQuestion } from './content';

const STORAGE_KEY = 'study-progress-v2';

// Progress written before the app supported multiple courses. It held a single course's
// data at the top level, which is now stored under this id.
const LEGACY_STORAGE_KEY = 'aws-ccp-progress-v1';
const LEGACY_COURSE_ID = 'aws-clf-c02';

export const emptyCourseProgress: CourseProgress = {
  notesRead: {},
  practice: {},
  attempts: [],
  wrong: {},
  freeMode: false,
};

const emptyStore: ProgressStore = { version: 2, courses: {} };

function migrateLegacy(): ProgressStore | null {
  const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!raw) return null;
  const legacy = JSON.parse(raw) as Partial<CourseProgress>;
  return {
    version: 2,
    courses: { [LEGACY_COURSE_ID]: { ...emptyCourseProgress, ...legacy } },
  };
}

function load(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressStore;
      return { version: 2, courses: parsed.courses ?? {} };
    }
    // The legacy entry is left in place so downgrading does not lose anything.
    const migrated = migrateLegacy();
    if (migrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return emptyStore;
  } catch {
    return emptyStore;
  }
}

let store: ProgressStore = typeof localStorage === 'undefined' ? emptyStore : load();
const listeners = new Set<() => void>();

function commit(next: ProgressStore) {
  store = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore writes rejected when localStorage is unavailable (private mode).
  }
  listeners.forEach((fn) => fn());
}

export function courseProgress(courseId: string): CourseProgress {
  return store.courses[courseId] ?? emptyCourseProgress;
}

function commitCourse(courseId: string, next: CourseProgress) {
  commit({ ...store, courses: { ...store.courses, [courseId]: next } });
}

export function useProgress(course: Course) {
  const [, forceRender] = useState(0);
  const courseId = course.id;

  useEffect(() => {
    const listener = () => forceRender((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const markNoteRead = useCallback(
    (noteId: string, read = true) => {
      const current = courseProgress(courseId);
      commitCourse(courseId, { ...current, notesRead: { ...current.notesRead, [noteId]: read } });
    },
    [courseId],
  );

  const savePractice = useCallback(
    (setId: string, patch: Partial<PracticeState>) => {
      const current = courseProgress(courseId);
      const set: PracticeState = current.practice[setId] ?? { index: 0, answers: {}, checked: [] };
      commitCourse(courseId, {
        ...current,
        practice: { ...current.practice, [setId]: { ...set, ...patch } },
      });
    },
    [courseId],
  );

  const resetPractice = useCallback(
    (setId: string) => {
      const current = courseProgress(courseId);
      const practice = { ...current.practice };
      delete practice[setId];
      commitCourse(courseId, { ...current, practice });
    },
    [courseId],
  );

  const recordWrong = useCallback(
    (questionIds: string[]) => {
      if (questionIds.length === 0) return;
      const current = courseProgress(courseId);
      const wrong = { ...current.wrong };
      for (const id of questionIds) wrong[id] = (wrong[id] ?? 0) + 1;
      commitCourse(courseId, { ...current, wrong });
    },
    [courseId],
  );

  const clearWrong = useCallback(
    (questionId: string) => {
      const current = courseProgress(courseId);
      const wrong = { ...current.wrong };
      delete wrong[questionId];
      commitCourse(courseId, { ...current, wrong });
    },
    [courseId],
  );

  const saveAttempt = useCallback(
    (attempt: Attempt) => {
      const current = courseProgress(courseId);
      const wrong = { ...current.wrong };
      for (const [questionId, selected] of Object.entries(attempt.answers)) {
        const entry = lookupQuestion(course, questionId);
        if (entry && !isCorrect(entry.question, selected)) {
          wrong[questionId] = (wrong[questionId] ?? 0) + 1;
        }
      }
      commitCourse(courseId, { ...current, attempts: [...current.attempts, attempt], wrong });
    },
    [course, courseId],
  );

  const setFreeMode = useCallback(
    (freeMode: boolean) => {
      commitCourse(courseId, { ...courseProgress(courseId), freeMode });
    },
    [courseId],
  );

  const resetAll = useCallback(() => {
    commitCourse(courseId, { ...emptyCourseProgress });
  }, [courseId]);

  return {
    progress: courseProgress(courseId),
    markNoteRead,
    savePractice,
    resetPractice,
    recordWrong,
    clearWrong,
    saveAttempt,
    setFreeMode,
    resetAll,
  };
}

/** Read-only snapshot for screens that show several courses at once, such as the catalog. */
export function useAllProgress() {
  const [, forceRender] = useState(0);
  useEffect(() => {
    const listener = () => forceRender((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return store;
}

export function bestAttempt(progress: CourseProgress, examId: string): Attempt | undefined {
  return progress.attempts.filter((a) => a.examId === examId).sort((a, b) => b.score - a.score)[0];
}

export function attemptsFor(progress: CourseProgress, examId: string): Attempt[] {
  return progress.attempts
    .filter((a) => a.examId === examId)
    .sort((a, b) => b.startedAt - a.startedAt);
}

export function hasPassed(progress: CourseProgress, examId: string | undefined): boolean {
  if (!examId) return false;
  return progress.attempts.some((a) => a.examId === examId && a.passed);
}

export type AnswerMap = Record<string, Letter[]>;
