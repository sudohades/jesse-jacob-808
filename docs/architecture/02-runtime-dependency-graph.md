# Runtime Dependency Graph

## Dependency Graph: app/layout.tsx

### Tree View

```
app/layout.tsx (Server Component)
├─ next (Metadata, Viewport types)
├─ next/font/google
│  ├─ Quantico
│  ├─ Share_Tech_Mono
│  └─ Inter
├─ @vercel/analytics/next
│  └─ Analytics
└─ ./globals.css
   ├─ tailwindcss
   ├─ tw-animate-css
   ├─ ../public/halden-ui/styles/globals.css
   │  ├─ ./theme.css
   │  ├─ ./typography.css
   │  ├─ ./glass.css
   │  └─ ./animations.css
   └─ (app-specific CSS variables)
```

### Tabular Dependency Graph

| Level | Component | Type | Dependency | Import Path |
|-------|-----------|------|------------|-------------|
| 1 | app/layout.tsx | Server Component | Root | - |
| 2 | Metadata | Type | next | "next" |
| 2 | Viewport | Type | next | "next" |
| 2 | Quantico | Font | next/font/google | "next/font/google" |
| 2 | Share_Tech_Mono | Font | next/font/google | "next/font/google" |
| 2 | Inter | Font | next/font/google | "next/font/google" |
| 2 | Analytics | Component | @vercel/analytics/next | "@vercel/analytics/next" |
| 2 | globals.css | CSS | Local | "./globals.css" |
| 3 | tailwindcss | CSS Framework | External | (via @import) |
| 3 | tw-animate-css | CSS Animations | External | (via @import) |
| 3 | halden-ui globals.css | CSS | public/halden-ui | "../public/halden-ui/styles/globals.css" |
| 4 | halden-ui theme.css | CSS | public/halden-ui | "./theme.css" |
| 4 | halden-ui typography.css | CSS | public/halden-ui | "./typography.css" |
| 4 | halden-ui glass.css | CSS | public/halden-ui | "./glass.css" |
| 4 | halden-ui animations.css | CSS | public/halden-ui | "./animations.css" |

## Dependency Graph: app/page.tsx

### Tree View

```
app/page.tsx (Server Component)
└─ @/components/site/SiteShell (Server Component)
   ├─ @/components/site/SiteHeader (Client Component)
   │  ├─ @/components/halden-ui/navigation/SiteNavigation (Client Component)
   │  │  ├─ @/lib/utils (cn utility)
   │  │  ├─ @/components/site/Logo (Server Component)
   │  │  ├─ ../../public/halden-ui/components/navigation/NavigationItem (Client Component)
   │  │  ├─ ../../public/halden-ui/components/navigation/HamburgerButton (Client Component)
   │  │  └─ ../../public/halden-ui/components/navigation/MobileDrawer (Client Component)
   │  │     ├─ ../../public/halden-ui/lib/cn (cn utility)
   │  │     └─ next/navigation (usePathname hook)
   │  └─ type: MobileDrawerItem (from public/halden-ui navigation)
   ├─ @/components/site/SiteFooter (Server Component)
   └─ main (HTML element)
└─ @/components/site/Container (Server Component)
   └─ @/lib/utils (cn utility)
└─ @/components/site/primitives/Eyebrow (Server Component)
   └─ @/lib/utils (cn utility)
└─ @/components/site/primitives/Heading (Server Component)
   └─ @/lib/utils (cn utility)
└─ @/components/site/primitives/Panel (Server Component)
   └─ @/components/site/primitives/Surface (Server Component)
      └─ @/lib/utils (cn utility)
└─ @/components/site/primitives/Divider (Server Component)
   └─ @/lib/utils (cn utility)
└─ @/components/site/primitives/Metadata (Server Component)
   └─ @/lib/utils (cn utility)
```

### Tabular Dependency Graph

| Level | Component | Type | Client/Server | Dependency | Import Path |
|-------|-----------|------|---------------|------------|-------------|
| 1 | app/page.tsx | Page | Server | Root | - |
| 2 | SiteShell | Component | Server | @/components/site/SiteShell | "@/components/site/SiteShell" |
| 2 | Container | Component | Server | @/components/site/Container | "@/components/site/Container" |
| 2 | Eyebrow | Component | Server | @/components/site/primitives/Eyebrow | "@/components/site/primitives/Eyebrow" |
| 2 | Heading | Component | Server | @/components/site/primitives/Heading | "@/components/site/primitives/Heading" |
| 2 | Panel | Component | Server | @/components/site/primitives/Panel | "@/components/site/primitives/Panel" |
| 2 | Divider | Component | Server | @/components/site/primitives/Divider | "@/components/site/primitives/Divider" |
| 2 | Metadata | Component | Server | @/components/site/primitives/Metadata | "@/components/site/primitives/Metadata" |
| 3 | SiteHeader | Component | Client | SiteShell | @/components/site/SiteHeader |
| 3 | SiteFooter | Component | Server | SiteShell | @/components/site/SiteFooter |
| 3 | cn | Utility | N/A | Container, Eyebrow, Heading, Panel, Divider, Metadata | @/lib/utils |
| 3 | Surface | Component | Server | Panel | @/components/site/primitives/Surface |
| 4 | SiteNavigation | Component | Client | SiteHeader | @/components/halden-ui/navigation/SiteNavigation |
| 4 | Logo | Component | Server | SiteNavigation | @/components/site/Logo |
| 4 | cn | Utility | N/A | SiteNavigation | @/lib/utils |
| 4 | NavigationItem (public) | Component | Client | SiteNavigation | ../../public/halden-ui/components/navigation/NavigationItem |
| 4 | HamburgerButton (public) | Component | Client | SiteNavigation | ../../public/halden-ui/components/navigation/HamburgerButton |
| 4 | MobileDrawer (public) | Component | Client | SiteNavigation | ../../public/halden-ui/components/navigation/MobileDrawer |
| 5 | cn (public) | Utility | N/A | MobileDrawer (public) | ../../public/halden-ui/lib/cn |
| 5 | usePathname | Hook | Client | SiteNavigation | next/navigation |

## Dependency Graph: All Page Routes

### Common Pattern (Shared by all pages)

All pages (`app/page.tsx`, `app/about/page.tsx`, `app/blog/page.tsx`, `app/projects/page.tsx`, `app/resources/page.tsx`, `app/services/page.tsx`) follow the same dependency pattern:

```
Page Component (Server)
├─ SiteShell
│  ├─ SiteHeader (Client)
│  │  └─ SiteNavigation (Client)
│  │     ├─ NavigationItem (public)
│  │     ├─ HamburgerButton (public)
│  │     └─ MobileDrawer (public)
│  └─ SiteFooter
├─ Container
├─ PageHeader (except homepage)
│  ├─ Container
│  ├─ Eyebrow
│  └─ Heading
├─ Panel
│  └─ Surface
├─ Metadata
├─ Divider
└─ CTAButton (except homepage)
   ├─ lucide-react (icons)
   ├─ cn
   └─ next/link
```

### Page-Specific Variations

**app/page.tsx**:
- No PageHeader (custom hero section)
- No CTAButton (uses direct mailto link)
- Uses Eyebrow, Heading, Panel, Divider, Metadata

**app/about/page.tsx**:
- Uses PageHeader
- Uses CTAButton (2 instances)

**app/blog/page.tsx**:
- Uses PageHeader
- Uses CTAButton (3 instances)

**app/projects/page.tsx**:
- Uses PageHeader
- Uses CTAButton (3 instances)

**app/resources/page.tsx**:
- Uses PageHeader
- Uses CTAButton (2 instances)

**app/services/page.tsx**:
- Uses PageHeader
- Uses CTAButton (3 instances)

**app/not-found.tsx**:
- Uses SiteShell only
- No other components
- Direct HTML elements

## Dependency Graph: Halden UI Components

### Public Halden UI (public/halden-ui/)

**Barrel Export**: `public/halden-ui/index.ts`

**Exported Components**:
- cn (utility)
- tokens (design tokens)
- colors (constants)
- typography (constants)
- Surface (ui)
- Button (ui)
- IconButton (ui)
- Badge (ui)
- Divider (ui)
- GlowBorder (ui)
- Heading (typography)
- Body (typography)
- Eyebrow (typography)
- CodeLabel (typography)
- Container (layout)
- Section (layout)
- GridLayout (layout)
- GlassPanel (layout)
- SiteNavigation (navigation)
- NavigationLogo (navigation)
- NavigationItem (navigation)
- HamburgerButton (navigation)
- MobileDrawer (navigation)
- Hero (hero)
- HeroBackground (hero)
- HeroOverlay (hero)
- ServiceCard (cards)
- ProjectCard (cards)
- ResourceCard (cards)
- Footer (footer)

### Internal Halden UI Wrappers (src/components/halden-ui/)

**Purpose**: Application-specific adaptations of public Halden UI

**Components**:
- `navigation/SiteNavigation.tsx` - Client wrapper that integrates with site-specific Logo
- `navigation/MobileDrawer.tsx` - Client wrapper (duplicate of public version)

### Site Primitives (src/components/site/primitives/)

**Purpose**: Site-specific implementations that mirror Halden UI patterns

**Components**:
- `Eyebrow.tsx` - Duplicate of public Halden UI Eyebrow
- `Heading.tsx` - Duplicate of public Halden UI Heading
- `Divider.tsx` - Variant of public Halden UI Divider (simpler)
- `Surface.tsx` - Duplicate of public Halden UI Surface
- `Panel.tsx` - Composes Surface with padding
- `Metadata.tsx` - Site-specific metadata label
- `PageHeader.tsx` - Composes Container, Eyebrow, Heading
- `EditorialGrid.tsx` - Grid layout wrapper
- `NavigationItem.tsx` - Client component using usePathname (different from public version)

## Dependency Graph: Utilities

### src/lib/utils.ts

```
src/lib/utils.ts
├─ clsx
└─ tailwind-merge
```

**Function**: `cn()` - Merges Tailwind classes deterministically

### public/halden-ui/lib/cn.ts

```
public/halden-ui/lib/cn.ts
├─ clsx
└─ tailwind-merge
```

**Function**: `cn()` - Identical implementation to src/lib/utils.ts

**Status**: DUPLICATE

## Dependency Graph: Hooks

### src/hooks/useMediaQuery.ts (Client)

```
useMediaQuery
├─ React (useState, useEffect, useMemo)
└─ window.matchMedia
```

### src/hooks/useBreakpoint.ts (Client)

```
useBreakpoint
├─ useMediaQuery
└─ React (useMemo)
```

### src/hooks/useMobile.ts (Client)

```
useMobile
└─ useBreakpoint
```

### src/hooks/useViewport.ts (Client)

```
useViewport
├─ useMobile
├─ React (useEffect, useRef)
└─ Document API
```

**Status**: All hooks are CLIENT components

**Usage**: None of these hooks are currently used in the application

## Dependency Graph: Providers

### src/providers/ViewportProvider.tsx (Client)

```
ViewportProvider
└─ React (ReactNode)
```

**Status**: NO-OP wrapper, does not provide any context

**Usage**: Not used anywhere in the application

## Dependency Graph: Types

### src/types/halden-ui.d.ts

```
Type Declarations
├─ ../../public/halden-ui/components/navigation/SiteNavigation
└─ ../../public/halden-ui/components/navigation/MobileDrawer
```

**Purpose**: TypeScript module declarations for public Halden UI components

## Ownership Summary

### Application Layer
- **Owner**: Site Components
- **Consumes**: Halden UI, Utilities

### Halden UI Layer (public/)
- **Owner**: Halden UI (Canonical)
- **Consumes**: Utilities (internal cn)

### Halden UI Layer (src/components/halden-ui/)
- **Owner**: Site Components (Adapters)
- **Consumes**: Public Halden UI, Site Components (Logo)

### Site Primitives Layer
- **Owner**: Site Components
- **Consumes**: Utilities
- **Status**: Partial duplicates of Halden UI

### Utilities Layer
- **Owner**: Shared
- **Consumes**: External libraries (clsx, tailwind-merge)
- **Status**: Duplicate implementations (src vs public)

## Cross-Layer Dependencies

### Violations Detected

1. **src/components/halden-ui/navigation/SiteNavigation.tsx** imports from `public/halden-ui/`
   - This is expected (adapter pattern)
   - Not a violation, but indicates adapter layer

2. **src/components/halden-ui/navigation/MobileDrawer.tsx** is a duplicate of `public/halden-ui/components/navigation/MobileDrawer.tsx`
   - Violation: Duplicate implementation
   - Runtime: Only the src version is used

3. **src/components/site/primitives/*** duplicate `public/halden-ui/components/*`
   - Violation: Duplicate implementations
   - Runtime: Only site primitives are used

4. **src/lib/utils.ts** duplicates `public/halden-ui/lib/cn.ts`
   - Violation: Duplicate utility
   - Runtime: Both are used (src by site components, public by Halden UI)

## Import Boundaries

### Allowed Flows

```
Application (app/)
  ↓
Site Components (src/components/site/)
  ↓
Site Primitives (src/components/site/primitives/)
  ↓
Utilities (src/lib/)
  ↓
External Libraries
```

### Halden UI Flow

```
Application (app/)
  ↓
Halden UI Adapters (src/components/halden-ui/)
  ↓
Public Halden UI (public/halden-ui/)
  ↓
Halden UI Utilities (public/halden-ui/lib/)
  ↓
External Libraries
```

### Boundary Violations

1. **Site Primitives → Public Halden UI**: None (site primitives are independent)
2. **Halden UI Adapters → Site Components**: Yes (imports Logo from site)
3. **Public Halden UI → Application**: None (unidirectional)
4. **Utilities → Application**: None (unidirectional)
