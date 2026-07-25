import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { content } from '../src/lib/content';

export function routes(): string[] {
  const list = ['/', '/review'];
  for (const phase of content.phases) {
    for (const note of phase.notes) list.push(`/phase/${phase.id}/notes/${note.id}`);
    if (phase.practice) list.push(`/phase/${phase.id}/practice`);
    if (phase.gateQuiz) list.push(`/exam/${phase.gateQuiz.id}`);
  }
  for (const mock of content.mockExams) list.push(`/exam/${mock.id}`);
  return list;
}

export function render(route: string): string {
  return renderToString(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}
