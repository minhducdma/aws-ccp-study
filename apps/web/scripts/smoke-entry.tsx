import { MotionProvider } from '@study/ui';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { courses } from '../src/lib/content';
import { courseUrl } from '../src/lib/course';

export function routes(): string[] {
  const list = ['/'];
  for (const course of courses) {
    const url = (path = '') => courseUrl(course.id, path);
    list.push(url());
    // A planned course has no material, so the layout redirects back to the catalog.
    if (course.status !== 'available') continue;

    list.push(url('/review'));
    for (const phase of course.phases) {
      for (const note of phase.notes) list.push(url(`/phase/${phase.id}/notes/${note.id}`));
      if (phase.practice) list.push(url(`/phase/${phase.id}/practice`));
      if (phase.gateQuiz) list.push(url(`/exam/${phase.gateQuiz.id}`));
    }
    for (const mock of course.mockExams) list.push(url(`/exam/${mock.id}`));
  }
  return list;
}

/** Mirrors the provider stack in main.tsx, otherwise the `m` components throw. */
export function render(route: string): string {
  return renderToString(
    <MotionProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </MotionProvider>,
  );
}
