'use client';

import * as React from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '@/lib/motion';

/** Count-up number, triggered when scrolled into view (app primitive). */
export function StatCounter({
  to,
  from = 0,
  duration = 1.4,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [val, setVal] = React.useState(from);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
