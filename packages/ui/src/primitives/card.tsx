import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export const cardVariants = cva('rounded-2xl border transition-colors duration-200 ease-out-expo', {
  variants: {
    variant: {
      default: 'border-line bg-surface/60',
      /** For cards that are themselves a link or button. */
      interactive:
        'border-line bg-surface/60 hover:border-brand-500/40 hover:bg-surface-hover focus-within:border-brand-500/40',
      /** Sits above other content — used by dialogs and the mobile nav. */
      raised: 'border-line-strong bg-overlay shadow-2xl shadow-black/40',
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
