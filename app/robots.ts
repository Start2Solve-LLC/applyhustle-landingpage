import { seoConfig } from '@/lib/seo';
import type { MetadataRoute } from 'next';

/**
 * Generates /robots.txt. On non-production deployments the whole site is
 * disallowed so staging/preview never gets indexed; production allows
 * everything and advertises the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  if (!seoConfig.isIndexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${seoConfig.url}/sitemap.xml`,
    host: seoConfig.url,
  };
}
