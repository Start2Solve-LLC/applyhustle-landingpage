import { siteBaseUrl } from '@/lib/utils';

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
}

export const siteConfig: SiteConfig = {
  name: 'ApplyHustle',
  tagline: 'Land your interview call within 90 days',
  description:
    'ApplyHustle is the AI job application platform: per-job résumé tailoring, 0–100 ATS scoring, autonomous Auto-Apply at volume, AI mock interviews, one-click cover letters and LinkedIn tools — built for US and international job seekers.',
  url: siteBaseUrl,
};
