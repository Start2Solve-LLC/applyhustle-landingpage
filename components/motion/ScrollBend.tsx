'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import * as React from 'react';

/**
 * Scroll-driven "bend": as the wrapped section travels through the viewport it
 * tilts on the X-axis (with perspective) — bent on entry from the bottom, flat
 * at centre, tilting away as it exits the top — plus a subtle scale/opacity dip
 * at the edges. Approximates the folding feel of heavy WebGL scroll sites with
 * cheap CSS transforms. No-op under reduced motion.
 */
export function ScrollBend({
  children,
  className,
  /** Max tilt in degrees at entry/exit. */
  intensity = 6,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [intensity, 0, -intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.55, 1, 1, 0.55]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={{ rotateX, scale, opacity, transformOrigin: 'center', willChange: 'transform' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
