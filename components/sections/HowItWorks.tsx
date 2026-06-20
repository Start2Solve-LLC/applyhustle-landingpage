'use client';

import { CalendarCheck, FileText } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { howItWorksSection } from '@/data/howItWorks';

/** Connected progress stepper — résumé → 4 nodes on a filling line → invites. */
export function HowItWorks() {
  const reduce = useReducedMotion();
  const { eyebrow, titleLeading, titleAccent, subtitle, steps } = howItWorksSection;

  return (
    <section id="how" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={
            <>
              {titleLeading} <span className="text-gradient">{titleAccent}</span>
            </>
          }
          sub={subtitle}
        />

        <Reveal from="up" distance={20} className="mt-10">
          {/* Bookended flow: input chip · stepper · output chip */}
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-4">
            <Bookend icon={FileText} label="Your résumé" tone="muted" />

            <div className="relative flex-1">
              {/* Track + animated fill behind the nodes (desktop) */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-5 hidden h-0.5 -translate-y-1/2 rounded-full bg-border/70 lg:block"
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary"
                  initial={{ width: reduce ? '100%' : '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: reduce ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <Stagger gap={0.12} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <StaggerItem as="div" key={step.id}>
                      <div className="flex flex-col items-center text-center lg:px-1">
                        {/* Node */}
                        <span className="relative grid h-10 w-10 place-items-center rounded-full border border-accent-subtle-border bg-card text-sm font-bold text-primary shadow-elev-1">
                          {String(i + 1).padStart(2, '0')}
                          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-accent-subtle text-primary ring-2 ring-card">
                            <Icon className="h-2.5 w-2.5" />
                          </span>
                        </span>
                        <h3 className="mt-3 text-sm font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>

            <Bookend icon={CalendarCheck} label="Calendar invites" tone="primary" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Input/output chip that bookends the stepper. */
function Bookend({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof FileText;
  label: string;
  tone: 'muted' | 'primary';
}) {
  const primary = tone === 'primary';
  return (
    <div
      className={
        'flex shrink-0 items-center justify-center gap-2 self-center rounded-xl border px-3 py-2 ' +
        (primary
          ? 'border-accent-subtle-border bg-accent-subtle'
          : 'border-border/70 bg-card/60 backdrop-blur-sm')
      }
    >
      <Icon className={'h-4 w-4 ' + (primary ? 'text-primary' : 'text-muted-foreground')} />
      <span
        className={
          'whitespace-nowrap text-xs font-semibold ' +
          (primary ? 'text-primary' : 'text-foreground')
        }
      >
        {label}
      </span>
    </div>
  );
}
