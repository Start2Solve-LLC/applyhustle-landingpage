/* Mirrors frontend/src/components/marketing/sections/FinalCta.tsx. */

export interface FinalCtaContent {
  title: { pre: string; accent: string };
  subtitle: string;
  primaryCta: { label: string; appPath: string };
  secondaryCta: { label: string; appPath: string };
  reassuranceNote: string;
  shortcutHint: { pre: string; keys: string[]; post: string };
}

export const finalCtaContent: FinalCtaContent = {
  title: { pre: 'Stop applying. ', accent: 'Start interviewing.' },
  subtitle: 'Kick off free, inspect the signal, and upgrade when Auto-Apply matters for your search.',
  primaryCta: { label: 'Get started — free', appPath: '/signup' },
  secondaryCta: { label: 'Try the ATS Checker', appPath: '/ats-checker' },
  reassuranceNote: 'No credit card · Cancel anytime',
  shortcutHint: { pre: 'Press', keys: ['⌘', '↵'], post: 'to start' },
};
