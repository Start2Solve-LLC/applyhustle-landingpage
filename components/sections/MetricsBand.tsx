'use client';

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { GlassCard, StatCounter } from '@/components/marketing/primitives';
import { metrics } from '@/data/metrics';

/** Count-up metrics band — port of the app's MetricsBand. */
export function MetricsBand() {
  return (
    <section id="metrics" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal from="up" distance={24}>
          <GlassCard glow className="p-8 sm:p-10">
            <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4" gap={0.08}>
              {metrics.map((m) => (
                <StaggerItem key={m.label} className="text-center">
                  <StatCounter to={m.to} suffix={m.suffix} className="text-display-lg text-gradient" />
                  <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
