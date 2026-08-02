import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  /** Tailwind classes for the icon chip's background + text colour, e.g. `bg-sky-500/12 text-sky-600`. */
  tone?: string;
  className?: string;
}

/**
 * A marketing-style highlight card: icon chip, title, short description. Used on the catalog
 * hero to explain what the roadmap gives a learner, alongside the more data-dense course cards.
 */
export function FeatureCard({ icon, title, description, tone, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 p-5',
        'transition-all duration-200 ease-out-back hover:-translate-y-1 hover:border-brand-500/40 hover:bg-surface-hover hover:shadow-xl hover:shadow-slate-900/8',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
          tone ?? 'bg-brand-500/12 text-brand-600',
        )}
      >
        {icon}
      </span>
      <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}
