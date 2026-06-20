'use client';

import { Lightbulb, TrendingUp } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { GaugeRing } from '../primitives';

/** AI mock-interview report (illustrative data, mirrors the app's mock). */
export function InterviewReportCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const dims = [
    { label: 'Structure (STAR)', score: 88 },
    { label: 'Clarity', score: 82 },
    { label: 'Relevance', score: 86 },
  ];

  return (
    <div ref={ref} className={cn('flex h-full flex-col gap-3 p-4', className)}>
      <div className="flex items-center gap-3">
        <GaugeRing value={84} size={84} stroke={8} label="Overall" />
        <div className="min-w-0 flex-1 space-y-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-success-subtle px-1.5 py-0.5 text-[10px] font-semibold text-success">
            <TrendingUp className="h-3 w-3" /> +6 vs last
          </span>
          {dims.map((d, i) => (
            <div key={d.label}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">{d.label}</span>
                <span className="font-semibold tabular-nums text-foreground">{d.score}</span>
              </div>
              <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${d.score}%` } : { width: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.1 + i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="font-mono text-[10px] text-muted-foreground/80">
        Q: &ldquo;Tell me about a system you scaled.&rdquo;
      </p>

      <p className="flex items-start gap-1.5 rounded-lg border border-border/60 bg-background/40 p-2.5 text-[11px] leading-relaxed text-muted-foreground">
        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
        <span>
          <span className="font-semibold text-foreground">Coach:</span> Quantify the impact —
          &ldquo;cut latency 40%&rdquo; lands harder than &ldquo;improved performance.&rdquo;
        </span>
      </p>
    </div>
  );
}
