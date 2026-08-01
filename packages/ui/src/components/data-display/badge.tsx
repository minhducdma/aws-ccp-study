import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-semibold ring-1 ring-inset whitespace-nowrap',
  {
    variants: {
      tone: {
        slate: 'bg-slate-100 text-slate-600 ring-slate-300',
        amber: 'bg-brand-500/12 text-brand-700 ring-brand-500/30',
        green: 'bg-emerald-500/12 text-emerald-700 ring-emerald-500/30',
        red: 'bg-rose-500/12 text-rose-700 ring-rose-500/30',
        sky: 'bg-sky-500/12 text-sky-700 ring-sky-500/30',
        violet: 'bg-violet-500/12 text-violet-700 ring-violet-500/30',
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
