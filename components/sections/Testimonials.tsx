'use client';

import { Quote, Star } from 'lucide-react';
import { SectionHeading, GlassCard } from '@/components/marketing/primitives';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { testimonialsSection } from '@/data/testimonials';

/** Testimonial cards — port of the app's Testimonials (the app's published quotes). */
export function Testimonials() {
  const { eyebrow, title, testimonials } = testimonialsSection;

  return (
    <section id="testimonials" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={<>{title.pre}<span className="text-gradient">{title.accent}</span></>}
        />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3" gap={0.08}>
          {testimonials.map((t) => (
            <StaggerItem as="article" key={t.name} className="h-full">
              <GlassCard hover className="flex h-full flex-col p-6">
                <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                <Quote className="mt-4 h-5 w-5 text-primary" />
                <p className="mt-3 text-sm leading-relaxed text-foreground">{t.quote}</p>

                <footer className="mt-auto flex items-center gap-3 border-t border-border/60 pt-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-subtle text-xs font-bold text-primary">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </footer>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
