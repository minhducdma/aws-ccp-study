import { createContext, useContext } from 'react';
import type { Course } from '../types';

export interface CourseContextValue {
  course: Course;
  /** Builds a path inside the active course: url('/practice') -> /course/<id>/practice */
  url: (path?: string) => string;
}

export const CourseContext = createContext<CourseContextValue | null>(null);

export function useCourse(): CourseContextValue {
  const value = useContext(CourseContext);
  if (!value) throw new Error('useCourse must be called inside CourseLayout.');
  return value;
}

export function courseUrl(courseId: string, path = ''): string {
  return `/course/${courseId}${path}`;
}
