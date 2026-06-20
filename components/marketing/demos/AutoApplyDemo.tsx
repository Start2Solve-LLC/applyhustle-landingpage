'use client';

import { Check, FileText, Send, Target } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { DemoShell, DemoStepper, useStepCycle } from './DemoFrame';

const STEPS = ['Match', 'Tailor', 'Apply'];
const NODES = [
  { icon: Target, label: 'Match role' },
  { icon: FileText, label: 'Tailor résumé' },
  { icon: Send, label: 'Submit' },
];
const QUEUE = [
  { company: 'Stripe', role: 'Software Engineer', match: 96 },
  { company: 'Notion', role: 'Product Engineer', match: 92 },
  { company: 'Figma', role: 'Frontend Engineer', match: 94 },
  { company: 'Linear', role: 'Fullstack Engineer', match: 90 },
];

/** Demo: the autopilot pipeline matches, tailors, and submits applications. */
export function AutoApplyDemo() {
  const reduce = useReducedMotion();
  const step = useStepCycle(STEPS.length, 2200);
  const [sent, setSent] = React.useState(reduce ? 24 : 18);

  React.useEffect(() => {
    if (reduce) return;
    if (step === 2) setSent((s) => s + 1);
  }, [step, reduce]);

  return (
    <DemoShell>
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Pipeline diagram */}
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2.5">
          {NODES.map((n, i) => {
            const Icon = n.icon;
            const on = step >= i;
            return (
              <React.Fragment key={n.label}>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={{
                      backgroundColor: on
                        ? 'color-mix(in oklab, var(--primary) 16%, transparent)'
                        : 'var(--secondary)',
                    }}
                    className="grid h-7 w-7 place-items-center rounded-lg"
                  >
                    <Icon
                      className={cn('h-3.5 w-3.5', on ? 'text-primary' : 'text-muted-foreground')}
                    />
                  </motion.span>
                  <span
                    className={cn(
                      'font-mono text-[10px]',
                      on ? 'font-semibold text-foreground' : 'text-muted-foreground/70',
                    )}
                  >
                    {n.label}
                  </span>
                </div>
                {i < NODES.length - 1 && (
                  <div className="mx-1.5 h-px flex-1 overflow-hidden bg-border/60">
                    <motion.div
                      className="h-full bg-primary"
                      animate={{ width: step > i ? '100%' : '0%' }}
                      transition={{ duration: reduce ? 0 : 0.5 }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live throughput */}
        <div className="flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center gap-1.5 font-semibold text-muted-foreground">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            AUTOPILOT ACTIVE
          </span>
          <span className="font-mono text-muted-foreground/70">
            sent today ·{' '}
            <motion.span
              key={sent}
              initial={reduce ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-foreground"
            >
              {sent}
            </motion.span>
          </span>
        </div>

        {/* Application queue */}
        <div className="min-h-0 flex-1 space-y-1.5">
          {QUEUE.map((q, i) => {
            const done = step === 2 || i > 0;
            return (
              <motion.div
                key={q.company}
                layout={!reduce}
                className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-background/40 px-2.5 py-2"
              >
                <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-md bg-secondary text-[10px] font-bold text-foreground">
                  {q.company.slice(0, 2)}
                  <AnimatePresence>
                    {done && (
                      <motion.span
                        initial={reduce ? false : { scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 -right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-success text-success-foreground ring-2 ring-card"
                      >
                        <Check className="h-2 w-2" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="min-w-0 flex-1 truncate text-xs">
                  <span className="font-semibold text-foreground">{q.company}</span>
                  <span className="text-muted-foreground"> · {q.role}</span>
                </span>
                <span className="shrink-0 rounded-full bg-success-subtle px-1.5 py-0.5 font-mono text-[10px] font-semibold text-success">
                  {q.match}%
                </span>
                <span
                  className={cn(
                    'shrink-0 font-mono text-[9px]',
                    done ? 'text-success' : 'text-primary',
                  )}
                >
                  {done ? 'sent' : step === 1 ? 'tailoring…' : 'queued'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <DemoStepper steps={STEPS} active={step} />
    </DemoShell>
  );
}
