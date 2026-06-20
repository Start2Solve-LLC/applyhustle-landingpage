'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Interactive 3D tilt: the card bends toward the pointer (rotateX/Y with
 * perspective) and lifts slightly on hover, springing back flat on leave.
 * Plain passthrough under reduced motion.
 */
export function TiltCard({
  children,
  className,
  /** Max tilt in degrees toward the pointer. */
  max = 9,
  /** Scale applied while hovered. */
  scale = 1.03,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  // Pointer position within the card, 0..1 (centred at 0.5).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const config = { stiffness: 220, damping: 22, mass: 0.4 };
  const sx = useSpring(px, config);
  const sy = useSpring(py, config);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ scale }}
      transition={{ type: 'spring', ...config }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        willChange: 'transform',
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
