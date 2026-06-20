'use client';

import { Check, Circle, Send } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Autonomous Auto-Apply activity stream (US Premium). Auto-appends rows and
   ticks the day counter, with a per-row ATS match % and a throughput summary. */
export function AutoApplyStream({
  guided = false,
  className,
}: {
  guided?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const seed = React.useMemo(
    () => [
      { company: 'Stripe', role: 'Software Engineer', t: '2s ago', match: 94 },
      { company: 'Notion', role: 'Product Engineer', t: '18s ago', match: 91 },
      { company: 'Figma', role: 'Frontend Engineer', t: '41s ago', match: 96 },
      { company: 'Linear', role: 'Fullstack Engineer', t: '1m ago', match: 89 },
      { company: 'Vercel', role: 'DX Engineer', t: '2m ago', match: 93 },
    ],
    [],
  );
  const [rows, setRows] = React.useState(seed.slice(0, 3));
  const [count, setCount] = React.useState(24);

  React.useEffect(() => {
    if (reduce) return;
    let i = 3;
    const id = setInterval(() => {
      setRows((prev) => [seed[i % seed.length], ...prev].slice(0, 4));
      setCount((c) => c + 1);
      i += 1;
    }, 2600);
    return () => clearInterval(id);
  }, [reduce, seed]);

  return (
    <div className={cn('flex h-full flex-col p-4', className)}>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          {guided ? 'GUIDED QUEUE' : 'AUTO-APPLYING'}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/70">
          today ·{' '}
          <motion.span
            key={count}
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="inline-block font-semibold text-foreground"
          >
            {count}
          </motion.span>
        </span>
      </div>

      {/* Throughput summary */}
      <div className="mb-2.5 grid grid-cols-3 gap-1.5">
        {[
          { k: '40', l: 'per day' },
          { k: '92%', l: 'avg match' },
          { k: '6', l: 'replies' },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-lg border border-border/50 bg-background/40 px-2 py-1.5 text-center"
          >
            <div className="text-sm font-extrabold tabular-nums text-foreground">{s.k}</div>
            <div className="text-[9px] uppercase tracking-wide text-muted-foreground/80">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 space-y-1.5">
        {rows.map((r, idx) => (
          <motion.div
            key={`${r.company}-${idx}-${r.t}`}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-background/40 px-2.5 py-2"
          >
            <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-md bg-secondary text-[10px] font-bold text-foreground">
              {r.company.slice(0, 2)}
              <span
                className={cn(
                  'absolute -bottom-1 -right-1 grid h-3.5 w-3.5 place-items-center rounded-full ring-2 ring-card',
                  guided ? 'bg-info text-info-foreground' : 'bg-success text-success-foreground',
                )}
              >
                {guided ? <Circle className="h-2 w-2" /> : <Check className="h-2 w-2" />}
              </span>
            </span>
            <span className="min-w-0 flex-1 truncate text-xs">
              <span className="font-semibold text-foreground">{r.company}</span>
              <span className="text-muted-foreground"> · {r.role}</span>
            </span>
            <span className="shrink-0 rounded-full bg-success-subtle px-1.5 py-0.5 font-mono text-[10px] font-semibold text-success">
              {r.match}%
            </span>
            <Send className="h-3 w-3 shrink-0 text-muted-foreground/50" />
            <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground/60 sm:inline">
              {r.t}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
