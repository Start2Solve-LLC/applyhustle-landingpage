'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MarketingFooter } from '@/components/layout/MarketingFooter';
import { BackToTop } from '@/components/layout/BackToTop';
import { Hero } from '@/components/sections/Hero';
import { LogosStrip } from '@/components/sections/LogosStrip';
import { InteractiveAtsDemo } from '@/components/sections/ats-demo/InteractiveAtsDemo';
import { BentoFeatures } from '@/components/sections/BentoFeatures';
import { FeatureExplorer } from '@/components/sections/FeatureExplorer';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { TierComparison } from '@/components/sections/TierComparison';
import { MetricsBand } from '@/components/sections/MetricsBand';
import { Testimonials } from '@/components/sections/Testimonials';
import { FounderNote } from '@/components/sections/FounderNote';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';

/**
 * Full landing page — section order mirrors frontend/src/pages/LandingPage.tsx.
 * Region defaults to US with a manual toggle (the app geo-detects via its
 * backend; this static site has no API).
 */
export function LandingPageContent() {
  const [isUS, setIsUS] = useState(true);

  return (
    <div id="top" className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dots mask-radial absolute inset-0 opacity-50" />
        <div className="absolute left-1/2 top-[-8%] h-[480px] w-[760px] -translate-x-1/2 animate-pulse-slow rounded-full bg-primary/10 blur-[130px]" />
      </div>

      <Navbar />

      <main>
        <Hero isUS={isUS} onRegionChange={setIsUS} />
        <LogosStrip />
        <InteractiveAtsDemo />
        <BentoFeatures isUS={isUS} />
        <FeatureExplorer />
        <HowItWorks />
        <TierComparison isUS={isUS} onRegionChange={setIsUS} />
        <MetricsBand />
        <Testimonials />
        <FounderNote />
        <Faq />
        <FinalCta />
      </main>

      <MarketingFooter />
      <BackToTop />
    </div>
  );
}
