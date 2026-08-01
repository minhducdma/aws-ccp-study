import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Spinner } from '../feedback/spinner';

/**
 * Press and hover feedback is plain CSS rather than Motion: buttons are the most numerous
 * interactive element on a page and a transform transition costs nothing, while a JS-driven
 * gesture per button would not.
 */
export const buttonVariants = cva(
  [
    'focus-ring relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-back',
    'hover:-translate-y-0.5 active:scale-[0.96] active:translate-y-0',
    'disabled:pointer-events-none disabled:opacity-40 disabled:hover:translate-y-0 disabled:active:scale-100',
    'select-none',
  ],
  {
    variants: {
      tone: {
        primary:
          'bg-brand-500 font-semibold text-slate-950 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] hover:bg-brand-400 hover:shadow-[0_8px_24px_-8px_var(--color-brand-500)]',
        secondary:
          'border border-line-strong bg-surface text-slate-700 hover:border-slate-400 hover:bg-surface-hover',
        ghost: 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
        danger: 'bg-rose-600/90 font-semibold text-white hover:bg-rose-600',
        pass: 'bg-emerald-500/12 font-semibold text-emerald-700 ring-1 ring-emerald-500/30 ring-inset hover:bg-emerald-500/20',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        /* 44px tall: the minimum comfortable touch target on a phone. */
        md: 'min-h-11 px-4 py-2 text-sm',
        lg: 'min-h-12 px-6 py-3 text-base',
        icon: 'size-10 p-0',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: { tone: 'primary', size: 'md' },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants {
  /** Swaps the label for a spinner and blocks interaction, keeping the button's width stable. */
  loading?: boolean;
  icon?: ReactNode;
}

export function Button({
  children,
  className,
  tone,
  size,
  block,
  loading = false,
  icon,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ tone, size, block }), className)}
      {...rest}
    >
      {loading && <Spinner className="absolute size-4" />}
      <span className={cn('inline-flex items-center gap-2', loading && 'invisible')}>
        {icon}
        {children}
      </span>
    </button>
  );
}

export interface ButtonLinkProps extends ButtonVariants {
  to: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  'aria-label'?: string;
}

export function ButtonLink({ to, children, className, tone, size, block, icon, ...rest }: ButtonLinkProps) {
  return (
    <Link to={to} className={cn(buttonVariants({ tone, size, block }), className)} {...rest}>
      {icon}
      {children}
    </Link>
  );
}
