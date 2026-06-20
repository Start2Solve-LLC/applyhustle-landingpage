'use client';

import { Check, Star } from 'lucide-react';
import { SectionHeading, RegionToggle, StatCounter } from '@/components/marketing/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { pricingSection, type MatrixCell } from '@/data/pricing';
import { appUrl, cn } from '@/lib/utils';

interface TierComparisonProps {
  isUS: boolean;
  onRegionChange: (v: boolean) => void;
}

/** Resolve a matrix cell into a per-card feature row (label + included flag). */
function toFeature(label: string, cell: MatrixCell, isUS: boolean) {
  if (cell === false) return { label, included: false };
  if (cell === true) return { label, included: true };
  const value = typeof cell === 'string' ? cell : isUS ? cell.us : cell.intl;
  return { label: `${label} · ${value}`, included: true };
}

/** Pricing — three plan cards with the recommended tier elevated + spotlit. */
export function TierComparison({ isUS, onRegionChange }: TierComparisonProps) {
  const { eyebrow, title, currencySymbol, tiers, highlightBadgeLabel, comparison, footnote } =
    pricingSection;

  return (
    <section
      id="pricing"
      className="px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16 lg:px-8 lg:pt-10 lg:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal from="up" distance={20}>
          <SectionHeading
            eyebrow={eyebrow}
            title={
              <span className="font-display">
                {title.pre}
                <span className="text-gradient">{title.accent}</span>
              </span>
            }
          />
          <div className="mt-6 flex justify-center">
            <RegionToggle isUS={isUS} onChange={onRegionChange} />
          </div>
        </Reveal>

        <Stagger
          gap={0.1}
          className="mt-14 grid items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-6"
        >
          {tiers.map((tier, ti) => {
            const spot = Boolean(tier.highlighted);
            const annual = tier.price === null ? null : Math.round(tier.price * 10);
            const features = comparison.map((row) => toFeature(row.label, row.cells[ti], isUS));

            return (
              <StaggerItem key={tier.name} className="h-full">
                <div
                  className={cn(
                    'relative flex h-full flex-col rounded-3xl bg-card/70 p-6 backdrop-blur-sm transition-shadow sm:p-7',
                    spot
                      ? 'z-10 border-2 border-primary shadow-elev-4 md:scale-[1.04]'
                      : 'border border-border/70 shadow-elev-1 hover:shadow-elev-2',
                  )}
                >
                  {/* Most-popular badge */}
                  {spot && (
                    <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 font-display text-xs font-bold text-primary-foreground shadow-elev-2">
                      <Star className="h-3 w-3 fill-current" />
                      {highlightBadgeLabel}
                    </span>
                  )}

                  {/* Header */}
                  <div className="text-center">
                    <h3 className="font-display text-lg font-bold text-foreground">{tier.name}</h3>
                    <p className="mx-auto mt-1.5 max-w-[22ch] text-sm text-muted-foreground">
                      {isUS ? tier.taglineUS : tier.taglineIntl}
                    </p>

                    <div className="mt-4 flex items-baseline justify-center gap-1">
                      <span className="font-display text-4xl font-extrabold tracking-tight text-foreground">
                        {tier.price === null ? (
                          `${currencySymbol}0`
                        ) : (
                          <StatCounter
                            to={tier.price}
                            prefix={currencySymbol}
                            decimals={tier.price % 1 ? 2 : 0}
                          />
                        )}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">/month</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {annual === null ? 'Free forever' : `or ${currencySymbol}${annual}/year`}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mt-6 flex-1 space-y-3">
                    {features.map((f) => (
                      <li key={f.label} className="flex items-center gap-2.5 text-sm">
                        <span
                          className={cn(
                            'grid h-5 w-5 shrink-0 place-items-center rounded-full',
                            f.included
                              ? 'bg-success-subtle text-success'
                              : 'bg-secondary text-muted-foreground/40',
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span
                          className={f.included ? 'text-foreground' : 'text-muted-foreground/50'}
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <ButtonLink
                    href={appUrl(tier.ctaAppPath)}
                    variant={spot ? 'default' : 'outline'}
                    size="lg"
                    className={cn(
                      'mt-7 w-full rounded-xl',
                      !spot && 'border-transparent bg-secondary text-foreground hover:bg-muted',
                    )}
                  >
                    {tier.ctaLabel}
                  </ButtonLink>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal from="up" distance={12} delay={0.1}>
          <p className="mt-10 text-center text-xs text-muted-foreground">
            {isUS ? footnote.us : footnote.intl}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
