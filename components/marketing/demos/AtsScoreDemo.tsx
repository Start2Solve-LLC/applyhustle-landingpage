'use client';

import { Check, FileText, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { GaugeRing } from '@/components/marketing/primitives';
import { cn } from '@/lib/utils';
import { DemoShell, DemoStepper, SkeletonLine, useStepCycle } from './DemoFrame';

const STEPS = ['Parse', 'Match', 'Score'];
const MATCHED = ['React', 'TypeScript', 'CI/CD', 'AWS'];
const MISSING = ['Kubernetes'];

/** Demo: a résumé is parsed, keywords matched, then scored against the ATS. */
export function AtsScoreDemo() {
  const reduce = useReducedMotion();
  const step = useStepCycle(STEPS.length, 2400);

  return (
    <DemoShell>
      <div className="grid flex-1 grid-cols-[1fr_1.1fr] gap-4 p-4">
        {/* Left: résumé being scanned */}
        <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background/40 p-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-subtle text-primary">
              <FileText className="h-3.5 w-3.5" />
            </span>
            <SkeletonLine className="w-20" />
          </div>
          <div className="mt-3 space-y-1.5">
            {['w-full', 'w-5/6', 'w-full', 'w-2/3', 'w-3/4', 'w-1/2'].map((w, i) => (
              <SkeletonLine
                key={i}
                className={cn(w, step >= 1 && i % 2 === 0 && 'bg-primary/30')}
              />
            ))}
          </div>
          {/* Scan beam during parse/match */}
          {!reduce && step < 2 && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-3 h-[2px] rounded-full [background:linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_92%,white),transparent)] [box-shadow:0_0_14px_2px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
              initial={{ top: '12%' }}
              animate={{ top: ['12%', '88%', '12%'] }}
              transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
            />
          )}
        </div>

        {/* Right: results build up per step */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <GaugeRing value={step >= 2 ? 92 : 0} size={84} stroke={8} label="ATS" />
            <div className="flex-1 space-y-2">
              {[
                { label: 'Keywords', value: 94 },
                { label: 'Experience', value: 90 },
                { label: 'Readability', value: 96 },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">{b.label}</span>
                    <span className="font-semibold text-foreground">
                      {step >= 2 ? b.value : 0}%
                    </span>
                  </div>
                  <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      animate={{ width: step >= 2 ? `${b.value}%` : '0%' }}
                      transition={{ duration: reduce ? 0 : 0.7, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keyword extraction appears at the match step */}
          <div className="mt-3 min-h-[44px]">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-wide text-muted-foreground/70">
              keywords detected
            </div>
            <div className="flex flex-wrap gap-1">
              <AnimatePresence>
                {step >= 1 &&
                  MATCHED.map((k, i) => (
                    <motion.span
                      key={k}
                      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: reduce ? 0 : i * 0.08 }}
                      className="inline-flex items-center gap-0.5 rounded-full bg-success-subtle px-1.5 py-0.5 text-[10px] font-medium text-success"
                    >
                      <Check className="h-2.5 w-2.5" /> {k}
                    </motion.span>
                  ))}
                {step >= 2 &&
                  MISSING.map((k) => (
                    <motion.span
                      key={k}
                      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-0.5 rounded-full bg-warning-subtle px-1.5 py-0.5 text-[10px] font-medium text-warning"
                    >
                      <Plus className="h-2.5 w-2.5" /> {k}
                    </motion.span>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <DemoStepper steps={STEPS} active={step} />
    </DemoShell>
  );
}
