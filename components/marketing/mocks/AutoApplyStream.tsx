'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Circle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/motion';

/** Autonomous Auto-Apply activity stream (US Premium). Auto-appends rows in view. */
export function AutoApplyStream({ guided = false, className }: { guided?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const seed = React.useMemo(
    () => [
      { company: 'Stripe', role: 'Software Engineer', t: '2s ago' },
      { company: 'Notion', role: 'Product Engineer', t: '18s ago' },
      { company: 'Figma', role: 'Frontend Engineer', t: '41s ago' },
      { company: 'Linear', role: 'Fullstack Engineer', t: '1m ago' },
      { company: 'Vercel', role: 'DX Engineer', t: '2m ago' },
    ],
    [],
  );
  const [rows, setRows] = React.useState(seed.slice(0, 3));

  React.useEffect(() => {
    if (reduce) return;
    let i = 3;
    const id = setInterval(() => {
      setRows((prev) => [seed[i % seed.length], ...prev].slice(0, 4));
      i += 1;
    }, 2600);
    return () => clearInterval(id);
  }, [reduce, seed]);

  return (
    <div className={cn('p-4', className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          {guided ? 'GUIDED QUEUE' : 'AUTO-APPLYING'}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/70">today · 24</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r, idx) => (
          <motion.div
            key={`${r.company}-${idx}-${r.t}`}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-background/40 px-3 py-2"
          >
            <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-md', guided ? 'bg-info-subtle text-info' : 'bg-success-subtle text-success')}>
              {guided ? <Circle className="h-3 w-3" /> : <Check className="h-3 w-3" />}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs">
              <span className="font-semibold text-foreground">{r.company}</span>
              <span className="text-muted-foreground"> · {r.role}</span>
            </span>
            <Send className="h-3 w-3 shrink-0 text-muted-foreground/60" />
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground/60">{r.t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
