import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { mockExams, phases } from '../lib/content';
import { hasPassed, useProgress } from '../lib/progress';

function NavItem({
  to,
  children,
  depth = 0,
  locked = false,
}: {
  to: string;
  children: React.ReactNode;
  depth?: number;
  locked?: boolean;
}) {
  return (
    <NavLink
      to={to}
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

export default function Layout() {
  const { progress } = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const wrongCount = Object.keys(progress.wrong).length;

  const sidebar = (
    <nav className="space-y-6 p-4">
      <div className="space-y-1">
        <NavItem to="/">Tổng quan</NavItem>
        <NavItem to="/review">
          Ôn câu sai {wrongCount > 0 && <span className="text-rose-400">({wrongCount})</span>}
        </NavItem>
      </div>

      {phases.map((phase) => {
        const previous = phases.find((p) => p.order === phase.order - 1);
        const locked = !progress.freeMode && previous ? !hasPassed(progress, previous.gateQuiz?.id) : false;
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
                <NavItem key={note.id} to={`/phase/${phase.id}/notes/${note.id}`} depth={1} locked={locked}>
                  {note.title}
                </NavItem>
              ))}
              {phase.practice && (
                <NavItem to={`/phase/${phase.id}/practice`} depth={1} locked={locked}>
                  Luyện tập ({phase.practice.questions.length})
                </NavItem>
              )}
              {phase.gateQuiz && (
                <NavItem to={`/exam/${phase.gateQuiz.id}`} depth={1} locked={locked}>
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

      {mockExams.length > 0 && (
        <div>
          <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Thi thử
          </p>
          <div className="space-y-0.5">
            {mockExams.map((mock) => (
              <NavItem key={mock.id} to={`/exam/${mock.id}`} depth={1}>
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
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 lg:hidden"
            aria-label="Mở menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-slate-950">
              A
            </span>
            <span className="text-sm font-semibold text-white">
              AWS Cloud Practitioner
              <span className="ml-2 hidden text-xs font-normal text-slate-500 sm:inline">CLF-C02</span>
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

        <main key={location.pathname} className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
