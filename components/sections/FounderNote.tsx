'use client';

import { ArrowRight } from 'lucide-react';
import { appUrl } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { GlassCard } from '@/components/marketing/primitives';
import { founderNote } from '@/data/founder';

/** Founder's note — port of the app's FounderNote. */
export function FounderNote() {
  const { eyebrow, founderInitial, founderName, founderTitle, paragraphs, ctaLabel, ctaAppPath } = founderNote;

  return (
    <section id="founder" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal from="up" distance={24}>
          <GlassCard glow className="p-8 sm:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
              {/* Founder block */}
              <div className="text-center md:text-left">
                <div className="grid h-24 w-24 place-items-center rounded-2xl bg-primary text-5xl font-extrabold text-primary-foreground">
                  {founderInitial}
                </div>
                <div className="mt-3 text-sm font-semibold text-foreground">{founderName}</div>
                <div className="text-xs text-muted-foreground">{founderTitle}</div>
              </div>

              {/* Note */}
              <div>
                <span className="text-overline text-primary">{eyebrow}</span>
                <blockquote className="mt-4 space-y-4 text-heading-3 font-medium leading-relaxed text-foreground">
                  {paragraphs.map((p) => (
                    <p key={p.text}>
                      {p.text}
                      {p.accent && <span className="text-gradient">{p.accent}</span>}
                    </p>
                  ))}
                </blockquote>
                <ButtonLink href={appUrl(ctaAppPath)} variant="outline" className="group mt-6">
                  {ctaLabel}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
