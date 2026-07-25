import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900/50 ${className}`}>{children}</div>
  );
}

export function Badge({
  children,
  tone = 'slate',
}: {
  children: ReactNode;
  tone?: 'slate' | 'amber' | 'green' | 'red' | 'sky';
}) {
  const tones = {
    slate: 'bg-slate-800 text-slate-300 ring-slate-700',
    amber: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
    green: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
    red: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
    sky: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  max,
  tone = 'amber',
  className = '',
}: {
  value: number;
  max: number;
  tone?: 'amber' | 'green' | 'sky';
  className?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const tones = {
    amber: 'bg-amber-500',
    green: 'bg-emerald-500',
    sky: 'bg-sky-500',
  } as const;
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-800 ${className}`}>
      <div className={`h-full rounded-full transition-all ${tones[tone]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const buttonTones = {
  primary: 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold',
  secondary: 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700',
  ghost: 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60',
  danger: 'bg-rose-600/90 text-white hover:bg-rose-600',
} as const;

type Tone = keyof typeof buttonTones;

const baseButton =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40';

export function Button({
  children,
  onClick,
  tone = 'primary',
  disabled,
  className = '',
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: Tone;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseButton} ${buttonTones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  to,
  tone = 'primary',
  className = '',
}: {
  children: ReactNode;
  to: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Link to={to} className={`${baseButton} ${buttonTones[tone]} ${className}`}>
      {children}
    </Link>
  );
}

export function EmptyState({ title, description }: { title: string; description: ReactNode }) {
  return (
    <Card className="p-10 text-center">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">{description}</p>
    </Card>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
      <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
