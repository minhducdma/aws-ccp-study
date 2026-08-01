import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Badge,
  Button,
  ButtonLink,
  Card,
  ConfirmDialog,
  EmptyState,
  MissingArt,
  Progress,
  RotateIcon,
  m,
} from '@study/ui';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useI18n } from '../i18n';
import { getPhase, isCorrect } from '../lib/content';
import { useCourse } from '../lib/course';
import { useProgress } from '../lib/progress';
import type { Letter } from '../types';

export default function PracticePage() {
  const { phaseId } = useParams();
  const { t, tNode, localized } = useI18n();
  const { course, url } = useCourse();
  const phase = getPhase(course, phaseId);
  const { progress, savePractice, resetPractice, recordWrong, clearWrong } = useProgress(course);
  const [showGrid, setShowGrid] = useState(false);

  if (!phase?.practice) {
    return (
      <EmptyState
        illustration={<MissingArt label={t('art.missing')} />}
        title={t('practice.emptyTitle')}
        description={t('practice.emptyDescription')}
      />
    );
  }

  const setId = phase.practice.id;
  const questions = phase.practice.questions;
  const state = progress.practice[setId] ?? { index: 0, answers: {}, checked: [] };
  const index = Math.min(state.index, questions.length - 1);
  const question = questions[index];
  const selected = state.answers[question.id] ?? [];
  const checked = state.checked.includes(question.id);

  const correctCount = state.checked.filter((id) => {
    const q = questions.find((item) => item.id === id);
    return q ? isCorrect(q, state.answers[id]) : false;
  }).length;

  const toggle = (letter: Letter) => {
    const next = question.multi
      ? selected.includes(letter)
        ? selected.filter((l) => l !== letter)
        : [...selected, letter]
      : [letter];
    savePractice(setId, { answers: { ...state.answers, [question.id]: next } });
  };

  const check = () => {
    savePractice(setId, { checked: [...new Set([...state.checked, question.id])] });
    if (isCorrect(question, selected)) clearWrong(question.id);
    else recordWrong([question.id]);
  };

  const goTo = (nextIndex: number) => {
    savePractice(setId, { index: Math.max(0, Math.min(questions.length - 1, nextIndex)) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="amber">{t('practice.badge', { order: phase.order })}</Badge>
          <Badge tone="sky">{localized(phase.title)}</Badge>
          <span className="ml-auto text-sm text-slate-500">
            {tNode(
              'practice.checkedSummary',
              { checked: state.checked.length },
              {
                correct: <span className="font-semibold text-emerald-400">{correctCount}</span>,
              },
            )}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Progress
            value={state.checked.length}
            max={questions.length}
            label={t('practice.progressLabel', { order: phase.order })}
          />
          <span className="shrink-0 text-xs text-slate-500">
            {state.checked.length}/{questions.length}
          </span>
        </div>
      </header>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          {t('common.questionPosition', { index: index + 1, total: questions.length })}
        </span>
        <div className="flex gap-2">
          <Button
            tone="ghost"
            size="sm"
            onClick={() => setShowGrid((v) => !v)}
            aria-expanded={showGrid}
            aria-controls="practice-grid"
          >
            {showGrid ? t('practice.hideGrid') : t('practice.showGrid')}
          </Button>
          <ConfirmDialog
            trigger={
              <Button tone="ghost" size="sm" icon={<RotateIcon width={14} height={14} />}>
                {t('practice.restart')}
              </Button>
            }
            title={t('practice.restartTitle')}
            description={t('practice.restartDescription', { count: state.checked.length })}
            confirmLabel={t('common.retry')}
            cancelLabel={t('common.cancel')}
            onConfirm={() => resetPractice(setId)}
          />
        </div>
      </div>

      {showGrid && (
        <m.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <Card inset="sm">
            <nav id="practice-grid" aria-label={t('practice.gridLabel')} className="grid grid-cols-8 gap-1.5 sm:grid-cols-12">
              {questions.map((q, i) => {
                const done = state.checked.includes(q.id);
                const ok = done && isCorrect(q, state.answers[q.id]);
                const status = done
                  ? ok
                    ? ('practice.gridCorrect' as const)
                    : ('practice.gridWrong' as const)
                  : ('practice.gridTodo' as const);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === index ? 'true' : undefined}
                    aria-label={t(status, { number: i + 1 })}
                    className={`focus-ring h-8 rounded-md text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                      i === index
                        ? 'bg-brand-500 text-slate-950'
                        : done
                          ? ok
                            ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </nav>
          </Card>
        </m.div>
      )}

      <m.div
        key={question.id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22 }}
      >
        <QuestionCard
          question={question}
          selected={selected}
          onToggle={checked ? undefined : toggle}
          revealed={checked}
        />
      </m.div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          tone="secondary"
          icon={<ArrowLeftIcon width={16} height={16} />}
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
        >
          {t('common.previousQuestion')}
        </Button>
        <div className="flex gap-2">
          {!checked ? (
            <Button onClick={check} disabled={selected.length === 0}>
              {t('practice.check')}
            </Button>
          ) : index < questions.length - 1 ? (
            <Button onClick={() => goTo(index + 1)}>
              {t('common.nextQuestion')}
              <ArrowRightIcon width={16} height={16} />
            </Button>
          ) : (
            phase.gateQuiz && (
              <ButtonLink to={url(`/exam/${phase.gateQuiz.id}`)}>
                {t('practice.toGateQuiz')}
                <ArrowRightIcon width={16} height={16} />
              </ButtonLink>
            )
          )}
        </div>
      </div>

      {state.checked.length === questions.length && phase.gateQuiz && (
        <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card inset="md" className="border-emerald-500/30 bg-emerald-500/5">
            <p className="font-semibold text-slate-900">
              {t('practice.doneHeading', {
                total: questions.length,
                correct: correctCount,
                percent: Math.round((correctCount / questions.length) * 100),
              })}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {correctCount / questions.length >= 0.8
                ? t('practice.doneReady')
                : t('practice.doneNotReady')}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink to={url(`/exam/${phase.gateQuiz.id}`)}>
                {t('practice.toGateQuiz')}
              </ButtonLink>
              <ButtonLink to={url('/review')} tone="secondary">
                {t('exam.toReview')}
              </ButtonLink>
            </div>
          </Card>
        </m.div>
      )}
    </div>
  );
}
