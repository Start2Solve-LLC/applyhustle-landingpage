import { seoConfig } from '@/lib/seo';
import type { MetadataRoute } from 'next';

// Required for `output: 'export'` — pre-render this route to a static file.
export const dynamic = 'force-static';

/**
 * Generates /manifest.webmanifest (PWA + Android install metadata). Typed and
 * env-driven — supersedes the static public/logos/site.webmanifest, which is no
 * longer linked. Icons live in public/logos/.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.name,
    short_name: seoConfig.name,
    description: seoConfig.description,
    start_url: '/',
    display: 'standalone',
    theme_color: '#8b3dff',
    background_color: '#FFF8E7',
    icons: [
      {
        src: '/logos/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logos/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
