# Canonical Candidates

## Typography

### Current Runtime Owner
Site Primitives (`src/components/site/primitives/`)

### Potential Canonical Owner
Halden UI (`public/halden-ui/components/typography/`)

### Migration Risk
**LOW**

### Migration Complexity
**LOW**

### Blocking Issues
None

### Analysis
- **Eyebrow**: Site version lacks forwardRef and displayName. Halden UI version is a superset with identical implementation.
- **Heading**: Site version lacks forwardRef and better TypeScript types. Halden UI version is a superset with identical implementation.
- **Metadata**: Site-specific component, no Halden UI equivalent. Keep as site-specific.
- **Body**: Halden UI version exists but is not used. Could be adopted if needed.

### Recommendation
Migrate Eyebrow and Heading to Halden UI. Keep Metadata as site-specific.

---

## Layout

### Current Runtime Owner
Site Components (`src/components/site/`) and Site Primitives (`src/components/site/primitives/`)

### Potential Canonical Owner
Halden UI (`public/halden-ui/components/layout/`)

### Migration Risk
**LOW**

### Migration Complexity
**LOW to MEDIUM**

### Blocking Issues
None

### Analysis
- **Container**: Site version lacks forwardRef and `as` prop. Halden UI version is a superset.
- **Panel**: Site version composes Surface with fixed padding. Halden UI GlassPanel has configurable padding and grid support. Different APIs.
- **Surface**: Site version lacks forwardRef and `as` prop. Halden UI version is a superset.
- **SiteShell**: Site-specific layout wrapper, no Halden UI equivalent. Keep as site-specific.
- **PageHeader**: Site-specific composition, no Halden UI equivalent. Keep as site-specific.

### Recommendation
Migrate Container and Surface to Halden UI. Evaluate Panel vs GlassPanel based on feature needs. Keep SiteShell and PageHeader as site-specific.

---

## Navigation

### Current Runtime Owner
Halden UI Adapters (`src/components/halden-ui/navigation/`)

### Potential Canonical Owner
Halden UI (`public/halden-ui/components/navigation/`)

### Migration Risk
**NONE**

### Migration Complexity
**NONE**

### Blocking Issues
None

### Analysis
- **SiteNavigation**: Src version is an adapter that integrates site-specific Logo. This is the correct pattern.
- **MobileDrawer**: Public version is used at runtime. Src version is dead code (delete).
- **NavigationItem**: Public version is used via adapter. Site version is dead code (delete).
- **HamburgerButton**: Public version is used via adapter.
- **SiteHeader**: Site-specific composition, no Halden UI equivalent. Keep as site-specific.
- **SiteFooter**: Site-specific simple footer. Halden UI Footer is more feature-complete but not used. Keep site version unless features needed.

### Recommendation
Keep adapter pattern for SiteNavigation. Delete duplicate MobileDrawer and NavigationItem from src. Keep SiteHeader and SiteFooter as site-specific.

---

## Cards

### Current Runtime Owner
Halden UI (`public/halden-ui/components/cards/`)

### Potential Canonical Owner
Halden UI (already canonical)

### Migration Risk
**NONE**

### Migration Complexity
**NONE**

### Blocking Issues
None

### Analysis
- **ServiceCard**: Halden UI owns, not used in app. Application uses Panel instead.
- **ProjectCard**: Halden UI owns, not used in app.
- **ResourceCard**: Halden UI owns, not used in app.

### Recommendation
Halden UI is already canonical. Cards are prepared for future use but not currently needed. No action required.

---

## Panels

### Current Runtime Owner
Site Primitives (`src/components/site/primitives/Panel.tsx`)

### Potential Canonical Owner
Halden UI (`public/halden-ui/components/layout/GlassPanel.tsx`)

### Migration Risk
**MEDIUM**

### Migration Complexity
**MEDIUM**

### Blocking Issues
- Different APIs: Panel has fixed padding, GlassPanel has configurable padding
- GlassPanel supports grid background, Panel does not
- Different prop names and options

### Analysis
- **Panel**: Site-specific simple wrapper around Surface with fixed padding.
- **GlassPanel**: Halden UI version with configurable padding (none/sm/md/lg) and grid support.

### Recommendation
Evaluate if GlassPanel features are needed. If yes, migrate and update all Panel usages. If no, keep Panel for simpler API.

---

## Buttons

### Current Runtime Owner
Site Components (`src/components/site/CTAButton.tsx`)

### Potential Canonical Owner
Halden UI (`public/halden-ui/components/ui/Button.tsx`)

### Migration Risk
**HIGH**

### Migration Complexity
**HIGH**

### Blocking Issues
- Different purposes: CTAButton is for navigation, Button is for actions
- Different APIs: CTAButton uses to/href, Button uses asChild pattern
- CTAButton has built-in icon support, Button does not
- CTAButton integrates with Next.js Link, Button is pure button

### Analysis
- **CTAButton**: Link/button hybrid for navigation with icon support.
- **Button**: Pure action button with asChild pattern.

### Recommendation
Keep both. They serve different purposes. CTAButton is for navigation links, Button is for form actions. Not duplicates.

---

## Content

### Current Runtime Owner
Next.js App Router (app/ directory)

### Potential Canonical Owner
Next.js App Router (already canonical)

### Migration Risk
**NONE**

### Migration Complexity
**NONE**

### Blocking Issues
None

### Analysis
- Content is managed through Next.js App Router file-based routing.
- All pages are Server Components.
- No CMS or content management system integrated.

### Recommendation
Next.js App Router is already canonical. No action required.

---

## MDX

### Current Runtime Owner
None (not implemented)

### Potential Canonical Owner
Halden UI (when implemented)

### Migration Risk
**UNKNOWN**

### Migration Complexity
**UNKNOWN**

### Blocking Issues
- MDX not currently implemented
- Blog page exists but uses static content
- No MDX configuration or dependencies

### Analysis
- Blog page suggests future MDX usage
- Halden UI has components that could support MDX (Body, CodeLabel, etc.)
- No current implementation to migrate

### Recommendation
When MDX is implemented, use Halden UI typography components as the canonical base. No action required now.

---

## Routing

### Current Runtime Owner
Next.js App Router

### Potential Canonical Owner
Next.js App Router (already canonical)

### Migration Risk
**NONE**

### Migration Complexity
**NONE**

### Blocking Issues
None

### Analysis
- Routing is handled by Next.js App Router with file-based routing
- No custom routing logic or middleware
- Standard Next.js patterns

### Recommendation
Next.js App Router is already canonical. No action required.

---

## Metadata

### Current Runtime Owner
Next.js (app/layout.tsx)

### Potential Canonical Owner
Next.js (already canonical)

### Migration Risk
**NONE**

### Migration Complexity
**NONE**

### Blocking Issues
None

### Analysis
- Metadata generated through Next.js Metadata API
- Standard Next.js patterns
- No custom metadata generation logic

### Recommendation
Next.js is already canonical. No action required.

---

## Utilities

### Current Runtime Owner
Both src and public (duplicate implementations)

### Potential Canonical Owner
Halden UI (`public/halden-ui/lib/cn.ts`)

### Migration Risk
**LOW**

### Migration Complexity
**LOW**

### Blocking Issues
None

### Analysis
- **src/lib/utils.ts**: Used by all site components
- **public/halden-ui/lib/cn.ts**: Used by all Halden UI components
- Identical implementations
- Public version has better documentation

### Recommendation
Consolidate to `public/halden-ui/lib/cn.ts`. Have `src/lib/utils.ts` re-export it for backward compatibility, then migrate imports over time.

---

## Styling

### Current Runtime Owner
Halden UI (`public/halden-ui/styles/`)

### Potential Canonical Owner
Halden UI (already canonical)

### Migration Risk
**NONE**

### Migration Complexity
**NONE**

### Blocking Issues
None

### Analysis
- All CSS tokens and styles defined in Halden UI
- Application imports Halden UI styles in app/globals.css
- App-specific overrides in app/globals.css
- Correct ownership pattern

### Recommendation
Halden UI is already canonical. No action required.

---

## Design Tokens.

### Migration Risk
**NONE**

### Migration Complexity
**NONE**

### Blocking Issues
None

### Analysis
- Design tokens defined as CSS variables in Halden UI
- TypeScript constants mirror CSS variables
- Application consumes via CSS
- Correct ownership pattern

### Recommendation
Halden UI is already canonical. No action required.

---

## Hooks

### Current Runtime Owner
Site Hooks (`src/hooks/`)

### Potential Canonical Owner
Site Hooks (if used) or Halden UI (if generalized)

### Migration Risk
**UNKNOWN**

### Migration Complexity
**UNKNOWN**

### Blocking Issues
- Hooks are defined but not imported
- Entire dependency chain appears dead
- May be prepared for future use

### Analysis
- **useMediaQuery**: Base hook, not imported
- **useBreakpoint**: Depends on useMediaQuery, not imported
- **useMobile**: Depends on useBreakpoint, not imported
- **useViewport**: Depends on useMobile, not imported
- Entire chain is likely dead

### Recommendation
If hooks are needed for future features, generalize and move to Halden UI. If not, delete entire chain. Current status: likely dead code.

---

## Providers

### Current Runtime Owner
None (ViewportProvider is no-op)

### Potential Canonical Owner
Site Providers (if needed)

### Migration Risk
**UNKNOWN**

### Migration Complexity
**UNKNOWN**

### Blocking Issues
- ViewportProvider is a no-op placeholder
- Not imported anywhere
- May be prepared for future use

### Analysis
- **ViewportProvider**: No-op wrapper, does not provide any context
- Comment states it's a placeholder for future shared viewport context
- Currently not needed

### Recommendation
Delete if not needed. If viewport context is needed in future, implement properly. Current status: dead code.

---

## Summary Table

| Subsystem | Current Runtime Owner | Potential Canonical Owner | Migration Risk | Migration Complexity | Blocking Issues |
|-----------|----------------------|---------------------------|----------------|---------------------|----------------|
| Typography | Site Primitives | Halden UI | LOW | LOW | None |
| Layout | Site Components/Primitives | Halden UI | LOW | LOW-MEDIUM | None |
| Navigation | Halden UI Adapters | Halden UI (keep adapter) | NONE | NONE | None |
| Cards | Halden UI | Halden UI | NONE | NONE | None |
| Panels | Site Primitives | Halden UI | MEDIUM | MEDIUM | API differences |
| Buttons | Site Components | Keep both (different purposes) | HIGH | HIGH | Different purposes |
| Content | Next.js App Router | Next.js | NONE | NONE | None |
| MDX | None | Halden UI (future) | UNKNOWN | UNKNOWN | Not implemented |
| Routing | Next.js App Router | Next.js | NONE | NONE | None |
| Metadata | Next.js | Next.js | NONE | NONE | None |
| Utilities | Both (duplicate) | Halden UI | LOW | LOW | None |
| Styling | Halden UI | Halden UI | NONE | NONE | None |
| Design Tokens | Halden UI | Halden UI | NONE | NONE | None |
| Hooks | Site Hooks (dead) | Halden UI (if generalized) | UNKNOWN | UNKNOWN | Not used |
| Providers | None (dead) | Site Providers (if needed) | UNKNOWN | UNKNOWN | Not used |

## Migration Priority

### High Priority (Low Risk, Low Complexity)
1. **Utilities** - Consolidate cn() to Halden UI
2. **Typography** - Migrate Eyebrow and Heading to Halden UI
3. **Layout** - Migrate Container and Surface to Halden UI

### Medium Priority (Requires Evaluation)
4. **Panels** - Evaluate Panel vs GlassPanel migration
5. **Hooks** - Determine if needed, then generalize or delete
6. **Providers** - Delete or implement properly

### Low Priority (Intentional Patterns)
7. **Navigation** - Keep adapter pattern
8. **Buttons** - Keep both (different purposes)

### No Action Required
9. **Cards** - Halden UI already canonical, not used
10. **Content** - Next.js already canonical
11. **Routing** - Next.js already canonical
12. **Metadata** - Next.js already canonical
13. **Styling** - Halden UI already canonical
14. **Design Tokens** - Halden UI already canonical

## Migration Complexity Breakdown

### LOW Complexity (Simple replacements)
- Utilities: Re-export pattern, gradual migration
- Typography: Drop-in replacements (Halden UI is superset)
- Layout (Container, Surface): Drop-in replacements (Halden UI is superset)

### MEDIUM Complexity (API changes)
- Panels: Different APIs, requires prop mapping and testing
- Hooks: Need to determine if needed, then generalize

### HIGH Complexity (Different purposes)
- Buttons: Not a migration - different components for different purposes

### NONE Complexity (Already canonical)
- Navigation: Adapter pattern is correct
- Cards: Already canonical, not used
- Content, Routing, Metadata, Styling, Design Tokens: Already canonical

## Risk Assessment

### LOW Risk
- Utilities: Identical implementations, re-export pattern safe
- Typography: Halden UI is superset, safe migration
- Layout (Container, Surface): Halden UI is superset, safe migration

### MEDIUM Risk
- Panels: API differences require careful testing
- Hooks: Unclear if needed, risk of deleting useful code

### HIGH Risk
- Buttons: Not a migration - different components serve different purposes

### NONE Risk
- Navigation: Adapter pattern is correct approach
- All canonical subsystems: No changes needed

## Blocking Issues Summary

### No Blocking Issues
Most subsystems have no blocking issues. The main considerations are:

1. **Panels**: API differences need evaluation
2. **Hooks**: Need to determine if they're prepared for future use or dead
3. **Providers**: Need to determine if viewport context is needed

All other subsystems can be migrated or are already canonical without blocking issues.
