import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderBrandCard } from '@/lib/seo/og-image';

/**
 * Dynamically generated 1200×630 Open Graph card. Next inherits it for every
 * route, so all pages get a branded link preview with no hand-designed asset.
 * Add a per-segment opengraph-image.tsx to override for a specific page.
 */
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderBrandCard();
}
