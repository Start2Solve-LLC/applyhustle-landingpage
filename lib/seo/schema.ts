import { faqSection, type FaqEntry } from '@/data/faq';
import { pricingSection } from '@/data/pricing';
import { absoluteUrl, seoConfig } from './config';

/**
 * JSON-LD schema generators. Each returns a plain, serializable object that the
 * <JsonLd> component renders into a <script type="application/ld+json">.
 *
 * Shared @id anchors let nodes reference each other (e.g. WebSite → publisher →
 * Organization) so Google builds one connected entity graph instead of isolated
 * blobs. Validate output with the Rich Results Test + Schema.org validator.
 */

type JsonLdObject = Record<string, unknown>;

const ORGANIZATION_ID = `${absoluteUrl('/')}#organization`;
const WEBSITE_ID = `${absoluteUrl('/')}#website`;

/** Who publishes the site — powers brand name + logo in Google's knowledge panel. */
export function organizationSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: seoConfig.name,
    legalName: seoConfig.legalName,
    url: absoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logos/android-chrome-512x512.png'),
      width: 512,
      height: 512,
    },
    description: seoConfig.description,
    ...(seoConfig.parentBrand && {
      parentOrganization: { '@type': 'Organization', name: seoConfig.parentBrand },
    }),
  };
}

/** The site as an entity — name + canonical URL, attributed to the Organization. */
export function websiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: seoConfig.name,
    url: absoluteUrl('/'),
    description: seoConfig.description,
    inLanguage: 'en-US',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/**
 * The product itself, as a SoftwareApplication with one Offer per pricing tier.
 * Intentionally NO aggregateRating/review — only add those with real, verifiable
 * data, or Google may issue a structured-data manual action.
 */
export function softwareApplicationSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: seoConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: absoluteUrl('/'),
    description: seoConfig.description,
    publisher: { '@id': ORGANIZATION_ID },
    offers: pricingSection.tiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      price: (tier.price ?? 0).toFixed(2),
      priceCurrency: 'USD',
      url: absoluteUrl('/#pricing'),
      availability: 'https://schema.org/InStock',
    })),
  };
}

/**
 * FAQ rich data from the on-page accordion. The questions MUST be visible on the
 * page (they are) — invisible FAQ markup violates Google's guidelines. Note:
 * since 2023 Google limits FAQ rich results to authoritative gov/health sites,
 * but the markup remains valid, machine-readable, and future-proof.
 */
export function faqSchema(entries: FaqEntry[] = faqSection.entries): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** Breadcrumb trail. Most valuable on nested pages; on the single-page site it's just Home. */
export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
