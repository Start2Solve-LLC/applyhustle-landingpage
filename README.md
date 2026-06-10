# ApplyHustle Landing Page

Standalone marketing landing page for [ApplyHustle](https://github.com/Start2Solve-LLC/Auto-Apply-jobs-with-AI) — the AI job application platform. Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and the `motion` animation library, sharing the main app's design-token system (light/dark themes).

It is a single, content-driven marketing page (anchor-linked sections — Features, How it works, Pricing, ATS demo, FAQ, etc.). All CTAs link into the separate main app; this site has **no backend**.

---

## Tech stack

| Concern       | Choice                                               |
| ------------- | ---------------------------------------------------- |
| Framework     | Next.js 15, App Router, React 19                     |
| Language      | TypeScript (strict)                                  |
| Styling       | Tailwind CSS 3 + design tokens (oklch CSS variables) |
| Animation     | `motion` (Framer Motion successor)                   |
| Icons         | `lucide-react`                                       |
| Linting       | ESLint 9 (flat config)                               |
| Formatting    | Prettier 3                                           |
| Git hooks     | Husky 9 + lint-staged                                |
| Deploy target | GitHub Pages (static export)                         |

---

## Prerequisites

- **Node.js 20 LTS** (or 18.18+)
- npm (ships with Node)

## Setup

```bash
npm install        # also runs `husky` (prepare script) to install git hooks

cp .env.example .env.local
# then edit .env.local — see "Environment variables" below
```

## Environment variables

| Variable                | Purpose                                                                                                                                                          | Dev default             |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_APP_URL`   | Base URL of the **main app**. All CTAs (`Get started`, `Log in`, `ATS Checker`, pricing) link here.                                                              | `http://localhost:5173` |
| `NEXT_PUBLIC_SITE_URL`  | Canonical public URL of **this** site. Drives canonical tags, sitemap, robots, OG image URLs, and JSON-LD. **Must** be the real `https://` domain in production. | `http://localhost:3000` |
| `NEXT_PUBLIC_SEO_INDEX` | _(optional)_ Force indexing on/off. Unset = auto: production indexes, preview/dev are `noindex`.                                                                 | _(unset)_               |

---

## Scripts

```bash
npm run dev          # dev server → http://localhost:3000
npm run build        # production build → static export into ./out
npm run start        # serve a production build (non-export use)

npm run lint         # eslint, fails on ANY warning (--max-warnings 0)
npm run lint:fix     # eslint --fix
npm run format       # prettier --write .
npm run format:check # prettier --check . (used in CI)
npm run typecheck    # tsc --noEmit
npm run validate     # typecheck + lint + format:check  (run before pushing)
```

> ⚠️ **Don't run `npm run build` while `npm run dev` is running.** Both write to
> `.next` and will corrupt each other — the dev server ends up serving an
> unstyled page or 404'd assets. If that happens: `rm -rf .next && npm run dev`.

---

## Folder structure

```
landingpage/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # root: Inter font, metadata, favicons, theme no-flash, JSON-LD
│   ├── page.tsx               # server shell → LandingPageContent + page-level JSON-LD
│   ├── globals.css            # Tailwind + design tokens (copied from main app)
│   ├── sitemap.ts             # generated /sitemap.xml
│   ├── robots.ts              # generated /robots.txt (env-based indexing)
│   ├── manifest.ts            # generated /manifest.webmanifest (PWA)
│   ├── opengraph-image.tsx    # dynamic 1200×630 social card (next/og)
│   └── twitter-image.tsx      # same card for Twitter/X
├── components/
│   ├── LandingPageContent.tsx # composition + US/Intl region state + lazy loading
│   ├── layout/                # Navbar (scrollspy, mobile sheet), Footer, ThemeToggle, BackToTop
│   ├── marketing/
│   │   ├── primitives/        # GlassCard, SectionHeading, GaugeRing, MarqueeRow, …
│   │   └── mocks/             # animated product mocks (Auto-Apply, ATS card, job feed, …)
│   ├── motion/                # Reveal / Stagger (scroll-in) + LazyMount (on-scroll mount)
│   ├── sections/              # page sections in order: Hero, LogosStrip, …
│   │   └── ats-demo/          # interactive drag-and-drop ATS scan demo
│   ├── seo/                   # JsonLd component
│   └── ui/                    # Button, Badge (app variant recipes)
├── data/                      # ALL copy lives here, typed — hero, features, pricing, faq, …
├── lib/
│   ├── utils.ts               # cn() class helper, appUrl(), siteBaseUrl
│   ├── motion.ts              # shared motion vocabulary
│   └── seo/                   # SEO toolkit: config, metadata helper, schema generators, og-image
├── public/
│   ├── logos/                 # favicon set (favicon.ico, *-chrome, apple-touch, …)
│   ├── images/                # brand wordmark logos (used in navbar/footer)
│   ├── CNAME                  # GitHub Pages custom domain  ⚠️ set to your real domain
│   └── .nojekyll              # tell Pages not to run Jekyll (keeps _next/ assets)
├── eslint.config.mjs          # ESLint 9 flat config
├── .prettierrc / .prettierignore
├── .husky/                    # git hooks (pre-commit → lint-staged)
└── next.config.js             # static export config for GitHub Pages
```

---

## Engineering conventions

- **Content is data.** Every string lives in `data/*.ts`, typed. Components render data — don't hardcode copy in JSX.
- **Path alias:** import from `@/...` (e.g. `@/components/...`, `@/lib/seo`) — never deep relative paths.
- **Imports are auto-ordered** by ESLint (`import/order`) and formatted by Prettier on commit — don't hand-sort.
- **No `console.log`** in committed code (`no-console` is an error; `console.warn`/`error` allowed).
- **Client vs server:** sections use `'use client'` because of `motion`. Keep data files and `lib/seo/*` server-safe (no client-only APIs) so metadata/schema can use them.

### Git hooks (Husky + lint-staged)

- **pre-commit** → `lint-staged`: runs `eslint --fix` + `prettier --write` on **staged** files only. An unfixable lint error blocks the commit.
- **pre-push** is intentionally **not** wired to a full build (it would clobber a running `next dev` and slow every push). Run `npm run validate` manually, and let CI own the production build. _(A typecheck-only pre-push hook can be added if desired.)_

---

## SEO architecture

A reusable, env-driven SEO toolkit lives in [`lib/seo/`](lib/seo/):

- **`config.ts`** — single source of truth: brand, canonical URL, keywords, and the `isIndexable` policy (production indexes; preview/dev `noindex`).
- **`metadata.ts`** — `buildMetadata({ title, description, path })` produces correct canonical + robots + Open Graph + Twitter tags for any page. The root layout sets the title template `%s | ApplyHustle`; the home page uses `title: { absolute: 'Home | ApplyHustle' }` (Next templates don't apply to the root segment).
- **`schema.ts`** — JSON-LD generators: `Organization`, `WebSite`, `SoftwareApplication` (with pricing offers), `FAQPage`, `BreadcrumbList`, rendered via `components/seo/JsonLd.tsx`.
  - **Note:** no `aggregateRating`/review schema is emitted — the testimonials are illustrative, and fake review markup violates Google's policy. Add it only with real data.
- **`og-image.tsx`** — shared renderer for the dynamic 1200×630 social card.
- **Favicons** live in `public/logos/`, wired in `layout.tsx` with a `?v=` cache-bust (`ICON_VERSION` — bump it when you replace the images).

`robots.ts`, `sitemap.ts`, and `manifest.ts` are generated routes that read from the SEO config.

---

## Performance

- **Lazy loading:** above-the-fold (Navbar, Hero, LogosStrip) is eager; every below-the-fold section is a `next/dynamic` chunk mounted on scroll via `components/motion/LazyMount.tsx` (IntersectionObserver, ~600px pre-load, reserved height to avoid layout shift).
- **Bundle:** `optimizePackageImports` tree-shakes `lucide-react` + `motion`; `next/font` loads Inter with `display: swap`.
- **Responsive:** mobile-first; verified 320px → ultrawide. Notable fixes: fluid ATS gauge, wrap-safe CTA rows, tablet pricing grid.

---

## Deployment — GitHub Pages (static export)

The site builds to a fully static `out/` directory (`output: 'export'` in `next.config.js`).

**Implications of static export:**

- `images: { unoptimized: true }` — no Image Optimization server. Optimize source images yourself (the navbar wordmark in `public/images/` is large; consider compressing).
- No server runtime, ISR, or API routes — none are used. `robots`/`sitemap`/`manifest`/OG-image are pre-rendered to static files at build.
- Served from a **custom domain** at the root (`public/CNAME`) → **no `basePath`**. If you ever move to `user.github.io/landingpage`, you must add `basePath`/`assetPrefix`.

**Build locally:**

```bash
# stop `next dev` first (avoids the .next clobber)
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build   # → ./out
```

**Before going live:**

1. Set `public/CNAME` to your real domain and point DNS at GitHub Pages.
2. Set `NEXT_PUBLIC_SITE_URL` to that `https://` domain in the build environment.
3. After deploy: submit the sitemap in Google Search Console; validate `/` and `/opengraph-image` with the Rich Results Test.

> A GitHub Actions CI/CD workflow (lint → format check → typecheck → build → deploy to Pages) is **not yet committed**. Add `.github/workflows/deploy.yml` when ready.

---

## Notes

- **Theming:** design tokens (oklch CSS variables) are copied verbatim from the main app. Dark mode = `.dark` class on `<html>`, toggled from navbar/footer, persisted in `localStorage`, applied pre-paint by an inline script to avoid a flash.
- **Pricing** shows the app's shipped US fallback prices; the live app localizes per country via its backend.
- **`public/logos/site.webmanifest`** is now unused — superseded by the generated `app/manifest.ts` (`/manifest.webmanifest`). Safe to delete.
