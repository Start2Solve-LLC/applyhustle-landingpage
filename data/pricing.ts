/* Tiers mirror frontend/src/components/marketing/sections/TierComparison.tsx.
   Prices are the app's own shipped US fallback config
   (frontend/src/hooks/useCountryDetect.ts DEFAULT_CONFIG) — the live app
   localizes them per country via its backend; this static site shows the
   US defaults. */

export type TierCtaVariant = 'outline' | 'default' | 'glow';

export interface PricingTier {
  name: string;
  /** null renders "0" with no count-up (the Free tier). */
  price: number | null;
  taglineUS: string;
  taglineIntl: string;
  features: string[];
  ctaLabel: string;
  ctaAppPath: string;
  ctaVariant: TierCtaVariant;
  highlighted?: boolean;
}

export interface PricingSectionContent {
  eyebrow: string;
  title: { pre: string; accent: string };
  currencySymbol: string;
  tiers: PricingTier[];
  highlightBadgeLabel: string;
  /** Extra Premium bullet, region-dependent. */
  premiumRegionalBullet: { us: string; intl: string };
  footnote: { us: string; intl: string };
}

export const pricingSection: PricingSectionContent = {
  eyebrow: 'Pricing',
  title: { pre: 'Start free. ', accent: 'Upgrade when it pays off.' },
  currencySymbol: '$',
  highlightBadgeLabel: 'Most popular',
  premiumRegionalBullet: {
    us: 'Autonomous Auto-Apply',
    intl: 'High-volume guided applying',
  },
  footnote: {
    us: 'Autonomous Auto-Apply is available on Premium in the United States.',
    intl: 'Auto-Apply runs in guided mode in your region — you stay in control of every submit.',
  },
  tiers: [
    {
      name: 'Free',
      price: null,
      taglineUS: 'Test the waters — get your ATS score in minutes.',
      taglineIntl: 'Test the waters — get your ATS score in minutes.',
      features: ['ATS Checker', 'Resume parsing', '1 résumé redesign', 'Application tracker'],
      ctaLabel: 'Get started',
      ctaAppPath: '/signup',
      ctaVariant: 'outline',
    },
    {
      name: 'Pro',
      price: 29.99,
      taglineUS: 'Everything you need to apply smarter, every day.',
      taglineIntl: 'Everything you need to apply smarter, every day.',
      features: ['Everything in Free', 'Unlimited redesigns', 'Job feed', 'Cover letters', 'LinkedIn analyzer'],
      ctaLabel: 'Choose Pro',
      ctaAppPath: '/signup',
      ctaVariant: 'default',
    },
    {
      name: 'Premium',
      price: 299,
      taglineUS: 'Autonomous applying that works while you sleep.',
      taglineIntl: 'High-volume guided applying, fully in your control.',
      features: ['Everything in Pro', 'AI mock interviews', 'Priority support'],
      ctaLabel: 'Go Premium',
      ctaAppPath: '/signup',
      ctaVariant: 'glow',
      highlighted: true,
    },
  ],
};
