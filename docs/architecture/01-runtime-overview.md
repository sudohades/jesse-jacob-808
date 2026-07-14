# Runtime Overview

## Application Startup Sequence

### 1. Server-Side Initialization
```
Next.js Server → app/layout.tsx → Font Loading → CSS Loading → Metadata Generation
```

**Entry Point**: `app/layout.tsx` (Server Component)

**Font Loading** (via next/font/google):
- Quantico (display font) - weights 400, 700
- Share Tech Mono (monospace) - weight 400
- Inter (sans-serif) - weights 300, 400, 500, 600, 700

Font variables are injected as CSS custom properties:
- `--font-quantico`
- `--font-share-tech-mono`
- `--font-inter`

### 2. CSS Loading Order

**Primary CSS File**: `app/globals.css`

**Import Chain**:
1. `tailwindcss` (via @import)
2. `tw-animate-css` (via @import)
3. `public/halden-ui/styles/globals.css`
4. `public/halden-ui/styles/theme.css`
5. `public/halden-ui/styles/typography.css`
6. `public/halden-ui/styles/glass.css`
7. `public/halden-ui/styles/animations.css`

**App-Specific Overrides** (in app/globals.css):
- Font variable aliases mapping next/font to Halden UI expectations
- Hero overlay gradients
- Accent colors
- Heading gradient tokens

### 3. Metadata Generation

**Location**: `app/layout.tsx`

**Metadata Object**:
- Title: "Sudo Hades — Engineering Solutions."
- Description: Software engineering firm description
- Authors: Jesse Jacob
- OpenGraph: title, images, description, type, siteName
- Twitter: card type, site handle
- Icons: favicon.ico
- Viewport: themeColor, width, initialScale

**Viewport Configuration**:
- Theme color: #110C1D
- Device-width responsive
- Initial scale: 1

### 4. Root Layout Structure

**Component**: `RootLayout` (Server Component)

**DOM Structure**:
```html
<html lang="en" class="dark">
  <body>
    {children}
    <Analytics />  <!-- Vercel Analytics -->
  </body>
</html>
```

**CSS Classes Applied**:
- `dark` (forced dark mode)
- Font variable classes for all three fonts

### 5. Route Hierarchy

**App Router Structure** (file-based routing):

```
app/
├── layout.tsx          (Root layout - wraps all routes)
├── page.tsx            (/ - Homepage)
├── about/
│   └── page.tsx        (/about)
├── blog/
│   └── page.tsx        (/blog)
├── projects/
│   └── page.tsx        (/projects)
├── resources/
│   └── page.tsx        (/resources)
├── services/
│   └── page.tsx        (/services)
└── not-found.tsx       (404 page)
```

**Route Characteristics**:
- All routes are Server Components by default
- No nested layouts (single root layout only)
- No route groups or dynamic routes
- All routes share the same SiteShell wrapper

### 6. Page Component Structure

**Common Pattern Across All Pages**:
```
Page Component (Server)
  └─ SiteShell (Server)
      ├─ SiteHeader (Client)
      │   └─ SiteNavigation (Client)
      │       ├─ NavigationLogo
      │       ├─ NavigationItem (desktop)
      │       ├─ HamburgerButton
      │       └─ MobileDrawer (mobile)
      ├─ {children} (Page Content)
      └─ SiteFooter (Server)
```

### 7. Client/Server Boundaries

**Server Components** (default):
- All page components (app/**/*.tsx)
- Root layout (app/layout.tsx)
- SiteShell
- SiteFooter
- Container
- All primitives (Eyebrow, Heading, Panel, Divider, Metadata, Surface, PageHeader)
- Logo
- Section
- PageHero
- EditorialGrid

**Client Components** (explicit "use client"):
- SiteHeader
- SiteNavigation (both src and public versions)
- MobileDrawer (both src and public versions)
- HamburgerButton
- NavigationItem (public version only)
- Reveal
- Accordion (exported as InteractiveText)
- All hooks (useBreakpoint, useMediaQuery, useMobile, useViewport)
- ViewportProvider (placeholder, no-op)

### 8. Context Providers

**Active Providers**:
- None currently in use

**Placeholder Providers**:
- `ViewportProvider` (src/providers/ViewportProvider.tsx) - Currently a no-op wrapper, does not provide any context

**Hook-Based State Management**:
- Viewport state is managed via hooks (useBreakpoint, useMobile, useMediaQuery)
- Each component manages its own state to avoid context overhead

### 9. MDX Pipeline

**Status**: Not implemented

**Evidence**:
- No MDX configuration files found
- No .mdx files in the repository
- No MDX-related dependencies in package.json
- Content is currently static JSX in page components

### 10. Global Dependencies

**External Libraries**:
- `@vercel/analytics/next` - Analytics in root layout
- `clsx` - Utility for className merging
- `tailwind-merge` - Tailwind class deduplication
- `lucide-react` - Icon library (ArrowUpRight, ArrowRight)
- `next` - Framework
- `react` - UI library
- `react-dom` - React DOM renderer
- `tailwindcss` - CSS framework
- `tw-animate-css` - Animation utilities

**Internal Utilities**:
- `cn()` - Class name merger (src/lib/utils.ts and public/halden-ui/lib/cn.ts)

### 11. Design System Integration

**Halden UI Integration Pattern**:
- Canonical implementation lives in `public/halden-ui/`
- Application-specific wrappers in `src/components/halden-ui/navigation/`
- Site-specific primitives in `src/components/site/primitives/`
- CSS tokens imported from `public/halden-ui/styles/`

**CSS Token Resolution**:
- Design tokens defined in `public/halden-ui/styles/theme.css`
- Typography tokens in `public/hades-ui/styles/typography.css`
- Glass morphism tokens in `public/halden-ui/styles/glass.css`
- Animation tokens in `public/halden-ui/styles/animations.css`

### 12. Analytics Integration

**Provider**: Vercel Analytics

**Location**: Rendered in `app/layout.tsx` body

**Implementation**: `<Analytics />` component from `@vercel/analytics/next`

### 13. Error Handling

**404 Page**: `app/not-found.tsx`

**Structure**:
- Wrapped in SiteShell
- Uses container-rl class (responsive container)
- Displays "Page not found" message
- No custom error boundaries implemented

### 14. Performance Optimizations

**Font Optimization**:
- `display: "swap"` on all fonts
- Subset: latin only
- Variable font loading via CSS custom properties

**Image Optimization**:
- Static images in public/ directory
- No next/image component usage detected
- Images loaded via standard img tags

**Code Splitting**:
- Automatic via Next.js App Router
- Client components are automatically code-split

**CSS Optimization**:
- Tailwind CSS v4 (modern engine)
- CSS imports are tree-shaken
- No unused CSS detected in imports

## Runtime Execution Flow

### Homepage Request Flow
```
1. User requests /
2. Next.js resolves to app/page.tsx
3. Server renders RootLayout (fonts, CSS, metadata)
4. Server renders HomePage component
5. Server renders SiteShell
6. Server renders SiteHeader (client component boundary)
7. Server renders main content (hero section, editorial panels)
8. Server renders SiteFooter
9. HTML sent to client
10. Client hydrates:
    - SiteHeader becomes interactive (scroll state, mobile drawer)
    - Analytics initializes
```

### Navigation Flow
```
1. User clicks navigation link
2. Next.js client-side navigation (no full page reload)
3. New page component server-rendered
4. SiteShell reused (layout preserved)
5. SiteHeader state resets (scroll position, drawer state)
6. Analytics page view tracked
```

## Unknowns

1. **MDX Pipeline**: No evidence of MDX usage, but blog page suggests future content management system
2. **Dynamic Routes**: No dynamic routes found, but projects/resources pages suggest future dynamic routing
3. **API Routes**: No API routes detected in app/ directory
4. **Server Actions**: No server actions found
5. **Authentication**: No authentication system detected
6. **Database**: No database integration detected
7. **Internationalization**: No i18n configuration found
8. **Testing**: No test files or testing configuration detected
9. **Build Customization**: Minimal next.config.ts (only reactStrictMode)
10. **Environment Variables**: No .env files or environment variable usage detected
