import { animate, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect } from 'react';
import { easeOutExpo } from '../../motion/presets';

export interface CountUpProps {
  value: number;
  /** Rendered right after the number without a space, e.g. `%`. */
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Counts from zero up to `value` on mount.
 *
 * The tween drives a MotionValue that Motion renders straight into the DOM text node, so the
 * sixty-frames-a-second updates never round-trip through React state.
 */
export function CountUp({ value, suffix = '', decimals = 0, className }: CountUpProps) {
  const reduced = useReducedMotion();
  const count = useMotionValue(reduced ? value : 0);
  const text = useTransform(count, (latest) => `${latest.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (reduced) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 0.9, ease: easeOutExpo });
    return () => controls.stop();
  }, [count, reduced, value]);

  return <m.span className={className}>{text}</m.span>;
}
