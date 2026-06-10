'use client';

import { ArrowRight, Zap, Star, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { LiveStatsCard } from '@/components/marketing/mocks';
import { RegionToggle, BrowserChrome } from '@/components/marketing/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { heroContent } from '@/data/hero';
import { appUrl } from '@/lib/utils';

interface HeroProps {
  isUS: boolean;
  onRegionChange: (isUS: boolean) => void;
}

/** Above-the-fold hero — port of the app's marketing Hero (region-aware copy + live stats mock). */
export function Hero({ isUS, onRegionChange }: HeroProps) {
  const reduce = useReducedMotion();
  const {
    badgeLabel,
    headline,
    copy,
    primaryCta,
    secondaryCta,
    ratingSignal,
    trustSignals,
    mockBrowserUrl,
    liveBadges,
  } = heroContent;
  const paragraph = isUS ? copy.us : copy.intl;

  return (
    <section className="glow-radial relative px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Copy column */}
        <Stagger className="text-center lg:text-left" gap={0.08}>
          <StaggerItem className="flex justify-center lg:justify-start">
            <RegionToggle isUS={isUS} onChange={onRegionChange} />
          </StaggerItem>

          <StaggerItem className="mt-6 flex justify-center lg:justify-start">
            <Badge variant="glow" className="cursor-default">
              <Zap className="h-3.5 w-3.5" />
              {badgeLabel}
            </Badge>
          </StaggerItem>

          <h1 className="mt-6 break-words text-display-2xl text-foreground">
            <span className="block">{headline.pre}</span>
            <span className="block text-gradient">{headline.accent}</span>
            <span className="block">{headline.post}</span>
          </h1>

          <StaggerItem>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-body-lg text-muted-foreground lg:mx-0">
              {paragraph.pre}
              <strong className="font-semibold text-foreground">{paragraph.strong}</strong>
              {paragraph.post}
            </p>
          </StaggerItem>

          <StaggerItem className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
            <ButtonLink
              href={appUrl(primaryCta.appPath)}
              variant="glow"
              size="xl"
              className="group w-full sm:w-auto"
            >
              {primaryCta.label}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink
              href={appUrl(secondaryCta.appPath)}
              variant="outline"
              size="xl"
              className="w-full sm:w-auto"
            >
              {secondaryCta.label}
              {secondaryCta.noteLabel && (
                <span className="ml-1 rounded-full bg-success-subtle px-1.5 py-0.5 text-[10px] font-semibold text-success">
                  {secondaryCta.noteLabel}
                </span>
              )}
            </ButtonLink>
          </StaggerItem>

          <StaggerItem className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {ratingSignal}
            </span>
            {trustSignals.map((signal) => (
              <span key={signal} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {signal}
              </span>
            ))}
          </StaggerItem>
        </Stagger>

        {/* Product mock */}
        <Reveal from="up" distance={24} delay={0.1} className="relative">
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BrowserChrome url={mockBrowserUrl}>
              <LiveStatsCard />
            </BrowserChrome>
          </motion.div>

          {/* Floating accents — live social proof */}
          <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border border-border/70 bg-card/90 px-3 py-2 shadow-elev-3 backdrop-blur-xl sm:flex">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold text-foreground">{liveBadges.applyingNow}</span>
          </div>
          <div className="absolute -right-3 -top-4 hidden items-center gap-1.5 rounded-xl border border-success/30 bg-success-subtle px-3 py-2 text-xs font-semibold text-success shadow-elev-2 backdrop-blur-sm sm:flex">
            <TrendingUp className="h-3.5 w-3.5" /> {liveBadges.joinedToday}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
