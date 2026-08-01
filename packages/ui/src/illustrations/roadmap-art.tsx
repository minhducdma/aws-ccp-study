import * as m from 'motion/react-m';
import { useId } from 'react';
import { cn } from '../utils/cn';
import { easeOutExpo } from '../motion/presets';

const MILESTONES = [
  { x: 36, y: 196 },
  { x: 172, y: 150 },
  { x: 308, y: 96 },
  { x: 384, y: 66 },
];

/**
 * Hero art for the catalog: a climbing path across four milestones, matching the four phases a
 * course is split into. The route draws itself once on mount, then the clouds keep drifting.
 */
export function RoadmapArt({ className, label }: { className?: string; label: string }) {
  const uid = useId().replace(/:/g, '');
  const glowAmber = `${uid}-glow-amber`;
  const glowSky = `${uid}-glow-sky`;
  const routeGradient = `${uid}-route`;

  return (
    <svg
      viewBox="0 0 420 240"
      fill="none"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label={label}
    >
      <defs>
        <radialGradient id={glowAmber} cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={glowSky} cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--color-info)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-info)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={routeGradient} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-info)" />
          <stop offset="100%" stopColor="var(--color-brand-400)" />
        </linearGradient>
      </defs>

      <circle cx="330" cy="70" r="110" fill={`url(#${glowAmber})`} />
      <circle cx="80" cy="180" r="100" fill={`url(#${glowSky})`} />

      {/* Ground line, so the climb has something to read against */}
      <path d="M8 214h404" stroke="var(--color-line)" strokeWidth="1.5" strokeDasharray="2 7" />

      <m.path
        d="M36 196C108 196 100 150 172 150C244 150 236 96 308 96C350 96 360 78 384 66"
        stroke={`url(#${routeGradient})`}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: easeOutExpo }}
      />

      {MILESTONES.map((point, index) => {
        const isLast = index === MILESTONES.length - 1;
        return (
          <m.g
            key={`${point.x}-${point.y}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35 + index * 0.28, duration: 0.45, ease: easeOutExpo }}
            style={{ originX: `${point.x}px`, originY: `${point.y}px` }}
          >
            {isLast && (
              <circle
                cx={point.x}
                cy={point.y}
                r="14"
                className="animate-pulse-ring"
                style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                fill="var(--color-brand-500)"
              />
            )}
            <circle
              cx={point.x}
              cy={point.y}
              r="9"
              fill="var(--color-canvas)"
              stroke={isLast ? 'var(--color-brand-400)' : 'var(--color-info)'}
              strokeWidth="3"
            />
            {isLast && (
              <path
                d={`M${point.x - 4} ${point.y} l3 3 5-6`}
                stroke="var(--color-brand-300)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </m.g>
        );
      })}

      {/* Drifting clouds. Two speeds keeps the parallax from looking mechanical. */}
      <g className="animate-float" style={{ animationDuration: '7s' }}>
        <path
          d="M96 56a16 16 0 0 1 30-7 13 13 0 0 1 20 8 11 11 0 0 1-3 21H104a15 15 0 0 1-8-22Z"
          fill="var(--color-surface)"
          stroke="var(--color-line-strong)"
          strokeWidth="1.5"
        />
      </g>
      <g className="animate-float" style={{ animationDuration: '9s', animationDelay: '-3s' }}>
        <path
          d="M300 34a12 12 0 0 1 23-5 10 10 0 0 1 15 6 8 8 0 0 1-2 16h-33a11 11 0 0 1-3-17Z"
          fill="var(--color-surface)"
          stroke="var(--color-line-strong)"
          strokeWidth="1.5"
          opacity="0.7"
        />
      </g>

      {/* Loose service blocks orbiting the route */}
      <m.rect
        x="228"
        y="46"
        width="18"
        height="18"
        rx="5"
        fill="var(--color-brand-500)"
        opacity="0.25"
        animate={{ y: [46, 38, 46], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '237px', originY: '55px' }}
      />
      <m.rect
        x="60"
        y="112"
        width="14"
        height="14"
        rx="4"
        fill="var(--color-info)"
        opacity="0.3"
        animate={{ y: [112, 104, 112] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </svg>
  );
}
