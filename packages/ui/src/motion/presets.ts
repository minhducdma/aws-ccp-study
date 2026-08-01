import type { Transition, Variants } from 'motion/react';

/** Matches `--ease-out-expo` in tokens.css so JS and CSS animations decelerate identically. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const transition = {
  quick: { duration: 0.2, ease: easeOutExpo },
  normal: { duration: 0.32, ease: easeOutExpo },
  slow: { duration: 0.56, ease: easeOutExpo },
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

/** Lift-on-hover for clickable cards. Paired with `whileTap` to acknowledge the press. */
export const hoverLift = {
  whileHover: { y: -4, transition: transition.quick },
  whileTap: { scale: 0.985, transition: { duration: 0.1 } },
} as const;
