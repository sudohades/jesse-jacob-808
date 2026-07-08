# Revline Collective

Production website for Revline Collective — a media, branding and growth studio for the performance automotive industry.

## Stack

- **Next.js 15** — App Router, React 19, TypeScript
- **Tailwind CSS v4** — CSS-first design tokens (`@theme`, `@utility`)
- **lucide-react** — icon set

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Deploy

Ready to deploy to Vercel with zero configuration — push the repo and import it in the Vercel dashboard.

## Project structure

```
app/                    Next.js App Router routes
  layout.tsx            Root layout, fonts, metadata
  page.tsx              Home
  <route>/page.tsx      Section pages
  sitemap.ts            Generated /sitemap.xml
  globals.css           Tailwind v4 entry + design tokens
src/
  components/site/      Layout chrome (header, footer, hero, section)
  components/home/      Home & shared section components
  components/cards/     Service & industry card variants
  lib/content.ts        Single source of truth for all site content
  lib/utils.ts          `cn()` class helper
public/                 Static assets (images, favicon, robots.txt)
```

## Content

All page copy, services, industries, testimonials, insights, and company details live in `src/lib/content.ts`. Replace the constants with typed CMS loaders (Sanity, Payload, Contentful) when the CMS lands — component code stays untouched.
