import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  type QuerySnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import type {
  Attempt,
  CourseProgress,
  CourseProgressSummary,
  ExamProgressState,
  LegacyCourseProgressFields,
  PracticeState,
} from '../../../types';
import { db } from '../config';

/**
 * The `userProgress` collection, one document per signed-in user (keyed by uid):
 *
 *   userProgress/{uid}/courses/{courseId}                     — CourseProgressSummary
 *   userProgress/{uid}/courses/{courseId}/attempts/{attemptId} — one document per exam attempt
 *   userProgress/{uid}/courses/{courseId}/notes/{noteId}       — one note read state
 *   userProgress/{uid}/courses/{courseId}/practice/{setId}     — one practice set state
 *   userProgress/{uid}/courses/{courseId}/exams/{examId}       — one in-progress exam
 *   userProgress/{uid}/courses/{courseId}/wrong/{questionId}   — one wrong-answer counter
 *
 * Splitting attempts into their own subcollection means ticking a checkbox or answering one
 * practice question only rewrites the small course document, never the whole exam history.
 * This module is only the read/write boundary for the collection — merging local, remote and
 * guest data is `features/course/progress.ts`'s job.
 */

export function coursesCollectionRef(uid: string) {
  return collection(db, 'userProgress', uid, 'courses');
}

function userProgressDocRef(uid: string) {
  return doc(db, 'userProgress', uid);
}

export function courseDocRef(uid: string, courseId: string) {
  return doc(db, 'userProgress', uid, 'courses', courseId);
}

export function attemptsCollectionRef(uid: string, courseId: string) {
  return collection(db, 'userProgress', uid, 'courses', courseId, 'attempts');
}

function notesCollectionRef(uid: string, courseId: string) {
  return collection(courseDocRef(uid, courseId), 'notes');
}

function practiceCollectionRef(uid: string, courseId: string) {
  return collection(courseDocRef(uid, courseId), 'practice');
}

function examsCollectionRef(uid: string, courseId: string) {
  return collection(courseDocRef(uid, courseId), 'exams');
}

function wrongCollectionRef(uid: string, courseId: string) {
  return collection(courseDocRef(uid, courseId), 'wrong');
}

function noteDocRef(uid: string, courseId: string, noteId: string) {
  return doc(notesCollectionRef(uid, courseId), noteId);
}

function practiceDocRef(uid: string, courseId: string, setId: string) {
  return doc(practiceCollectionRef(uid, courseId), setId);
}

function examDocRef(uid: string, courseId: string, examId: string) {
  return doc(examsCollectionRef(uid, courseId), examId);
}

function wrongDocRef(uid: string, courseId: string, questionId: string) {
  return doc(wrongCollectionRef(uid, courseId), questionId);
}

interface NoteProgressDocument {
  read: boolean;
  updatedAt: number;
}

interface PracticeProgressDocument extends PracticeState {
  updatedAt: number;
}

interface ExamProgressDocument extends ExamProgressState {
  updatedAt: number;
}

interface WrongProgressDocument {
  count: number;
  updatedAt: number;
}

export function attemptDocRef(uid: string, courseId: string, attemptId: string) {
  return doc(db, 'userProgress', uid, 'courses', courseId, 'attempts', attemptId);
}

/** Subscribes to the list of course documents under a user. Fires once per change, with the
 * raw `docChanges()` so the caller can tell an add/update apart from a removal. */
export function subscribeToCourses(
  uid: string,
  onChange: (snapshot: QuerySnapshot) => void,
): Unsubscribe {
  return onSnapshot(coursesCollectionRef(uid), onChange);
}

/** Subscribes to every attempt recorded for one course. */
export function subscribeToAttempts(
  uid: string,
  courseId: string,
  onChange: (attempts: Attempt[]) => void,
): Unsubscribe {
  return onSnapshot(attemptsCollectionRef(uid, courseId), (snapshot) => {
    onChange(snapshot.docs.map((d) => d.data() as Attempt));
  });
}

export function subscribeToNotes(
  uid: string,
  courseId: string,
  onChange: (notesRead: Record<string, boolean>) => void,
): Unsubscribe {
  return onSnapshot(notesCollectionRef(uid, courseId), (snapshot) => {
    onChange(Object.fromEntries(snapshot.docs.map((entry) => [entry.id, (entry.data() as NoteProgressDocument).read])));
  });
}

export function subscribeToPractice(
  uid: string,
  courseId: string,
  onChange: (practice: Record<string, PracticeState>) => void,
): Unsubscribe {
  return onSnapshot(practiceCollectionRef(uid, courseId), (snapshot) => {
    onChange(
      Object.fromEntries(
        snapshot.docs.map((entry) => {
          const { updatedAt: _updatedAt, ...state } = entry.data() as PracticeProgressDocument;
          return [entry.id, state];
        }),
      ),
    );
  });
}

export function subscribeToExams(
  uid: string,
  courseId: string,
  onChange: (exams: Record<string, ExamProgressState>) => void,
): Unsubscribe {
  return onSnapshot(examsCollectionRef(uid, courseId), (snapshot) => {
    onChange(
      Object.fromEntries(
        snapshot.docs.map((entry) => {
          const { updatedAt: _updatedAt, ...state } = entry.data() as ExamProgressDocument;
          return [entry.id, state];
        }),
      ),
    );
  });
}

export function subscribeToWrong(
  uid: string,
  courseId: string,
  onChange: (wrong: Record<string, number>) => void,
): Unsubscribe {
  return onSnapshot(wrongCollectionRef(uid, courseId), (snapshot) => {
    onChange(Object.fromEntries(snapshot.docs.map((entry) => [entry.id, (entry.data() as WrongProgressDocument).count])));
  });
}

export async function loadUserProgress(uid: string): Promise<Record<string, CourseProgress>> {
  const courses = await getDocs(coursesCollectionRef(uid));
  const entries = await Promise.all(
    courses.docs.map(async (courseEntry) => {
      const courseId = courseEntry.id;
      const legacy = courseEntry.data() as Partial<LegacyCourseProgressFields>;
      const [notes, practice, exams, wrong, attempts] = await Promise.all([
        getDocs(notesCollectionRef(uid, courseId)),
        getDocs(practiceCollectionRef(uid, courseId)),
        getDocs(examsCollectionRef(uid, courseId)),
        getDocs(wrongCollectionRef(uid, courseId)),
        getDocs(attemptsCollectionRef(uid, courseId)),
      ]);

      const notesRead = { ...(legacy.notesRead ?? {}) };
      notes.forEach((entry) => {
        notesRead[entry.id] = (entry.data() as NoteProgressDocument).read;
      });
      const practiceStates = { ...(legacy.practice ?? {}) };
      practice.forEach((entry) => {
        const { updatedAt: _updatedAt, ...state } = entry.data() as PracticeProgressDocument;
        practiceStates[entry.id] = state;
      });
      const examStates: Record<string, ExamProgressState> = {};
      exams.forEach((entry) => {
        const { updatedAt: _updatedAt, ...state } = entry.data() as ExamProgressDocument;
        examStates[entry.id] = state;
      });
      const wrongCounts = { ...(legacy.wrong ?? {}) };
      wrong.forEach((entry) => {
        wrongCounts[entry.id] = (entry.data() as WrongProgressDocument).count;
      });

      return [
        courseId,
        {
          notesRead,
          practice: practiceStates,
          exams: examStates,
          wrong: wrongCounts,
          attempts: attempts.docs.map((entry) => entry.data() as Attempt),
          freeMode: legacy.freeMode ?? false,
          updatedAt: legacy.updatedAt ?? 0,
        },
      ] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export function saveCourseSummary(
  uid: string,
  courseId: string,
  summary: CourseProgressSummary,
): Promise<void> {
  return Promise.all([
    setDoc(userProgressDocRef(uid), { updatedAt: summary.updatedAt }, { merge: true }),
    setDoc(
      courseDocRef(uid, courseId),
      {
        ...summary,
        notesRead: deleteField(),
        practice: deleteField(),
        wrong: deleteField(),
      },
      { merge: true },
    ),
  ]).then(() => undefined);
}

export function saveNoteProgress(
  uid: string,
  courseId: string,
  noteId: string,
  read: boolean,
): Promise<void> {
  return setDoc(noteDocRef(uid, courseId, noteId), { read, updatedAt: Date.now() });
}

export function deleteNoteProgress(uid: string, courseId: string, noteId: string): Promise<void> {
  return deleteDoc(noteDocRef(uid, courseId, noteId));
}

export function savePracticeProgress(
  uid: string,
  courseId: string,
  setId: string,
  state: PracticeState,
): Promise<void> {
  return setDoc(practiceDocRef(uid, courseId, setId), { ...state, updatedAt: Date.now() });
}

export function deletePracticeProgress(uid: string, courseId: string, setId: string): Promise<void> {
  return deleteDoc(practiceDocRef(uid, courseId, setId));
}

export function saveExamProgress(
  uid: string,
  courseId: string,
  examId: string,
  state: ExamProgressState,
): Promise<void> {
  return setDoc(examDocRef(uid, courseId, examId), { ...state, updatedAt: Date.now() });
}

export function deleteExamProgress(uid: string, courseId: string, examId: string): Promise<void> {
  return deleteDoc(examDocRef(uid, courseId, examId));
}

export function saveWrongProgress(
  uid: string,
  courseId: string,
  questionId: string,
  count: number,
): Promise<void> {
  return setDoc(wrongDocRef(uid, courseId, questionId), { count, updatedAt: Date.now() });
}

export function deleteWrongProgress(uid: string, courseId: string, questionId: string): Promise<void> {
  return deleteDoc(wrongDocRef(uid, courseId, questionId));
}

/** Writes one exam attempt as its own document. Attempts are append-only — never edited. */
export function saveAttempt(uid: string, courseId: string, attempt: Attempt): Promise<void> {
  return setDoc(attemptDocRef(uid, courseId, attempt.id), attempt);
}

/** Deletes one recorded attempt. */
export function deleteAttempt(uid: string, courseId: string, attemptId: string): Promise<void> {
  return deleteDoc(attemptDocRef(uid, courseId, attemptId));
}
