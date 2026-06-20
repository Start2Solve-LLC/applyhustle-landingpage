'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Applications tracker — mini kanban with company chips + a card that advances. */
export function TrackerBoardMock({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const cols = [
    { name: 'Applied', count: 42, dot: 'bg-muted-foreground', cards: ['NF', 'AB'] },
    { name: 'Screen', count: 11, dot: 'bg-info', cards: ['ST'] },
    { name: 'Interview', count: 5, dot: 'bg-primary', cards: ['FG'] },
    { name: 'Offer', count: 2, dot: 'bg-success', cards: ['VC'] },
  ];

  return (
    <div className={cn('flex h-full flex-col p-3', className)}>
      <div className="mb-2 flex items-center justify-between text-[10px]">
        <span className="font-semibold text-foreground">60 applications</span>
        <span className="font-semibold text-success">2 offers</span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-4 gap-1.5">
        {cols.map((c, ci) => (
          <div
            key={c.name}
            className="flex flex-col rounded-lg border border-border/60 bg-background/40 p-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-tight text-muted-foreground">
                <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
                <span className="truncate">{c.name}</span>
              </span>
            </div>
            <span className="text-sm font-bold tabular-nums text-foreground">{c.count}</span>
            <div className="mt-1 space-y-1">
              {c.cards.map((m) => (
                <div
                  key={m}
                  className="flex h-5 items-center gap-1 rounded-md border border-border/50 bg-card/70 px-1"
                >
                  <span className="grid h-3.5 w-3.5 place-items-center rounded bg-secondary text-[7px] font-bold text-foreground">
                    {m}
                  </span>
                  <span className="h-1 flex-1 rounded-full bg-foreground/10" />
                </div>
              ))}
              {/* A card advancing into the Interview column */}
              {ci === 2 && (
                <motion.div
                  className="flex h-5 items-center gap-1 rounded-md border border-primary/40 bg-accent-subtle px-1"
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={reduce ? { opacity: 1 } : { opacity: [0, 1, 1, 0], x: [-10, 0, 0, 6] }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 3, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 1 }
                  }
                >
                  <span className="grid h-3.5 w-3.5 place-items-center rounded bg-primary text-[7px] font-bold text-primary-foreground">
                    LN
                  </span>
                  <span className="h-1 flex-1 rounded-full bg-primary/30" />
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
