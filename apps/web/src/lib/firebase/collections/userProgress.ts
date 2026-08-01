import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  type QuerySnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import type { Attempt, CourseProgressFields } from '../../../types';
import { db } from '../config';

/**
 * The `userProgress` collection, one document per signed-in user (keyed by uid):
 *
 *   userProgress/{uid}/courses/{courseId}                     — CourseProgressFields
 *   userProgress/{uid}/courses/{courseId}/attempts/{attemptId} — one document per exam attempt
 *
 * Splitting attempts into their own subcollection means ticking a checkbox or answering one
 * practice question only rewrites the small course document, never the whole exam history.
 * This module is only the read/write boundary for the collection — merging local, remote and
 * guest data is `lib/progress.ts`'s job.
 */

export function coursesCollectionRef(uid: string) {
  return collection(db, 'userProgress', uid, 'courses');
}

export function courseDocRef(uid: string, courseId: string) {
  return doc(db, 'userProgress', uid, 'courses', courseId);
}

export function attemptsCollectionRef(uid: string, courseId: string) {
  return collection(db, 'userProgress', uid, 'courses', courseId, 'attempts');
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

/** Overwrites one course's fields document (never includes attempts). */
export function saveCourseFields(
  uid: string,
  courseId: string,
  fields: CourseProgressFields,
): Promise<void> {
  return setDoc(courseDocRef(uid, courseId), fields);
}

/** Writes one exam attempt as its own document. Attempts are append-only — never edited. */
export function saveAttempt(uid: string, courseId: string, attempt: Attempt): Promise<void> {
  return setDoc(attemptDocRef(uid, courseId, attempt.id), attempt);
}

/** Deletes one recorded attempt. */
export function deleteAttempt(uid: string, courseId: string, attemptId: string): Promise<void> {
  return deleteDoc(attemptDocRef(uid, courseId, attemptId));
}
