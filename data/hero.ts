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
  badgeLabel: '40 Auto-Applications a Day',
  headline: {
    pre: 'Let AI apply.',
    accent: 'You just show up',
    post: 'to the interview.',
  },
  copy: {
    us: {
      pre: 'We tailor your ',
      strong: 'résumé',
      post: ' to each job, straight from your profile.',
    },
    intl: {
      pre: 'We tailor your ',
      strong: 'résumé',
      post: ' to each job, straight from your profile.',
    },
  },
  primaryCta: { label: 'Get Started', appPath: '/signup' },
  secondaryCta: { label: 'Try the ATS Checker', appPath: '/ats-checker', noteLabel: 'free' },
  ratingSignal: '4.8 / 5 · loved by job seekers',
  trustSignals: ['No credit card', 'Cancel anytime'],
  mockBrowserUrl: 'app.applyhustle.com',
  liveBadges: {
    applyingNow: '14 applying right now',
    joinedToday: '+9 joined today',
  },
};
