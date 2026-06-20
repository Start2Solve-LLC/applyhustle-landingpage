'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { GlassCard, KeyCap } from '@/components/marketing/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { TiltCard } from '@/components/motion/TiltCard';
import { ButtonLink } from '@/components/ui/Button';
import { finalCtaContent } from '@/data/finalCta';
import { appUrl } from '@/lib/utils';

/** Closing call-to-action — port of the app's FinalCta. */
export function FinalCta() {
  const { title, subtitle, primaryCta, secondaryCta, reassuranceNote, shortcutHint } =
    finalCtaContent;

  return (
    <section id="cta" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal from="up" distance={20}>
          <TiltCard max={5} scale={1.01}>
            <GlassCard
              glow
              className="glow-radial relative overflow-hidden p-10 text-center sm:p-16"
            >
              <h2 className="text-display-xl text-foreground">
                {title.pre}
                <span className="text-gradient">{title.accent}</span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-body-lg text-muted-foreground">{subtitle}</p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
                </ButtonLink>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{reassuranceNote}</span>
                <span className="mx-1 hidden h-3 w-px bg-border/60 sm:block" aria-hidden />
                <span className="inline-flex items-center gap-1.5">
                  {shortcutHint.pre}
                  {shortcutHint.keys.map((key) => (
                    <KeyCap key={key}>{key}</KeyCap>
                  ))}
                  {shortcutHint.post}
                </span>
              </div>
            </GlassCard>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
