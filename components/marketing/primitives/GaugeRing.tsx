'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { StatCounter } from './StatCounter';

/** Circular ATS-score gauge. Color thresholds mirror the real app. */
export function GaugeRing({
  value,
  size = 132,
  stroke = 10,
  label,
  sublabel,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const toneStroke =
    clamped >= 75 ? 'var(--success)' : clamped >= 50 ? 'var(--warning)' : 'var(--destructive)';
  const toneText =
    clamped >= 75 ? 'text-success' : clamped >= 50 ? 'text-warning' : 'text-destructive';

  return (
    <div className={cn('relative inline-grid place-items-center', className)}>
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke="var(--border)"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke={toneStroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={
            inView
              ? { strokeDashoffset: circ - (clamped / 100) * circ }
              : { strokeDashoffset: circ }
          }
          transition={reduce ? { duration: 0 } : { duration: 1.2, ease: EASE_OUT }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className={cn('text-3xl font-extrabold tracking-tight', toneText)}>
            <StatCounter to={clamped} />
          </div>
          {label && (
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </div>
          )}
          {sublabel && <div className="text-[10px] text-muted-foreground/70">{sublabel}</div>}
        </div>
      </div>
    </div>
  );
}
