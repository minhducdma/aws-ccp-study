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
  RetryArt,
  StatTile,
  SummitArt,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  fadeUp,
  m,
  stagger,
} from '@study/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useI18n } from '../i18n';
import { domainLabel, formatDuration, getExam, isCorrect } from '../lib/content';
import { useCourse } from '../lib/course';
import { attemptsFor, hasPassed, useProgress } from '../lib/progress';
import type { Attempt, Course, Letter, Question } from '../types';

type Stage = 'intro' | 'running' | 'result';

export default function ExamPage() {
  const { examId } = useParams();
  const i18n = useI18n();
  const { t } = i18n;
  const { course } = useCourse();
  const exam = getExam(course, examId, i18n);
  const { progress, saveAttempt } = useProgress(course);

  const [stage, setStage] = useState<Stage>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Letter[]>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [startedAt, setStartedAt] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [result, setResult] = useState<Attempt | null>(null);

  const submit = useCallback(
    (finalAnswers: Record<string, Letter[]>) => {
      if (!exam) return;
      const score = exam.questions.filter((q) => isCorrect(q, finalAnswers[q.id])).length;
      const attempt: Attempt = {
        id: `${exam.id}-${Date.now()}`,
        examId: exam.id,
        kind: exam.kind,
        // Kept for older entries that were saved before the label was derived at render time.
        label: exam.label,
        startedAt,
        finishedAt: Date.now(),
        score,
        total: exam.questions.length,
        passScore: exam.passScore,
        passed: score >= exam.passScore,
        answers: finalAnswers,
      };
      saveAttempt(attempt);
      setResult(attempt);
      setStage('result');
      window.scrollTo({ top: 0 });
    },
    [exam, saveAttempt, startedAt],
  );

  useEffect(() => {
    if (stage !== 'running') return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === 'running' && deadline > 0 && now >= deadline) submit(answers);
  }, [stage, deadline, now, answers, submit]);

  if (!exam) {
    return (
      <EmptyState
        illustration={<MissingArt label={t('art.missing')} />}
        title={t('exam.emptyTitle')}
        description={t('exam.emptyDescription')}
      />
    );
  }

  const { questions, passScore, timeLimitMin, label, kind } = exam;
  const history = attemptsFor(progress, exam.id);
  const previousPass = hasPassed(progress, exam.id);

  const start = () => {
    const ts = Date.now();
    setAnswers({});
    setFlagged(new Set());
    setIndex(0);
    setStartedAt(ts);
    setDeadline(ts + timeLimitMin * 60_000);
    setNow(ts);
    setResult(null);
    setStage('running');
    window.scrollTo({ top: 0 });
  };

  if (stage === 'intro') {
    return (
      <ExamIntro
        label={label}
        kind={kind}
        total={questions.length}
        passScore={passScore}
        timeLimitMin={timeLimitMin}
        previousPass={previousPass}
        history={history}
        onStart={start}
      />
    );
  }

  if (stage === 'result' && result) {
    return (
      <ExamResult
        course={course}
        exam={{ ...exam, questions }}
        attempt={result}
        onRetry={start}
      />
    );
  }

  const question = questions[index];
  const selected = answers[question.id] ?? [];
  const answeredCount = questions.filter((q) => (answers[q.id]?.length ?? 0) > 0).length;
  const unanswered = questions.length - answeredCount;
  const remaining = deadline - now;
  const urgent = remaining < 5 * 60_000;

  const toggle = (letter: Letter) => {
    setAnswers((prev) => {
      const current = prev[question.id] ?? [];
      const next = question.multi
        ? current.includes(letter)
          ? current.filter((l) => l !== letter)
          : [...current, letter]
        : [letter];
      return { ...prev, [question.id]: next };
    });
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  };

  const submitDialog = (trigger: React.ReactNode) => (
    <ConfirmDialog
      trigger={trigger}
      title={t('exam.submitTitle')}
      description={
        unanswered > 0 ? t('exam.submitUnanswered', { count: unanswered }) : t('exam.submitComplete')
      }
      confirmLabel={t('exam.submit')}
      cancelLabel={t('common.cancel')}
      tone={unanswered > 0 ? 'danger' : 'primary'}
      onConfirm={() => submit(answers)}
    />
  );

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="sticky top-[57px] z-10 -mx-4 border-b border-line bg-canvas/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={kind === 'mock' ? 'sky' : 'amber'}>{label}</Badge>
          <span
            role="timer"
            aria-live={urgent ? 'polite' : 'off'}
            aria-label={t('exam.timeRemaining', { time: formatDuration(remaining) })}
            className={`ml-auto font-mono text-lg font-bold tabular-nums transition-colors ${
              urgent ? 'animate-pulse text-rose-400' : 'text-white'
            }`}
          >
            {formatDuration(remaining)}
          </span>
          {submitDialog(
            <Button tone="secondary" size="sm">
              {t('exam.submit')}
            </Button>,
          )}
        </div>
        <div className="mt-2 flex items-center gap-3">
          <Progress
            value={answeredCount}
            max={questions.length}
            label={t('exam.answeredLabel')}
          />
          <span className="shrink-0 text-xs text-slate-500">
            {t('exam.answeredCount', { answered: answeredCount, total: questions.length })}
          </span>
        </div>
      </header>

      <Card inset="sm">
        <nav
          aria-label={t('exam.questionListLabel')}
          className="grid grid-cols-8 gap-1.5 sm:grid-cols-12 lg:grid-cols-[repeat(15,minmax(0,1fr))]"
        >
          {questions.map((q, i) => {
            const answered = (answers[q.id]?.length ?? 0) > 0;
            const isFlagged = flagged.has(q.id);
            const status = isFlagged
              ? answered
                ? ('exam.gridAnsweredFlagged' as const)
                : ('exam.gridUnansweredFlagged' as const)
              : answered
                ? ('exam.gridAnswered' as const)
                : ('exam.gridUnanswered' as const);
            return (
              <button
                key={q.id}
                type="button"
                aria-current={i === index ? 'true' : undefined}
                aria-label={t(status, { number: i + 1 })}
                onClick={() => {
                  setIndex(i);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`focus-ring relative h-8 rounded-md text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                  i === index
                    ? 'bg-brand-500 text-slate-950'
                    : answered
                      ? 'bg-slate-700 text-white hover:bg-slate-600'
                      : 'bg-slate-800/60 text-slate-500 hover:bg-slate-800'
                }`}
              >
                {i + 1}
                {isFlagged && (
                  <span className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-sky-400" />
                )}
              </button>
            );
          })}
        </nav>
      </Card>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          {t('common.questionPosition', { index: index + 1, total: questions.length })}
        </span>
        <Button tone="ghost" size="sm" onClick={toggleFlag} title={t('exam.flagHint')}>
          {flagged.has(question.id) ? t('exam.unflag') : t('exam.flag')}
        </Button>
      </div>

      {/* Keyed on the question so each one slides in; no exit animation, which would
          add a delay to every navigation in a timed exam. */}
      <m.div
        key={question.id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22 }}
      >
        <QuestionCard question={question} selected={selected} onToggle={toggle} />
      </m.div>

      <div className="flex items-center justify-between gap-3">
        <Button
          tone="secondary"
          icon={<ArrowLeftIcon width={16} height={16} />}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          {t('common.previousQuestion')}
        </Button>
        {index < questions.length - 1 ? (
          <Button onClick={() => setIndex((i) => i + 1)}>
            {t('common.nextQuestion')}
            <ArrowRightIcon width={16} height={16} />
          </Button>
        ) : (
          submitDialog(<Button>{t('exam.submit')}</Button>)
        )}
      </div>
    </div>
  );
}

function ExamIntro({
  label,
  kind,
  total,
  passScore,
  timeLimitMin,
  previousPass,
  history,
  onStart,
}: {
  label: string;
  kind: 'gate' | 'mock';
  total: number;
  passScore: number;
  timeLimitMin: number;
  previousPass: boolean;
  history: Attempt[];
  onStart: () => void;
}) {
  const { t, formatDateTime } = useI18n();

  return (
    <m.div
      className="mx-auto max-w-2xl space-y-6"
      variants={stagger(0.07)}
      initial="hidden"
      animate="visible"
    >
      <m.header variants={fadeUp}>
        <Badge tone={kind === 'mock' ? 'sky' : 'amber'}>
          {t(kind === 'mock' ? 'exam.kindMock' : 'exam.kindGate')}
        </Badge>
        <h1 className="mt-3 text-2xl font-bold text-white">{label}</h1>
        {previousPass && <p className="mt-2 text-sm text-emerald-400">{t('exam.alreadyPassed')}</p>}
      </m.header>

      <m.div variants={fadeUp} className="grid gap-3 sm:grid-cols-3">
        <StatTile label={t('exam.statQuestions')} value={total} animate />
        <StatTile
          label={t('exam.statTime')}
          value={t('exam.statTimeValue', { minutes: timeLimitMin })}
        />
        <StatTile
          label={t('exam.statNeeded')}
          value={`≥${passScore}`}
          hint={`${Math.round((passScore / total) * 100)}%`}
        />
      </m.div>

      <m.div variants={fadeUp}>
        <Card inset="md">
          <p className="mb-3 text-sm font-semibold text-white">{t('exam.rulesTitle')}</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>· {t('exam.rule.timer')}</li>
            <li>· {t('exam.rule.noFeedback')}</li>
            <li>· {t('exam.rule.guess')}</li>
            <li>· {t('exam.rule.multi')}</li>
            <li>· {t('exam.rule.doNotClose', { minutes: timeLimitMin })}</li>
          </ul>
        </Card>
      </m.div>

      <m.div variants={fadeUp}>
        <Button onClick={onStart} size="lg" block>
          {t('exam.start')}
        </Button>
      </m.div>

      {history.length > 0 && (
        <m.div variants={fadeUp}>
          <Card inset="md">
            <p className="mb-3 text-sm font-semibold text-white">{t('exam.historyTitle')}</p>
            <div className="space-y-2">
              {history.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between border-b border-line pb-2 text-sm last:border-0 last:pb-0"
                >
                  <span className="text-slate-400">
                    {formatDateTime(attempt.startedAt)}
                    <span className="ml-2 text-xs text-slate-600">
                      {formatDuration(attempt.finishedAt - attempt.startedAt)}
                    </span>
                  </span>
                  <span className={attempt.passed ? 'text-emerald-400' : 'text-rose-400'}>
                    {attempt.score}/{attempt.total}{' '}
                    {t(attempt.passed ? 'exam.historyPass' : 'exam.historyFail')}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </m.div>
      )}
    </m.div>
  );
}

function ExamResult({
  course,
  exam,
  attempt,
  onRetry,
}: {
  course: Course;
  exam: {
    id: string;
    label: string;
    kind: 'gate' | 'mock';
    questions: Question[];
    passScore: number;
  };
  attempt: Attempt;
  onRetry: () => void;
}) {
  const i18n = useI18n();
  const { t } = i18n;
  const { url } = useCourse();

  const byDomain = useMemo(() => {
    const map = new Map<number, { total: number; correct: number }>();
    for (const q of exam.questions) {
      if (q.domain == null) continue;
      const entry = map.get(q.domain) ?? { total: 0, correct: 0 };
      entry.total += 1;
      if (isCorrect(q, attempt.answers[q.id])) entry.correct += 1;
      map.set(q.domain, entry);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [exam.questions, attempt.answers]);

  const wrongQuestions = exam.questions.filter((q) => !isCorrect(q, attempt.answers[q.id]));
  const pct = Math.round((attempt.score / attempt.total) * 100);
  const currentOrder = course.phases.find((p) => p.gateQuiz?.id === exam.id)?.order ?? 0;
  const nextPhase = course.phases.find((p) => p.order === currentOrder + 1);

  const reviewList = (questions: Question[]) =>
    questions.length === 0 ? (
      <Card inset="lg" className="text-center text-sm text-slate-400">
        {t('exam.nothingWrong')}
      </Card>
    ) : (
      <div className="space-y-4">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selected={attempt.answers[q.id] ?? []}
            revealed
            label={t('common.questionNumber', { number: exam.questions.indexOf(q) + 1 })}
          />
        ))}
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <m.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
        <Card
          inset="lg"
          className={`flex flex-col items-center text-center ${
            attempt.passed
              ? 'border-emerald-500/40 bg-emerald-500/5'
              : 'border-rose-500/40 bg-rose-500/5'
          }`}
        >
          {attempt.passed ? (
            <SummitArt label={t('art.passed')} />
          ) : (
            <RetryArt label={t('art.failed')} />
          )}

          <p className="mt-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {exam.label}
          </p>
          <p className="mt-3 text-5xl font-bold text-white tabular-nums">
            {attempt.score}
            <span className="text-2xl text-slate-500">/{attempt.total}</span>
          </p>
          <p
            className={`mt-2 text-lg font-semibold ${
              attempt.passed ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {t('exam.resultScore', {
              percent: pct,
              verdict: t(attempt.passed ? 'exam.resultPassed' : 'exam.resultFailed'),
            })}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {t('exam.resultNeeded', {
              passScore: attempt.passScore,
              total: attempt.total,
              duration: formatDuration(attempt.finishedAt - attempt.startedAt),
            })}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button tone="secondary" onClick={onRetry}>
              {t('common.retry')}
            </Button>
            {attempt.passed && exam.kind === 'gate' && nextPhase?.ready && (
              <ButtonLink to={url(`/phase/${nextPhase.id}/notes/${nextPhase.notes[0]?.id ?? ''}`)}>
                {t('exam.toNextPhase', { order: nextPhase.order })}
                <ArrowRightIcon width={16} height={16} />
              </ButtonLink>
            )}
            {!attempt.passed && <ButtonLink to={url('/review')}>{t('exam.toReview')}</ButtonLink>}
            <ButtonLink to={url()} tone="ghost">
              {t('exam.toOverview')}
            </ButtonLink>
          </div>
        </Card>
      </m.div>

      {byDomain.length > 1 && (
        <Card inset="md">
          <p className="mb-4 text-sm font-semibold text-white">{t('exam.domainHeading')}</p>
          <div className="space-y-3">
            {byDomain.map(([domain, stat]) => {
              const ratio = stat.correct / stat.total;
              const row = t('exam.domainRow', {
                domain,
                label: domainLabel(course, domain, i18n),
              });
              return (
                <div key={domain}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{row}</span>
                    <span
                      className={
                        ratio >= 0.7
                          ? 'text-emerald-400'
                          : ratio >= 0.5
                            ? 'text-brand-400'
                            : 'text-rose-400'
                      }
                    >
                      {stat.correct}/{stat.total}
                    </span>
                  </div>
                  <Progress
                    value={stat.correct}
                    max={stat.total}
                    tone={ratio >= 0.7 ? 'green' : 'amber'}
                    label={row}
                  />
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-slate-500">{t('exam.domainHint')}</p>
        </Card>
      )}

      <div>
        <h2 className="mb-4 text-lg font-bold text-white">{t('exam.reviewHeading')}</h2>
        <Tabs defaultValue="wrong">
          <TabsList>
            <TabsTrigger value="wrong">
              {t('exam.tabWrong', { count: wrongQuestions.length })}
            </TabsTrigger>
            <TabsTrigger value="all">
              {t('exam.tabAll', { count: exam.questions.length })}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="wrong">{reviewList(wrongQuestions)}</TabsContent>
          <TabsContent value="all">{reviewList(exam.questions)}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
