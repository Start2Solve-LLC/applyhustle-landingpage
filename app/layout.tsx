import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/data/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    // TODO: add an og-cover image (1200×630 .webp in public/images) once brand assets exist
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
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
        {/* Analytics slot: drop your analytics snippet / <Script> component here */}
      </head>
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
