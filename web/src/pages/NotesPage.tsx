import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from '../components/Markdown';
import { Button, ButtonLink, EmptyState } from '../components/ui';
import { getPhase } from '../lib/content';
import { useProgress } from '../lib/progress';
import { slugify } from '../lib/slug';

/** Builds the outline from level-2 headings, skipping headings inside code blocks. */
function useOutline(markdown: string) {
  return useMemo(() => {
    const items: { text: string; slug: string }[] = [];
    let inFence = false;
    for (const line of markdown.split('\n')) {
      if (line.trimStart().startsWith('```')) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;
      const m = line.match(/^##\s+(.*)$/);
      if (!m) continue;
      const text = m[1].replace(/[*`]/g, '').trim();
      items.push({ text, slug: slugify(text) });
    }
    return items;
  }, [markdown]);
}

export default function NotesPage() {
  const { phaseId, noteId } = useParams();
  const phase = getPhase(phaseId);
  const note = phase?.notes.find((n) => n.id === noteId) ?? phase?.notes[0];
  const { progress, markNoteRead } = useProgress();
  const outline = useOutline(note?.markdown ?? '');

  if (!phase || !note) {
    return (
      <EmptyState
        title="Chưa có nội dung"
        description="Phần notes của phase này chưa được soạn xong. Chạy lại npm run content sau khi file markdown xuất hiện."
      />
    );
  }

  const read = Boolean(progress.notesRead[note.id]);

  return (
    <div className="mx-auto flex max-w-6xl gap-10">
      <article className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-amber-500 uppercase">
              Phase {phase.order} · {phase.weight}% đề thi
            </p>
            <h1 className="mt-1 text-xl font-bold text-white">
              {phase.title} — {note.title}
            </h1>
          </div>
          <Button tone={read ? 'secondary' : 'primary'} onClick={() => markNoteRead(note.id, !read)}>
            {read ? '✓ Đã đọc' : 'Đánh dấu đã đọc'}
          </Button>
        </div>

        <Markdown className="md-scroll">{note.markdown}</Markdown>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-800 pt-6">
          {phase.notes
            .filter((n) => n.id !== note.id)
            .map((other) => (
              <ButtonLink
                key={other.id}
                to={`/phase/${phase.id}/notes/${other.id}`}
                tone="secondary"
              >
                {other.title}
              </ButtonLink>
            ))}
          {phase.practice && (
            <ButtonLink to={`/phase/${phase.id}/practice`}>
              Sang luyện tập ({phase.practice.questions.length} câu) →
            </ButtonLink>
          )}
        </div>
      </article>

      {outline.length > 2 && (
        <nav className="sticky top-[89px] hidden h-fit max-h-[calc(100vh-140px)] w-56 shrink-0 overflow-y-auto xl:block">
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">Trong bài</p>
          <ul className="space-y-1 border-l border-slate-800">
            {outline.map((item) => (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  className="block border-l-2 border-transparent py-1 pl-3 text-xs text-slate-400 transition-colors hover:border-amber-500 hover:text-amber-300"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
