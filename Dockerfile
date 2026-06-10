# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────────────────────
# Multi-stage build for a Next.js STATIC EXPORT (output: 'export').
# The app has no Node runtime in production, so the final image is a tiny,
# non-root nginx serving the pre-built static `out/` directory.
#
#   stage 1 (deps)    → install node_modules (cached on lockfile changes)
#   stage 2 (builder) → next build → /app/out
#   stage 3 (runner)  → nginx serving the static files (the only shipped image)
# ─────────────────────────────────────────────────────────────────────────────

# ---------- 1) Dependencies ----------
FROM node:22-alpine AS deps
WORKDIR /app
# Copy only manifests first so this layer is cached unless deps change.
COPY package.json package-lock.json ./
RUN npm ci

# ---------- 2) Build (static export) ----------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public, build-time config — baked into the static HTML/JS at build.
# Pass with --build-arg; never put secrets here (NEXT_PUBLIC_* is public).
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_SEO_INDEX=true
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_SEO_INDEX=$NEXT_PUBLIC_SEO_INDEX \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

RUN npm run build   # output: 'export' → produces /app/out

# ---------- 3) Runtime (static file server) ----------
# nginx-unprivileged runs as a non-root user on port 8080 — secure by default.
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html

# Replace the default server block with our static-export config.
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Ship only the static output — no Node, no source, no node_modules.
COPY --from=builder /app/out ./

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
