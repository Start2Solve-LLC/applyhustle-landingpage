import { absoluteUrl, seoConfig } from './config';
import type { Metadata } from 'next';

/**
 * Per-page metadata factory. Call from any route's `generateMetadata`/`metadata`
 * export to get correct canonical, robots, Open Graph and Twitter tags with a
 * single typed call — no copy-paste, no drift.
 */
export interface PageSeo {
  /** Page title WITHOUT the brand — the layout template appends "· ApplyHustle". */
  title?: string;
  description?: string;
  /** Route path for the canonical URL (default '/'). */
  path?: string;
  keywords?: readonly string[];
  /** Force-hide a single page from search even in production (e.g. thank-you pages). */
  noindex?: boolean;
  type?: 'website' | 'article';
}

export function buildMetadata(seo: PageSeo = {}): Metadata {
  const {
    title,
    description = seoConfig.description,
    path = '/',
    keywords = seoConfig.keywords,
    noindex = false,
    type = 'website',
  } = seo;

  const canonical = absoluteUrl(path);
  // Real env-driven indexing: production indexes, everything else is noindex.
  const index = seoConfig.isIndexable && !noindex;
  const socialTitle = title
    ? `${title} · ${seoConfig.name}`
    : `${seoConfig.name} — ${seoConfig.tagline}`;

  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...keywords],
    alternates: { canonical },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type,
      url: canonical,
      siteName: seoConfig.name,
      title: socialTitle,
      description,
      locale: seoConfig.locale,
      // Image is supplied automatically by app/opengraph-image.tsx (inherited by all routes).
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      ...(seoConfig.twitterHandle
        ? { site: seoConfig.twitterHandle, creator: seoConfig.twitterHandle }
        : {}),
    },
  };
}
