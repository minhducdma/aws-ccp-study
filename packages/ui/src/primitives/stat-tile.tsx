import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { CountUp } from './count-up';

export interface StatTileProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  /** Renders `value` with a count-up tween. Only valid when `value` is a number. */
  animate?: boolean;
  suffix?: string;
  className?: string;
}

export function StatTile({ label, value, hint, icon, animate, suffix, className }: StatTileProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-line bg-surface/60 px-4 py-3',
        'transition-colors duration-200 hover:border-line-strong',
        className,
      )}
    >
      {icon && (
        <span className="absolute top-3 right-3 text-slate-400 transition-colors duration-200 group-hover:animate-wiggle group-hover:text-brand-500/60">
          {icon}
        </span>
      )}
      <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
        {animate && typeof value === 'number' ? <CountUp value={value} suffix={suffix} /> : value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
