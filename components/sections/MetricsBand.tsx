'use client';

import { TrendingUp } from 'lucide-react';
import { StatCounter } from '@/components/marketing/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { TiltCard } from '@/components/motion/TiltCard';
import { metrics } from '@/data/metrics';
import { cn } from '@/lib/utils';

/** Elevated traction banner — icon-led count-up stats with a gradient frame. */
export function MetricsBand() {
  return (
    <section id="metrics" className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <Reveal from="up" distance={24}>
          <TiltCard max={5} scale={1.015}>
            {/* Gradient hairline frame for an elevated edge */}
            <div className="rounded-[22px] bg-gradient-to-b from-accent-subtle-border via-border/50 to-transparent p-px shadow-elev-4">
              <div className="relative overflow-hidden rounded-[21px] bg-card/80 px-6 py-8 backdrop-blur-xl sm:px-10 sm:py-10">
                {/* Soft top accent glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-36 [background:radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_72%)]"
                />

                {/* Eyebrow */}
                <div className="relative mb-7 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-subtle-border bg-accent-subtle px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-primary">
                    <TrendingUp className="h-3.5 w-3.5" /> Real traction
                  </span>
                </div>

                <Stagger
                  className="relative grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4"
                  gap={0.08}
                >
                  {metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <StaggerItem
                        key={m.label}
                        className={cn(
                          'min-w-0 px-1 text-center sm:px-3 lg:px-5',
                          i > 0 && 'lg:border-l lg:border-border/50',
                        )}
                      >
                        <span className="mx-auto mb-2.5 grid h-9 w-9 place-items-center rounded-xl bg-accent-subtle text-primary shadow-elev-1">
                          <Icon className="h-4 w-4" />
                        </span>
                        <StatCounter
                          to={m.to}
                          suffix={m.suffix}
                          className="block break-words font-display text-display-lg font-extrabold tabular-nums text-gradient"
                        />
                        <p className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-[13px]">
                          {m.label}
                        </p>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
