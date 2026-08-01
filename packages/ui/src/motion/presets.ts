import type { Transition, Variants } from 'motion/react';

/** Matches `--ease-out-expo` in tokens.css so JS and CSS animations decelerate identically. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Matches `--ease-out-back` in tokens.css: overshoots past the target before settling. */
export const easeOutBack = [0.34, 1.56, 0.64, 1] as const;

export const transition = {
  quick: { duration: 0.2, ease: easeOutExpo },
  normal: { duration: 0.32, ease: easeOutExpo },
  slow: { duration: 0.56, ease: easeOutExpo },
  /** For hover/tap acknowledgements that should read as bouncy rather than smooth. */
  bouncy: { type: 'spring', stiffness: 420, damping: 18, mass: 0.6 },
} satisfies Record<string, Transition>;

/** Content arriving on screen: a short rise paired with a fade. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transition.normal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.normal },
};

/** Overlays and popovers, which read better growing from slightly small. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.quick },
  exit: { opacity: 0, scale: 0.96, transition: transition.quick },
};

/**
 * Parent variant for lists. Children inherit `hidden`/`visible` automatically, so a grid of
 * cards only needs `variants={stagger()}` on the wrapper and `variants={fadeUp}` on each item.
 */
export function stagger(gap = 0.05, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: gap, delayChildren: delay },
    },
  };
}

/**
 * Lift-and-bounce for clickable cards: a spring drives the hover so it overshoots slightly
 * before settling, and the tap squishes down with the same energetic feel.
 */
export const hoverLift = {
  whileHover: { y: -6, scale: 1.015, transition: transition.bouncy },
  whileTap: { scale: 0.96, y: -1, transition: { duration: 0.12 } },
} as const;

/** Icon shake for hover — small rotation wiggle rather than a lift, for badges and glyphs. */
export const hoverWiggle = {
  whileHover: { rotate: [0, -10, 10, -6, 0], transition: { duration: 0.45, ease: easeOutBack } },
} as const;
