import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderBrandCard } from '@/lib/seo/og-image';

/** Twitter/X share card — same 1200×630 brand card as Open Graph. */
// Required for `output: 'export'` — pre-render the image to a static file.
export const dynamic = 'force-static';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function TwitterImage() {
  return renderBrandCard();
}
