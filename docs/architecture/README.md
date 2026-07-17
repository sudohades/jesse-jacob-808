# Runtime Architecture

## System shape

The repository is a Next.js App Router application. Its runtime is organized
into four cooperating layers:

```text
app/ routes
  → site composition
  → Halden UI presentation
  → platform/configuration utilities
```

The Content Engine is a parallel compiler path used by content-backed routes;
it is documented separately in `docs/content-engine-architecture.md`.

## Request flow

1. `app/layout.tsx` sets document metadata/viewport, attaches `next/font`
   variables, loads `src/styles/globals.css`, and mounts analytics.
2. A route renders static composition or requests a typed document from the
   Content Engine registry.
3. `SiteShell` provides header, main region, and footer for public pages.
4. Site components choose composition; Halden UI components produce semantic
   HTML and token-driven presentation.
5. Client components are limited to interaction boundaries, notably navigation
   and browser-history back navigation.

## Ownership

| Area | Owner | Notes |
|---|---|---|
| Routing and page selection | `app/` | Keep routes thin and server-first. |
| Global shell and branding | `src/components/site/`, `src/config/` | Header/footer/page composition and brand data. |
| Presentation primitives | `src/components/halden-ui/` and `src/styles/` | Tokens, typography, surfaces, cards, navigation. |
| Content documents | `src/content/engine/` | Discovery through rendering contract. |
| Metadata and sitemap | `src/platform/core/`, `src/platform/adapters/next/` | Framework-neutral model plus adapter. |
| Static files | `public/` | Local asset targets for routes and content. |

## Dependency direction

Allowed direction is toward reusable layers:

```text
app → site/content/platform → Halden UI/styles → utilities
```

Halden UI must not import routes, filesystem code, or content-engine modules.
Content renderers may import presentation primitives but must not parse MDX,
validate metadata, or perform file IO. Site adapters may connect brand/routing
state to a Halden UI primitive without redefining its styling system.

## Stable runtime decisions

- Font variables come from `next/font` and are aliased by the runtime CSS.
- `src/styles/globals.css` is the active stylesheet entrypoint.
- CSS variables are the contract for palette, typography, motion, glass, and
  hero presentation.
- `SiteNavigation` is the branded navigation integration and owns its client
  interaction state.
- Content-backed routes use an all-collection server registry and explicit
  collection queries to avoid request-order-dependent results.

## Known debt and priorities

| Priority | Item | Direction |
|---|---|---|
| High | Content compiler confidence | Add fixtures, diagnostics, typed variants, renderer selection. |
| Medium | Presentation duplication | Consolidate only after usage and API compatibility are verified. |
| Medium | Boundary enforcement | Add import/layer checks when conventions become difficult to maintain. |
| Low | Unused legacy candidates | Verify reachability before deletion; avoid speculative cleanup. |
| Low | Package extraction | Move Halden UI only if independent publication becomes a real requirement. |

## Verification

Use `pnpm exec tsc --noEmit` and `pnpm build` for baseline confidence. Visual
changes also need browser checks for typography, responsive navigation, glass
surfaces, focus behavior, and reduced motion. Content changes need semantic
fixture tests as specified in the Content Engine roadmap.
