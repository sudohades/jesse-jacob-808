# Subsystem Ownership

## Typography

### Current Runtime Owner
**Ambiguous** - Two implementations are actively used:

1. **Site Primitives** (`src/components/site/primitives/`)
   - Eyebrow.tsx - Used by homepage and PageHeader
   - Heading.tsx - Used by homepage and PageHeader
   - Metadata.tsx - Used by all pages

2. **Halden UI** (`public/halden-ui/components/typography/`)
   - Eyebrow.tsx - Not imported by app
   - Heading.tsx - Not imported by app
   - Body.tsx - Not imported by app
   - CodeLabel.tsx - Not imported by app

### Consumers
- Site Components (SiteShell, PageHeader, all page components)
- Halden UI (internal composition)

### Status
**Ambiguous** - Site primitives are the runtime owner, but Halden UI has the canonical implementation

### Explanation
The application uses site-specific typography primitives that duplicate Halden UI components. The Halden UI versions are more complete (forwardRef, better TypeScript) but are not imported. This suggests an incomplete migration from site primitives to Halden UI.

## Layout

### Current Runtime Owner
**Ambiguous** - Three implementations exist:

1. **Site Components** (`src/components/site/`)
   - Container.tsx - Used by all pages
   - SiteShell.tsx - Used by all pages

2. **Site Primitives** (`src/components/site/primitives/`)
   - Panel.tsx - Used by all pages
   - Surface.tsx - Used by Panel
   - PageHeader.tsx - Used by all pages except homepage

3. **Halden UI** (`public/halden-ui/components/layout/`)
   - Container.tsx - Not imported
   - Section.tsx - Not imported
   - GridLayout.tsx - Not imported
   - GlassPanel.tsx - Not imported

### Consumers
- All page components
- Site primitives
- Halden UI (internal composition)

### Status
**Ambiguous** - Site components own runtime, but Halden UI has canonical implementations

### Explanation
The application uses a mix of site-specific layout components and Halden UI layout components. The Halden UI versions are more feature-complete but are not imported. This suggests an incomplete migration.

## Navigation

### Current Runtime Owner
**Halden UI Adapters** (`src/components/halden-ui/navigation/`)

### Consumers
- Site Components (SiteHeader)
- Halden UI (public versions used by adapters)

### Status
**Canonical** - Adapter pattern is appropriate

### Explanation
Navigation uses an adapter pattern where `src/components/halden-ui/navigation/SiteNavigation.tsx` wraps public Halden UI components and integrates site-specific elements (Logo). This is a valid ownership pattern - the adapter owns the integration, while Halden UI owns the primitives.

**Note**: There is a duplicate MobileDrawer in `src/components/halden-ui/navigation/` that is not used. The public version is used instead.

## Cards

### Current Runtime Owner
**Halden UI** (`public/halden-ui/components/cards/`)

### Consumers
- None (not imported by application)

### Status
**Canonical** - Halden UI owns, but unused

### Explanation
Halden UI provides card components (ServiceCard, ProjectCard, ResourceCard) but they are not used in the current application. The application uses Panel components instead. This suggests cards are prepared for future use.

## Panels

### Current Runtime Owner
**Site Primitives** (`src/components/site/primitives/Panel.tsx`)

### Consumers
- All page components

### Status
**Ambiguous** - Site primitive duplicates Halden UI GlassPanel

### Explanation
The application uses a site-specific Panel component that composes Surface. Halden UI has a more feature-complete GlassPanel component that is not used. This is a duplicate implementation.

## Buttons

### Current Runtime Owner
**Site Components** (`src/components/site/CTAButton.tsx`)

### Consumers
- All page components except homepage

### Status
**Ambiguous** - Site component duplicates Halden UI Button

### Explanation
The application uses a site-specific CTAButton component. Halden UI has a more feature-complete Button component that is not used. The CTAButton has a different API (to/href props vs asChild pattern) and uses lucide-react icons.

## Content

### Current Runtime Owner
**Application** (app/ directory)

### Consumers
- Next.js router

### Status
**Canonical** - App Router owns content routing

### Explanation
Content is managed through Next.js App Router file-based routing. All pages are Server Components. No CMS or content management system is currently integrated.

## MDX

### Current Runtime Owner
**None** - Not implemented

### Consumers
- None

### Status
**Unknown** - Blog page suggests future MDX usage

### Explanation
No MDX configuration or usage is detected in the repository. The blog page exists but uses static content, suggesting MDX may be planned but not yet implemented.

## Routing

### Current Runtime Owner
**Next.js App Router** (app/ directory)

### Consumers
- All page components

### Status
**Canonical** - Next.js owns routing

### Explanation
Routing is handled by Next.js App Router with file-based routing. No custom routing logic or middleware is detected.

## Metadata

### Current Runtime Owner
**Next.js** (app/layout.tsx)

### Consumers
- Search engines, social media platforms

### Status
**Canonical** - Next.js owns metadata generation

### Explanation
Metadata is generated through Next.js Metadata API in the root layout. No custom metadata generation logic is detected.

## Utilities

### Current Runtime Owner
**Ambiguous** - Two identical implementations:

1. **Site Utilities** (`src/lib/utils.ts`)
   - Used by all site components

2. **Halden UI Utilities** (`public/halden-ui/lib/cn.ts`)
   - Used by public Halden UI components

### Consumers
- Site Components (use src/lib/utils.ts)
- Halden UI Components (use public/halden-ui/lib/cn.ts)

### Status
**Ambiguous** - Duplicate implementations

### Explanation
The `cn()` utility function is duplicated in both locations with identical implementations. Both are actively used by their respective component sets. This is a clear duplicate that should be consolidated.

## Styling

### Current Runtime Owner
**Halden UI** (`public/halden-ui/styles/`)

### Consumers
- Application (app/globals.css imports Halden UI styles)
- Halden UI components

### Status
**Canonical** - Halden UI owns styling

### Explanation
All CSS tokens and styles are defined in Halden UI. The application's `app/globals.css` imports Halden UI styles and adds app-specific overrides. This is the correct ownership pattern.

## Design Tokens

### Current Runtime Owner
**Halden UI** (`public/halden-ui/`)

### Consumers
- Application (via CSS variables)
- Halden UI components
- Halden UI TypeScript constants

### Status
**Canonical** - Halden UI owns design tokens

### Explanation
Design tokens are defined in Halden UI as CSS variables (`public/halden-ui/styles/theme.css`) and TypeScript constants (`public/halden-ui/lib/design-tokens.ts`). The application consumes these via CSS. This is the correct ownership pattern.

## Hooks

### Current Runtime Owner
**Site Hooks** (`src/hooks/`)

### Consumers
- None (not imported by application)

### Status
**Unknown** - Defined but not used

### Explanation
Viewport-related hooks are defined but not imported by any component. They may be prepared for future use or may be dead code. The ViewportProvider is a no-op placeholder.

## Providers

### Current Runtime Owner
**None** - No active providers

### Consumers
- None

### Status
**Dead** - ViewportProvider is a no-op

### Explanation
The ViewportProvider exists but is a no-op wrapper that does not provide any context. It is not imported anywhere in the application.

## Summary Table

| Subsystem | Current Runtime Owner | Consumers | Status | Notes |
|-----------|----------------------|-----------|--------|-------|
| Typography | Site Primitives (runtime), Halden UI (canonical) | Site Components | Ambiguous | Duplicate implementations |
| Layout | Site Components (runtime), Halden UI (canonical) | All pages | Ambiguous | Duplicate implementations |
| Navigation | Halden UI Adapters | Site Components | Canonical | Adapter pattern is valid |
| Cards | Halden UI | None | Canonical | Not used in app |
| Panels | Site Primitives | All pages | Ambiguous | Duplicate of Halden UI GlassPanel |
| Buttons | Site Components | All pages except homepage | Ambiguous | Duplicate of Halden UI Button |
| Content | Next.js App Router | Next.js | Canonical | File-based routing |
| MDX | None | None | Unknown | Not implemented |
| Routing | Next.js App Router | All pages | Canonical | Standard Next.js |
| Metadata | Next.js | Search engines | Canonical | Standard Next.js |
| Utilities | Both src and public | Both component sets | Ambiguous | Duplicate cn() function |
| Styling | Halden UI | Application, Halden UI | Canonical | Correct ownership |
| Design Tokens | Halden UI | Application, Halden UI | Canonical | Correct ownership |
| Hooks | Site Hooks | None | Unknown | Defined but not used |
| Providers | None | None | Dead | ViewportProvider is no-op |

## Ownership Ambiguities Requiring Resolution

### High Priority
1. **Utilities** - Duplicate `cn()` function in two locations
2. **Typography** - Duplicate Eyebrow and Heading components
3. **Layout** - Duplicate Container, Panel, Surface components
4. **Buttons** - Duplicate CTAButton vs Button

### Medium Priority
5. **Panels** - Duplicate Panel vs GlassPanel
6. **Hooks** - Defined but not used, unclear if dead or experimental

### Low Priority
7. **Cards** - Halden UI owns but not used (may be intentional for future)
8. **Providers** - ViewportProvider is dead but harmless

## Recommended Ownership Structure

### Canonical Ownership (Post-Migration)
- **Typography**: Halden UI
- **Layout**: Halden UI
- **Navigation**: Halden UI Adapters (maintain adapter pattern)
- **Cards**: Halden UI
- **Panels**: Halden UI (GlassPanel)
- **Buttons**: Halden UI
- **Content**: Next.js App Router
- **MDX**: Halden UI (when implemented)
- **Routing**: Next.js App Router
- **Metadata**: Next.js
- **Utilities**: Halden UI (single cn() implementation)
- **Styling**: Halden UI
- **Design Tokens**: Halden UI
- **Hooks**: Site Hooks (if used) or Halden UI (if generalized)
- **Providers**: Site Providers (if needed)

### Application-Specific Ownership
- **SiteShell**: Site Components (unique layout wrapper)
- **SiteHeader**: Site Components (unique header composition)
- **SiteFooter**: Site Components (unique footer)
- **Logo**: Site Components (unique branding)
- **CTAButton**: Site Components (if API differences are intentional)
- **Metadata**: Site Primitives (if unique to site)
- **PageHeader**: Site Primitives (unique composition)
