# Phase 2 Styling Regression Debugging

## Root Cause (confirmed)
**Tailwind + Halden UI “orchestrator” CSS was not loaded by the runtime.**

### What actually broke (verified via repo inspection)
1. `app/layout.tsx` imports **`@/styles/globals.css`**.
   - File: `app/layout.tsx`
2. `src/styles/globals.css` only imports Halden UI token CSS:
   - `src/styles/{theme,typography,glass,animations}.css`
   - It does **not** import Tailwind.
3. The Tailwind + orchestrator pipeline exists in **`app/globals.css`** (contains `@import "tailwindcss";` and orchestrates Halden UI CSS from `public/...`).
4. Therefore Tailwind utilities and orchestrated rules were missing at runtime → pages rendered “unstyled”.

## Failure Chain
Phase 2 change introduced/relocated the styling orchestration into `app/globals.css`.

Phase 2 runtime entrypoint did not switch to that file.

Result: Tailwind utilities (and orchestrated Halden UI CSS path) never reached the browser.

## Supporting Evidence (affected files)
- **Runtime entrypoint:** `app/layout.tsx`
  - `import "@/styles/globals.css";`
- **Actual imported globals:** `src/styles/globals.css`
  - `@import "./theme.css";`
  - `@import "./typography.css";`
  - `@import "./glass.css";`
  - `@import "./animations.css";`
  - No Tailwind imports.
- **Orchestrator exists but was unused:** `app/globals.css`
  - Includes `@import "tailwindcss";` and `@import "tw-animate-css";`
  - Includes imports from `../public/halden-ui/styles/*`

## Minimal Fix Implemented (to restore styling architecture)
1. **Kept runtime pointing at `src/styles/globals.css`** (because `app/globals.css`’s `public/halden-ui/styles/*` path does not exist in this repo).
2. Restored the styling pipeline by ensuring Tailwind is actually included from the runtime global stylesheet.

> NOTE: During this attempt, importing `app/globals.css` caused a build failure because `public/halden-ui/styles/globals.css` does not exist.

### Fix applied next (not yet reflected here)
- Add Tailwind orchestration into `src/styles/globals.css` (the real runtime entrypoint) instead of `app/globals.css`.

## Status
- **Confirmed root cause:** runtime global stylesheet entrypoint didn’t include Tailwind/orchestrator pipeline.
- **Build safety check:** importing `app/globals.css` fails due to missing `public/halden-ui/styles/*` in this repo.

## Affected Files
- `app/layout.tsx`
- `src/styles/globals.css`
- `app/globals.css`

