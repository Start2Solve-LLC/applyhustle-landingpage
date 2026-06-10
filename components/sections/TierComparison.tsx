'use client';

import { Check } from 'lucide-react';
import {
  GlassCard,
  SectionHeading,
  RegionToggle,
  StatCounter,
} from '@/components/marketing/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { pricingSection } from '@/data/pricing';
import { appUrl, cn } from '@/lib/utils';

interface TierComparisonProps {
  isUS: boolean;
  onRegionChange: (v: boolean) => void;
}

/** Pricing tiers — port of the app's TierComparison (US prices are the app's shipped defaults). */
export function TierComparison({ isUS, onRegionChange }: TierComparisonProps) {
  const {
    eyebrow,
    title,
    currencySymbol,
    tiers,
    highlightBadgeLabel,
    premiumRegionalBullet,
    footnote,
  } = pricingSection;

  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal from="up" distance={20}>
          <SectionHeading
            eyebrow={eyebrow}
            title={
              <>
                {title.pre}
                <span className="text-gradient">{title.accent}</span>
              </>
            }
          />
          <div className="mt-6 flex justify-center">
            <RegionToggle isUS={isUS} onChange={onRegionChange} className="mx-auto" />
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3" gap={0.09}>
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <GlassCard
                glow={tier.highlighted}
                hover
                className={cn(
                  'flex h-full flex-col p-6 sm:p-7',
                  tier.highlighted && 'border-accent-subtle-border',
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <h3 className="text-heading-3 text-foreground">{tier.name}</h3>
                  {tier.highlighted && (
                    <Badge variant="glow" className="shrink-0">
                      {highlightBadgeLabel}
                    </Badge>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">
                    {tier.price === null ? (
                      '0'
                    ) : (
                      <StatCounter
                        to={tier.price}
                        prefix={currencySymbol}
                        decimals={tier.price % 1 ? 2 : 0}
                      />
                    )}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">/mo</span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {isUS ? tier.taglineUS : tier.taglineIntl}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {tier.highlighted &&
                    (isUS ? (
                      <li className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{premiumRegionalBullet.us}</span>
                      </li>
                    ) : (
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Badge variant="info" className="mt-0.5 shrink-0">
                          Guided
                        </Badge>
                        <span>{premiumRegionalBullet.intl}</span>
                      </li>
                    ))}
                </ul>

                <ButtonLink
                  href={appUrl(tier.ctaAppPath)}
                  variant={tier.ctaVariant}
                  size="lg"
                  className="mt-7 w-full"
                >
                  {tier.ctaLabel}
                </ButtonLink>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal from="up" distance={12} delay={0.1}>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            {isUS ? footnote.us : footnote.intl}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
