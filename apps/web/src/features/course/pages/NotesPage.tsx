import {
  ArrowRightIcon,
  Button,
  ButtonLink,
  Card,
  CheckIcon,
  EmptyState,
  MissingArt,
  ScrollProgress,
} from '@study/ui';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from '../components/Markdown';
import { isLocale, useI18n, type MessageKey } from '../../../i18n';
import { getPhase } from '../content';
import { useCourse } from '../context';
import { useProgress } from '../progress';
import { slugify } from '../../../utils/slug';

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
  const { t, locale, localized, localizedWithLocale } = useI18n();
  const { course, url } = useCourse();
  const phase = getPhase(course, phaseId);
  const note = phase?.notes.find((n) => n.id === noteId) ?? phase?.notes[0];
  const { progress, markNoteRead } = useProgress(course);
  const body = localizedWithLocale(note?.markdown);
  const outline = useOutline(body?.text ?? '');

  if (!phase || !note || !body) {
    return (
      <EmptyState
        illustration={<MissingArt label={t('art.missing')} />}
        title={t('notes.emptyTitle')}
        description={t('notes.emptyDescription')}
      />
    );
  }

  const read = Boolean(progress.notesRead[note.id]);
  const notesRead = phase.notes.filter((entry) => progress.notesRead[entry.id]).length;
  const notesPercent = Math.round((notesRead / phase.notes.length) * 100);
  // Notes are translated file by file, so a page may exist in one language and not another.
  const untranslated = body.locale !== locale && isLocale(body.locale);

  return (
    <div className="mx-auto flex max-w-6xl gap-10">
      <ScrollProgress />

      <article className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">
              {t('notes.eyebrow', { order: phase.order, weight: phase.weight })}
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-900">
              {t('notes.heading', { phase: localized(phase.title), note: localized(note.title) })}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 tabular-nums">
              {notesRead}/{phase.notes.length} · {notesPercent}%
            </span>
            <Button
              tone={read ? 'pass' : 'primary'}
              icon={read ? <CheckIcon width={16} height={16} /> : undefined}
              onClick={() => markNoteRead(note.id, !read)}
            >
              {read ? t('notes.read') : t('notes.markRead')}
            </Button>
          </div>
        </div>

        {untranslated && (
          <Card inset="sm" className="mb-6 border-brand-500/30 bg-brand-500/5 text-sm text-slate-600">
            {t('notes.untranslated', {
              language: t(`language.${locale}` as MessageKey),
              original: t(`language.${body.locale}` as MessageKey),
            })}
          </Card>
        )}

        <Markdown className="md-scroll" lang={untranslated ? body.locale : undefined}>
          {body.text}
        </Markdown>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
          {phase.notes
            .filter((n) => n.id !== note.id)
            .map((other) => (
              <ButtonLink
                key={other.id}
                to={url(`/phase/${phase.id}/notes/${other.id}`)}
                tone="secondary"
              >
                {localized(other.title)}
              </ButtonLink>
            ))}
          {phase.practice && (
            <ButtonLink to={url(`/phase/${phase.id}/practice`)}>
              {t('notes.toPractice', { count: phase.practice.questions.length })}
              <ArrowRightIcon width={16} height={16} />
            </ButtonLink>
          )}
        </div>
      </article>

      {outline.length > 2 && (
        <nav
          aria-label={t('notes.outline')}
          className="sticky top-[89px] hidden h-fit max-h-[calc(100vh-140px)] w-56 shrink-0 overflow-y-auto xl:block"
        >
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            {t('notes.inThisPage')}
          </p>
          <ul className="space-y-1 border-l border-line">
            {outline.map((item) => (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  className="focus-ring block rounded-r-lg border-l-2 border-transparent px-3 py-1.5 text-sm font-medium leading-snug text-slate-600 transition-colors duration-200 hover:border-brand-600 hover:bg-surface-hover hover:text-brand-700"
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
