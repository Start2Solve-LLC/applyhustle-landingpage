# ApplyHustle Landing Page

Standalone marketing landing page for [ApplyHustle](https://github.com/Start2Solve-LLC/Auto-Apply-jobs-with-AI) — the AI job application platform. Built with Next.js (App Router), TypeScript, Tailwind CSS, and the `motion` animation library, sharing the main app's design-token system (light/dark themes).

## Prerequisites

- **Node.js 18.18+** (Node 20 LTS recommended)
- npm (ships with Node)

## Setup

```bash
npm install

# Configure the URL of the main ApplyHustle app (all CTAs link into it)
cp .env.example .env.local
# then edit .env.local and set:
#   NEXT_PUBLIC_APP_URL=<main app URL>   (dev default: http://localhost:5173)
#   NEXT_PUBLIC_SITE_URL=<this site's public URL, used for metadata/sitemap>
```

## Run

```bash
npm run dev     # dev server → http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Folder structure

```
landing/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # root layout: Inter font, metadata, theme no-flash script
│   ├── page.tsx              # thin server shell → LandingPageContent
│   ├── globals.css           # Tailwind + design tokens copied from the main app
│   ├── icon.svg              # favicon
│   └── sitemap.ts            # SEO sitemap
├── components/
│   ├── LandingPageContent.tsx  # page composition + US/International region state
│   ├── layout/               # Navbar (scrollspy, mobile sheet), MarketingFooter,
│   │                         # ThemeToggle, BackToTop
│   ├── marketing/
│   │   ├── primitives/       # GlassCard, SectionHeading, GaugeRing, MarqueeRow,
│   │   │                     # StatCounter, RegionToggle, BrowserChrome, …
│   │   └── mocks/            # animated product mocks (Auto-Apply stream, ATS card,
│   │                         # job feed, interview report, tracker, …)
│   ├── motion/               # Reveal / Stagger scroll-in animation wrappers
│   ├── sections/             # page sections in order: Hero, LogosStrip,
│   │   └── ats-demo/         # interactive drag-and-drop ATS scan demo
│   └── ui/                   # Button, Badge (app variant recipes)
├── data/                     # ALL copy lives here, typed — hero, features, pricing,
│                             # faq, testimonials, metrics, founder, nav, …
├── lib/                      # cn() class helper, appUrl(), motion vocabulary
└── public/images/            # brand logos
```

## Notes

- **Theming:** design tokens (oklch CSS variables) are copied verbatim from the main app so both projects share one visual language. Dark mode = `.dark` class on `<html>`, toggled from the navbar/footer and persisted in `localStorage`.
- **CTAs** (`Get started`, `Log in`, `ATS Checker`, pricing buttons) link into the main app via `NEXT_PUBLIC_APP_URL` — this site has no backend.
- **Pricing** shows the app's shipped US fallback prices; the live app localizes prices per country via its backend.
