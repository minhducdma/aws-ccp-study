import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Card } from './card';

export interface EmptyStateProps {
  title: string;
  description: ReactNode;
  /** Vector art shown above the title. Keep it under roughly 160px tall. */
  illustration?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, illustration, action, className }: EmptyStateProps) {
  return (
    <Card inset="lg" className={cn('flex flex-col items-center text-center', className)}>
      {illustration && <div className="mb-5">{illustration}</div>}
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}
