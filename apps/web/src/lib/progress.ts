import type { Unsubscribe } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import type {
  Attempt,
  Course,
  CourseProgress,
  CourseProgressFields,
  Letter,
  PracticeState,
  ProgressStore,
} from '../types';
import { isCorrect, lookupQuestion } from './content';
import {
  deleteAttempt as deleteAttemptDoc,
  saveAttempt as saveAttemptDoc,
  saveCourseFields,
  subscribeToAttempts,
  subscribeToCourses,
} from './firebase/collections/userProgress';

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
  updatedAt: 0,
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

/** Applies a store update that already happened elsewhere (Firestore, another tab) — writes the
 * local cache and notifies listeners, but does not push back to Firestore. */
function applyRemote(next: ProgressStore) {
  store = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore writes rejected when localStorage is unavailable (private mode).
  }
  listeners.forEach((fn) => fn());
}

function clearLocalProgress() {
  store = emptyStore;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore removals rejected when localStorage is unavailable (private mode).
  }
  listeners.forEach((fn) => fn());
}

// Firestore access itself (collection/doc refs, reads and writes) lives in
// lib/firebase/collections/userProgress.ts. This module only owns merging that data with the
// local cache and exposing it to components.

let currentUid: string | null = null;
let unsubscribeCourses: Unsubscribe | null = null;
const attemptUnsubscribes = new Map<string, Unsubscribe>();

function stopWatchingRemote() {
  unsubscribeCourses?.();
  unsubscribeCourses = null;
  attemptUnsubscribes.forEach((unsubscribe) => unsubscribe());
  attemptUnsubscribes.clear();
}

/** Merges a course document's fields into the local store without touching its attempts, which
 * are synced separately by `watchAttempts`. */
function applyRemoteCourseFields(courseId: string, fields: CourseProgressFields) {
  const attempts = store.courses[courseId]?.attempts ?? emptyCourseProgress.attempts;
  applyRemote({
    ...store,
    courses: { ...store.courses, [courseId]: { ...fields, attempts } },
  });
}

function watchAttempts(uid: string, courseId: string): Unsubscribe {
  return subscribeToAttempts(uid, courseId, (attempts) => {
    const current = store.courses[courseId] ?? emptyCourseProgress;
    applyRemote({
      ...store,
      courses: { ...store.courses, [courseId]: { ...current, attempts } },
    });
  });
}

/** First sign-in on this device/account: this browser's guest progress becomes the seed for
 * every course it has data for, one Firestore document per course plus one per attempt. */
function seedRemoteFromLocalGuest(uid: string) {
  for (const [courseId, progress] of Object.entries(store.courses)) {
    const { attempts, ...fields } = progress;
    saveCourseFields(uid, courseId, { ...fields, updatedAt: Date.now() }).catch(() => {
      // Best-effort seed; if it fails the user keeps their local copy and can retry by editing.
    });
    for (const attempt of attempts) {
      saveAttemptDoc(uid, courseId, attempt).catch(() => {});
    }
  }
}

/**
 * Called by AuthProvider whenever the signed-in user changes. Signing in for the first time
 * seeds Firestore with whatever this browser already had (guest progress); after that,
 * Firestore is the source of truth and syncs live to every device. Signing out clears the
 * account's in-memory and local cache so its progress cannot leak into the guest session.
 */
export function bindProgressUser(uid: string | null): void {
  if (uid === currentUid) return;
  const signedOut = currentUid !== null && uid === null;
  stopWatchingRemote();
  currentUid = uid;

  if (!uid) {
    if (signedOut) clearLocalProgress();
    else applyRemote(load());
    return;
  }

  unsubscribeCourses = subscribeToCourses(uid, (snapshot) => {
    if (snapshot.empty && Object.keys(store.courses).length > 0) {
      seedRemoteFromLocalGuest(uid);
      return;
    }

    for (const change of snapshot.docChanges()) {
      const courseId = change.doc.id;
      if (change.type === 'removed') {
        attemptUnsubscribes.get(courseId)?.();
        attemptUnsubscribes.delete(courseId);
        continue;
      }
      applyRemoteCourseFields(courseId, change.doc.data() as CourseProgressFields);
      if (!attemptUnsubscribes.has(courseId)) {
        attemptUnsubscribes.set(courseId, watchAttempts(uid, courseId));
      }
    }
  });
}

export function courseProgress(courseId: string): CourseProgress {
  return store.courses[courseId] ?? emptyCourseProgress;
}

/** Writes a course's fields (everything but attempts) locally and, once signed in, to its
 * Firestore document. Any `attempts` on `next` is ignored here — attempts are only ever added
 * via `addAttempt` or cleared via `clearAttempts`, never rewritten by a fields-only edit. */
function commitCourse(courseId: string, next: CourseProgress) {
  const { attempts: _ignored, ...rest } = next;
  const fields: CourseProgressFields = { ...rest, updatedAt: Date.now() };
  const attempts = store.courses[courseId]?.attempts ?? emptyCourseProgress.attempts;
  applyRemote({
    ...store,
    courses: { ...store.courses, [courseId]: { ...fields, attempts } },
  });
  if (currentUid) {
    saveCourseFields(currentUid, courseId, fields).catch(() => {
      // The change is already visible locally; Firestore's offline queue retries once the
      // connection is back, and the next courses snapshot reconciles the rest.
    });
  }
}

/** Appends one finished exam attempt: written as its own Firestore document (never edited
 * afterwards) and appended to the local cache. */
function addAttempt(courseId: string, attempt: Attempt) {
  const current = store.courses[courseId] ?? emptyCourseProgress;
  applyRemote({
    ...store,
    courses: { ...store.courses, [courseId]: { ...current, attempts: [...current.attempts, attempt] } },
  });
  if (currentUid) {
    saveAttemptDoc(currentUid, courseId, attempt).catch(() => {
      // Same offline-queue reasoning as commitCourse.
    });
  }
}

/** Clears every recorded attempt for a course, both locally and (if signed in) in Firestore. */
function clearAttempts(courseId: string) {
  const current = store.courses[courseId] ?? emptyCourseProgress;
  const attemptIds = current.attempts.map((a) => a.id);
  applyRemote({
    ...store,
    courses: { ...store.courses, [courseId]: { ...current, attempts: [] } },
  });
  if (currentUid) {
    for (const attemptId of attemptIds) {
      deleteAttemptDoc(currentUid, courseId, attemptId).catch(() => {});
    }
  }
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
      addAttempt(courseId, attempt);
      commitCourse(courseId, { ...current, wrong });
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
    clearAttempts(courseId);
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
