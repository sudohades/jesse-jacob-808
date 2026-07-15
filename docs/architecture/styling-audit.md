# Styling Audit (Halden UI brand-agnostic recovery)

> Incremental investigation + minimal recovery changes.

## 1. Current Styling Architecture

### 1.1 CSS entrypoints

**`app/layout.tsx`**
- Loads `next/font/google` fonts as CSS variables on `<html>`:
  - `--font-quantico`
  - `--font-share-tech-mono`
  - `--font-inter`

**`app/globals.css`** (import chain / orchestrator)
- Imports Halden UI styling layers from `src/styles/`:
  - `src/styles/globals.css` (Tailwind + app-level base tokens)
  - `src/styles/theme.css` (design tokens)
  - `src/styles/typography.css` (Halden UI typography primitives)
  - `src/styles/glass.css`
  - `src/styles/animations.css`

### 1.2 Styling dependency graph (evidence-based)

**Root → tokens/utilities → components**

1) `app/layout.tsx`
- `<html class="dark ${quantico.variable} ...">`

2) `app/globals.css`
- `@import "./globals.css";`
- `@import "./theme.css";`
- `@import "./typography.css";`
- `@import "./glass.css";`
- `@import "./animations.css";`

3) `src/styles/globals.css`
- Provides app runtime entry token aliases:
  - `--font-display/sans/mono` aliases
  - hero overlay tokens: `--hero-overlay-top/middle/bottom/focus`
  - hero accent: `--hero-accent`

4) `src/styles/theme.css`
- Declares core semantic palette tokens:
  - `--color-background`, `--color-foreground`, `--color-muted-*`, etc.
  - radii, motion, shadows, grid
- Declares hero text gradient tokens:
  - `--hero-text-start`, `--hero-text-middle`, `--hero-text-end`

5) `src/styles/typography.css`
- Declares Halden UI typography primitives as classes:
  - `.hd-h1` … `.hd-h6`
  - `.hd-display`, `.hd-body`, `.hd-lead`, `.hd-eyebrow`
  - `.hd-text-gradient` (currently a foreground→grey gradient; NOT hero tokens)

6) `src/components/*`
- `src/components/halden-ui/typography/Heading.tsx`:
  - maps `level` → `.hd-h1..hd-h6`
  - `gradient` prop currently applies `.hd-text-gradient`
- `app/page.tsx` (homepage hero) currently bypasses Halden UI `Hero` and uses direct Tailwind gradient utilities consuming hero tokens.

### 1.3 Duplicates / unused / circular imports

Evidence gathered from direct inspection (no ripgrep available):
- `src/styles/typography.css` contains `.hd-text-gradient`, but the homepage gradient headline uses *hero token* gradient utilities directly, not this primitive.

Circular import evidence:
- `npm run build` reports an ESLint warning about circular JSON serialization in `.eslintrc.json` (tooling, not CSS).

## 2. CSS Organization Audit (ownership)

### `app/globals.css`
- **Owner**: Application root (app layer)
- **Responsibility**: orchestration (import order) and minimal app-level aliases
- **Findings**:
  - Contains only import chain + token alias block (hero tokens and font aliasing)

### `src/styles/theme.css`
- **Owner**: Halden UI – Platform Core / design tokens layer
- **Responsibility**: semantic tokens (palette, motion, radii, shadows) + hero gradient tokens
- **Findings**:
  - Defines `--hero-text-start/middle/end` as token source of truth

### `src/styles/typography.css`
- **Owner**: Halden UI – typography primitives
- **Responsibility**: class-based typography system using token-driven fonts
- **Findings**:
  - `.hd-text-gradient` currently does not consume `--hero-text-*`.
  - Font variable names rely on aliases set earlier (`--font-display/sans/mono`).

### `src/styles/glass.css`
- **Owner**: Halden UI – component styling primitives
- **Responsibility**: glass panels and glow borders

### `src/styles/animations.css`
- **Owner**: Halden UI – motion primitives
- **Responsibility**: keyframes + `.hd-animate-*` utilities

### Component-level CSS
- No standalone CSS modules observed for Halden UI components; styling is via classnames and global CSS utilities.

## 3. Design Token Flow Audit

### 3.1 Typography tokens (fonts)

Evidence:
- `app/layout.tsx` defines `--font-quantico`, `--font-share-tech-mono`, `--font-inter`.
- `app/globals.css` (aliasing) maps to Halden UI expected variables:
  - `--font-display: var(--font-quantico)`
  - `--font-sans: var(--font-inter)`
  - `--font-mono: var(--font-share-tech-mono)`
- `src/styles/typography.css` uses `var(--font-*)` inside `.hd-*` classes.

**Result**: typography font plumbing is coherent.

### 3.2 Hero tokens

Evidence:
- `app/globals.css` defines:
  - `--hero-overlay-top/middle/bottom/focus`
  - `--hero-accent`
- `src/styles/theme.css` defines:
  - `--hero-text-start/middle/end`

**Consumption today**:
- Homepage hero headline gradient uses `from-[var(--hero-text-start)]` etc directly in `app/page.tsx`.
- Halden UI `Heading` uses `.hd-text-gradient`, which uses `--color-foreground` / `--color-grey-400` and not hero tokens.

**Regression risk**:
- Gradient behavior is duplicated and split between:
  - homepage-specific Tailwind token utilities
  - Halden UI generic `.hd-text-gradient`

## 4. Typography Audit

### 4.1 CSS variables / primitives chain

Evidence:
- `Heading.tsx`: applies `.hd-h1..hd-h6` and optionally `.hd-text-gradient`.
- `typography.css`: `.hd-h1..hd-h6` define sizes and set `font-family: var(--font-display)`.

### 4.2 Inconsistencies detected

Evidence:
- `app/page.tsx` passes `className="--font-quantico ..."` on the `Heading` component.
- `--font-quantico` is a CSS variable, not a Tailwind utility class.

**Conclusion**:
- Homepage currently mixes token-driven typography with non-standard className usage.

## 5. Hero Styling + Gradient (canonical implementation)

### Current canonical (actual homepage)

Evidence (`app/page.tsx`):
- Eyebrow uses inline token accent via `text-[var(--hero-accent)]`.
- Headline uses Tailwind gradient utilities consuming:
  - `--hero-text-start/middle/end`
  - and `bg-clip-text`
- Overlays use:
  - `from-[var(--hero-overlay-bottom)] via-[var(--hero-overlay-middle)] to-[var(--hero-overlay-top)]`
  - radial gradient using `--hero-overlay-focus`

### Where it should be canonicalized

- The Halden UI `Heading` gradient prop should become hero-token-aware.
- Prefer a reusable Halden UI class, e.g. `.hd-hero-gradient-text`, that consumes `--hero-text-*`.

## 6. Optimization Opportunities (deferred)

Identified but not implemented in this incremental audit:
- Consolidate duplicated cn utilities (internal vs public) across `src/lib/utils.ts` and `public/halden-ui/lib/cn.ts`.
- Remove duplicate typography components under `src/components/site/primitives/` if runtime duplication is confirmed.
- Replace homepage hero implementation to use `src/components/halden-ui/hero/Hero.tsx` directly (after gradient primitive is fixed).

## 7. Change Log

### 1) Added token-driven hero gradient utility
- **Reason**: Remove scattered Tailwind hero headline gradient logic; make Halden UI brand-agnostic and reusable.
- **Affected files**:
  - `src/styles/typography.css`
- **Validation**:
  - Ran `npm run build` successfully (pages-manifest generated).
- **Result**: New utility `.hd-hero-gradient-text` consumes `--hero-text-start/middle/end`.

### 2) Wired Heading `gradient` prop to hero gradient utility
- **Reason**: Ensure runtime typography primitives consume the shared token system.
- **Affected files**:
  - `src/components/halden-ui/typography/Heading.tsx`
- **Validation**:
  - Ran `npm run build` successfully.
- **Result**: `gradient` now applies `.hd-hero-gradient-text`.

### 3) Restored homepage gradient behavior using Halden UI primitive
- **Reason**: Fix invalid CSS-variable-as-class usage and stop duplicating hero gradient logic.
- **Affected files**:
  - `app/page.tsx`
- **Validation**:
  - Ran `npm run build` successfully.
- **Result**: Homepage uses `<Heading gradient ...>` and no longer passes token gradient utilities directly.


