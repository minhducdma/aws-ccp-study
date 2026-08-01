import type { Unsubscribe } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import type {
  Attempt,
  Course,
  CourseProgress,
  Letter,
  PracticeState,
  ProgressStore,
} from '../types';
import { isCorrect, lookupQuestion } from './content';
import {
  deleteAttempt as deleteAttemptDoc,
  deleteNoteProgress,
  deletePracticeProgress,
  deleteWrongProgress,
  loadUserProgress,
  saveAttempt as saveAttemptDoc,
  saveCourseSummary,
  saveNoteProgress,
  savePracticeProgress,
  saveWrongProgress,
  subscribeToAttempts,
  subscribeToCourses,
  subscribeToNotes,
  subscribeToPractice,
  subscribeToWrong,
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
const courseUnsubscribes = new Map<string, Unsubscribe[]>();

function stopWatchingRemote() {
  unsubscribeCourses?.();
  unsubscribeCourses = null;
  courseUnsubscribes.forEach((unsubscribes) => unsubscribes.forEach((unsubscribe) => unsubscribe()));
  courseUnsubscribes.clear();
}

function applyRemoteCourseSummary(courseId: string, fields: Partial<CourseProgress>) {
  const current = store.courses[courseId] ?? emptyCourseProgress;
  applyRemote({
    ...store,
    courses: {
      ...store.courses,
      [courseId]: {
        ...current,
        freeMode: fields.freeMode ?? current.freeMode,
        updatedAt: fields.updatedAt ?? current.updatedAt,
      },
    },
  });
}

function updateRemoteCourse(courseId: string, patch: Partial<CourseProgress>) {
  const current = store.courses[courseId] ?? emptyCourseProgress;
  applyRemote({ ...store, courses: { ...store.courses, [courseId]: { ...current, ...patch } } });
}

function watchCourseDetails(uid: string, courseId: string) {
  if (courseUnsubscribes.has(courseId)) return;
  courseUnsubscribes.set(courseId, [
    subscribeToNotes(uid, courseId, (notesRead) => updateRemoteCourse(courseId, { notesRead })),
    subscribeToPractice(uid, courseId, (practice) => updateRemoteCourse(courseId, { practice })),
    subscribeToWrong(uid, courseId, (wrong) => updateRemoteCourse(courseId, { wrong })),
    subscribeToAttempts(uid, courseId, (attempts) => updateRemoteCourse(courseId, { attempts })),
  ]);
}

function mergeCourseProgress(local: CourseProgress, remote: CourseProgress): CourseProgress {
  const localIsNewer = local.updatedAt > remote.updatedAt;
  const practice = { ...remote.practice };
  for (const [setId, localState] of Object.entries(local.practice)) {
    if (!practice[setId] || localIsNewer) practice[setId] = localState;
  }
  const wrong = { ...remote.wrong };
  for (const [questionId, count] of Object.entries(local.wrong)) {
    wrong[questionId] = Math.max(wrong[questionId] ?? 0, count);
  }
  const attempts = new Map(remote.attempts.map((attempt) => [attempt.id, attempt]));
  local.attempts.forEach((attempt) => attempts.set(attempt.id, attempt));

  return {
    notesRead: { ...remote.notesRead, ...local.notesRead },
    practice,
    wrong,
    attempts: [...attempts.values()],
    freeMode: localIsNewer ? local.freeMode : remote.freeMode,
    updatedAt: Math.max(local.updatedAt, remote.updatedAt),
  };
}

function mergeProgressStores(local: ProgressStore, remoteCourses: Record<string, CourseProgress>): ProgressStore {
  const courses = { ...remoteCourses };
  for (const [courseId, localProgress] of Object.entries(local.courses)) {
    courses[courseId] = courses[courseId]
      ? mergeCourseProgress(localProgress, courses[courseId])
      : localProgress;
  }
  return { version: 2, courses };
}

async function persistCourse(uid: string, courseId: string, progress: CourseProgress) {
  await Promise.allSettled([
    saveCourseSummary(uid, courseId, {
      freeMode: progress.freeMode,
      updatedAt: progress.updatedAt || Date.now(),
    }),
    ...Object.entries(progress.notesRead).map(([noteId, read]) =>
      saveNoteProgress(uid, courseId, noteId, read),
    ),
    ...Object.entries(progress.practice).map(([setId, state]) =>
      savePracticeProgress(uid, courseId, setId, state),
    ),
    ...Object.entries(progress.wrong).map(([questionId, count]) =>
      saveWrongProgress(uid, courseId, questionId, count),
    ),
    ...progress.attempts.map((attempt) => saveAttemptDoc(uid, courseId, attempt)),
  ]);
}

function startWatchingRemote(uid: string) {
  unsubscribeCourses = subscribeToCourses(uid, (snapshot) => {
    for (const change of snapshot.docChanges()) {
      const courseId = change.doc.id;
      if (change.type === 'removed') {
        courseUnsubscribes.get(courseId)?.forEach((unsubscribe) => unsubscribe());
        courseUnsubscribes.delete(courseId);
        continue;
      }
      applyRemoteCourseSummary(courseId, change.doc.data() as Partial<CourseProgress>);
      watchCourseDetails(uid, courseId);
    }
  });
}

async function synchronizeProgress(uid: string, local: ProgressStore) {
  try {
    const remoteCourses = await loadUserProgress(uid);
    if (currentUid !== uid) return;
    const merged = mergeProgressStores(local, remoteCourses);
    applyRemote(merged);
    await Promise.all(
      Object.entries(merged.courses).map(([courseId, progress]) => persistCourse(uid, courseId, progress)),
    );
  } catch {
    // Keep the local snapshot visible offline; Firestore listeners reconnect automatically.
    if (currentUid === uid) applyRemote(local);
  } finally {
    if (currentUid === uid) startWatchingRemote(uid);
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

  void synchronizeProgress(uid, store);
}

export function courseProgress(courseId: string): CourseProgress {
  return store.courses[courseId] ?? emptyCourseProgress;
}

/** Writes a course's fields (everything but attempts) locally and, once signed in, to its
 * Firestore document. Any `attempts` on `next` is ignored here — attempts are only ever added
 * via `addAttempt` or cleared via `clearAttempts`, never rewritten by a fields-only edit. */
function commitCourse(courseId: string, next: CourseProgress) {
  const updatedAt = Date.now();
  const attempts = store.courses[courseId]?.attempts ?? emptyCourseProgress.attempts;
  applyRemote({
    ...store,
    courses: { ...store.courses, [courseId]: { ...next, updatedAt, attempts } },
  });
  if (currentUid) {
    saveCourseSummary(currentUid, courseId, { freeMode: next.freeMode, updatedAt }).catch(() => {
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
      if (currentUid) saveNoteProgress(currentUid, courseId, noteId, read).catch(() => {});
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
      if (currentUid) {
        savePracticeProgress(currentUid, courseId, setId, { ...set, ...patch }).catch(() => {});
      }
    },
    [courseId],
  );

  const resetPractice = useCallback(
    (setId: string) => {
      const current = courseProgress(courseId);
      const practice = { ...current.practice };
      delete practice[setId];
      commitCourse(courseId, { ...current, practice });
      if (currentUid) deletePracticeProgress(currentUid, courseId, setId).catch(() => {});
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
      if (currentUid) {
        questionIds.forEach((id) => saveWrongProgress(currentUid!, courseId, id, wrong[id]).catch(() => {}));
      }
    },
    [courseId],
  );

  const clearWrong = useCallback(
    (questionId: string) => {
      const current = courseProgress(courseId);
      const wrong = { ...current.wrong };
      delete wrong[questionId];
      commitCourse(courseId, { ...current, wrong });
      if (currentUid) deleteWrongProgress(currentUid, courseId, questionId).catch(() => {});
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
      if (currentUid) {
        Object.entries(wrong).forEach(([questionId, count]) =>
          saveWrongProgress(currentUid!, courseId, questionId, count).catch(() => {}),
        );
      }
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
    const current = courseProgress(courseId);
    clearAttempts(courseId);
    commitCourse(courseId, { ...emptyCourseProgress });
    if (currentUid) {
      Object.keys(current.notesRead).forEach((noteId) =>
        deleteNoteProgress(currentUid!, courseId, noteId).catch(() => {}),
      );
      Object.keys(current.practice).forEach((setId) =>
        deletePracticeProgress(currentUid!, courseId, setId).catch(() => {}),
      );
      Object.keys(current.wrong).forEach((questionId) =>
        deleteWrongProgress(currentUid!, courseId, questionId).catch(() => {}),
      );
    }
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
