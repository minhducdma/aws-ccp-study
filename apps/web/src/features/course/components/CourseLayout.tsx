import {
  ArrowLeftIcon,
  Badge,
  CheckIcon,
  LockIcon,
  Sheet,
  fadeUp,
  m,
} from '@study/ui';
import { useEffect, useMemo, useState } from 'react';
import { NavLink, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useI18n } from '../../../i18n';
import { getCourse, mockExamTitle } from '../content';
import { CourseContext, courseUrl, useCourse } from '../context';
import { hasPassed, useProgress } from '../progress';
import AppHeader from '../../../app/components/AppHeader';
import AuthWidget from '../../auth/components/AuthWidget';
import LocaleSwitch from '../../../i18n/components/LocaleSwitch';

function NavItem({
  to,
  children,
  depth = 0,
  locked = false,
  end = false,
}: {
  to: string;
  children: React.ReactNode;
  depth?: number;
  locked?: boolean;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'focus-ring relative block rounded-lg px-3 py-1.5 text-sm transition-colors duration-200',
          depth > 0 ? 'ml-3 border-l border-line pl-3' : '',
          isActive
            ? 'bg-brand-500/12 font-medium text-brand-700'
            : locked
              ? 'text-slate-400 hover:text-slate-500'
              : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
}

export default function CourseLayout() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const value = useMemo(
    () => (course ? { course, url: (path = '') => courseUrl(course.id, path) } : null),
    [course],
  );

  if (!course || !value) return <Navigate to="/" replace />;
  return (
    <CourseContext.Provider value={value}>
      <CourseShell menuOpen={menuOpen} setMenuOpen={setMenuOpen} pathname={location.pathname} />
    </CourseContext.Provider>
  );
}

function CourseShell({
  menuOpen,
  setMenuOpen,
  pathname,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  pathname: string;
}) {
  const i18n = useI18n();
  const { t, localized } = i18n;
  const { course, url } = useCourse();
  const { progress } = useProgress(course);
  const wrongCount = Object.keys(progress.wrong).length;

  /* Navigating from inside the mobile panel should put it away. */
  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  const sidebar = (
    <nav className="space-y-6 p-4" aria-label={t('nav.courseContents')}>
      <div className="flex items-center gap-2 border-b border-line pb-4 lg:hidden">
        <LocaleSwitch />
        <AuthWidget className="ml-auto" />
      </div>
      <div className="space-y-1">
        <NavItem to="/" end>
          <span className="inline-flex items-center gap-2">
            <ArrowLeftIcon width={14} height={14} />
            {t('nav.allCertifications')}
          </span>
        </NavItem>
        <NavItem to={url()} end>
          {t('nav.overview')}
        </NavItem>
        <NavItem to={url('/review')}>
          <span className="inline-flex items-center gap-2">
            {t('nav.wrongAnswers')}
            {wrongCount > 0 && (
              <Badge tone="red" size="sm">
                {wrongCount}
              </Badge>
            )}
          </span>
        </NavItem>
      </div>

      {course.phases.map((phase) => {
        const previous = course.phases.find((p) => p.order === phase.order - 1);
        const locked =
          !progress.freeMode && previous ? !hasPassed(progress, previous.gateQuiz?.id) : false;
        const passed = hasPassed(progress, phase.gateQuiz?.id);

        return (
          <div key={phase.id}>
            <p className="mb-1.5 flex items-center gap-2 px-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              <span>{t('phase.headerSummary', { order: phase.order, weight: phase.weight })}</span>
              {passed && <CheckIcon width={13} height={13} className="text-emerald-400" />}
              {locked && <LockIcon width={13} height={13} className="text-slate-600" />}
            </p>
            <p className="mb-2 px-3 text-sm font-medium text-slate-700">{localized(phase.title)}</p>
            <div className="space-y-0.5">
              {phase.notes.map((note) => (
                <NavItem
                  key={note.id}
                  to={url(`/phase/${phase.id}/notes/${note.id}`)}
                  depth={1}
                  locked={locked}
                >
                  {localized(note.title)}
                </NavItem>
              ))}
              {phase.practice && (
                <NavItem to={url(`/phase/${phase.id}/practice`)} depth={1} locked={locked}>
                  {t('nav.practice', { count: phase.practice.questions.length })}
                </NavItem>
              )}
              {phase.gateQuiz && (
                <NavItem to={url(`/exam/${phase.gateQuiz.id}`)} depth={1} locked={locked}>
                  {t('nav.gateQuiz', { count: phase.gateQuiz.questions.length })}
                </NavItem>
              )}
              {!phase.ready && (
                <p className="ml-6 py-1 text-xs text-slate-600 italic">{t('nav.beingWritten')}</p>
              )}
            </div>
          </div>
        );
      })}

      {course.mockExams.length > 0 && (
        <div>
          <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            {t('nav.mockExams')}
          </p>
          <div className="space-y-0.5">
            {course.mockExams.map((mock) => (
              <NavItem key={mock.id} to={url(`/exam/${mock.id}`)} depth={1}>
                {t('nav.mockExam', {
                  title: mockExamTitle(mock, i18n),
                  count: mock.questions.length,
                })}
              </NavItem>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen">
      <a href="#main" className="skip-link">
        {t('nav.skip')}
      </a>

      <AppHeader
        title={localized(course.title)}
        code={course.code}
        courseUrl={url()}
        reviewUrl={url('/review')}
        wrongCount={wrongCount}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-line lg:block">
          {sidebar}
        </aside>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen} title={t('nav.courseNavigation')}>
          {sidebar}
        </Sheet>

        {/* Keying on the path replays the entrance animation on every navigation. */}
        <m.main
          key={pathname}
          id="main"
          className="min-w-0 flex-1 px-4 pt-6 pb-28 sm:px-8 sm:pt-10 lg:pb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Outlet />
        </m.main>
      </div>
    </div>
  );
}
