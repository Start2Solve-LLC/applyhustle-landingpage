import { Sparkles, Briefcase, Send, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface HowItWorksSectionContent {
  eyebrow: string;
  titleLeading: string;
  titleAccent: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

/* Steps mirror the app's marketing page (read-only reference). */
export const howItWorksSection: HowItWorksSectionContent = {
  eyebrow: 'How it works · 4 steps',
  titleLeading: 'From résumé to',
  titleAccent: 'calendar invites',
  subtitle: 'About two minutes to start.',
  steps: [
    {
      id: 'share-story',
      title: 'Share your story',
      description: 'Upload a résumé, pick roles, sponsorship needs and geography.',
      icon: Sparkles,
    },
    {
      id: 'ai-tailors',
      title: 'AI tailors everything',
      description: 'Headlines, bullets, LinkedIn and ATS scores update per employer.',
      icon: Briefcase,
    },
    {
      id: 'apply-at-scale',
      title: 'Apply at scale',
      description:
        'US Premium runs autonomous Auto-Apply with guardrails; other tiers stay guided.',
      icon: Send,
    },
    {
      id: 'close-loop',
      title: 'Close the loop',
      description: 'Track replies in one command center and prep with calibrated mock interviews.',
      icon: CheckCircle2,
    },
  ],
};
