/* Hero copy — mirrors frontend/src/components/marketing/sections/Hero.tsx. */

/** Paragraph with one bolded segment, so copy stays out of JSX. */
export interface EmphasisParagraph {
  pre: string;
  strong: string;
  post: string;
}

export interface HeroCta {
  label: string;
  appPath: string;
  /** Small pill rendered after the label, e.g. "free". */
  noteLabel?: string;
}

export interface HeroContent {
  badgeLabel: string;
  headline: {
    pre: string;
    accent: string;
    post: string;
  };
  copy: {
    us: EmphasisParagraph;
    intl: EmphasisParagraph;
  };
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  ratingSignal: string;
  trustSignals: string[];
  mockBrowserUrl: string;
  liveBadges: {
    applyingNow: string;
    joinedToday: string;
  };
}

export const heroContent: HeroContent = {
  badgeLabel: 'AI résumé · ATS · interviews',
  headline: {
    pre: 'Land your',
    accent: 'interview call',
    post: 'within 90 days.',
  },
  copy: {
    us: {
      pre: 'Premium unlocks autonomous ',
      strong: 'Auto-Apply',
      post: ' at volume. Every tier gets ATS scoring, AI interviews, and sponsorship-aware job intel.',
    },
    intl: {
      pre: 'AI tailors your résumé per job, scores it against the ATS, and ',
      strong: 'guides every application',
      post: ' — tuned for F1 / OPT / sponsorship roles.',
    },
  },
  primaryCta: { label: 'Get started — free', appPath: '/signup' },
  secondaryCta: { label: 'Try the ATS Checker', appPath: '/ats-checker', noteLabel: 'free' },
  ratingSignal: '4.8 / 5 · loved by job seekers',
  trustSignals: ['No credit card', 'Cancel anytime'],
  mockBrowserUrl: 'app.applyhustle.com',
  liveBadges: {
    applyingNow: '14 applying right now',
    joinedToday: '+9 joined today',
  },
};
