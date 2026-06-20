'use client';

import { AlertTriangle, ArrowRight, Check, Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { DemoShell, DemoStepper, SkeletonLine, useStepCycle } from './DemoFrame';

const STEPS = ['Analyze', 'Rewrite', 'Result'];
const ISSUES = ['Weak verbs', 'No metrics', 'Keyword gaps'];
const FIXES = ['+12 keywords', 'Quantified impact', 'ATS-clean format'];

/** Demo: a weak résumé is analyzed, rewritten by AI, and rescored 62 → 96. */
export function ResumeRedesignDemo() {
  const reduce = useReducedMotion();
  const step = useStepCycle(STEPS.length, 2400);
  const after = step >= 2;

  return (
    <DemoShell>
      <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-3 p-4">
        {/* Before doc */}
        <DocCard tone="bad" score={62} label="Before" highlight={step >= 0} rewriting={false} />

        {/* Middle: arrow + state */}
        <div className="flex flex-col items-center gap-1.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={after ? 'gain' : 'delta'}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                after ? 'bg-success-subtle text-success' : 'bg-secondary text-muted-foreground',
              )}
            >
              {after ? '+34' : 'AI'}
            </motion.span>
          </AnimatePresence>
          <motion.div
            animate={reduce ? {} : { x: step === 1 ? [0, 4, 0] : 0 }}
            transition={{ duration: 0.8, repeat: step === 1 ? Infinity : 0 }}
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </motion.div>
          {step === 1 && (
            <span className="inline-flex items-center gap-0.5 font-mono text-[9px] text-primary">
              <Sparkles className="h-2.5 w-2.5 animate-pulse" /> rewriting
            </span>
          )}
        </div>

        {/* After doc */}
        <DocCard
          tone="good"
          score={after ? 96 : 0}
          label="After"
          highlight={after}
          rewriting={step === 1}
        />
      </div>

      {/* Issues → fixes ledger */}
      <div className="px-4 pb-1">
        <div className="flex min-h-[26px] flex-wrap gap-1">
          <AnimatePresence mode="popLayout">
            {!after
              ? ISSUES.map((t, i) => (
                  <motion.span
                    key={`i-${t}`}
                    initial={reduce ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: reduce ? 0 : i * 0.08 }}
                    className="inline-flex items-center gap-0.5 rounded-full bg-destructive-subtle px-1.5 py-0.5 text-[10px] font-medium text-destructive"
                  >
                    <AlertTriangle className="h-2.5 w-2.5" /> {t}
                  </motion.span>
                ))
              : FIXES.map((t, i) => (
                  <motion.span
                    key={`f-${t}`}
                    initial={reduce ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : i * 0.08 }}
                    className="inline-flex items-center gap-0.5 rounded-full bg-success-subtle px-1.5 py-0.5 text-[10px] font-medium text-success"
                  >
                    <Check className="h-2.5 w-2.5" /> {t}
                  </motion.span>
                ))}
          </AnimatePresence>
        </div>
      </div>

      <DemoStepper steps={STEPS} active={step} />
    </DemoShell>
  );
}

function DocCard({
  tone,
  score,
  label,
  highlight,
  rewriting,
}: {
  tone: 'bad' | 'good';
  score: number;
  label: string;
  highlight: boolean;
  rewriting: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border bg-background/40 p-3 transition-colors',
        tone === 'good' && highlight ? 'border-success/40' : 'border-border/60',
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <span
          className={cn(
            'text-base font-extrabold tabular-nums',
            tone === 'good' ? 'text-success' : 'text-destructive',
          )}
        >
          {score}
        </span>
      </div>
      <div className="space-y-1.5">
        {['w-full', 'w-5/6', 'w-3/4', 'w-2/3'].map((w, i) => (
          <SkeletonLine
            key={i}
            className={cn(
              w,
              tone === 'good' && highlight && i < 2 && 'bg-success/30',
              tone === 'bad' && highlight && i === 1 && 'bg-destructive/30',
            )}
          />
        ))}
      </div>
      {rewriting && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:linear-gradient(110deg,transparent_30%,color-mix(in_oklab,var(--primary)_18%,transparent)_50%,transparent_70%)]"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}
