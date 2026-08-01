import { cn } from '../lib/cn';

/**
 * Placeholder block with a travelling highlight. The gradient is twice the element's width and
 * slides via `--animate-shimmer`, so nothing animates on the main thread.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-lg bg-slate-100',
        'bg-[linear-gradient(90deg,transparent_0%,rgba(148,163,184,0.12)_50%,transparent_100%)] bg-[length:200%_100%]',
        className,
      )}
      aria-hidden="true"
    />
  );
}
