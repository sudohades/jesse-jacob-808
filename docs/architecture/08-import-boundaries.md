# Import Boundaries

## Architectural Layers

```
┌─────────────────────────────────────────────────────────────┐
│ Application Layer (app/)                                     │
│ - Page components                                            │
│ - Root layout                                               │
│ - Route handlers                                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ Site Components Layer (src/components/site/)                 │
│ - SiteShell, SiteHeader, SiteFooter                         │
│ - Container, Logo, CTAButton                                │
│ - Application-specific compositions                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ Site Primitives Layer (src/components/site/primitives/)      │
│ - Eyebrow, Heading, Panel, Divider                          │
│ - Metadata, PageHeader, Surface                             │
│ - Site-specific primitive implementations                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ Halden UI Adapters Layer (src/components/halden-ui/)        │
│ - SiteNavigation (adapter)                                   │
│ - Integrates site-specific elements with Halden UI          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ Halden UI Layer (public/halden-ui/)                         │
│ - Canonical component implementations                        │
│ - Design tokens, styles, utilities                          │
│ - Portable UI library                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ Utilities Layer (src/lib/, public/halden-ui/lib/)           │
│ - cn() utility function                                     │
│ - design-tokens.ts                                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ External Libraries                                          │
│ - clsx, tailwind-merge                                      │
│ - lucide-react, next, react                                 │
└─────────────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ CSS Layer                                                    │
│ - app/globals.css (orchestrator)                            │
│ - public/halden-ui/styles/* (tokens)                         │
└─────────────────────────────────────────────────────────────┘
```

## Allowed Import Flows

### Application → Site Components
**Status**: ✅ ALLOWED

**Evidence**:
- All page components import from `@/components/site/`
- Examples: SiteShell, Container, CTAButton

**Pattern**:
```typescript
import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/site/Container";
```

### Site Components → Site Primitives
**Status**: ✅ ALLOWED

**Evidence**:
- SiteShell imports SiteHeader, SiteFooter
- Container uses cn utility
- PageHeader imports Eyebrow, Heading

**Pattern**:
```typescript
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { Heading } from "@/components/site/primitives/Heading";
```

### Site Components → Halden UI Adapters
**Status**: ✅ ALLOWED

**Evidence**:
- SiteHeader imports from `@/components/halden-ui/navigation/SiteNavigation`

**Pattern**:
```typescript
import { SiteNavigation } from "@/components/halden-ui/navigation/SiteNavigation";
```

### Site Primitives → Utilities
**Status**: ✅ ALLOWED

**Evidence**:
- All site primitives import cn from `@/lib/utils`

**Pattern**:
```typescript
import { cn } from "@/lib/utils";
```

### Halden UI Adapters → Halden UI (public)
**Status**: ✅ ALLOWED (Adapter Pattern)

**Evidence**:
- src/components/halden-ui/navigation/SiteNavigation imports from public/halden-ui
- Imports NavigationItem, HamburgerButton, MobileDrawer from public

**Pattern**:
```typescript
import { NavigationItem } from "../../../../public/halden-ui/components/navigation/NavigationItem";
import { HamburgerButton } from "../../../../public/halden-ui/components/navigation/HamburgerButton";
import { MobileDrawer } from "../../../../public/halden-ui/components/navigation/MobileDrawer";
```

### Halden UI Adapters → Site Components
**Status**: ⚠️ CROSS-LAYER (Intentional)

**Evidence**:
- src/components/halden-ui/navigation/SiteNavigation imports Logo from site

**Pattern**:
```typescript
import { Logo as SiteWordmarkLogo } from "@/components/site/Logo";
```

**Explanation**: This is intentional - the adapter integrates site-specific branding with Halden UI navigation.

### Utilities → External Libraries
**Status**: ✅ ALLOWED

**Evidence**:
- Both cn implementations import clsx and tailwind-merge

**Pattern**:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
```

### Application → CSS
**Status**: ✅ ALLOWED

**Evidence**:
- app/layout.tsx imports app/globals.css

**Pattern**:
```typescript
import "./globals.css";
```

### CSS → Halden UI Styles
**Status**: ✅ ALLOWED

**Evidence**:
- app/globals.css imports from public/halden-ui/styles/

**Pattern**:
```css
@import "../public/halden-ui/styles/globals.css";
@import "../public/halden-ui/styles/theme.css";
@import "../public/halden-ui/styles/typography.css";
@import "../public/halden-ui/styles/glass.css";
@import "../public/halden-ui/styles/animations.css";
```

## Boundary Violations

### Violation 1: Halden UI Adapters → Site Components

**Type**: Cross-Layer Import

**Severity**: LOW (Intentional)

**Location**: `src/components/halden-ui/navigation/SiteNavigation.tsx`

**Evidence**:
```typescript
import { Logo as SiteWordmarkLogo } from "@/components/site/Logo";
```

**Explanation**: This is an intentional violation of strict layering. The adapter pattern requires integrating site-specific elements (Logo) with Halden UI components. This is acceptable as the adapter layer exists specifically for this purpose.

**Recommendation**: Keep as-is. This is the correct pattern for site-specific adaptations.

---

### Violation 2: Duplicate Utilities Across

**Type**: Duplicate Implementation

**Severity**: MEDIUM

**Locations**:
- `src/lib/utils.ts`
- `public/halden-ui/lib/cn.ts`

**Evidence**: Both files contain identical cn() function implementations.

**Explanation**: The cn() utility is duplicated in both locations. Both are actively used by their respective component sets. This creates maintenance burden and potential for divergence.

**Recommendation**: Consolidate to single location (public/halden-ui/lib/cn.ts) and have src/lib/utils.ts re-export it.

---

### Violation 3: Site Primitives Duplicate Halden UI

**Type**: Duplicate Implementation

**Severity**: MEDIUM

**Locations**:
- `src/components/site/primitives/Eyebrow.tsx` vs `public/halden-ui/components/typography/Eyebrow.tsx`
- `src/components/site/primitives/Heading.tsx` vs `public/halden-ui/components/typography/Heading.tsx`
- `src/components/site/primitives/Surface.tsx` vs `public/halden-ui/components/ui/Surface.tsx`
- `src/components/site/primitives/Divider.tsx` vs `public/halden-ui/components/ui/Divider.tsx`
- `src/components/site/Container.tsx` vs `public/halden-ui/components/layout/Container.tsx`

**Evidence**: Site primitives duplicate Halden UI implementations with minor differences (lack of forwardRef, as prop, etc.).

**Explanation**: Site primitives are the runtime implementations, but Halden UI has more complete versions. This creates ambiguity about which is canonical.

**Recommendation**: Migrate to Halden UI versions (they are supersets with better patterns).

---

### Violation 4: Dead MobileDrawer in src

**Type**: Dead Code in Wrong Layer

**Severity**: LOW

**Location**: `src/components/halden-ui/navigation/MobileDrawer.tsx`

**Evidence**: File exists but is not imported. Public version is used instead.

**Explanation**: A duplicate MobileDrawer exists in the adapter layer but is not used. The public version is the runtime implementation.

**Recommendation**: Delete src version.

---

### Violation 5: Executable Code in public/

**Type**: Structural Concern

**Severity**: LOW

**Location**: `public/halden-ui/` directory

**Evidence**: The public directory contains TypeScript/TSX files, which is unconventional. The public directory is typically for static assets.

**Explanation**: Halden UI is stored in public/ but contains executable code. This is unusual but appears intentional - Halden UI is positioned as a portable library that could be published.

**Recommendation**: Consider moving Halden UI to a dedicated location (e.g., packages/halden-ui or src/halden-ui) if it's meant to be an internal library. Keep in public/ if it's meant to be publicly accessible as a standalone resource.

---

## Layer Isolation Analysis

### Application Layer Isolation
**Status**: ✅ GOOD

**Evidence**:
- Application layer only imports from site components and CSS
- No direct imports from Halden UI or utilities
- Clean separation of concerns

### Site Components Layer Isolation
**Status**: ⚠️ ACCEPTABLE

**Evidence**:
- Imports from site primitives (allowed)
- Imports from Halden UI adapters (allowed)
- Imports from utilities (allowed)
- No direct imports from Halden UI public (goes through adapters)

**Concern**: Minimal - adapter pattern is appropriate

### Site Primitives Layer Isolation
**Status**: ⚠️ ACCEPTABLE

**Evidence**:
- Imports from utilities (allowed)
- No imports from other layers
- Self-contained primitives

**Concern**: None - good isolation

### Halden UI Adapters Layer Isolation
**Status**: ⚠️ ACCEPTABLE

**Evidence**:
- Imports from Halden UI public (allowed for adapters)
- Imports from site components (intentional cross-layer)
- No imports from utilities or primitives

**Concern**: Cross-layer import to site components is intentional for adapter pattern

### Halden UI Layer Isolation
**Status**: ✅ EXCELLENT

**Evidence**:
- Self-contained library
- Imports only from its own utilities
- No imports from application or site layers
- Truly portable

**Concern**: None - perfect isolation

### Utilities Layer Isolation
**Status**: ⚠️ DUPLICATE

**Evidence**:
- Two identical implementations in different locations
- Both used by different component sets
- Violates DRY principle

**Concern**: Medium - maintenance burden

## Circular Import Analysis

### No Circular Imports Detected

**Evidence**:
- grep_search for circular import patterns found none
- Dependency graph is acyclic
- Clean hierarchical structure

**Status**: ✅ EXCELLENT

## Feature Leakage Analysis

### No Feature Leakage Detected

**Evidence**:
- Application layer does not leak implementation details
- Site components encapsulate application-specific logic
- Halden UI is truly portable with no application dependencies
- Clean separation of concerns

**Status**: ✅ EXCELLENT

## Import Path Patterns

### Relative Paths
**Status**: ⚠️ MIXED

**Evidence**:
- Application and site components use alias paths (`@/`)
- Halden UI adapters use relative paths to public/halden-ui

**Pattern**:
```typescript
// Good: alias paths
import { SiteShell } from "@/components/site/SiteShell";
import { cn } from "@/lib/utils";

// Acceptable: relative paths for adapter to public
import { NavigationItem } from "../../../../public/halden-ui/components/navigation/NavigationItem";
```

**Recommendation**: Consider adding a path alias for public/halden-ui to improve readability:
```json
// tsconfig.json
{
  "paths": {
    "@/*": ["./src/*"],
    "@halden-ui/*": ["./public/halden-ui/*"]
  }
}
```

---

## Dependency Direction

### Unidirectional Flow (Good)
**Status**: ✅ MOSTLY UNIDIRECTIONAL

**Evidence**:
- Application → Site Components → Site Primitives → Utilities
- Application → Halden UI Adapters → Halden UI → Utilities
- CSS flows from Halden UI to Application

**Exceptions**:
- Halden UI Adapters → Site Components (intentional for adapter pattern)

### Bidirectional Flow (Bad)
**Status**: ✅ NONE DETECTED

**Evidence**: No bidirectional dependencies found.

## Boundary Enforcement

### Current Enforcement
**Method**: Convention-based (no technical enforcement)

**Evidence**:
- No build-time checks for boundary violations
- No linting rules for import patterns
- Relies on developer discipline

**Status**: ⚠️ WEAK

### Recommended Enforcement
**Options**:
1. **ESLint Plugin**: Configure import/order rules to enforce layer ordering
2. **Path Aliases**: Use path aliases to make boundaries explicit
3. **Build-time Checks**: Use TypeScript path mapping to restrict cross-layer imports
4. **Documentation**: Maintain this boundary document as reference

## Summary

### Boundary Health
**Overall Status**: ⚠️ ACCEPTABLE with Minor Issues

### Strengths
1. Clean hierarchical structure
2. No circular imports
3. No feature leakage
4. Halden UI has excellent isolation
5. Adapter pattern is appropriate

### Weaknesses
1. Duplicate utilities across layers
2. Duplicate component implementations
3. Dead code in adapter layer
4. Unconventional location of Halden UI (public/)
5. Weak boundary enforcement (convention-based only)

### Recommendations

### High Priority
1. Consolidate duplicate cn() utility
2. Delete dead MobileDrawer from src
3. Migrate site primitives to Halden UI where appropriate

### Medium Priority
4. Consider moving Halden UI to dedicated location
5. Add path alias for Halden UI imports
6. Implement ESLint rules for import ordering

### Low Priority
7. Strengthen boundary enforcement with build-time checks
8. Document boundary patterns in team guidelines

### Boundary Violations Summary
- **Total Violations**: 5
- **Critical**: 0
- **High**: 0
- **Medium**: 2 (duplicate utilities, duplicate components)
- **Low**: 3 (cross-layer adapter, dead code, public/ location)
