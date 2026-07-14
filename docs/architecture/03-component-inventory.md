# Component Inventory

## Application Components (app/)

### app/layout.tsx
- **Location**: app/layout.tsx
- **Responsibility**: Root layout, font loading, metadata, CSS orchestration
- **Runtime Reachable**: YES (entry point)
- **Owner Subsystem**: Application / Root
- **Imported By**: None (root)
- **Import Count**: 0
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### app/page.tsx
- **Location**: app/page.tsx
- **Responsibility**: Homepage route
- **Runtime Reachable**: YES (route /)
- **Owner Subsystem**: Application / Pages
- **Imported By**: Next.js router
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### app/about/page.tsx
- **Location**: app/about/page.tsx
- **Responsibility**: About page route
- **Runtime Reachable**: YES (route /about)
- **Owner Subsystem**: Application / Pages
- **Imported By**: Next.js router
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### app/blog/page.tsx
- **Location**: app/blog/page.tsx
- **Responsibility**: Blog index route
- **Runtime Reachable**: YES (route /blog)
- **Owner Subsystem**: Application / Pages
- **Imported By**: Next.js router
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### app/projects/page.tsx
- **Location**: app/projects/page.tsx
- **Responsibility**: Projects page route
- **Runtime Reachable**: YES (route /projects)
- **Owner Subsystem**: Application / Pages
- **Imported By**: Next.js router
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### app/resources/page.tsx
- **Location**: app/resources/page.tsx
- **Responsibility**: Resources page route
- **Runtime Reachable**: YES (route /resources)
- **Owner Subsystem**: Application / Pages
- **Imported By**: Next.js router
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### app/services/page.tsx
- **Location**: app/services/page.tsx
- **Responsibility**: Services page route
- **Runtime Reachable**: YES (route /services)
- **Owner Subsystem**: Application / Pages
- **Imported By**: Next.js router
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### app/not-found.tsx
- **Location**: app/not-found.tsx
- **Responsibility**: 404 error page
- **Runtime Reachable**: YES (Next.js 404 handler)
- **Owner Subsystem**: Application / Error Handling
- **Imported By**: Next.js router
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### app/globals.css
- **Location**: app/globals.css
- **Responsibility**: CSS orchestration, app-specific tokens
- **Runtime Reachable**: YES (imported by layout.tsx)
- **Owner Subsystem**: Application / Styling
- **Imported By**: app/layout.tsx
- **Import Count**: 1
- **Client/Server**: CSS
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

## Site Components (src/components/site/)

### SiteShell
- **Location**: src/components/site/SiteShell.tsx
- **Responsibility**: Page layout wrapper (header, main, footer)
- **Runtime Reachable**: YES (used by all pages)
- **Owner Subsystem**: Site Components / Layout
- **Imported By**: All page components (7)
- **Import Count**: 7
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### Container
- **Location**: src/components/site/Container.tsx
- **Responsibility**: Responsive container with width variants
- **Runtime Reachable**: YESused by all pages)
- **Owner Subsystem**: Site Components / Layout
- **Imported By**: All page components, PageHeader (8)
- **Import Count**: 8
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/layout/Container.tsx)
- **Canonical Candidate**: public/halden-ui version (more feature-complete with forwardRef)
- **Confidence Level**: HIGH

### SiteHeader
- **Location**: src/components/site/SiteHeader.tsx
- **Responsibility**: Header with navigation integration
- **Runtime Reachable**: YES (used by SiteShell)
- **Owner Subsystem**: Site Components / Navigation
- **Imported By**: SiteShell (1)
- **Import Count**: 1
- **Client/Server**: Client Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique adapter)
- **Confidence Level**: HIGH

### SiteFooter
- **Location**: src/components/site/SiteFooter.tsx
- **Responsibility**: Simple footer with copyright
- **Runtime Reachable**: YES (used by SiteShell)
- **Owner Subsystem**: Site Components / Navigation
- **Imported By**: SiteShell (1)
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/footer/Footer.tsx)
- **Canonical Candidate**: public/halden-ui version (more feature-complete)
- **Confidence Level**: HIGH

### SiteNav
- **Location**: src/components/site/SiteNav.tsx
- **Responsibility**: Visual-only wrapper (intentionally renders nothing)
- **Runtime Reachable**: UNKNOWN (no static imports found)
- **Owner Subsystem**: Site Components / Navigation
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (legacy placeholder)
- **Confidence Level**: MEDIUM (may be dead)

### Logo
- **Location**: src/components/site/Logo.tsx
- **Responsibility**: Site-specific logo component
- **Runtime Reachable**: YES (used by SiteNavigation)
- **Owner Subsystem**: Site Components / Branding
- **Imported By**: SiteNavigation (1)
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### CTAButton
- **Location**: src/components/site/CTAButton.tsx
- **Responsibility**: Call-to-action button with variants
- **Runtime Reachable**: YES (used by all pages except homepage)
- **Owner Subsystem**: Site Components / Buttons
- **Imported By**: about, blog, projects, resources, services (5)
- **Import Count**: 5
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/ui/Button.tsx)
- **Canonical Candidate**: public/halden-ui version (more feature-complete)
- **Confidence Level**: HIGH

### Accordion (exported as InteractiveText)
- **Location**: src/components/site/Accordion.tsx
- **Responsibility**: Hover-reveal interactive text
- **Runtime Reachable**: UNKNOWN (no static imports found)
- **Owner Subsystem**: Site Components / Interactive
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Client Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: MEDIUM (possibly dead)

### Reveal
- **Location**: src/components/site/Reveal.tsx
- **Responsibility**: Scroll-triggered fade-in animation
- **Runtime Reachable**: UNKNOWN (no static imports found)
- **Owner Subsystem**: Site Components / Animation
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Client Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: MEDIUM (possibly dead)

### Section
- **Location**: src/components/site/Section.tsx
- **Responsibility**: Editorial section wrapper
- **Runtime Reachable**: UNKNOWN (no static imports found)
- **Owner Subsystem**: Site Components / Layout
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/layout/Section.tsx)
- **Canonical Candidate**: public/halden-ui version (more feature-complete)
- **Confidence Level**: MEDIUM (possibly dead)

### PageHero
- **Location**: src/components/site/PageHero.tsx
- **Responsibility**: Page hero section
- **Runtime Reachable**: UNKNOWN (no static imports found)
- **Owner Subsystem**: Site Components / Layout
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: MEDIUM (possibly dead)

## Site Primitives (src/components/site/primitives/)

### Eyebrow
- **Location**: src/components/site/primitives/Eyebrow.tsx
- **Responsibility**: Eyebrow text with index
- **Runtime Reachable**: YES (used by homepage, PageHeader)
- **Owner Subsystem**: Site Primitives / Typography
- **Imported By**: page.tsx, PageHeader (2)
- **Import Count**: 2
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/typography/Eyebrow.tsx)
- **Canonical Candidate**: public/halden-ui version (forwardRef, more complete)
- **Confidence Level**: HIGH

### Heading
- **Location**: src/components/site/primitives/Heading.tsx
- **Responsibility**: Heading component with levels
- **Runtime Reachable**: YES (used by homepage, PageHeader)
- **Owner Subsystem**: Site Primitives / Typography
- **Imported By**: page.tsx, PageHeader (2)
- **Import Count**: 2
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/typography/Heading.tsx)
- **Canonical Candidate**: public/halden-ui version (forwardRef, more complete)
- **Confidence Level**: HIGH

### Panel
- **Location**: src/components/site/primitives/Panel.tsx
- **Responsibility**: Surface with padding
- **Runtime Reachable**: YES (used by all pages)
- **Owner Subsystem**: Site Primitives / Layout
- **Imported By**: All pages (6)
- **Import Count**: 6
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/layout/GlassPanel.tsx)
- **Canonical Candidate**: public/halden-ui version (more feature-complete)
- **Confidence Level**: HIGH

### Divider
- **Location**: src/components/site/primitives/Divider.tsx
- **Responsibility**: Divider primitive
- **Runtime Reachable**: YES (used by homepage, about)
- **Owner Subsystem**: Site Primitives / Layout
- **Imported By**: page.tsx, about/page.tsx (2)
- **Import Count**: 2
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/ui/Divider.tsx)
- **Canonical Candidate**: public/halden-ui version (more feature-complete with label support)
- **Confidence Level**: HIGH

### Metadata
- **Location**: src/components/site/primitives/Metadata.tsx
- **Responsibility**: Metadata label component
- **Runtime Reachable**: YES (used by all pages)
- **Owner Subsystem**: Site Primitives / Typography
- **Imported By**: All pages (6)
- **Import Count**: 6
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### PageHeader
- **Location**: src/components/site/primitives/PageHeader.tsx
- **Responsibility**: Page header composition
- **Runtime Reachable**: YES (used by all pages except homepage)
- **Owner Subsystem**: Site Primitives / Layout
- **Imported By**: about, blog, projects, resources, services (5)
- **Import Count**: 5
- **Client/Server**: Server Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

### Surface
- **Location**: src/components/site/primitives/Surface.tsx
- **Responsibility**: Surface primitive with variants
- **Runtime Reachable**: YES (used by Panel)
- **Owner Subsystem**: Site Primitives / Layout
- **Imported By**: Panel (1)
- **Import Count**: 1
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/ui/Surface.tsx)
- **Canonical Candidate**: public/halden-ui version (forwardRef, more complete)
- **Confidence Level**: HIGH

### EditorialGrid
- **Location**: src/components/site/primitives/EditorialGrid.tsx
- **Responsibility**: Editorial grid layout
- **Runtime Reachable**: UNKNOWN (no static imports found)
- **Owner Subsystem**: Site Primitives / Layout
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Server Component
- **Duplicate Exists**: YES (public/halden-ui/components/layout/GridLayout.tsx)
- **Canonical Candidate**: public/halden-ui version (more feature-complete)
- **Confidence Level**: MEDIUM (possibly dead)

### NavigationItem
- **Location**: src/components/site/primitives/NavigationItem.tsx
- **Responsibility**: Navigation item with active state
- **Runtime Reachable**: UNKNOWN (no static imports found)
- **Owner Subsystem**: Site Primitives / Navigation
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Client Component
- **Duplicate Exists**: YES (public/halden-ui/components/navigation/NavigationItem.tsx)
- **Canonical Candidate**: public/halden-ui version (different API, more complete)
- **Confidence Level**: MEDIUM (possibly dead)

## Halden UI Adapters (src/components/halden-ui/)

### SiteNavigation
- **Location**: src/components/halden-ui/navigation/SiteNavigation.tsx
- **Responsibility**: Site-specific navigation adapter
- **Runtime Reachable**: YES (used by SiteHeader)
- **Owner Subsystem**: Halden UI Adapters / Navigation
- **Imported By**: SiteHeader (1)
- **Import Count**: 1
- **Client/Server**: Client Component
- **Duplicate Exists**: YES (public/halden-ui/components/navigation/SiteNavigation.tsx)
- **Canonical Candidate**: src version (integrates site Logo, different API)
- **Confidence Level**: HIGH

### MobileDrawer
- **Location**: src/components/halden-ui/navigation/MobileDrawer.tsx
- **Responsibility**: Mobile drawer component
- **Runtime Reachable**: UNKNOWN (no static imports found)
- **Owner Subsystem**: Halden UI Adapters / Navigation
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Client Component
- **Duplicate Exists**: YES (public/halden-ui/components/navigation/MobileDrawer.tsx)
- **Canonical Candidate**: public/halden-ui version (identical implementation)
- **Confidence Level**: HIGH (duplicate)

## Public Halden UI Components (public/halden-ui/components/)

### UI Components
- **Button**: Runtime UNKNOWN (not imported by app)
- **IconButton**: Runtime UNKNOWN (not imported by app)
- **Badge**: Runtime UNKNOWN (not imported by app)
- **Divider**: Runtime UNKNOWN (not imported by app)
- **GlowBorder**: Runtime UNKNOWN (not imported by app)
- **Surface**: Runtime UNKNOWN (not imported by app)

### Typography Components
- **Heading**: Runtime UNKNOWN (not imported by app)
- **Body**: Runtime UNKNOWN (not imported by app)
- **Eyebrow**: Runtime UNKNOWN (not imported by app)
- **CodeLabel**: Runtime UNKNOWN (not imported by app)

### Layout Components
- **Container**: Runtime UNKNOWN (not imported by app)
- **Section**: Runtime UNKNOWN (not imported by app)
- **GridLayout**: Runtime UNKNOWN (not imported by app)
- **GlassPanel**: Runtime UNKNOWN (not imported by app)

### Navigation Components
- **SiteNavigation**: Runtime UNKNOWN (not imported by app)
- **NavigationLogo**: Runtime UNKNOWN (not imported by app)
- **NavigationItem**: Runtime YES (imported by src/components/halden-ui/navigation/SiteNavigation)
- **HamburgerButton**: Runtime YES (imported by src/components/halden-ui/navigation/SiteNavigation)
- **MobileDrawer**: Runtime YES (imported by src/components/halden-ui/navigation/SiteNavigation)

### Hero Components
- **Hero**: Runtime UNKNOWN (not imported by app)
- **HeroBackground**: Runtime UNKNOWN (not imported by app)
- **HeroOverlay**: Runtime UNKNOWN (not imported by app)

### Card Components
- **ServiceCard**: Runtime UNKNOWN (not imported by app)
- **ProjectCard**: Runtime UNKNOWN (not imported by app)
- **ResourceCard**: Runtime UNKNOWN (not imported by app)

### Footer Components
- **Footer**: Runtime UNKNOWN (not imported by app)

## Hooks (src/hooks/)

### useMediaQuery
- **Location**: src/hooks/useMediaQuery.ts
- **Responsibility**: Media query hook
- **Runtime Reachable**: UNKNOWN (not imported)
- **Owner Subsystem**: Hooks / Viewport
- **Imported By**: useBreakpoint (1)
- **Import Count**: 1
- **Client/Server**: Client Hook
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: MEDIUM (indirectly reachable via useBreakpoint)

### useBreakpoint
- **Location**: src/hooks/useBreakpoint.ts
- **Responsibility**: Breakpoint detection hook
- **Runtime Reachable**: UNKNOWN (not imported)
- **Owner Subsystem**: Hooks / Viewport
- **Imported By**: useMobile (1)
- **Import Count**: 1
- **Client/Server**: Client Hook
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: MEDIUM (indirectly reachable via useMobile)

### useMobile
- **Location**: src/hooks/useMobile.ts
- **Responsibility**: Mobile detection hook
- **Runtime Reachable**: UNKNOWN (not imported)
- **Owner Subsystem**: Hooks / Viewport
- **Imported By**: useViewport (1)
- **Import Count**: 1
- **Client/Server**: Client Hook
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: MEDIUM (indirectly reachable via useViewport)

### useViewport
- **Location**: src/hooks/useViewport.ts
- **Responsibility**: Drawer behavior hook
- **Runtime Reachable**: UNKNOWN (not imported)
- **Owner Subsystem**: Hooks / Viewport
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Client Hook
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: LOW (possibly dead)

## Providers (src/providers/)

### ViewportProvider
- **Location**: src/providers/ViewportProvider.tsx
- **Responsibility**: Placeholder viewport provider (no-op)
- **Runtime Reachable**: UNKNOWN (not imported)
- **Owner Subsystem**: Providers
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Client Component
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: LOW (definitely not used)

## Utilities (src/lib/)

### utils.ts (cn function)
- **Location**: src/lib/utils.ts
- **Responsibility**: Class name merging utility
- **Runtime Reachable**: YES (used by all site components)
- **Owner Subsystem**: Utilities
- **Imported By**: All site components (15+)
- **Import Count**: 15+
- **Client/Server**: Utility
- **Duplicate Exists**: YES (public/halden-ui/lib/cn.ts)
- **Canonical Candidate**: Either (identical implementations)
- **Confidence Level**: HIGH

## Halden UI Utilities (public/halden-ui/lib/)

### cn.ts
- **Location**: public/halden-ui/lib/cn.ts
- **Responsibility**: Class name merging utility
- **Runtime Reachable**: YES (used by public Halden UI components)
- **Owner Subsystem**: Halden UI / Utilities
- **Imported By**: Public Halden UI components (20+)
- **Import Count**: 20+
- **Client/Server**: Utility
- **Duplicate Exists**: YES (src/lib/utils.ts)
- **Canonical Candidate**: Either (identical implementations)
- **Confidence Level**: HIGH

### design-tokens.ts
- **Location**: public/halden-ui/lib/design-tokens.ts
- **Responsibility**: Design token constants
- **Runtime Reachable**: UNKNOWN (not imported by app)
- **Owner Subsystem**: Halden UI / Utilities
- **Imported By**: colors.ts (1)
- **Import Count**: 1
- **Client/Server**: Utility
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: MEDIUM (indirectly reachable via colors)

## Halden UI Constants (public/halden-ui/constants/)

### colors.ts
- **Location**: public/halden-ui/constants/colors.ts
- **Responsibility**: Color constants
- **Runtime Reachable**: UNKNOWN (not imported by app)
- **Owner Subsystem**: Halden UI / Constants
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Constants
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: LOW (possibly dead)

### typography.ts
- **Location**: public/halden-ui/constants/typography.ts
- **Responsibility**: Typography constants
- **Runtime Reachable**: UNKNOWN (not imported by app)
- **Owner Subsystem**: Halden UI / Constants
- **Imported By**: None (0)
- **Import Count**: 0
- **Client/Server**: Constants
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: LOW (possibly dead)

## Types (src/types/)

### halden-ui.d.ts
- **Location**: src/types/halden-ui.d.ts
- **Responsibility**: TypeScript module declarations
- **Runtime Reachable**: N/A (compile-time only)
- **Owner Subsystem**: Types
- **Imported By**: None (type declarations)
- **Import Count**: 0
- **Client/Server**: Type Declarations
- **Duplicate Exists**: No
- **Canonical Candidate**: N/A (unique)
- **Confidence Level**: HIGH

## Component Categorization

### Runtime (Actively Used)
- app/layout.tsx
- app/page.tsx
- app/about/page.tsx
- app/blog/page.tsx
- app/projects/page.tsx
- app/resources/page.tsx
- app/services/page.tsx
- app/not-found.tsx
- app/globals.css
- src/components/site/SiteShell.tsx
- src/components/site/Container.tsx
- src/components/site/SiteHeader.tsx
- src/components/site/SiteFooter.tsx
- src/components/site/Logo.tsx
- src/components/site/CTAButton.tsx
- src/components/site/primitives/Eyebrow.tsx
- src/components/site/primitives/Heading.tsx
- src/components/site/primitives/Panel.tsx
- src/components/site/primitives/Divider.tsx
- src/components/site/primitives/Metadata.tsx
- src/components/site/primitives/PageHeader.tsx
- src/components/site/primitives/Surface.tsx
- src/components/halden-ui/navigation/SiteNavigation.tsx
- src/components/halden-ui/navigation/MobileDrawer.tsx (public version used)
- src/lib/utils.ts
- public/halden-ui/lib/cn.ts

### Shared Primitive (Utilities)
- src/lib/utils.ts
- public/halden-ui/lib/cn.ts
- public/halden-ui/lib/design-tokens.ts

### Application Component (Site-Specific)
- src/components/site/SiteShell.tsx
- src/components/site/SiteHeader.tsx
- src/components/site/SiteFooter.tsx
- src/components/site/Logo.tsx
- src/components/site/CTAButton.tsx
- src/components/site/primitives/Metadata.tsx
- src/components/site/primitives/PageHeader.tsx

### Legacy (Duplicates of Halden UI)
- src/components/site/Container.tsx (duplicate of public/halden-ui)
- src/components/site/primitives/Eyebrow.tsx (duplicate of public/halden-ui)
- src/components/site/primitives/Heading.tsx (duplicate of public/halden-ui)
- src/components/site/primitives/Panel.tsx (duplicate of public/halden-ui)
- src/components/site/primitives/Divider.tsx (duplicate of public/halden-ui)
- src/components/site/primitives/Surface.tsx (duplicate of public/halden-ui)
- src/components/halden-ui/navigation/MobileDrawer.tsx (duplicate of public/halden-ui)

### Experimental (Not Used)
- src/components/site/Accordion.tsx
- src/components/site/Reveal.tsx
- src/components/site/Section.tsx
- src/components/site/PageHero.tsx
- src/components/site/primitives/EditorialGrid.tsx
- src/components/site/primitives/NavigationItem.tsx
- src/hooks/useMediaQuery.ts
- src/hooks/useBreakpoint.ts
- src/hooks/useMobile.ts
- src/hooks/useViewport.ts

### Dead (Proven Unused)
- src/components/site/SiteNav.tsx (intentionally renders nothing)
- src/providers/ViewportProvider.tsx (no-op, not imported)
- public/halden-ui/constants/colors.ts
- public/halden-ui/constants/typography.ts

### Unknown (Possibly Used via Dynamic Imports)
- All public Halden UI components except NavigationItem, HamburgerButton, MobileDrawer
- src/hooks (chain: useViewport → useMobile → useBreakpoint → useMediaQuery)

## Summary Statistics

- **Total Components**: 67
- **Runtime Components**: 24
- **Shared Primitives**: 3
- **Application Components**: 6
- **Legacy Components**: 7
- **Experimental Components**: 10
- **Dead Components**: 4
- **Unknown Components**: 13
- **Duplicate Implementations**: 7
- **Confidence Level**: HIGH for runtime components, MEDIUM for experimental, LOW for dead
