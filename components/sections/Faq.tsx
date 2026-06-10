'use client';

import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { faqSection } from '@/data/faq';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Animated single-open FAQ accordion — port of the app's Faq. */
export function Faq() {
  const reduce = useReducedMotion();
  const { title, entries } = faqSection;
  const [openEntryId, setOpenEntryId] = useState<string | null>(entries[0]?.id ?? null);

  return (
    <section id="faq" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal from="up">
          <h2 className="text-center text-display-lg text-foreground">{title}</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {entries.map((entry, i) => {
            const open = openEntryId === entry.id;
            const panelId = `faq-panel-${entry.id}`;
            const buttonId = `faq-button-${entry.id}`;
            return (
              <Reveal key={entry.id} from="up" delay={Math.min(i, 6) * 0.04}>
                <div
                  className={cn(
                    'rounded-2xl border bg-card/50 backdrop-blur-sm transition-colors',
                    open ? 'border-primary/40' : 'border-border/60',
                  )}
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenEntryId(open ? null : entry.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-foreground">
                      {entry.question}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors',
                        open
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        key="panel"
                        initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                          {entry.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
