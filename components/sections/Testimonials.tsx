'use client';

import { Quote, Star } from 'lucide-react';
import { SectionHeading, GlassCard } from '@/components/marketing/primitives';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { TiltCard } from '@/components/motion/TiltCard';
import { testimonialsSection } from '@/data/testimonials';

/** Testimonial cards — port of the app's Testimonials (the app's published quotes). */
export function Testimonials() {
  const { eyebrow, title, testimonials } = testimonialsSection;

  return (
    <section id="testimonials" className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={
            <>
              {title.pre}
              <span className="text-gradient">{title.accent}</span>
            </>
          }
        />

        <Stagger className="mt-8 grid gap-4 md:grid-cols-3" gap={0.08}>
          {testimonials.map((t) => (
            <StaggerItem as="article" key={t.name} className="h-full">
              <TiltCard className="h-full" max={7}>
                <GlassCard hover className="flex h-full flex-col p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                      ))}
                    </div>
                    <Quote className="h-4 w-4 text-primary/70" />
                  </div>

                  <p className="mt-3 text-[13px] leading-relaxed text-foreground">{t.quote}</p>

                  <footer className="mt-auto flex items-center gap-2.5 border-t border-border/60 pt-3.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-subtle text-[11px] font-bold text-primary">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">{t.role}</span>
                    </span>
                  </footer>
                </GlassCard>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
