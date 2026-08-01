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
  StatTile,
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

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="text-xs font-semibold tracking-widest text-brand-500 uppercase">
          {t('dashboard.eyebrow', { hours: course.estimatedHours, code: course.code })}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{localized(course.title)}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          {t('dashboard.intro', { count: course.phases.length })}
        </p>
      </header>

      <m.div
        className="grid gap-3 sm:grid-cols-4"
        variants={stagger(0.07)}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={fadeUp}>
          <StatTile
            label={t('dashboard.stat.readiness')}
            value={readinessWeight}
            suffix="%"
            animate
            icon={<TargetIcon width={18} height={18} />}
            hint={t('catalog.phasesPassed', {
              passed: passedPhases.length,
              total: course.phases.length,
              count: course.phases.length,
            })}
          />
        </m.div>
        <m.div variants={fadeUp}>
          <StatTile
            label={t('dashboard.stat.questions')}
            value={course.questionCount}
            animate
            icon={<BookIcon width={18} height={18} />}
            hint={t('dashboard.stat.questionsHint')}
          />
        </m.div>
        <m.div variants={fadeUp}>
          <StatTile
            label={t('dashboard.stat.wrong')}
            value={wrongCount}
            animate
            icon={<FlameIcon width={18} height={18} />}
            hint={t('dashboard.stat.wrongHint')}
          />
        </m.div>
        <m.div variants={fadeUp}>
          <StatTile
            label={t('dashboard.stat.passScore')}
            value={`${course.exam.passScore}/${course.exam.maxScore}`}
            icon={<TrophyIcon width={18} height={18} />}
            hint={t('dashboard.stat.passScoreHint', {
              questions: course.exam.totalQuestions,
              minutes: course.exam.durationMin,
            })}
          />
        </m.div>
      </m.div>

      {nextPhase && (
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <Card
            inset="md"
            className="relative flex flex-wrap items-center justify-between gap-4 overflow-hidden border-brand-500/30 bg-brand-500/5"
          >
            {/* Soft moving glow so the primary call to action reads as the live one */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-10 size-40 animate-float rounded-full bg-brand-500/10 blur-3xl"
            />
            <div className="relative">
              <p className="text-xs font-semibold tracking-wide text-brand-400 uppercase">
                {t('dashboard.next.eyebrow')}
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {t('phase.labelWithTitle', {
                  order: nextPhase.order,
                  title: localized(nextPhase.title),
                })}
              </p>
              <p className="mt-0.5 text-sm text-slate-600">
                {nextPhase.notes.length > 0 && !progress.notesRead[nextPhase.notes[0].id]
                  ? t('dashboard.next.readNotes')
                  : t('dashboard.next.keepPracticing')}
              </p>
            </div>
            <ButtonLink
              className="relative"
              to={
                nextPhase.notes.length > 0 && !progress.notesRead[nextPhase.notes[0].id]
                  ? url(`/phase/${nextPhase.id}/notes/${nextPhase.notes[0].id}`)
                  : url(`/phase/${nextPhase.id}/practice`)
              }
            >
              {t('dashboard.next.cta')}
            </ButtonLink>
          </Card>
        </m.div>
      )}

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
          {course.phases.map((phase) => {
            const previous = course.phases.find((p) => p.order === phase.order - 1);
            const locked =
              !progress.freeMode && previous ? !hasPassed(progress, previous.gateQuiz?.id) : false;
            const passed = hasPassed(progress, phase.gateQuiz?.id);
            const best = phase.gateQuiz ? bestAttempt(progress, phase.gateQuiz.id) : undefined;
            const practiceState = phase.practice ? progress.practice[phase.practice.id] : undefined;
            const practiceDone = practiceState?.checked.length ?? 0;
            const practiceTotal = phase.practice?.questions.length ?? 0;
            const notesDone = phase.notes.filter((n) => progress.notesRead[n.id]).length;

            return (
              <m.div key={phase.id} variants={fadeUp}>
                <Card inset="md" className={locked ? 'opacity-60' : ''}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={passed ? 'green' : locked ? 'slate' : 'amber'}>
                          {t('phase.label', { order: phase.order })}
                        </Badge>
                        <Badge tone="sky">{t('phase.weightOfExam', { weight: phase.weight })}</Badge>
                        <span className="text-xs text-slate-500">~{phase.estimatedHours}h</span>
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
                      <h3 className="mt-2 font-semibold text-slate-900">{localized(phase.title)}</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {tNode(
                          'dashboard.phaseProgress',
                          {
                            notesRead: notesDone,
                            notesTotal: phase.notes.length,
                            checked: practiceDone,
                            practiceTotal,
                          },
                          {
                            gateScore: best ? (
                              <span className={best.passed ? 'text-emerald-400' : 'text-rose-400'}>
                                {best.score}/{best.total}
                              </span>
                            ) : (
                              t('dashboard.gateQuizNotTaken')
                            ),
                          },
                        )}
                      </p>
                      {practiceTotal > 0 && (
                        <Progress
                          value={practiceDone}
                          max={practiceTotal}
                          tone={passed ? 'green' : 'amber'}
                          className="mt-3 max-w-xs"
                          label={t('dashboard.practiceProgressLabel', { order: phase.order })}
                        />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {phase.notes.length > 0 && (
                        <ButtonLink
                          to={url(`/phase/${phase.id}/notes/${phase.notes[0].id}`)}
                          tone="secondary"
                          size="sm"
                        >
                          {t('dashboard.notes')}
                        </ButtonLink>
                      )}
                      {phase.practice && (
                        <ButtonLink
                          to={url(`/phase/${phase.id}/practice`)}
                          tone="secondary"
                          size="sm"
                        >
                          {t('dashboard.practice')}
                        </ButtonLink>
                      )}
                      {phase.gateQuiz && (
                        <ButtonLink
                          to={url(`/exam/${phase.gateQuiz.id}`)}
                          tone={passed ? 'secondary' : 'primary'}
                          size="sm"
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

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">{t('dashboard.mockHeading')}</h2>
        {course.mockExams.length === 0 ? (
          <Card inset="md" className="text-sm text-slate-600">
            {tNode(
              'dashboard.mockEmpty',
              {},
              { command: <code className="text-brand-300">npm run build</code> },
            )}
          </Card>
        ) : (
          course.mockExams.map((mock) => {
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
          })
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
