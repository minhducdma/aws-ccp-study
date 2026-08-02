import {
  Badge,
  BookIcon,
  Card,
  ChevronRightIcon,
  ClipboardIcon,
  ClockIcon,
  CountUp,
  FeatureCard,
  FlameIcon,
  LayersIcon,
  LevelGlyph,
  LockIcon,
  Progress,
  ProgressRing,
  RoadmapArt,
  SparkleIcon,
  StatTile,
  TargetIcon,
  fadeUp,
  hoverLift,
  m,
  stagger,
  type CourseLevel,
} from '@study/ui';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../../../app/components/AppHeader';
import { useI18n, type I18n, type MessageKey } from '../../../i18n';
import { content, courses } from '../content';
import { courseUrl } from '../context';
import { emptyCourseProgress, hasPassed, useAllProgress } from '../progress';
import type { Course, CourseProgress } from '../../../types';

const KNOWN_LEVELS = ['Foundational', 'Associate', 'Professional', 'Specialty'] as const;

function levelKey(level: string): CourseLevel {
  const key = level.toLowerCase();
  return (['foundational', 'associate', 'professional', 'specialty'].includes(key)
    ? key
    : 'foundational') as CourseLevel;
}

/**
 * A level is a fixed key in the manifest, so it is named from the catalogue. An unknown level is
 * shown as authored rather than dropped.
 */
function levelText(level: string, suffix: '' | '.blurb', i18n: I18n): string {
  const known = (KNOWN_LEVELS as readonly string[]).includes(level);
  if (!known) return suffix === '' ? level : '';
  return i18n.t(`level.${level}${suffix}` as MessageKey);
}

function courseStats(course: Course, progress: CourseProgress) {
  const passed = course.phases.filter((p) => hasPassed(progress, p.gateQuiz?.id));
  return {
    passedPhases: passed.length,
    totalPhases: course.phases.length,
    readiness: passed.reduce((sum, p) => sum + p.weight, 0),
    started:
      passed.length > 0 ||
      progress.attempts.length > 0 ||
      Object.keys(progress.notesRead).length > 0 ||
      Object.keys(progress.practice).length > 0 ||
      Object.keys(progress.exams).length > 0,
  };
}

/** Floating card that hovers on top of the hero illustration, echoing a course's own readiness ring. */
function HeroFloatCard({
  icon,
  value,
  label,
  className,
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <m.div
      className={[
        'absolute flex items-center gap-3 rounded-2xl border border-line-strong bg-overlay/95 px-4 py-3 shadow-xl shadow-slate-900/10 backdrop-blur',
        className ?? '',
      ].join(' ')}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/12 text-brand-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 tabular-nums">{value}</p>
        <p className="text-[11px] leading-tight whitespace-nowrap text-slate-500">{label}</p>
      </div>
    </m.div>
  );
}

function AvailableCard({ course, progress }: { course: Course; progress: CourseProgress }) {
  const i18n = useI18n();
  const { t, localized } = i18n;
  const stats = courseStats(course, progress);
  const title = localized(course.title);

  return (
    <m.li variants={fadeUp} {...hoverLift} className="list-none">
      <Link
        to={courseUrl(course.id)}
        className={[
          'group focus-ring relative block h-full overflow-hidden rounded-2xl border border-brand-500/30 p-5',
          'bg-gradient-to-br from-brand-500/10 via-surface/40 to-surface/40',
          'transition-colors duration-200 hover:border-brand-500/60',
        ].join(' ')}
      >
        {/* Sheen that sweeps across on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 ease-out-expo group-hover:translate-x-full"
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber">{course.code}</Badge>
            <Badge tone="sky" className="gap-1.5">
              <LevelGlyph level={levelKey(course.level)} />
              {levelText(course.level, '', i18n)}
            </Badge>
            {stats.started ? (
              <Badge tone="green" dot>
                {t('catalog.inProgress')}
              </Badge>
            ) : (
              <Badge tone="slate">{t('catalog.notStarted')}</Badge>
            )}
          </div>
          {stats.readiness > 0 && (
            <ProgressRing
              value={stats.readiness}
              max={100}
              size={52}
              label={t('catalog.readinessRing', { code: course.code })}
            />
          )}
        </div>

        <h3 className="mt-3 font-semibold text-slate-900 transition-colors group-hover:text-brand-700">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{localized(course.summary)}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {t('catalog.phasesPassed', {
                passed: stats.passedPhases,
                total: stats.totalPhases,
                count: stats.totalPhases,
              })}
            </span>
            <span>{t('catalog.examCovered', { percent: stats.readiness })}</span>
          </div>
          <Progress
            value={stats.readiness}
            max={100}
            tone="amber"
            label={t('catalog.readinessBar', { title })}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon width={14} height={14} />
            {t('catalog.courseMeta', {
              questions: course.questionCount,
              mocks: course.mockExams.length,
              hours: course.estimatedHours,
            })}
          </span>
          <ChevronRightIcon
            width={16}
            height={16}
            className="text-slate-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-400"
          />
        </div>
      </Link>
    </m.li>
  );
}

function PlannedCard({ course }: { course: Course }) {
  const i18n = useI18n();
  const { t, localized } = i18n;

  return (
    <m.li variants={fadeUp} className="list-none">
      <Card variant="muted" inset="md" className="h-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="slate">{course.code}</Badge>
          <Badge tone="slate" className="gap-1.5">
            <LevelGlyph level={levelKey(course.level)} />
            {levelText(course.level, '', i18n)}
          </Badge>
          <span className="ml-auto text-slate-600">
            <LockIcon width={16} height={16} />
            <span className="sr-only">{t('catalog.locked')}</span>
          </span>
        </div>

        <h3 className="mt-3 font-semibold text-slate-600">{localized(course.title)}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{localized(course.summary)}</p>

        <p className="mt-4 text-xs text-slate-400">
          {t('catalog.plannedMeta', {
            questions: course.exam.totalQuestions,
            minutes: course.exam.durationMin,
          })}
        </p>
      </Card>
    </m.li>
  );
}

export default function CatalogPage() {
  const i18n = useI18n();
  const { t } = i18n;
  const store = useAllProgress();

  const levels = [...new Set(courses.map((c) => c.level))].sort(
    (a, b) =>
      (courses.find((c) => c.level === a)?.levelOrder ?? 0) -
      (courses.find((c) => c.level === b)?.levelOrder ?? 0),
  );

  const available = courses.filter((c) => c.status === 'available');

  const totalQuestions = courses.reduce((sum, c) => sum + c.questionCount, 0);
  const totalMocks = courses.reduce((sum, c) => sum + c.mockExams.length, 0);
  const totalHours = courses.reduce((sum, c) => sum + c.estimatedHours, 0);
  const totalGatedPhases = available.reduce(
    (sum, c) => sum + c.phases.filter((p) => p.gateQuiz).length,
    0,
  );

  const readinessValues = available.map((c) => courseStats(c, store.courses[c.id] ?? emptyCourseProgress).readiness);
  const averageReadiness =
    readinessValues.length > 0
      ? Math.round(readinessValues.reduce((sum, v) => sum + v, 0) / readinessValues.length)
      : 0;

  const heroStats = [
    { label: t('catalog.stats.certifications'), value: courses.length, icon: <SparkleIcon width={18} height={18} /> },
    { label: t('catalog.stats.questions'), value: totalQuestions, icon: <BookIcon width={18} height={18} /> },
    { label: t('catalog.stats.mockExams'), value: totalMocks, icon: <ClipboardIcon width={18} height={18} /> },
    { label: t('catalog.stats.hours'), value: totalHours, suffix: 'h', icon: <ClockIcon width={18} height={18} /> },
  ];

  const features = [
    {
      title: t('catalog.features.phased.title'),
      description: t('catalog.features.phased.description'),
      icon: <LayersIcon width={20} height={20} />,
      tone: 'bg-sky-500/12 text-sky-600',
    },
    {
      title: t('catalog.features.practice.title'),
      description: t('catalog.features.practice.description'),
      icon: <BookIcon width={20} height={20} />,
      tone: 'bg-emerald-500/12 text-emerald-600',
    },
    {
      title: t('catalog.features.gate.title'),
      description: t('catalog.features.gate.description'),
      icon: <TargetIcon width={20} height={20} />,
      tone: 'bg-brand-500/12 text-brand-600',
    },
    {
      title: t('catalog.features.review.title'),
      description: t('catalog.features.review.description'),
      icon: <FlameIcon width={20} height={20} />,
      tone: 'bg-rose-500/12 text-rose-600',
    },
  ];

  return (
    <>
      <AppHeader />
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-28 sm:px-8 sm:pt-14 lg:pb-14">

      <m.header
        className="relative mb-8 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-sky-100/70 via-surface to-brand-100/60 px-6 py-10 sm:px-10 sm:py-14"
        variants={stagger(0.08)}
        initial="hidden"
        animate="visible"
      >
        {/* Ambient glow blobs, purely decorative */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-brand-400/20 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-sky-400/20 blur-3xl"
        />

        <div className="relative grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <m.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-overlay/80 px-3 py-1 text-[11px] font-semibold text-slate-600"
            >
              <SparkleIcon width={13} height={13} className="text-brand-500" />
              {t('catalog.heroKicker')}
            </m.span>
            <m.p
              variants={fadeUp}
              className="mt-4 text-xs font-semibold tracking-widest text-brand-600 uppercase"
            >
              {t('catalog.eyebrow')}
            </m.p>
            <m.h1 variants={fadeUp} className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              {t('catalog.heading')}
            </m.h1>
            <m.p variants={fadeUp} className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              {t('catalog.intro')}
            </m.p>
          </div>

          <m.div variants={fadeUp} className="relative hidden md:block">
            <RoadmapArt label={t('art.roadmap')} />
            {averageReadiness > 0 && (
              <HeroFloatCard
                icon={<TargetIcon width={18} height={18} />}
                value={`${averageReadiness}%`}
                label={t('catalog.heroFloatReadiness')}
                className="-top-2 -left-4"
              />
            )}
            {totalGatedPhases > 0 && (
              <HeroFloatCard
                icon={<LayersIcon width={18} height={18} />}
                value={totalGatedPhases}
                label={t('catalog.heroFloatPhases')}
                className="-bottom-2 -right-2"
              />
            )}
          </m.div>
        </div>
      </m.header>

      <m.div
        className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
        variants={stagger(0.06)}
        initial="hidden"
        animate="visible"
      >
        {heroStats.map((stat) => (
          <m.div key={stat.label} variants={fadeUp}>
            <StatTile
              label={stat.label}
              value={<CountUp value={stat.value} suffix={stat.suffix} />}
              icon={stat.icon}
            />
          </m.div>
        ))}
      </m.div>

      <section className="mb-14">
        <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
          {t('catalog.features.eyebrow')}
        </p>
        <h2 className="mt-1.5 text-xl font-bold text-slate-900 sm:text-2xl">
          {t('catalog.features.heading')}
        </h2>
        <m.div
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <m.div key={feature.title} variants={fadeUp}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                tone={feature.tone}
              />
            </m.div>
          ))}
        </m.div>
      </section>

      {available.length === 0 && (
        <Card inset="md" className="mb-10 border-rose-500/30 bg-rose-500/5 text-sm text-slate-600">
          {i18n.tNode(
            'catalog.empty',
            {},
            {
              path: <code>courses/&lt;id&gt;/</code>,
              command: <code className="text-brand-300">npm run build</code>,
            },
          )}
        </Card>
      )}

      <div className="space-y-10">
        {levels.map((level) => {
          const group = courses.filter((c) => c.level === level);
          const blurb = levelText(level, '.blurb', i18n);
          return (
            <section key={level} aria-labelledby={`level-${level}`}>
              <div className="mb-4">
                <h2 id={`level-${level}`} className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <LevelGlyph level={levelKey(level)} />
                  {levelText(level, '', i18n)}
                </h2>
                {blurb && <p className="mt-0.5 text-sm text-slate-500">{blurb}</p>}
              </div>

              <m.ul
                className="grid gap-4 sm:grid-cols-2"
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {group.map((course) =>
                  course.status === 'available' ? (
                    <AvailableCard
                      key={course.id}
                      course={course}
                      progress={store.courses[course.id] ?? emptyCourseProgress}
                    />
                  ) : (
                    <PlannedCard key={course.id} course={course} />
                  ),
                )}
              </m.ul>
            </section>
          );
        })}
      </div>

      {content.warnings.length > 0 && (
        <Card inset="md" className="mt-10 border-rose-500/30 bg-rose-500/5">
          <p className="text-sm font-semibold text-rose-300">
            {t('common.markdownWarnings', { count: content.warnings.length })}
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-500">
            {content.warnings.slice(0, 8).map((w) => (
              <li key={w}>· {w}</li>
            ))}
          </ul>
        </Card>
      )}
      </div>
    </>
  );
}
