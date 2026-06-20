'use client';

import { BadgeCheck, MapPin, Radar } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { StatCounter } from '@/components/marketing/primitives';
import { cn } from '@/lib/utils';
import { DemoShell, DemoStepper, useStepCycle } from './DemoFrame';

const STEPS = ['Scan roles', 'Filter', 'Match'];
const FILTERS = ['Remote', 'Sponsors visa', '$150k+', 'Senior'];
const JOBS = [
  { company: 'Stripe', role: 'Software Engineer', loc: 'New York', match: 96, visa: true },
  { company: 'Datadog', role: 'Frontend Engineer', loc: 'Remote', match: 91, visa: true },
  { company: 'Linear', role: 'Product Engineer', loc: 'Remote', match: 88, visa: false },
];

/** Demo: scan the market, apply your filters, surface ranked matches. */
export function JobFeedDemo() {
  const reduce = useReducedMotion();
  const step = useStepCycle(STEPS.length, 2400);

  return (
    <DemoShell>
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Scan header */}
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
            <motion.span
              animate={reduce || step !== 0 ? {} : { rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-primary"
            >
              <Radar className="h-4 w-4" />
            </motion.span>
            Scanning openings
          </span>
          <span className="font-mono text-xs font-bold tabular-nums text-primary">
            <StatCounter to={2412} duration={2} /> roles
          </span>
        </div>

        {/* Filters activate at step 1 */}
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f, i) => {
            const on = step >= 1;
            return (
              <motion.span
                key={f}
                animate={{ opacity: on ? 1 : 0.4 }}
                transition={{ delay: reduce ? 0 : on ? i * 0.1 : 0 }}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors',
                  on
                    ? 'border-accent-subtle-border bg-accent-subtle text-primary'
                    : 'border-border/60 text-muted-foreground',
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    on ? 'bg-primary' : 'bg-muted-foreground/40',
                  )}
                />
                {f}
              </motion.span>
            );
          })}
        </div>

        {/* Matched results at step 2 */}
        <div className="min-h-0 flex-1 space-y-1.5">
          <AnimatePresence>
            {step >= 2 &&
              JOBS.map((j, i) => (
                <motion.div
                  key={j.company}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : i * 0.12 }}
                  className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-background/40 p-2"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-[10px] font-bold text-foreground">
                    {j.company.slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-foreground">
                      {j.role}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      {j.company}
                      <span className="inline-flex items-center gap-0.5">
                        <MapPin className="h-2.5 w-2.5" />
                        {j.loc}
                      </span>
                    </div>
                  </div>
                  {j.visa && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-info">
                      <BadgeCheck className="h-2.5 w-2.5" /> Visa
                    </span>
                  )}
                  <div className="w-10 shrink-0 text-right">
                    <span className="font-mono text-xs font-bold text-success">{j.match}%</span>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <DemoStepper steps={STEPS} active={step} />
    </DemoShell>
  );
}
