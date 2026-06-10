import { appUrl } from '@/lib/utils';

/* Links mirror the app's marketing Navbar + MarketingFooter
   (frontend/src/components/Navbar.tsx, MarketingFooter.tsx). Section ids
   match the app's landing page so anchors behave identically. */

export interface NavLink {
  label: string;
  /** In-page anchor ("#features") or absolute app URL. */
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'ATS Checker', href: appUrl('/ats-checker') },
];

export interface AppCtaLink {
  label: string;
  appPath: string;
}

export const loginCta: AppCtaLink = { label: 'Log in', appPath: '/signin' };
export const getStartedCta: AppCtaLink = { label: 'Get started', appPath: '/signup' };

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkColumn {
  heading: string;
  links: FooterLink[];
}

export const footerLinkColumns: FooterLinkColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'ATS Score Checker', href: appUrl('/ats-checker') },
      { label: 'Resume Redesigner', href: appUrl('/signup') },
      { label: 'Curated Job Feed', href: appUrl('/signup') },
      { label: 'AI Mock Interview', href: appUrl('/signup') },
      { label: 'LinkedIn Analyzer', href: appUrl('/signup') },
      { label: 'Cover Letters', href: appUrl('/signup') },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'For International Students', href: '#features' },
      { label: 'For F1 / OPT', href: '#features' },
      { label: 'For US Job Seekers', href: '#features' },
      { label: 'For Career Switchers', href: '#features' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'Pricing', href: '#pricing' },
      { label: "Founder's story", href: '#founder' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    heading: 'Get started',
    links: [
      { label: 'Create free account', href: appUrl('/signup') },
      { label: 'Log in', href: appUrl('/signin') },
      { label: 'Try the ATS Checker', href: appUrl('/ats-checker') },
    ],
  },
];

export const footerTagline =
  'AI that tailors your résumé per job, beats the ATS, and helps you land interviews faster — built for international & US job seekers.';
export const footerBylineNote = 'A Start2Solve product';
