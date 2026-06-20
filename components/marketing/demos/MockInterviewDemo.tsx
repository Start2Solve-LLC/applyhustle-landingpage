'use client';

import { Lightbulb, Mic } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { GaugeRing } from '@/components/marketing/primitives';
import { cn } from '@/lib/utils';
import { DemoShell, DemoStepper, useStepCycle } from './DemoFrame';

const STEPS = ['Question', 'Answer', 'Score'];
const DIMS = [
  { label: 'Structure (STAR)', value: 88 },
  { label: 'Clarity', value: 82 },
  { label: 'Relevance', value: 86 },
];
const BARS = [10, 18, 12, 22, 16, 26, 14, 20, 12, 24, 16, 10];

/** Demo: AI asks a question, you answer aloud, it scores STAR + coaches you. */
export function MockInterviewDemo() {
  const reduce = useReducedMotion();
  const step = useStepCycle(STEPS.length, 2400);

  return (
    <DemoShell>
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Question bubble */}
        <div className="flex items-start gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-subtle text-primary">
            <Mic className="h-3.5 w-3.5" />
          </span>
          <div className="rounded-lg rounded-tl-sm border border-border/60 bg-background/40 px-3 py-2 text-xs text-foreground">
            &ldquo;Tell me about a system you designed and scaled.&rdquo;
          </div>
        </div>

        {/* Middle stage: listening waveform OR score gauge */}
        <div className="grid min-h-[120px] flex-1 place-items-center">
          <AnimatePresence mode="wait">
            {step < 2 ? (
              <motion.div
                key="listen"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-12 items-end gap-1">
                  {BARS.map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 rounded-full bg-primary"
                      style={{ height: h }}
                      animate={
                        reduce || step !== 1
                          ? { scaleY: 0.5 }
                          : { scaleY: [0.4, 1.4, 0.7, 1.1, 0.4] }
                      }
                      transition={{
                        duration: 0.9,
                        repeat: step === 1 ? Infinity : 0,
                        delay: i * 0.05,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {step === 0 ? 'preparing question…' : 'listening to your answer…'}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="score"
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex w-full items-center gap-4"
              >
                <GaugeRing value={84} size={88} stroke={8} label="Overall" />
                <div className="flex-1 space-y-2">
                  {DIMS.map((d, i) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">{d.label}</span>
                        <span className="font-semibold text-foreground">{d.value}</span>
                      </div>
                      <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${d.value}%` }}
                          transition={{ duration: reduce ? 0 : 0.7, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Coach tip on score step */}
        <div className="min-h-[34px]">
          {step >= 2 && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex items-start gap-1.5 rounded-lg border border-border/60 bg-background/40 p-2 text-[11px] leading-relaxed text-muted-foreground',
              )}
            >
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
              <span>
                <span className="font-semibold text-foreground">Coach:</span> Quantify impact —
                &ldquo;cut latency 40%&rdquo; beats &ldquo;improved performance.&rdquo;
              </span>
            </motion.p>
          )}
        </div>
      </div>

      <DemoStepper steps={STEPS} active={step} />
    </DemoShell>
  );
}
