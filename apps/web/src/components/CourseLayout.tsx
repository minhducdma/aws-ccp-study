import { useMemo, useState } from 'react';
import { NavLink, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { getCourse } from '../lib/content';
import { CourseContext, courseUrl, useCourse } from '../lib/course';
import { hasPassed, useProgress } from '../lib/progress';

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
          'block rounded-lg px-3 py-1.5 text-sm transition-colors',
          depth > 0 ? 'ml-3 border-l border-slate-800 pl-3' : '',
          isActive
            ? 'bg-amber-500/15 font-medium text-amber-300'
            : locked
              ? 'text-slate-600 hover:text-slate-400'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200',
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
  const { course, url } = useCourse();
  const { progress } = useProgress(course);
  const wrongCount = Object.keys(progress.wrong).length;

  const sidebar = (
    <nav className="space-y-6 p-4">
      <div className="space-y-1">
        <NavItem to="/" end>
          ← Tất cả chứng chỉ
        </NavItem>
        <NavItem to={url()} end>
          Tổng quan
        </NavItem>
        <NavItem to={url('/review')}>
          Ôn câu sai {wrongCount > 0 && <span className="text-rose-400">({wrongCount})</span>}
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
              <span>
                Phase {phase.order} · {phase.weight}%
              </span>
              {passed && <span className="text-emerald-400">✓</span>}
              {locked && <span className="text-slate-600">🔒</span>}
            </p>
            <p className="mb-2 px-3 text-sm font-medium text-slate-300">{phase.title}</p>
            <div className="space-y-0.5">
              {phase.notes.map((note) => (
                <NavItem
                  key={note.id}
                  to={url(`/phase/${phase.id}/notes/${note.id}`)}
                  depth={1}
                  locked={locked}
                >
                  {note.title}
                </NavItem>
              ))}
              {phase.practice && (
                <NavItem to={url(`/phase/${phase.id}/practice`)} depth={1} locked={locked}>
                  Luyện tập ({phase.practice.questions.length})
                </NavItem>
              )}
              {phase.gateQuiz && (
                <NavItem to={url(`/exam/${phase.gateQuiz.id}`)} depth={1} locked={locked}>
                  Gate Quiz ({phase.gateQuiz.questions.length})
                </NavItem>
              )}
              {!phase.ready && (
                <p className="ml-6 py-1 text-xs text-slate-600 italic">Đang soạn nội dung…</p>
              )}
            </div>
          </div>
        );
      })}

      {course.mockExams.length > 0 && (
        <div>
          <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Thi thử
          </p>
          <div className="space-y-0.5">
            {course.mockExams.map((mock) => (
              <NavItem key={mock.id} to={url(`/exam/${mock.id}`)} depth={1}>
                {mock.title} ({mock.questions.length} câu)
              </NavItem>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 lg:hidden"
            aria-label="Mở menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <NavLink to={url()} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-slate-950">
              {course.provider.slice(0, 1)}
            </span>
            <span className="text-sm font-semibold text-white">
              {course.title}
              <span className="ml-2 hidden text-xs font-normal text-slate-500 sm:inline">
                {course.code}
              </span>
            </span>
          </NavLink>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-72 shrink-0 overflow-y-auto border-r border-slate-800 lg:block">
          {sidebar}
        </aside>

        {menuOpen && (
          <div className="fixed inset-0 top-[57px] z-20 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/70"
              onClick={() => setMenuOpen(false)}
              aria-label="Đóng menu"
            />
            <aside
              className="relative h-full w-72 overflow-y-auto border-r border-slate-800 bg-slate-950"
              onClick={() => setMenuOpen(false)}
            >
              {sidebar}
            </aside>
          </div>
        )}

        <main key={pathname} className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}