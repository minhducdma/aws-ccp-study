import { cn } from '../utils/cn';

const FILLED_BARS = {
  foundational: 1,
  associate: 2,
  professional: 3,
  specialty: 4,
} as const;

export type CourseLevel = keyof typeof FILLED_BARS;

/**
 * Four bars with as many filled as the level is deep, so difficulty is legible before the label
 * is read. Purely decorative — the level is always spelled out in text next to it.
 */
export function LevelGlyph({ level, className }: { level: CourseLevel; className?: string }) {
  const filled = FILLED_BARS[level] ?? 1;

  return (
    <span className={cn('inline-flex items-end gap-[3px]', className)} aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={cn(
            'w-[3px] rounded-full transition-colors duration-300',
            index < filled ? 'bg-brand-400' : 'bg-slate-200',
          )}
          style={{ height: 6 + index * 3 }}
        />
      ))}
    </span>
  );
}
