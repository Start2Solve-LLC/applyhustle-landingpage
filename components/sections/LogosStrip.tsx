'use client';

import { Reveal } from '@/components/motion/Reveal';
import { MarqueeRow } from '@/components/marketing/primitives';
import { countries, logosStripHeading } from '@/data/countries';

/** Marquee of candidate countries — port of the app's LogosStrip. */
export function LogosStrip() {
  return (
    <section id="logos" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal from="up" distance={12}>
          <p className="text-center text-overline text-muted-foreground/70">{logosStripHeading}</p>

          <MarqueeRow durationClassName="[animation-duration:36s]" className="mt-7">
            {countries.map((country) => (
              <span
                key={country}
                className="select-none whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight text-muted-foreground/30 sm:text-3xl"
              >
                {country}
              </span>
            ))}
          </MarqueeRow>
        </Reveal>
      </div>
    </section>
  );
}
