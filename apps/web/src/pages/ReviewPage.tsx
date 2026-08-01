import {
  AllClearArt,
  Badge,
  Button,
  ButtonLink,
  CheckIcon,
  EmptyState,
  RotateIcon,
  fadeUp,
  m,
  stagger,
} from '@study/ui';
import { useMemo, useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import { useI18n } from '../i18n';
import { isCorrect, lookupQuestion, originLabel } from '../lib/content';
import { useCourse } from '../lib/course';
import { useProgress } from '../lib/progress';
import type { Letter } from '../types';

export default function ReviewPage() {
  const i18n = useI18n();
  const { t } = i18n;
  const { course, url } = useCourse();
  const { progress, clearWrong, recordWrong } = useProgress(course);
  const [attempts, setAttempts] = useState<Record<string, Letter[]>>({});
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const items = useMemo(
    () =>
      Object.entries(progress.wrong)
        .map(([id, times]) => ({ ...lookupQuestion(course, id), id, times }))
        .filter((item) => item.question)
        .sort((a, b) => b.times - a.times),
    [course, progress.wrong],
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <EmptyState
          illustration={<AllClearArt label={t('art.allClear')} />}
          title={t('review.emptyTitle')}
          description={t('review.emptyDescription')}
          action={<ButtonLink to={url()}>{t('exam.toOverview')}</ButtonLink>}
        />
      </div>
    );
  }

  const toggle = (questionId: string, letter: Letter, multi: boolean) => {
    setAttempts((prev) => {
      const current = prev[questionId] ?? [];
      const next = multi
        ? current.includes(letter)
          ? current.filter((l) => l !== letter)
          : [...current, letter]
        : [letter];
      return { ...prev, [questionId]: next };
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <Badge tone="red">{t('review.badge')}</Badge>
        <h1 className="mt-3 text-2xl font-bold text-white">
          {t('review.heading', { count: items.length })}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">{t('review.intro')}</p>
      </header>

      <m.div
        className="space-y-4"
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.02 }}
      >
        {items.map((item) => {
          const question = item.question!;
          const selected = attempts[item.id] ?? [];
          const isRevealed = revealed.has(item.id);

          return (
            <m.div key={item.id} variants={fadeUp} className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500">
                  {item.origin && originLabel(item.origin, i18n)}
                </span>
                <Badge tone="red">{t('review.timesWrong', { count: item.times })}</Badge>
              </div>

              <QuestionCard
                question={question}
                selected={selected}
                onToggle={isRevealed ? undefined : (letter) => toggle(item.id, letter, question.multi)}
                revealed={isRevealed}
              />

              <div className="flex flex-wrap gap-2">
                {!isRevealed ? (
                  <Button
                    size="sm"
                    disabled={selected.length === 0}
                    onClick={() => {
                      setRevealed((prev) => new Set(prev).add(item.id));
                      if (isCorrect(question, selected)) clearWrong(item.id);
                      else recordWrong([item.id]);
                    }}
                  >
                    {t('common.check')}
                  </Button>
                ) : (
                  <>
                    <Button
                      tone="secondary"
                      size="sm"
                      icon={<RotateIcon width={14} height={14} />}
                      onClick={() =>
                        setRevealed((prev) => {
                          const next = new Set(prev);
                          next.delete(item.id);
                          return next;
                        })
                      }
                    >
                      {t('review.tryAgain')}
                    </Button>
                    <Button
                      tone="ghost"
                      size="sm"
                      icon={<CheckIcon width={14} height={14} />}
                      onClick={() => clearWrong(item.id)}
                    >
                      {t('review.markKnown')}
                    </Button>
                  </>
                )}
              </div>
            </m.div>
          );
        })}
      </m.div>
    </div>
  );
}
