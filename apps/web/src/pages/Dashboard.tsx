import {
  Badge,
  BookIcon,
  Button,
  ButtonLink,
  Card,
  CheckIcon,
  ConfirmDialog,
  FlameIcon,
  LockIcon,
  Progress,
  StudyBuddyArt,
  SummitArt,
  Switch,
  TargetIcon,
  TrophyIcon,
  fadeUp,
  m,
  stagger,
} from '@study/ui';
import { useI18n } from '../i18n';
import { mockExamTitle } from '../lib/content';
import { useCourse } from '../lib/course';
import { bestAttempt, hasPassed, useProgress } from '../lib/progress';

export default function Dashboard() {
  const i18n = useI18n();
  const { t, tNode, localized } = i18n;
  const { course, url } = useCourse();
  const { progress, setFreeMode, resetAll } = useProgress(course);

  const passedPhases = course.phases.filter((p) => hasPassed(progress, p.gateQuiz?.id));
  const readinessWeight = passedPhases.reduce((sum, p) => sum + p.weight, 0);
  const wrongCount = Object.keys(progress.wrong).length;
  const nextPhase = course.phases.find((p) => p.ready && !hasPassed(progress, p.gateQuiz?.id));

  const stats = [
    {
      label: t('dashboard.stat.readiness'),
      value: `${readinessWeight}%`,
      hint: t('catalog.phasesPassed', {
        passed: passedPhases.length,
        total: course.phases.length,
        count: course.phases.length,
      }),
      icon: <TargetIcon width={20} height={20} />,
      tone: 'bg-sky-200/45 text-sky-900',
    },
    {
      label: t('dashboard.stat.questions'),
      value: course.questionCount,
      hint: t('dashboard.stat.questionsHint'),
      icon: <BookIcon width={20} height={20} />,
      tone: 'bg-emerald-200/40 text-emerald-900',
    },
    {
      label: t('dashboard.stat.wrong'),
      value: wrongCount,
      hint: t('dashboard.stat.wrongHint'),
      icon: <FlameIcon width={20} height={20} />,
      tone: 'bg-rose-200/40 text-rose-900',
    },
    {
      label: t('dashboard.stat.passScore'),
      value: `${course.exam.passScore}/${course.exam.maxScore}`,
      hint: t('dashboard.stat.passScoreHint', {
        questions: course.exam.totalQuestions,
        minutes: course.exam.durationMin,
      }),
      icon: <TrophyIcon width={20} height={20} />,
      tone: 'bg-amber-200/45 text-amber-900',
    },
  ];

  const phaseTones = [
    'border-l-sky-400 bg-sky-50/40',
    'border-l-emerald-400 bg-emerald-50/40',
    'border-l-amber-400 bg-amber-50/40',
    'border-l-rose-400 bg-rose-50/40',
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <m.header
        className="relative grid min-h-[310px] overflow-hidden rounded-3xl border border-sky-300/60 bg-gradient-to-br from-sky-200/55 via-surface to-brand-200/45 px-6 py-7 sm:grid-cols-[1.1fr_0.9fr] sm:px-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative z-10 flex flex-col justify-center">
          <p className="text-xs font-bold tracking-widest text-brand-700 uppercase">
            {t('dashboard.eyebrow', { hours: course.estimatedHours, code: course.code })}
          </p>
          <h1 className="mt-2 max-w-xl text-3xl font-bold text-slate-900 sm:text-4xl">
            {localized(course.title)}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            {t('dashboard.intro', { count: course.phases.length })}
          </p>
          {nextPhase && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink
                to={
                  nextPhase.notes.length > 0 && !progress.notesRead[nextPhase.notes[0].id]
                    ? url(`/phase/${nextPhase.id}/notes/${nextPhase.notes[0].id}`)
                    : url(`/phase/${nextPhase.id}/practice`)
                }
              >
                {t('dashboard.next.cta')}
              </ButtonLink>
              <span className="text-xs font-semibold text-slate-600">
                {t('phase.labelWithTitle', {
                  order: nextPhase.order,
                  title: localized(nextPhase.title),
                })}
              </span>
            </div>
          )}
        </div>
        <StudyBuddyArt className="mx-auto mt-4 max-w-[360px] self-end sm:mt-0" label={t('art.studyBuddy')} />
      </m.header>

      <m.div
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        variants={stagger(0.07)}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
          <m.div key={stat.label} variants={fadeUp} className={`rounded-2xl p-4 ${stat.tone}`}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-bold tracking-wide uppercase opacity-75">{stat.label}</p>
              <span className="shrink-0 opacity-70">{stat.icon}</span>
            </div>
            <p className="mt-2 text-2xl font-black text-slate-900 tabular-nums">{stat.value}</p>
            <p className="mt-1 text-xs leading-snug opacity-75">{stat.hint}</p>
          </m.div>
        ))}
      </m.div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">
          {t('dashboard.phasesHeading', { count: course.phases.length })}
        </h2>
        <m.div
          className="space-y-3"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {course.phases.map((phase, phaseIndex) => {
            const previous = course.phases.find((p) => p.order === phase.order - 1);
            const locked =
              !progress.freeMode && previous ? !hasPassed(progress, previous.gateQuiz?.id) : false;
            const passed = hasPassed(progress, phase.gateQuiz?.id);
            const best = phase.gateQuiz ? bestAttempt(progress, phase.gateQuiz.id) : undefined;
            const practiceState = phase.practice ? progress.practice[phase.practice.id] : undefined;
            const practiceDone = practiceState?.checked.length ?? 0;
            const practiceTotal = phase.practice?.questions.length ?? 0;

            return (
              <m.div key={phase.id} variants={fadeUp}>
                <Card
                  inset="none"
                  className={`rounded-2xl border-l-4 p-3 sm:rounded-3xl sm:p-5 ${phaseTones[phaseIndex % phaseTones.length]} ${locked ? 'opacity-60' : ''}`}
                >
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5">
                    <div className="flex min-w-0 flex-1 gap-4">
                      <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-surface text-lg font-black text-slate-700 shadow-sm sm:flex">
                        {phase.order}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <Badge tone={passed ? 'green' : locked ? 'slate' : 'amber'}>
                          {t('phase.label', { order: phase.order })}
                        </Badge>
                        <Badge tone="sky">{t('phase.weightOfExam', { weight: phase.weight })}</Badge>
                        {passed && (
                          <Badge tone="green">
                            <CheckIcon width={12} height={12} />
                            {t('phase.passed')}
                          </Badge>
                        )}
                        {locked && (
                          <Badge tone="slate">
                            <LockIcon width={12} height={12} />
                            {t('phase.locked')}
                          </Badge>
                        )}
                        {!phase.ready && <Badge tone="slate">{t('phase.draft')}</Badge>}
                          </div>
                          <span className="shrink-0 rounded-lg bg-surface/70 px-2 py-1 text-xs font-bold text-slate-700 tabular-nums">
                            ~{phase.estimatedHours}h
                          </span>
                        </div>
                        <h3 className="mt-2 text-[15px] font-semibold text-slate-900 sm:text-base">
                          {localized(phase.title)}
                        </h3>
                        <dl className="mt-2 grid max-w-xs gap-1.5 text-xs sm:text-sm">
                          <div className="flex items-center justify-between gap-4">
                            <dt className="text-slate-600">{t('dashboard.practice')}</dt>
                            <dd className="font-bold text-slate-800 tabular-nums">
                              {practiceDone}/{practiceTotal}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <dt className="text-slate-600">{t('dashboard.gateQuiz')}</dt>
                            <dd
                              className={`font-bold tabular-nums ${
                                best ? (best.passed ? 'text-emerald-600' : 'text-rose-600') : 'text-slate-500'
                              }`}
                            >
                              {best ? `${best.score}/${best.total}` : t('dashboard.gateQuizNotTaken')}
                            </dd>
                          </div>
                        </dl>
                        {practiceTotal > 0 && (
                          <Progress
                            value={practiceDone}
                            max={practiceTotal}
                            tone={passed ? 'green' : 'amber'}
                            className="mt-2 h-1.5 max-w-xs sm:mt-3 sm:h-2"
                            label={t('dashboard.practiceProgressLabel', { order: phase.order })}
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:justify-end sm:gap-2">
                      {phase.notes.length > 0 && (
                        <ButtonLink
                          to={url(`/phase/${phase.id}/notes/${phase.notes[0].id}`)}
                          tone="secondary"
                          size="sm"
                          className="min-h-10 w-full sm:min-h-0 sm:w-auto"
                        >
                          {t('dashboard.notes')}
                        </ButtonLink>
                      )}
                      {phase.practice && (
                        <ButtonLink
                          to={url(`/phase/${phase.id}/practice`)}
                          tone="secondary"
                          size="sm"
                          className="min-h-10 w-full sm:min-h-0 sm:w-auto"
                        >
                          {t('dashboard.practice')}
                        </ButtonLink>
                      )}
                      {phase.gateQuiz && (
                        <ButtonLink
                          to={url(`/exam/${phase.gateQuiz.id}`)}
                          tone={passed ? 'secondary' : 'primary'}
                          size="sm"
                          className="min-h-10 w-full sm:min-h-0 sm:w-auto"
                        >
                          {t('dashboard.gateQuiz')}
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </Card>
              </m.div>
            );
          })}
        </m.div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t('dashboard.mockHeading')}</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600">{t('dashboard.mockIntro')}</p>
          </div>
          <SummitArt className="w-24 shrink-0 sm:w-36" label={t('art.mockJourney')} />
        </div>
        {course.mockExams.length === 0 ? (
          <Card inset="md" className="text-sm text-slate-600">
            {tNode(
              'dashboard.mockEmpty',
              {},
              { command: <code className="text-brand-300">npm run build</code> },
            )}
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
          {course.mockExams.map((mock) => {
            const best = bestAttempt(progress, mock.id);
            return (
              <Card
                key={mock.id}
                variant="interactive"
                inset="md"
                className="flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">{mockExamTitle(mock, i18n)}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {t('dashboard.mockMeta', {
                      questions: mock.questions.length,
                      minutes: mock.timeLimitMin,
                      passScore: mock.passScore,
                    })}
                    {best &&
                      tNode(
                        'dashboard.mockBest',
                        {},
                        {
                          score: (
                            <span className={best.passed ? 'text-emerald-400' : 'text-rose-400'}>
                              {best.score}/{best.total}
                            </span>
                          ),
                        },
                      )}
                  </p>
                </div>
                <ButtonLink to={url(`/exam/${mock.id}`)} tone={best?.passed ? 'secondary' : 'primary'}>
                  {best ? t('dashboard.mockRetake') : t('dashboard.mockStart')}
                </ButtonLink>
              </Card>
            );
          })}
          </div>
        )}
      </section>

      <Card inset="md" className="flex flex-wrap items-center justify-between gap-4">
        <Switch
          checked={progress.freeMode}
          onCheckedChange={setFreeMode}
          label={t('dashboard.freeMode')}
          description={t('dashboard.freeModeHint')}
        />
        <ConfirmDialog
          trigger={<Button tone="ghost">{t('dashboard.reset')}</Button>}
          title={t('dashboard.resetTitle', { code: course.code })}
          description={t('dashboard.resetDescription')}
          confirmLabel={t('dashboard.reset')}
          cancelLabel={t('common.cancel')}
          onConfirm={resetAll}
        />
      </Card>

      {course.warnings.length > 0 && (
        <Card inset="md" className="border-rose-500/30 bg-rose-500/5">
          <p className="text-sm font-semibold text-rose-300">
            {t('common.markdownWarnings', { count: course.warnings.length })}
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            {course.warnings.slice(0, 8).map((w) => (
              <li key={w}>· {w}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
