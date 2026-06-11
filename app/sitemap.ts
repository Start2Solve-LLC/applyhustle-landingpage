import { seoConfig } from '@/lib/seo';
import type { MetadataRoute } from 'next';

// Required for `output: 'export'` — pre-render this route to a static file.
export const dynamic = 'force-static';

/**
 * Generates /sitemap.xml. The landing site is a single indexable route today;
 * add new pages here as the site grows (in-page #anchors are NOT separate URLs
 * and must not be listed).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${seoConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
