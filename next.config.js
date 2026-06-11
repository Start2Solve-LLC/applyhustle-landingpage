/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — GitHub Pages serves files only, with no Node runtime.
  // Produces an `out/` directory at build time. robots/sitemap/manifest and the
  // OG image are pre-rendered to static files during the export.
  output: 'export',

  reactStrictMode: true,

  // GitHub Pages has no Image Optimization server, so next/image must serve the
  // original files. (Optimize source images manually — see DEPLOYMENT notes.)
  images: { unoptimized: true },

  // Emit `/route/index.html` so a static host resolves clean URLs without
  // server-side routing. Safe with a custom domain at the root (no basePath).
  trailingSlash: true,

  // Tree-shake barrel imports so only the icons/utilities actually used are
  // bundled, instead of pulling in the whole library. Trims the shared JS.
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

const { withSentryConfig } = require('@sentry/nextjs');

// Wrap with Sentry to upload source maps at build time (for readable stack
// traces). Source-map upload is skipped automatically unless SENTRY_AUTH_TOKEN
// + SENTRY_ORG + SENTRY_PROJECT are set (e.g. in CI), so local/dev builds are
// unaffected. No `tunnelRoute` — that needs a server, which a static export
// (output: 'export') doesn't have.
module.exports = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Quiet locally; verbose in CI for upload diagnostics.
  silent: !process.env.CI,
  widenClientFileUpload: true,
  telemetry: false,
});
