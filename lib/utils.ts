/** Joins conditional class names — tiny local stand-in for clsx (no extra deps). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/* The main ApplyHustle app is a separate deployment (frontend/, Vite on :5173 in dev).
   All CTAs link into it via NEXT_PUBLIC_APP_URL — see .env.example. */
const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173';

/** Absolute URL into the main app, e.g. appUrl('/signup'). */
export function appUrl(appPath: string): string {
  return `${APP_BASE_URL.replace(/\/+$/, '')}${appPath}`;
}

/** Public base URL of this landing site (metadata + sitemap). */
export const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
