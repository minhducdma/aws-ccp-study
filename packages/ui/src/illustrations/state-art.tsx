import * as m from 'motion/react-m';
import { cn } from '../lib/cn';
import { easeOutExpo } from '../motion/presets';

interface ArtProps {
  className?: string;
}

const frame = (className?: string) => cn('h-auto w-40', className);

/** Shown after a passing score: a summit reached, with a short confetti burst. */
export function SummitArt({ className }: ArtProps) {
  const confetti = [
    { x: -46, y: -30, tone: 'var(--color-brand-400)', rotate: -40 },
    { x: -24, y: -52, tone: 'var(--color-info)', rotate: 20 },
    { x: 8, y: -58, tone: 'var(--color-pass)', rotate: -10 },
    { x: 34, y: -46, tone: 'var(--color-brand-300)', rotate: 45 },
    { x: 52, y: -22, tone: 'var(--color-info)', rotate: -25 },
  ];

  return (
    <svg viewBox="0 0 200 160" fill="none" className={frame(className)} role="img" aria-label="Đã đạt">
      <ellipse cx="100" cy="140" rx="66" ry="8" fill="var(--color-pass)" opacity="0.12" />

      <path d="M40 140 100 46l60 94Z" fill="var(--color-surface)" stroke="var(--color-line-strong)" strokeWidth="2" />
      <path d="M100 46 78 80l22 14 22-14Z" fill="var(--color-pass)" opacity="0.35" />

      <m.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5, ease: easeOutExpo }}
        style={{ originX: '100px', originY: '46px' }}
      >
        <path d="M100 46V16" stroke="var(--color-line-strong)" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 18h26l-7 9 7 9h-26Z" fill="var(--color-brand-500)" />
      </m.g>

      {confetti.map((piece, index) => (
        <m.rect
          key={index}
          x="97"
          y="52"
          width="7"
          height="10"
          rx="2"
          fill={piece.tone}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: piece.x, y: piece.y, rotate: piece.rotate }}
          transition={{ delay: 0.35 + index * 0.06, duration: 1.1, ease: easeOutExpo }}
        />
      ))}
    </svg>
  );
}

/** Shown after a failing score. Deliberately reads as "one more go", not as an error. */
export function RetryArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={frame(className)} role="img" aria-label="Chưa đạt">
      <ellipse cx="100" cy="142" rx="58" ry="7" fill="var(--color-brand-500)" opacity="0.1" />

      <circle cx="100" cy="80" r="52" fill="var(--color-surface)" stroke="var(--color-line-strong)" strokeWidth="2" />
      <circle cx="100" cy="80" r="34" stroke="var(--color-line-strong)" strokeWidth="2" />
      <m.circle
        cx="100"
        cy="80"
        r="16"
        fill="var(--color-brand-500)"
        opacity="0.25"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '100px', originY: '80px' }}
      />

      <m.g
        initial={{ x: 46, y: -46, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
      >
        <path d="M112 68 148 32" stroke="var(--color-line-strong)" strokeWidth="3" strokeLinecap="round" />
        <path d="M138 32h10v10" stroke="var(--color-brand-400)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="112" cy="68" r="5" fill="var(--color-brand-400)" />
      </m.g>
    </svg>
  );
}

/** Empty state for the review page when nothing is left to fix. */
export function AllClearArt({ className }: ArtProps) {
  const rows = [0, 1, 2];

  return (
    <svg viewBox="0 0 200 160" fill="none" className={frame(className)} role="img" aria-label="Không còn câu sai">
      <rect
        x="44"
        y="24"
        width="112"
        height="116"
        rx="14"
        fill="var(--color-surface)"
        stroke="var(--color-line-strong)"
        strokeWidth="2"
      />
      <rect x="78" y="14" width="44" height="20" rx="7" fill="var(--color-overlay)" stroke="var(--color-line-strong)" strokeWidth="2" />

      {rows.map((row) => {
        const y = 60 + row * 28;
        return (
          <g key={row}>
            <rect x="64" y={y - 8} width="16" height="16" rx="5" stroke="var(--color-pass)" strokeWidth="2" />
            <m.path
              d={`M68 ${y} l3.5 3.5L76 ${y - 4}`}
              stroke="var(--color-pass)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2 + row * 0.18, duration: 0.4, ease: easeOutExpo }}
            />
            <rect x="90" y={y - 4} width={52 - row * 10} height="7" rx="3.5" fill="var(--color-line-strong)" />
          </g>
        );
      })}
    </svg>
  );
}

/** Content that has not been authored yet, or a route that points at nothing. */
export function MissingArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={frame(className)} role="img" aria-label="Không có nội dung">
      <m.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        <path
          d="M62 26h50l28 28v80a8 8 0 0 1-8 8H62a8 8 0 0 1-8-8V34a8 8 0 0 1 8-8Z"
          fill="var(--color-surface)"
          stroke="var(--color-line-strong)"
          strokeWidth="2"
        />
        <path d="M112 26v28h28" stroke="var(--color-line-strong)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M74 80h44M74 96h32M74 112h20" stroke="var(--color-line)" strokeWidth="6" strokeLinecap="round" />
      </m.g>
      <m.circle
        cx="140"
        cy="118"
        r="20"
        fill="var(--color-overlay)"
        stroke="var(--color-line-strong)"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.25, duration: 0.4, ease: easeOutExpo }}
        style={{ originX: '140px', originY: '118px' }}
      />
      <path
        d="M135 113a5 5 0 1 1 6 5v3"
        stroke="var(--color-brand-400)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="141" cy="127" r="1.6" fill="var(--color-brand-400)" />
    </svg>
  );
}
