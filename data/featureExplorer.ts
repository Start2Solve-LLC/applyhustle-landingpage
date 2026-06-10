import type { ComponentType } from 'react';
import { Target, FileText, Briefcase, Mic, Send } from 'lucide-react';
import { LinkedInGlyph } from '@/components/marketing/primitives/LinkedInGlyph';

/* Tab config — mirrors frontend/src/components/marketing/sections/FeatureExplorer.tsx.
   `id` is mapped to the matching product mock by the FeatureExplorer section. */

export type ExplorerTabId = 'ats' | 'resume' | 'jobs' | 'interview' | 'linkedin' | 'auto';

export interface ExplorerTabConfig {
  id: ExplorerTabId;
  icon: ComponentType<{ className?: string }>;
  label: string;
  blurb: string;
  url: string;
}

export interface ExplorerSectionContent {
  eyebrow: string;
  title: { pre: string; accent: string; post: string };
  tabs: ExplorerTabConfig[];
}

export const explorerSection: ExplorerSectionContent = {
  eyebrow: 'Take the tour',
  title: { pre: 'One workspace, ', accent: 'every step', post: ' of the hunt' },
  tabs: [
    { id: 'ats', icon: Target, label: 'ATS Score', blurb: 'Score & fix your résumé per job.', url: 'app.applyhustle.com/ats-score' },
    { id: 'resume', icon: FileText, label: 'Resume Redesign', blurb: 'Rewrite to 95+ in one click.', url: 'app.applyhustle.com/resume' },
    { id: 'jobs', icon: Briefcase, label: 'Job Feed', blurb: 'Sponsorship-aware openings.', url: 'app.applyhustle.com/jobs' },
    { id: 'interview', icon: Mic, label: 'Mock Interview', blurb: 'STAR-scored practice.', url: 'app.applyhustle.com/interview' },
    { id: 'linkedin', icon: LinkedInGlyph, label: 'LinkedIn', blurb: 'Gap analysis & fixes.', url: 'app.applyhustle.com/linkedin' },
    { id: 'auto', icon: Send, label: 'Auto-Apply', blurb: 'Apply at volume (US Premium).', url: 'app.applyhustle.com/auto-apply' },
  ],
};
