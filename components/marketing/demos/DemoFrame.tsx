'use client';

import { Check } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

/** Auto-advancing step index that loops 0..count-1. Holds on the final step
   under reduced motion (so the demo reads as its finished state, no churn). */
export function useStepCycle(count: number, intervalMs = 2200): number {
  const reduce = useReducedMotion();
  const [step, setStep] = React.useState(reduce ? count - 1 : 0);

  React.useEffect(() => {
    if (reduce) {
      setStep(count - 1);
      return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs, reduce]);

  return step;
}

/** Fixed-height shell so every tab's demo keeps the browser frame stable. */
export function DemoShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex h-[336px] flex-col', className)}>{children}</div>;
}

/** Techy bottom stepper — labels light up as the demo advances through stages. */
export function DemoStepper({ steps, active }: { steps: string[]; active: number }) {
  return (
    <div className="mt-auto flex items-center gap-2 border-t border-border/60 bg-secondary/30 px-4 py-2.5">
      {steps.map((label, i) => {
        const done = i < active;
        const cur = i === active;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] font-bold transition-colors duration-300',
                  cur
                    ? 'bg-primary text-primary-foreground'
                    : done
                      ? 'bg-success text-success-foreground'
                      : 'bg-secondary text-muted-foreground',
                )}
              >
                {done ? <Check className="h-2.5 w-2.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap font-mono text-[10px] transition-colors duration-300',
                  cur ? 'font-semibold text-foreground' : 'text-muted-foreground/70',
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  'h-px flex-1 transition-colors duration-300',
                  done ? 'bg-success/50' : 'bg-border/60',
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/** Small reusable file/skeleton line for résumé-style docs. */
export function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn('h-1.5 rounded-full bg-foreground/10', className)} />;
}
