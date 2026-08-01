import * as m from 'motion/react-m';
import { useId } from 'react';
import { cn } from '../utils/cn';

export function StudyBuddyArt({ className, label }: { className?: string; label: string }) {
  const uid = useId().replace(/:/g, '');
  const sky = `${uid}-sky`;

  return (
    <svg
      viewBox="0 0 360 270"
      fill="none"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={sky} x1="54" y1="34" x2="296" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dff4ff" />
          <stop offset="1" stopColor="#fff2bd" />
        </linearGradient>
      </defs>

      <path d="M40 128C40 66 93 28 174 28c87 0 151 44 151 108 0 67-66 109-153 109C91 245 40 200 40 128Z" fill={`url(#${sky})`} />
      <m.circle
        cx="287"
        cy="54"
        r="14"
        fill="var(--color-brand-300)"
        animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.path
        d="M67 72c5-15 25-16 32-3 13-6 27 3 27 17H65c-6-5-5-11 2-14Z"
        fill="var(--color-overlay)"
        stroke="var(--color-line-strong)"
        strokeWidth="2"
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <ellipse cx="177" cy="224" rx="107" ry="13" fill="var(--color-info)" opacity="0.11" />
      <path d="M111 177h139l-11 49H121l-10-49Z" fill="#bde6d4" stroke="#6ba88e" strokeWidth="2" />
      <path d="M98 174h164v10H98z" fill="#ffe18a" stroke="#d9a923" strokeWidth="2" />

      <path d="M151 130c-18 4-27 22-24 45h73c3-24-9-42-27-46l-22 1Z" fill="#55b8dc" />
      <circle cx="163" cy="103" r="31" fill="#ffd1a3" />
      <path d="M135 102c0-26 18-41 37-35 13 3 24 15 23 30-12-2-23-9-29-19-5 13-16 21-31 24Z" fill="#334d68" />
      <path d="M134 95c-9 0-10 16 2 17M192 95c9 0 10 16-2 17" stroke="#e4a878" strokeWidth="3" strokeLinecap="round" />
      <circle cx="152" cy="102" r="2.5" fill="#334d68" />
      <circle cx="176" cy="102" r="2.5" fill="#334d68" />
      <path d="M156 116c5 4 11 4 16 0" stroke="#c76e61" strokeWidth="2.5" strokeLinecap="round" />

      <path d="M126 148c-13 5-25 15-33 30M200 147c15 5 25 15 34 30" stroke="#ffd1a3" strokeWidth="13" strokeLinecap="round" />
      <path d="M126 135c-10 2-19 8-25 17l17 12 16-18-8-11ZM199 134c12 2 21 9 27 18l-17 12-18-19 8-11Z" fill="#55b8dc" />

      <m.g
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '164px', originY: '171px' }}
      >
        <path d="M112 150c19-4 37 2 52 15v45c-17-12-34-17-52-13v-47Z" fill="var(--color-overlay)" stroke="#d9a923" strokeWidth="2" />
        <path d="M216 150c-19-4-37 2-52 15v45c17-12 34-17 52-13v-47Z" fill="var(--color-overlay)" stroke="#d9a923" strokeWidth="2" />
        <path d="M164 165v45" stroke="#d9a923" strokeWidth="2" />
        <path d="M125 166h24M125 176h29M179 166h24M175 176h28" stroke="var(--color-line-strong)" strokeWidth="3" strokeLinecap="round" />
      </m.g>

      <m.g
        animate={{ y: [0, -9, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="m275 105 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" fill="var(--color-brand-400)" />
      </m.g>
      <circle cx="74" cy="143" r="7" fill="var(--color-pass)" opacity="0.55" />
      <rect x="293" y="165" width="16" height="16" rx="5" fill="var(--color-info)" opacity="0.45" transform="rotate(12 293 165)" />
    </svg>
  );
}