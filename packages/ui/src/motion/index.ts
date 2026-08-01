export { MotionProvider } from './provider';
export * from './presets';

/**
 * `m` is the tree-shakeable twin of `motion` — same API, but the animation features come from
 * the LazyMotion provider instead of being bundled with every component.
 */
export * as m from 'motion/react-m';
export { AnimatePresence, useReducedMotion } from 'motion/react';
