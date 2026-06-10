import { siteConfig } from '@/data/site';
import { siteBaseUrl } from '@/lib/utils';

/**
 * Single source of truth for every SEO concern. Everything downstream
 * (metadata, JSON-LD, sitemap, robots, manifest, OG images) reads from here,
 * so changing the brand, domain, or indexing policy is a one-file edit.
 */

/**
 * Whether search engines may index this deployment.
 *
 * Production should be indexable; preview/staging/dev must NOT be (duplicate
 * content + leaking unfinished pages tanks rankings). Resolution order:
 *   1. Explicit override  — NEXT_PUBLIC_SEO_INDEX = 'true' | 'false'
 *   2. Vercel environment — VERCEL_ENV === 'production'
 *   3. Node environment   — NODE_ENV === 'production'
 */
function resolveIndexable(): boolean {
  const override = process.env.NEXT_PUBLIC_SEO_INDEX;
  if (override === 'true') return true;
  if (override === 'false') return false;
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === 'production';
  return process.env.NODE_ENV === 'production';
}

export const seoConfig = {
  /** Brand / site name shown in titles and schema. */
  name: siteConfig.name,
  legalName: 'ApplyHustle',
  /** Parent brand — surfaced in Organization schema (footer: "A Start2Solve product"). */
  parentBrand: 'Start2Solve',

  /**
   * Canonical origin of THIS landing site — drives canonicals, OG URLs,
   * sitemap, robots, and absolute schema URLs. MUST be set to the real
   * production domain via NEXT_PUBLIC_SITE_URL (e.g. https://applyhustle.com).
   */
  url: siteBaseUrl.replace(/\/+$/, ''),

  locale: 'en_US',
  description: siteConfig.description,
  tagline: siteConfig.tagline,

  /** Default social-share image. A dynamic 1200×630 card is generated at /opengraph-image. */
  ogImage: '/opengraph-image',

  /**
   * Twitter/X handle for card attribution. Leave '' until you have the real
   * handle — a wrong handle mis-attributes shares. Only emitted when truthy.
   */
  twitterHandle: '',

  /**
   * Keyword set. Google ignores the legacy <meta keywords>, but it's harmless,
   * still read by some engines, and doubles as documented target intent.
   */
  keywords: [
    'AI job application platform',
    'ATS resume checker',
    'ATS score checker',
    'resume tailoring AI',
    'auto apply jobs',
    'AI cover letter generator',
    'AI mock interview',
    'LinkedIn profile optimizer',
    'job application tracker',
    'resume ATS optimization',
    'job search for international students',
    'F1 OPT job search',
  ],

  isIndexable: resolveIndexable(),
} as const;

export type SeoConfig = typeof seoConfig;

/** Resolve a path to an absolute URL on the canonical origin. */
export const absoluteUrl = (path = '/'): string => new URL(path, `${seoConfig.url}/`).toString();
