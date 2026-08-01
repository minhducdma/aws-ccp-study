import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Wraps the app in the animation runtime.
 *
 * `domAnimation` is the subset of Motion covering transitions, gestures and exit animations —
 * everything this app uses — and skips the layout-projection and drag engines, roughly halving
 * what ships. `strict` makes the full `motion.*` components throw, which keeps anyone from
 * quietly importing the heavy bundle later; use the exported `m` instead.
 *
 * `reducedMotion="user"` defers to the OS setting: transforms are dropped and only opacity
 * remains, so the interface still communicates state changes without moving.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
