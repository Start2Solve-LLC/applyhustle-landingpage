'use client';

import { GlassCard, SectionHeading } from '@/components/marketing/primitives';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { howItWorksSection } from '@/data/howItWorks';

/** Numbered four-step walkthrough — port of the app's HowItWorks. */
export function HowItWorks() {
  const { eyebrow, titleLeading, titleAccent, subtitle, steps } = howItWorksSection;

  return (
    <section id="how" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={
            <>
              {titleLeading} <span className="text-gradient">{titleAccent}</span>
            </>
          }
          sub={subtitle}
        />

        <div className="relative mt-14">
          {/* Connecting hairline behind the row (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-border/60 lg:block"
          />

          <Stagger gap={0.1} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem as="div" key={step.id} className="h-full">
                  <GlassCard hover className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-subtle text-sm font-bold text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="mt-6 text-base font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
