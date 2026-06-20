'use client';

import { ArrowRight, MessagesSquare, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { faqSection } from '@/data/faq';
import { EASE_OUT } from '@/lib/motion';
import { appUrl, cn } from '@/lib/utils';

/** Two-column FAQ — sticky intro + topic filter on the left, accordion on the right. */
export function Faq() {
  const reduce = useReducedMotion();
  const { title, intro, support, entries } = faqSection;

  // Filter chips: "All" + unique categories (in first-seen order).
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(entries.map((e) => e.category)))],
    [entries],
  );

  const [activeCat, setActiveCat] = useState('All');
  const [openId, setOpenId] = useState<string | null>(entries[0]?.id ?? null);

  const visible = useMemo(
    () => entries.filter((e) => activeCat === 'All' || e.category === activeCat),
    [entries, activeCat],
  );

  const selectCat = (cat: string) => {
    setActiveCat(cat);
    const next = entries.filter((e) => cat === 'All' || e.category === cat);
    setOpenId(next[0]?.id ?? null);
  };

  return (
    <section id="faq" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[330px_1fr] lg:gap-14">
        {/* ── Left rail ── */}
        <Reveal from="up" className="lg:sticky lg:top-24 lg:self-start">
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-wider text-primary">
            <span className="h-px w-6 bg-primary/50" /> Help center
          </span>
          <h2 className="mt-3 font-display text-display-lg text-foreground">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{intro}</p>

          {/* Topic filter chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = cat === activeCat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => selectCat(cat)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                    active
                      ? 'border-accent-subtle-border bg-accent-subtle text-primary'
                      : 'border-border/60 text-muted-foreground hover:border-hairline-strong hover:text-foreground',
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Support card */}
          <div className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-subtle text-primary">
                <MessagesSquare className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-foreground">{support.heading}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{support.body}</p>
            <ButtonLink
              href={appUrl(support.ctaAppPath)}
              variant="outline"
              size="sm"
              className="group mt-3 w-full"
            >
              {support.ctaLabel}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </Reveal>

        {/* ── Accordion ── */}
        <div className="min-w-0">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((entry) => {
              const open = openId === entry.id;
              const panelId = `faq-panel-${entry.id}`;
              const buttonId = `faq-button-${entry.id}`;
              return (
                <motion.div
                  key={entry.id}
                  layout={!reduce}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0 : 0.25, ease: EASE_OUT }}
                  className={cn(
                    'mb-3 overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm transition-colors',
                    open ? 'border-primary/40 shadow-elev-2' : 'border-border/60',
                  )}
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : entry.id)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-[10px] font-bold uppercase tracking-wider text-primary/70">
                        {entry.category}
                      </span>
                      <span className="mt-1 block text-[15px] font-semibold text-foreground">
                        {entry.question}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-300',
                        open
                          ? 'rotate-45 bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <Plus className="h-4 w-4" />
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
                        <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                          {entry.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
