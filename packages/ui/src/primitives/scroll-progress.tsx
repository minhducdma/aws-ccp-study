import { useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { cn } from '../lib/cn';

/**
 * Thin bar showing how far down the page the reader is.
 *
 * Driven by a MotionValue and a spring, so it updates outside React's render cycle and stays
 * smooth on long notes. Purely decorative, hence hidden from assistive tech.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 34, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-gradient-to-r from-info to-brand-400',
        className,
      )}
    />
  );
}
