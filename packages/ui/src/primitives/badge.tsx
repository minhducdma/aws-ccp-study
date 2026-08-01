import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-semibold ring-1 ring-inset whitespace-nowrap',
  {
    variants: {
      tone: {
        slate: 'bg-slate-800 text-slate-300 ring-slate-700',
        amber: 'bg-brand-500/15 text-brand-300 ring-brand-500/30',
        green: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
        red: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
        sky: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
        violet: 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-0.5 text-xs',
      },
    },
    defaultVariants: { tone: 'slate', size: 'md' },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Draws a leading dot in the badge's own colour — useful for status at a glance. */
  dot?: boolean;
}

export function Badge({ className, tone, size, dot, children, ...rest }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone, size }), className)} {...rest}>
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
