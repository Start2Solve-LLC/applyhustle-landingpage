import { Send, Mic, Briefcase, FileText, Mail, LayoutGrid } from 'lucide-react';
import { LinkedInGlyph } from '@/components/marketing/primitives/LinkedInGlyph';
import type { ComponentType } from 'react';

/* Bento grid config — mirrors frontend/src/components/marketing/sections/BentoFeatures.tsx.
   `mockId` is mapped to the matching product mock by the BentoFeatures section. */

export type BentoMockId =
  | 'auto-apply'
  | 'interview'
  | 'jobs'
  | 'resume'
  | 'linkedin'
  | 'cover-letter'
  | 'tracker';

export interface BentoTileConfig {
  mockId: BentoMockId;
  icon: ComponentType<{ className?: string }>;
  labelUS: string;
  labelIntl: string;
  badgeUS?: string;
  badgeIntl?: string;
  /** Tailwind col/row span classes for the lg bento layout. */
  span?: string;
}

export interface BentoSectionContent {
  eyebrow: string;
  title: { pre: string; accent: string };
  subtitle: string;
  tiles: BentoTileConfig[];
}

export const bentoSection: BentoSectionContent = {
  eyebrow: 'The toolkit',
  title: { pre: 'Everything you need to ', accent: 'get hired' },
  subtitle: 'Not vibes — real tools, working together.',
  tiles: [
    {
      mockId: 'auto-apply',
      icon: Send,
      labelUS: 'Auto-Apply · Premium (US)',
      labelIntl: 'Guided queue',
      badgeUS: 'Autonomous',
      badgeIntl: 'Guided',
      span: 'lg:col-span-4 lg:row-span-2',
    },
    {
      mockId: 'interview',
      icon: Mic,
      labelUS: 'Mock interview',
      labelIntl: 'Mock interview',
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      mockId: 'jobs',
      icon: Briefcase,
      labelUS: 'Job feed',
      labelIntl: 'Job feed',
      span: 'lg:col-span-3',
    },
    {
      mockId: 'resume',
      icon: FileText,
      labelUS: 'Resume redesign',
      labelIntl: 'Resume redesign',
      span: 'lg:col-span-3',
    },
    {
      mockId: 'linkedin',
      icon: LinkedInGlyph,
      labelUS: 'LinkedIn audit',
      labelIntl: 'LinkedIn audit',
      span: 'lg:col-span-2',
    },
    {
      mockId: 'cover-letter',
      icon: Mail,
      labelUS: 'Cover letters',
      labelIntl: 'Cover letters',
      span: 'lg:col-span-2',
    },
    {
      mockId: 'tracker',
      icon: LayoutGrid,
      labelUS: 'Tracker',
      labelIntl: 'Tracker',
      span: 'lg:col-span-2',
    },
  ],
};
