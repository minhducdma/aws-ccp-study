import { useCallback, useEffect, useState } from 'react';
import type { Attempt, Letter, PracticeState, Progress } from '../types';
import { isCorrect, lookupQuestion } from './content';

const STORAGE_KEY = 'aws-ccp-progress-v1';

const emptyProgress: Progress = {
  notesRead: {},
  practice: {},
  attempts: [],
  wrong: {},
  freeMode: false,
};

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    return { ...emptyProgress, ...(JSON.parse(raw) as Progress) };
  } catch {
    return emptyProgress;
  }
}

let state: Progress = typeof localStorage === 'undefined' ? emptyProgress : load();
const listeners = new Set<() => void>();

function commit(next: Progress) {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Bỏ qua khi localStorage bị chặn (private mode).
  }
  listeners.forEach((fn) => fn());
}

export function useProgress() {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const listener = () => forceRender((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const markNoteRead = useCallback((noteId: string, read = true) => {
    commit({ ...state, notesRead: { ...state.notesRead, [noteId]: read } });
  }, []);

  const savePractice = useCallback((setId: string, patch: Partial<PracticeState>) => {
    const current: PracticeState = state.practice[setId] ?? { index: 0, answers: {}, checked: [] };
    commit({
      ...state,
      practice: { ...state.practice, [setId]: { ...current, ...patch } },
    });
  }, []);

  const recordWrong = useCallback((questionIds: string[]) => {
    if (questionIds.length === 0) return;
    const wrong = { ...state.wrong };
    for (const id of questionIds) wrong[id] = (wrong[id] ?? 0) + 1;
    commit({ ...state, wrong });
  }, []);

  const clearWrong = useCallback((questionId: string) => {
    const wrong = { ...state.wrong };
    delete wrong[questionId];
    commit({ ...state, wrong });
  }, []);

  const saveAttempt = useCallback((attempt: Attempt) => {
    const wrong = { ...state.wrong };
    for (const [questionId, selected] of Object.entries(attempt.answers)) {
      const entry = lookupQuestion(questionId);
      if (entry && !isCorrect(entry.question, selected)) {
        wrong[questionId] = (wrong[questionId] ?? 0) + 1;
      }
    }
    commit({ ...state, attempts: [...state.attempts, attempt], wrong });
  }, []);

  const setFreeMode = useCallback((freeMode: boolean) => {
    commit({ ...state, freeMode });
  }, []);

  const resetAll = useCallback(() => {
    commit({ ...emptyProgress });
  }, []);

  const resetPractice = useCallback((setId: string) => {
    const practice = { ...state.practice };
    delete practice[setId];
    commit({ ...state, practice });
  }, []);

  return {
    progress: state,
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

export function bestAttempt(progress: Progress, examId: string): Attempt | undefined {
  return progress.attempts
    .filter((a) => a.examId === examId)
    .sort((a, b) => b.score - a.score)[0];
}

export function attemptsFor(progress: Progress, examId: string): Attempt[] {
  return progress.attempts.filter((a) => a.examId === examId).sort((a, b) => b.startedAt - a.startedAt);
}

export function hasPassed(progress: Progress, examId: string | undefined): boolean {
  if (!examId) return false;
  return progress.attempts.some((a) => a.examId === examId && a.passed);
}

export type AnswerMap = Record<string, Letter[]>;
