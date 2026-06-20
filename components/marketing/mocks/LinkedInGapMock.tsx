'use client';

import { Check, Circle } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { LinkedInGlyph } from '../primitives';

/** LinkedIn gap analysis — strength meter + quick-win checklist. */
export function LinkedInGapMock({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const gaps = [
    { text: 'Keyword-rich headline', done: true },
    { text: 'Quantify top 3 wins', done: true },
    { text: 'Expand "About" section', done: false },
  ];
  const doneCount = gaps.filter((g) => g.done).length;

  return (
    <div ref={ref} className={cn('flex h-full flex-col p-4', className)}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-info-subtle text-info">
          <LinkedInGlyph className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-foreground">Profile strength</span>
            <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
              {doneCount}/3 done
            </span>
          </div>
          {/* Strength meter */}
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-info"
              initial={{ width: 0 }}
              animate={inView ? { width: '74%' } : { width: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-0.5 flex items-center justify-between text-[10px]">
            <span className="font-semibold text-foreground">7.4 / 10</span>
            <span className="text-success">+1.8 if you finish</span>
          </div>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5">
        {gaps.map((g) => (
          <li key={g.text} className="flex items-center gap-2 text-[11px]">
            <span
              className={cn(
                'grid h-4 w-4 shrink-0 place-items-center rounded-full',
                g.done ? 'bg-success-subtle text-success' : 'bg-secondary text-muted-foreground',
              )}
            >
              {g.done ? <Check className="h-2.5 w-2.5" /> : <Circle className="h-2 w-2" />}
            </span>
            <span className={cn(g.done ? 'text-muted-foreground line-through' : 'text-foreground')}>
              {g.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
