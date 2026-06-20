'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { BackToTop } from '@/components/layout/BackToTop';
import { Navbar } from '@/components/layout/Navbar';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { LazyMount } from '@/components/motion/LazyMount';
import { ScrollBend } from '@/components/motion/ScrollBend';

// ── Above the fold: eager (part of the initial bundle, painted first) ────────
import { Hero } from '@/components/sections/Hero';
import { LogosStrip } from '@/components/sections/LogosStrip';

// ── Below the fold: each section is code-split into its own chunk, fetched on
//    demand via <LazyMount> as the user scrolls toward it. `ssr: false` because
//    the chunk is gated client-side anyway; the reserved-height placeholder
//    keeps layout stable until it mounts. ────────────────────────────────────
const InteractiveAtsDemo = dynamic(
  () =>
    import('@/components/sections/ats-demo/InteractiveAtsDemo').then((m) => m.InteractiveAtsDemo),
  { ssr: false },
);
const BentoFeatures = dynamic(
  () => import('@/components/sections/BentoFeatures').then((m) => m.BentoFeatures),
  { ssr: false },
);
const FeatureExplorer = dynamic(
  () => import('@/components/sections/FeatureExplorer').then((m) => m.FeatureExplorer),
  { ssr: false },
);
const HowItWorks = dynamic(
  () => import('@/components/sections/HowItWorks').then((m) => m.HowItWorks),
  { ssr: false },
);
const TierComparison = dynamic(
  () => import('@/components/sections/TierComparison').then((m) => m.TierComparison),
  { ssr: false },
);
const MetricsBand = dynamic(
  () => import('@/components/sections/MetricsBand').then((m) => m.MetricsBand),
  { ssr: false },
);
const Testimonials = dynamic(
  () => import('@/components/sections/Testimonials').then((m) => m.Testimonials),
  { ssr: false },
);
const FounderNote = dynamic(
  () => import('@/components/sections/FounderNote').then((m) => m.FounderNote),
  { ssr: false },
);
const Faq = dynamic(() => import('@/components/sections/Faq').then((m) => m.Faq), { ssr: false });
const FinalCta = dynamic(() => import('@/components/sections/FinalCta').then((m) => m.FinalCta), {
  ssr: false,
});
const MarketingFooter = dynamic(
  () => import('@/components/layout/MarketingFooter').then((m) => m.MarketingFooter),
  { ssr: false },
);

/**
 * Full landing page — section order mirrors frontend/src/pages/LandingPage.tsx.
 * Region defaults to US with a manual toggle (the app geo-detects via its
 * backend; this static site has no API).
 *
 * Performance: only the navbar + above-the-fold hero/logos ship in the initial
 * bundle. Every section below the fold is a separate chunk that loads lazily as
 * it scrolls into view (see <LazyMount> + next/dynamic above), so first paint
 * and time-to-interactive stay small regardless of how many sections exist.
 */
export function LandingPageContent() {
  const [isUS, setIsUS] = useState(true);

  return (
    <div id="top" className="relative min-h-screen overflow-x-clip text-foreground">
      {/* Custom lazy-trailing pointer (mouse devices, motion allowed) */}
      <CustomCursor />

      {/* Ambient backdrop — dotted grid + a fixed, vibrating warm-violet aura
          that pulses behind the entire page on any scroll position. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dots mask-radial absolute inset-0 opacity-50" />
        <div className="page-aura" aria-hidden />
      </div>

      <Navbar isUS={isUS} onRegionChange={setIsUS} />

      <main>
        {/* Above the fold — eager */}
        <Hero isUS={isUS} />
        <LogosStrip />

        {/* Traction banner — right under the social-proof logos strip */}
        <LazyMount minHeight={240}>
          <ScrollBend>
            <MetricsBand />
          </ScrollBend>
        </LazyMount>

        {/* Below the fold — lazy, mounted on scroll. Each section "bends" on scroll. */}
        <LazyMount minHeight={520}>
          <ScrollBend>
            <InteractiveAtsDemo />
          </ScrollBend>
        </LazyMount>
        <LazyMount minHeight={720}>
          <ScrollBend>
            <BentoFeatures isUS={isUS} />
          </ScrollBend>
        </LazyMount>
        <LazyMount minHeight={640}>
          <ScrollBend>
            <FeatureExplorer />
          </ScrollBend>
        </LazyMount>
        <LazyMount minHeight={560}>
          <ScrollBend>
            <HowItWorks />
          </ScrollBend>
        </LazyMount>
        <LazyMount minHeight={640}>
          <ScrollBend>
            <TierComparison isUS={isUS} onRegionChange={setIsUS} />
          </ScrollBend>
        </LazyMount>
        <LazyMount minHeight={520}>
          <ScrollBend>
            <Testimonials />
          </ScrollBend>
        </LazyMount>
        <LazyMount minHeight={420}>
          <ScrollBend>
            <FounderNote />
          </ScrollBend>
        </LazyMount>
        {/* FAQ kept un-bent — its sticky left rail can't live inside a transformed ancestor. */}
        <LazyMount minHeight={520}>
          <Faq />
        </LazyMount>
        <LazyMount minHeight={360}>
          <ScrollBend>
            <FinalCta />
          </ScrollBend>
        </LazyMount>
      </main>

      <LazyMount minHeight={320}>
        <MarketingFooter />
      </LazyMount>
      <BackToTop />
    </div>
  );
}
