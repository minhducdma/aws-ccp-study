import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export const cardVariants = cva('rounded-3xl border transition-all duration-200 ease-out-back', {
  variants: {
    variant: {
      default: 'border-line bg-surface/60',
      /** For cards that are themselves a link or button — lifts and overshoots slightly. */
      interactive:
        'border-line bg-surface/80 hover:-translate-y-1 hover:border-brand-500/40 hover:bg-surface-hover hover:shadow-xl hover:shadow-slate-900/8 focus-within:border-brand-500/40',
      /** Sits above other content — used by dialogs and the mobile nav. */
      raised: 'border-line-strong bg-overlay shadow-2xl shadow-slate-900/15',
      /** Reads as inactive: locked courses, unavailable actions. */
      muted: 'border-line/60 bg-surface/30',
    },
    inset: {
      none: '',
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-8',
    },
  },
  defaultVariants: { variant: 'default', inset: 'none' },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, variant, inset, ...rest }: CardProps) {
  return <div className={cn(cardVariants({ variant, inset }), className)} {...rest} />;
}
