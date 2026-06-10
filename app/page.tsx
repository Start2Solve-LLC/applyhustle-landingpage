import { LandingPageContent } from '@/components/LandingPageContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, seoConfig, softwareApplicationSchema } from '@/lib/seo';
import type { Metadata } from 'next';

/* Tab title for the home route → "Home | ApplyHustle".
   `absolute` is required here: the layout's `%s | ApplyHustle` template only
   applies to CHILD segments, and the root page shares the root layout's
   segment — so a plain `title: 'Home'` would render without the suffix.
   Canonical, robots, and Open Graph are inherited from the root layout. */
export const metadata: Metadata = {
  title: { absolute: `Home | ${seoConfig.name}` },
};

/* Server shell — site-wide metadata + Organization/WebSite schema live in
   layout.tsx. Page-specific structured data (the product, its pricing offers,
   and the on-page FAQ) is emitted here. The page body is one interactive client
   tree (region toggle, live mocks, scroll animations). */
export default function LandingPage() {
  return (
    <>
      <JsonLd
        schema={[
          softwareApplicationSchema(),
          faqSchema(),
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
        ]}
      />
      <LandingPageContent />
    </>
  );
}
