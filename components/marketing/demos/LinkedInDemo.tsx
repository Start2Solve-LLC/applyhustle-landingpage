'use client';

import { Check, Circle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { LinkedInGlyph } from '@/components/marketing/primitives';
import { cn } from '@/lib/utils';
import { DemoShell, DemoStepper, SkeletonLine, useStepCycle } from './DemoFrame';

const STEPS = ['Scan profile', 'Find gaps', 'Boost'];
const SECTIONS = ['Headline', 'About', 'Experience', 'Skills'];
const FIXES = ['Keyword-rich headline', 'Quantify top 3 wins', 'Expand "About" section'];

/** Demo: scan the profile section-by-section, surface gaps, raise the score. */
export function LinkedInDemo() {
  const reduce = useReducedMotion();
  const step = useStepCycle(STEPS.length, 2400);
  const strength = step >= 2 ? 9.2 : 7.4;
  const pct = step >= 2 ? 92 : 74;

  return (
    <DemoShell>
      <div className="grid flex-1 grid-cols-[1fr_1.05fr] gap-4 p-4">
        {/* Profile being scanned */}
        <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background/40 p-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-info-subtle text-info">
              <LinkedInGlyph className="h-4 w-4" />
            </span>
            <div className="space-y-1">
              <SkeletonLine className="w-24" />
              <SkeletonLine className="w-16" />
            </div>
          </div>
          <div className="mt-3 space-y-2.5">
            {SECTIONS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-colors',
                    step >= 1 ? 'bg-info' : 'bg-muted-foreground/30',
                  )}
                />
                <span className="text-[10px] font-medium text-muted-foreground">{s}</span>
                <SkeletonLine className={cn('flex-1', step >= 1 && i < 3 && 'bg-info/25')} />
              </div>
            ))}
          </div>
          {!reduce && step === 0 && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-3 h-[2px] rounded-full [background:linear-gradient(90deg,transparent,color-mix(in_oklab,var(--info)_90%,white),transparent)]"
              initial={{ top: '20%' }}
              animate={{ top: ['20%', '85%', '20%'] }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            />
          )}
        </div>

        {/* Strength + fixes */}
        <div className="flex flex-col">
          <div className="rounded-lg border border-border/60 bg-background/40 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Profile strength</span>
              <motion.span
                key={strength}
                initial={reduce ? false : { opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono font-bold text-info"
              >
                {strength.toFixed(1)} / 10
              </motion.span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-info"
                animate={{ width: `${pct}%` }}
                transition={{ duration: reduce ? 0 : 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          <ul className="mt-3 space-y-2">
            {FIXES.map((f, i) => {
              const fixed = step >= 2 || (step >= 1 && i < 2);
              return (
                <li key={f} className="flex items-center gap-2 text-[11px]">
                  <span
                    className={cn(
                      'grid h-4 w-4 shrink-0 place-items-center rounded-full transition-colors',
                      fixed
                        ? 'bg-success-subtle text-success'
                        : 'bg-secondary text-muted-foreground',
                    )}
                  >
                    {fixed ? <Check className="h-2.5 w-2.5" /> : <Circle className="h-2 w-2" />}
                  </span>
                  <span
                    className={cn(
                      'transition-colors',
                      fixed ? 'text-muted-foreground line-through' : 'text-foreground',
                    )}
                  >
                    {f}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <DemoStepper steps={STEPS} active={step} />
    </DemoShell>
  );
}
