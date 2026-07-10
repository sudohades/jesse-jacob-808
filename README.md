# Sudo Hades — Engineering Solutions

Production website built with **Next.js (App Router) + React + TypeScript** and styled with **Tailwind CSS (v4)**.

This repo currently includes a **template navigation + section pages** with dummy content so you can quickly plug in real copy, interactive components, and CMS data.

---

## What was added for this template

### Navigation panel (header)
- **New:** `src/components/site/SiteNav.tsx`
  - Defines the primary nav items:
    - Home (`/`)
    - Projects (`/projects`)
    - Services (`/services`)
    - Resources (`/resources`)
    - Blog (`/blog`)
    - About (`/about`)
  - Uses `next/link` so navigation is client-fast and accessible.

- **Updated:** `src/components/site/SiteHeader.tsx`
  - Renders the existing logo link and places `SiteNav` next to it.
  - Nav is hidden on small screens (`hidden md:block`)—easy place to later add a mobile drawer.

### Dummy pages (ready to integrate)
Each page is a standalone route under `app/` and uses the shared marketing shell:
- `app/projects/page.tsx`
- `app/services/page.tsx`
- `app/resources/page.tsx`
- `app/blog/page.tsx`
- `app/about/page.tsx`

Pages are currently being aligned to a common editorial system (page header + editorial layout primitives).

### Sitemap

- **Updated:** `app/sitemap.ts`
  - Ensures `/projects`, `/services`, `/resources`, `/blog`, `/about` are included.

---

## How the framework is structured (mental model)

### 1) Routing: `app/`
In Next.js **App Router**, each folder under `app/` can expose a route:
- `app/page.tsx` → `/` (Home)
- `app/<route>/page.tsx` → `/<route>`

Your dummy pages are implemented exactly like production routes, so you can later:
- replace dummy text with real content
- swap buttons for real links
- fetch data (CMS) inside server components

### 2) Shared layout chrome: `SiteShell`
Pages use `SiteShell` (from `src/components/site/SiteShell.tsx`) to keep the header/footer consistent.

The typical flow is:
- `app/layout.tsx` defines global document structure (fonts, metadata, base HTML)
- `SiteShell` renders:
  - `<SiteHeader />`
  - `<main id="main">{children}</main>`
  - `<SiteFooter />`

So pages only focus on their own content.

### 3) Components: `src/components/site/`
This directory holds reusable UI pieces:
- `SiteHeader.tsx` (logo + nav)
- `SiteNav.tsx` (navigation items)
- `SiteFooter.tsx` (footer)
- other small layout primitives like `Container.tsx`

### 4) Styling: Tailwind + design tokens
Styling is done via Tailwind utility classes.

Common patterns in this repo:
- Token-like colors such as `border-border`, `bg-background`, `text-muted-foreground`
- Spacing and layout via standard Tailwind classes (`py-24`, `flex`, `gap-3`, etc.)

To change the look globally, edit:
- `app/globals.css`
- Tailwind/theme configuration (depending on your Tailwind v4 setup)

To change styling per component/page:
- edit the Tailwind classes directly in the relevant component/page (fast iteration)

---

## How to define animations & interactions (recommended approach)

### A) Keep components “dumb” and actions “owned”
Right now the dummy buttons are plain `<button>` elements. When you wire up real behavior:
- If the interaction changes state on the client: turn the component into a Client Component (`"use client"`) and use hooks.
- If the interaction is navigation: prefer `<Link href="...">` so you avoid unnecessary client JS.

### B) Simple motion (CSS first)
Because Tailwind is already in place, the quickest path is usually:
- add transitions/hover styles via Tailwind classes
  - `transition-colors`, `duration-200`, `ease-out`
- for scroll/viewport effects, you can integrate a small client component (or a lightweight library)

If you already have animation helpers like `Reveal`/`Section` components in `src/components/site/`, reuse them:
- they typically encapsulate `IntersectionObserver`-style interactions

### C) Modern interactions
To bring the site toward modern standards:
- add active nav state (highlight current route)
  - `usePathname()` in a small Client Component can drive styling
- add keyboard + focus-visible improvements
  - ensure buttons/links have `focus-visible:*` styles
- improve mobile navigation
  - replace `hidden md:block` with a drawer/menu component

---

## Changing styles quickly

### Change header/nav styling
Update:
- `src/components/site/SiteNav.tsx`
  - edit the `className` on the `<Link>` items

### Change page typography and spacing
Update the dummy pages in:
- `app/<route>/page.tsx`

Because each page is currently just Tailwind utilities, you can iterate safely without impacting the rest of the site.

---

## Local development

```bash
pnpm install
pnpm dev
```

Open: http://localhost:3000

Build:
```bash
pnpm build
pnpm start
```

---

## Notes
- `pnpm lint` may currently fail due to an existing ESLint circular-structure issue in the repo’s ESLint configuration. This does not block `pnpm build`.

---

## Files modified/added in this navigation+pages update

- Added: `src/components/site/SiteNav.tsx`
- Updated: `src/components/site/SiteHeader.tsx`
- Added: `app/projects/page.tsx`
- Added: `app/services/page.tsx`
- Added: `app/resources/page.tsx`
- Added: `app/blog/page.tsx`
- Added: `app/about/page.tsx`
- Updated: `app/sitemap.ts`

