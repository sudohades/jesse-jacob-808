# Typography & Design Token Regression Investigation

## Executive Summary
Typography (including the custom fonts and hero H1 styling/gradient) regressed after architectural stabilization.

Evidence from the repository’s current source shows that:
1. The **`next/font` pipeline is still wired**: `app/layout.tsx` loads **Quantico**, **Share Tech Mono**, and **Inter**, and attaches their generated CSS variables to the root `<html>` element.
2. The app’s **token aliasing** is present: `app/globals.css` defines `--font-display`, `--font-sans`, and `--font-mono` aliases that point to the `next/font` variables.
3. Halden UI typography primitives still exist and are expected to work, e.g.:
   - `src/components/halden-ui/typography/Heading.tsx` maps `level={1}` → `hd-h1`.
   - `src/styles/typography.css` defines `.hd-h1` using `font-family: var(--font-display)` and defines `.hd-text-gradient`.

However, the **runtime hero gradient and font styling disappearing** is consistent with one or more breaks in:
- the **CSS import chain** for the typography stylesheet (the report shows canonical imports failing to locate `public/halden-ui/styles/*` in the current repo state), and/or
- Tailwind utility class generation / scanning for the hero gradients (repository build validation is currently blocked, and a Tailwind config file couldn’t be located in the expected place).

**Build evidence:** `pnpm next build` fails before producing a reliable runtime CSS artifact due to a missing generated file under `.next/types/...`.

## Root Cause
**Root cause cannot be proven end-to-end yet** because runtime verification is blocked by a Next build failure and by missing canonical “Halden UI styles” paths in this workspace.

What is proven so far:
- The `next/font` pipeline and its attachment mechanism to `<html>` exists (so “fonts not loaded at all” is unlikely to be the primary break).
- Typography CSS class definitions for `hd-h1` and `hd-text-gradient` exist in `src/styles/typography.css`.
- The app’s hero H1 in `app/page.tsx` relies on **both** Halden UI typography classes/tokens **and** Tailwind gradient utilities that reference CSS variables (`--hero-text-*` and `--hero-overlay-*`).

What remains unproven (and therefore not asserted as root cause):
- Whether the typography stylesheet that contains `.hd-h1` / `.hd-text-gradient` is actually present in the compiled runtime CSS.
- Whether `public/halden-ui/styles/*` is present/used in the current repo state (reads failed for those paths, while `src/styles/*` exists).

## Font Pipeline
### Canonical expected chain
`next/font` → `layout.tsx` → CSS variables on `<html>` → `globals.css` aliases → typography CSS consumes `--font-*`.

### Evidence (current code)
**1) `next/font` loaders are executed**
- File: `app/layout.tsx`
- Loads:
  - `Quantico` with `variable: "--font-quantico"`
  - `Share_Tech_Mono` with `variable: "--font-share-tech-mono"`
  - `Inter` with `variable: "--font-inter"`

**2) Variables are attached to `<html>`**
- File: `app/layout.tsx`
- `<html ... className={
    "+ dark + quantico.variable + shareTechMono.variable + inter.variable"
  }>`

**3) Halden UI alias variables are defined**
- File: `src/styles/globals.css`
- `body { font-family: var(--font-sans, "Inter"), ... }`
- File: `app/globals.css`
  - `:root { --font-display: var(--font-quantico); --font-sans: var(--font-inter); --font-mono: var(--font-share-tech-mono); }`

### Potential breakpoints (needs runtime evidence)
- If fonts still appear to be defaulting, likely causes are:
  - the alias layer (`--font-*`) not loaded at runtime due to CSS import chain failure, or
  - typography CSS not actually imported from the file that defines `.hd-*`.

## Typography Pipeline
### Canonical expected chain
`Halden UI typography stylesheet import` → `.hd-*` classes generated/available → components (Heading/Body/Eyebrow) apply classes → browser resolves `font-family` from `--font-*`.

### Evidence from repo
**Heading primitive still maps to Halden UI classes**
- File: `src/components/halden-ui/typography/Heading.tsx`
- `level=1` → class `hd-h1`
- `gradient` prop adds class `hd-text-gradient`

**Typography classes exist**
- File: `src/styles/typography.css`
- `.hd-h1 { font-family: var(--font-display, "Quantico"?) ; font-weight: 700; ... }`
- `.hd-text-gradient { background: linear-gradient(...); -webkit-background-clip:text; color: transparent; }`

### Unresolved import-chain evidence
- `app/globals.css` imports Halden UI styles.
- The current `app/globals.css` (runtime orchestrator) imports **from `../public/halden-ui/styles/*`** in addition to a separate `src/styles/globals.css` import.
- In this workspace, `public/halden-ui/styles/*` paths could not be read (files not found), while `src/styles/typography.css` exists.

This mismatch strongly suggests one of:
- the repo state differs from the expected import paths (canonical files not present), and/or
- the app is importing the wrong typography file(s), leaving `hd-h1` / `hd-text-gradient` undefined at runtime.

## Gradient Investigation (Homepage hero H1)
### Expected (from current repo’s homepage code)
- File: `app/page.tsx`
- The hero H1 uses `Heading level={1}` and sets a custom className:
  - `--font-quantico`
  - `bg-gradient-to-b from-[var(--hero-text-start)] via-[var(--hero-text-middle)] to-[var(--hero-text-end)]`
  - `bg-clip-text`

Overlays behind content use:
- File: `app/page.tsx`
- Tailwind classes:
  - `bg-gradient-to-t from-[var(--hero-overlay-bottom)] via-[var(--hero-overlay-middle)] to-[var(--hero-overlay-top)]`

### Missing gradient hypotheses (not asserted as root cause)
To render the gradient, all of the following must exist at runtime:
1. Tailwind utility CSS for:
   - `bg-gradient-to-b`, `bg-gradient-to-t`, `from-[...]`, `via-[...]`, `to-[...]`, `bg-clip-text`.
2. CSS variables:
   - `--hero-text-start`, `--hero-text-middle`, `--hero-text-end`
   - `--hero-overlay-bottom`, `--hero-overlay-middle`, `--hero-overlay-top`
3. The element has the proper classes.

### Evidence of variable definitions (code)
- File: `app/globals.css`
- Defines `:root` hero variables:
  - `--hero-overlay-top`, `--hero-overlay-middle`, `--hero-overlay-bottom`
  - `--hero-text-start/middle/end` via `--color-gradient-*`

### Evidence of missing canonical style imports
- `app/globals.css` imports typography layers from `../public/halden-ui/styles/typography.css`.
- Those files are not present in this workspace.

If the typography styles do not load, `.hd-h1` may still exist (if coming from `src/styles/typography.css`), but the hero’s **text gradient** also depends on Tailwind’s `bg-clip-text` and gradient utilities.

## Supporting Evidence
### Affected files / imports
1. `app/layout.tsx`
   - Confirms `next/font` variables attachment to `<html>`.
2. `app/globals.css`
   - Defines hero and font alias variables.
   - Imports Halden UI CSS from `../public/halden-ui/styles/*`.
3. `src/styles/globals.css`
   - Imports Halden UI theme/typography/glass/animations via `./theme.css`, `./typography.css`, etc.
4. `src/styles/typography.css`
   - Contains `.hd-h1`, `.hd-text-gradient`, and `hd-font-*` classes.
5. `src/components/halden-ui/typography/Heading.tsx`
   - Maps heading levels to `.hd-h*` classes.
6. `app/page.tsx`
   - Uses Tailwind gradient utilities with CSS vars for hero overlays and hero text.

### Runtime / build validation status
- `pnpm next build` fails in this workspace, preventing reliable compiled CSS artifact verification.
- The failure occurs after compilation and during type/lint processing with an error indicating missing `.next/types/app/about/page.ts`.

Because of this, the report cannot yet include:
- rendered HTML class presence evidence (via browser DevTools),
- generated CSS presence evidence (via inspecting the compiled CSS output).

## Minimal Fix Plan (no implementation)
> Goal: restore the original typography system with the smallest set of changes, without altering architecture, tokens, fonts, or components.

### Smallest file set likely required
1. `app/globals.css`
   - Fix the **canonical Halden UI CSS import chain** so the typography stylesheet that defines `.hd-h1` / `.hd-text-gradient` is actually loaded.
   - Ensure the import path points to an existing file in this repo state (prefer `src/styles/*` if `public/halden-ui/styles/*` is absent).

2. `app/page.tsx` (only if class generation evidence shows missing Tailwind utilities)
   - If Tailwind utilities for the hero gradient are missing from runtime CSS, confirm Tailwind content scanning includes `app/page.tsx` and classnames are preserved.
   - (No changes proposed here yet; only investigate.)

3. Tailwind config discovery (non-invasive)
   - Locate the actual `tailwind.config.*` (it wasn’t found in the previously attempted path) or verify Tailwind v4 configuration exists.
   - Confirm `content` globs cover `app/**/*` and `src/**/*`.

### Order of correction
1. Validate CSS import chain: ensure typography CSS defining `.hd-h1` is definitely loaded.
2. Validate variable propagation: ensure `--font-display` and `--hero-text-*` vars resolve at runtime.
3. Validate Tailwind utility generation for `bg-gradient-to-*`, `bg-clip-text`, and bracketed `from-[var(...)]` variants.
4. Only then adjust anything else.

### Why these changes restore typography
- Typography primitives depend on (a) the presence of `.hd-*` CSS rules and (b) correct resolution of `--font-*` variables.
- Hero gradient depends additionally on (c) Tailwind gradient utility CSS being generated and (d) `--hero-text-*` and `--hero-overlay-*` variables being defined.
- If the import chain is broken, all downstream consumers fail.

## Investigation Success Criteria (what is still pending evidence)
- Font variables attached to `<html>`: **proven by code** (`app/layout.tsx`).
- Variables aliased in `globals.css`: **proven by code** (`app/globals.css`).
- Halden UI receives expected typography variables: **pending runtime verification**.
- Typography tokens/classes consumed: **partially proven** by source existence (`Heading.tsx`, `src/styles/typography.css`), but runtime presence of those CSS rules is **pending**.
- Hero H1 styling/gradient disappearance: **pending runtime evidence** (DevTools: computed styles + applied classes + computed `--hero-*` values).
- Identify the exact change: **not yet pinned to a specific commit/file diff**; current workspace evidence suggests an import-path/chain mismatch as the most likely structural break, but it is not fully proven without runtime CSS artifact verification.

