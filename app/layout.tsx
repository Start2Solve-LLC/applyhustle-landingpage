import { Inter } from 'next/font/google';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, organizationSchema, seoConfig, websiteSchema } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap', // show text immediately with a fallback, swap to Inter (no FOIT)
});

/* Cache-busting version for favicons. Bump (e.g. '3') each time you replace the
   image files in public/logos/ so browsers fetch the new icons. */
const ICON_VERSION = '2';

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.url),
  // Site-wide defaults (description, keywords, canonical, robots, OG, Twitter).
  ...buildMetadata({ path: '/' }),
  // Title template: pages set their own title (e.g. "Home") which fills `%s`
  // → "Home | ApplyHustle". `default` covers any route without its own title.
  title: {
    default: seoConfig.name,
    template: `%s | ${seoConfig.name}`,
  },
  applicationName: seoConfig.name,
  // Real favicon set in public/logos/ — each size wired explicitly so browsers,
  // iOS home screens, and PWAs all pick the right asset. The ?v= suffix busts
  // the browser's aggressive favicon cache — bump it whenever you replace the
  // image files so users see the new icons instead of stale cached ones.
  icons: {
    icon: [
      { url: `/logos/favicon.ico?v=${ICON_VERSION}`, sizes: 'any' },
      { url: `/logos/favicon-16x16.png?v=${ICON_VERSION}`, type: 'image/png', sizes: '16x16' },
      { url: `/logos/favicon-32x32.png?v=${ICON_VERSION}`, type: 'image/png', sizes: '32x32' },
      {
        url: `/logos/android-chrome-192x192.png?v=${ICON_VERSION}`,
        type: 'image/png',
        sizes: '192x192',
      },
      {
        url: `/logos/android-chrome-512x512.png?v=${ICON_VERSION}`,
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: [
      { url: `/logos/apple-touch-icon.png?v=${ICON_VERSION}`, sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [`/logos/favicon.ico?v=${ICON_VERSION}`],
  },
  manifest: '/manifest.webmanifest',
};

/* Address-bar / OS chrome tint — matches the light cream and dark graphite themes. */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF8E7' },
    { media: '(prefers-color-scheme: dark)', color: '#131316' },
  ],
};

/* Applies the saved (or OS-preferred) theme before first paint to avoid a flash
   of the wrong mode. Storage key must match components/layout/ThemeToggle.tsx. */
const themeInitScript = `(function () {
  try {
    var stored = localStorage.getItem('applyhustle-landing-theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Site-wide entity graph: brand name + logo in Google results / knowledge panel. */}
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        {/* Analytics slot: drop your analytics snippet / <Script> component here */}
      </head>
      <body
        suppressHydrationWarning
        className="bg-background font-sans text-foreground antialiased"
      >
        {children}
      </body>
    </html>
  );
}
