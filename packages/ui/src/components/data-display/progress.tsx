import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as m from 'motion/react-m';
import { cn } from '../../utils/cn';
import { transition } from '../../motion/presets';

const tones = {
  amber: 'bg-brand-500',
  green: 'bg-emerald-500',
  sky: 'bg-sky-500',
  rose: 'bg-rose-500',
} as const;

export type ProgressTone = keyof typeof tones;

export interface ProgressProps {
  value: number;
  max: number;
  tone?: ProgressTone;
  className?: string;
  /**
   * Announced by screen readers. A bare progress bar tells assistive tech a number with no
   * subject, so every call site has to say what is being measured.
   */
  label: string;
}

/**
 * Built on Radix Progress, which supplies `role="progressbar"` plus the aria-value* attributes
 * that a styled `div` pair would otherwise be missing.
 */
export function Progress({ value, max, tone = 'amber', className, label }: ProgressProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      aria-label={label}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-100', className)}
    >
      <ProgressPrimitive.Indicator asChild>
        <m.div
          className={cn('h-full rounded-full', tones[tone])}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={transition.slow}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export interface ProgressRingProps {
  value: number;
  max: number;
  tone?: ProgressTone;
  size?: number;
  label: string;
  children?: React.ReactNode;
}

const ringStroke = {
  amber: 'stroke-brand-500',
  green: 'stroke-emerald-500',
  sky: 'stroke-sky-500',
  rose: 'stroke-rose-500',
} as const;

/**
 * Circular counterpart to `Progress`, for spots where a percentage is the headline rather than
 * a footnote. The arc draws itself on mount by animating the dash offset.
 */
export function ProgressRing({ value, max, tone = 'amber', size = 56, label, children }: ProgressRingProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${pct}%`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="fill-none stroke-slate-200"
          strokeWidth="5"
        />
        <m.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn('fill-none', ringStroke[tone])}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
          transition={transition.slow}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-900">
        {children ?? `${pct}%`}
      </span>
    </div>
  );
}
