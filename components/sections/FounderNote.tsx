'use client';

import { ArrowRight, Quote } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { TiltCard } from '@/components/motion/TiltCard';
import { ButtonLink } from '@/components/ui/Button';
import { founderNote } from '@/data/founder';
import { appUrl, cn } from '@/lib/utils';

/** Founder's note — an elevated, signed letter from the founder. */
export function FounderNote() {
  const { eyebrow, founderInitial, founderName, founderTitle, paragraphs, ctaLabel, ctaAppPath } =
    founderNote;

  return (
    <section id="founder" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-6xl md:w-[85%]">
        <Reveal from="up" distance={48} scale={0.9} duration={0.6}>
          <TiltCard max={5} scale={1.01}>
            {/* Gradient hairline frame for an elevated edge */}
            <div className="rounded-[24px] bg-gradient-to-b from-accent-subtle-border via-border/50 to-transparent p-px shadow-elev-4">
              <div className="relative overflow-hidden rounded-[23px] bg-card/80 px-6 py-9 backdrop-blur-xl sm:px-12 sm:py-12">
                {/* Decorative quote watermark + soft accent glow */}
                <Quote
                  aria-hidden
                  className="pointer-events-none absolute -left-3 -top-4 h-28 w-28 -scale-x-100 text-primary/[0.07]"
                  fill="currentColor"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-40 w-40 [background:radial-gradient(60%_60%_at_70%_20%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_70%)]"
                />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-wider text-primary">
                    <span className="h-px w-6 bg-primary/50" />
                    {eyebrow}
                  </span>

                  {/* The letter */}
                  <blockquote className="mt-5 max-w-2xl space-y-4 text-pretty">
                    {paragraphs.map((p, i) => (
                      <p
                        key={p.text}
                        className={cn(
                          i === 0
                            ? 'text-lg font-medium leading-relaxed text-foreground sm:text-xl'
                            : 'text-[15px] leading-relaxed text-muted-foreground',
                        )}
                      >
                        {p.text}
                        {p.accent && (
                          <span className="font-display font-semibold text-gradient">
                            {p.accent}
                          </span>
                        )}
                      </p>
                    ))}
                  </blockquote>

                  {/* Signature row */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent font-display text-xl font-extrabold text-primary-foreground shadow-elev-3 ring-1 ring-white/10">
                        {founderInitial}
                      </span>
                      <span>
                        <span className="block font-display text-base font-bold text-foreground">
                          {founderName}
                        </span>
                        <span className="block text-xs text-muted-foreground">{founderTitle}</span>
                      </span>
                    </div>

                    <ButtonLink
                      href={appUrl(ctaAppPath)}
                      variant="outline"
                      size="sm"
                      className="group"
                    >
                      {ctaLabel}
                      <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
