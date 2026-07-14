# Dead Code Analysis

## Definitely Dead

### src/components/halden-ui/navigation/MobileDrawer.tsx

**Classification**: Definitely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "MobileDrawer" from src path shows no imports
- The public version (`public/halden-ui/components/navigation/MobileDrawer.tsx`) is imported and used by `src/components/halden-ui/navigation/SiteNavigation.tsx`
- The src version is a duplicate of the public version with minor visual differences (icon direction, label position)

**Runtime Reachability**: Impossible - no import paths reference this file

**Recommendation**: Delete

---

### src/components/site/SiteNav.tsx

**Classification**: Definitely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "SiteNav" shows no imports
- Component intentionally renders nothing (comment: "Visual-only wrapper kept for API compatibility")
- Comment explicitly states: "We intentionally render nothing to avoid duplicate visual chrome"

**Runtime Reachability**: Impossible - no import paths reference this file

**Recommendation**: Delete (legacy placeholder)

---

### src/providers/ViewportProvider.tsx

**Classification**: Definitely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "ViewportProvider" shows no imports
- Component is a no-op wrapper that does not provide any context
- Comment states: "Placeholder for future shared viewport context"

**Runtime Reachability**: Impossible - no import paths reference this file

**Recommendation**: Delete (or implement if viewport context is needed)

---

### public/halden-ui/constants/colors.ts

**Classification**: Definitely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "colors" from public/halden-ui shows no imports of the constants file
- Only import is internal: `export { tokens as designTokens } from "../lib/design-tokens"`
- The semanticColors export is not used anywhere

**Runtime Reachability**: Impossible - no import paths reference this file

**Recommendation**: Delete (design tokens are available via CSS variables)

---

### public/halden-ui/constants/typography.ts

**Classification**: Definitely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "typography" from public/halden-ui shows no imports of the constants file
- Typography is handled via CSS classes and next/font/google

**Runtime Reachability**: Impossible - no import paths reference this file

**Recommendation**: Delete (typography is handled via CSS)

---

## Likely Dead

### src/components/site/Accordion.tsx

**Classification**: Likely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "Accordion" or "InteractiveText" shows no imports
- Component is exported as "InteractiveText" but file is named "Accordion.tsx"
- No references in any page or component files

**Runtime Reachability**: Unknown - could be used via dynamic import or string-based import, but no evidence found

**Confidence Level**: Medium - no static imports, but component appears functional

**Recommendation**: Delete unless dynamic imports are used

---

### src/components/site/Reveal.tsx

**Classification**: Likely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "Reveal" shows no imports
- Component is a scroll-triggered animation component
- No references in any page or component files

**Runtime Reachability**: Unknown - could be used via dynamic import, but no evidence found

**Confidence Level**: Medium - no static imports, but component appears functional

**Recommendation**: Delete unless dynamic imports are used

---

### src/components/site/Section.tsx

**Classification**: Likely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "Section" from src/components/site shows no imports
- Duplicate of `public/halden-ui/components/layout/Section.tsx`
- No references in any page or component files

**Runtime Reachability**: Unknown - could be used via dynamic import, but no evidence found

**Confidence Level**: Medium - no static imports, but component appears functional

**Recommendation**: Delete (use Halden UI Section instead)

---

### src/components/site/PageHero.tsx

**Classification**: Likely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "PageHero" shows no imports
- No references in any page or component files
- Homepage uses custom hero section instead

**Runtime Reachability**: Unknown - could be used via dynamic import, but no evidence found

**Confidence Level**: Medium - no static imports, but component appears functional

**Recommendation**: Delete unless planned for future use

---

### src/components/site/primitives/EditorialGrid.tsx

**Classification**: Likely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "EditorialGrid" shows no imports
- Duplicate of `public/halden-ui/components/layout/GridLayout.tsx`
- No references in any page or component files

**Runtime Reachability**: Unknown - could be used via dynamic import, but no evidence found

**Confidence Level**: Medium - no static imports, but component appears functional

**Recommendation**: Delete (use Halden UI GridLayout instead)

---

### src/components/site/primitives/NavigationItem.tsx

**Classification**: Likely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "NavigationItem" from src/components/site/primitives shows no imports
- Different API from `public/halden-ui/components/navigation/NavigationItem.tsx`
- No references in any page or component files

**Runtime Reachability**: Unknown - could be used via dynamic import, but no evidence found

**Confidence Level**: Medium - no static imports, but component appears functional

**Recommendation**: Delete (use Halden UI NavigationItem instead)

---

### src/hooks/useViewport.ts

**Classification**: Likely Dead

**Evidence**:
- Zero static imports found in the codebase
- grep_search for "useViewport" shows no imports
- Not imported by any component
- Depends on useMobile, which is also not imported

**Runtime Reachability**: Unknown - could be used via dynamic import, but no evidence found

**Confidence Level**: Medium - no static imports, but hook appears functional

**Recommendation**: Delete unless planned for future use

---

## Possibly Reachable

### src/hooks/useMediaQuery.ts

**Classification**: Possibly Reachable

**Evidence**:
- Zero direct imports found in the codebase
- However, it is imported by `useBreakpoint.ts`
- `useBreakpoint` is imported by `useMobile.ts`
- `useMobile` is imported by `useViewport.ts`
- This forms a dependency chain: useViewport → useMobile → useBreakpoint → useMediaQuery
- Since useViewport is not imported, the entire chain is likely dead

**Runtime Reachability**: Indirect - only reachable if useViewport is imported

**Confidence Level**: Low - dependency chain suggests dead, but base hook is functional

**Recommendation**: Delete entire hook chain unless useViewport is needed

---

### src/hooks/useBreakpoint.ts

**Classification**: Possibly Reachable

**Evidence**:
- Zero direct imports found in the codebase
- Imported by `useMobile.ts`
- Part of dependency chain: useViewport → useMobile → useBreakpoint
- Since useViewport is not imported, this is likely dead

**Runtime Reachability**: Indirect - only reachable if useMobile is imported

**Confidence Level**: Low - part of likely-dead dependency chain

**Recommendation**: Delete unless useMobile is needed

---

### src/hooks/useMobile.ts

**Classification**: Possibly Reachable

**Evidence**:
- Zero direct imports found in the codebase
- Imported by `useViewport.ts`
- Part of dependency chain: useViewport → useMobile
- Since useViewport is not imported, this is likely dead

**Runtime Reachability**: Indirect - only reachable if useViewport is imported

**Confidence Level**: Low - part of likely-dead dependency chain

**Recommendation**: Delete unless useViewport is needed

---

## Unknown

### public/halden-ui/components/ui/Button.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers if Halden UI is published as a package
- Could be used via dynamic import not detected by static analysis

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/ui/IconButton.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/ui/Badge.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/ui/GlowBorder.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/ui/Surface.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers
- Duplicate exists in `src/components/site/primitives/Surface.tsx`

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/typography/Body.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/typography/CodeLabel.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/layout/Container.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers
- Duplicate exists in `src/components/site/Container.tsx`

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/layout/Section.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers
- Duplicate exists in `src/components/site/Section.tsx`

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/layout/GridLayout.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers
- Similar to `src/components/site/primitives/EditorialGrid.tsx`

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/layout/GlassPanel.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers
- Similar to `src/components/site/primitives/Panel.tsx`

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/navigation/SiteNavigation.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers
- Adapter exists in `src/components/halden-ui/navigation/SiteNavigation.tsx`

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/navigation/NavigationLogo.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/navigation/NavigationItem.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code directly
- Exported via barrel export in `public/halden-ui/index.ts`
- However, it IS imported by `src/components/halden-ui/navigation/SiteNavigation.tsx`
- Used at runtime via the adapter

**Runtime Reachability**: YES - used via SiteNavigation adapter

**Confidence Level**: High - proven runtime usage

**Recommendation**: Keep (actively used)

---

### public/halden-ui/components/navigation/HamburgerButton.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code directly
- Exported via barrel export in `public/halden-ui/index.ts`
- However, it IS imported by `src/components/halden-ui/navigation/SiteNavigation.tsx`
- Used at runtime via the adapter

**Runtime Reachability**: YES - used via SiteNavigation adapter

**Confidence Level**: High - proven runtime usage

**Recommendation**: Keep (actively used)

---

### public/halden-ui/components/hero/Hero.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/hero/HeroBackground.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/hero/HeroOverlay.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/cards/ServiceCard.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/cards/ProjectCard.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/cards/ResourceCard.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

### public/halden-ui/components/footer/Footer.tsx

**Classification**: Unknown

**Evidence**:
- Not imported by application code
- Exported via barrel export in `public/halden-ui/index.ts`
- Could be used by external consumers
- Application uses custom `src/components/site/SiteFooter.tsx`

**Runtime Reachability**: Unknown - not used in current app, but may be intended for external use

**Confidence Level**: Low - no evidence of usage, but part of public API

**Recommendation**: Keep (part of public Halden UI API)

---

## Summary Statistics

### Definitely Dead: 5
- src/components/halden-ui/navigation/MobileDrawer.tsx
- src/components/site/SiteNav.tsx
- src/providers/ViewportProvider.tsx
- public/halden-ui/constants/colors.ts
- public/halden-ui/constants/typography.ts

### Likely Dead: 9
- src/components/site/Accordion.tsx
- src/components/site/Reveal.tsx
- src/components/site/Section.tsx
- src/components/site/PageHero.tsx
- src/components/site/primitives/EditorialGrid.tsx
- src/components/site/primitives/NavigationItem.tsx
- src/hooks/useViewport.ts
- src/hooks/useBreakpoint.ts
- src/hooks/useMobile.ts

### Possibly Reachable: 3
- src/hooks/useMediaQuery.ts (dependency chain)
- src/hooks/useBreakpoint.ts (dependency chain)
- src/hooks/useMobile.ts (dependency chain)

### Unknown (Public API): 20
- All public Halden UI components not directly imported by app
- These are kept as part of the public API for potential external use

### Proven Runtime Usage (from Unknown): 2
- public/halden-ui/components/navigation/NavigationItem.tsx (used via adapter)
- public/halden-ui/components/navigation/HamburgerButton.tsx (used via adapter)

## Recommendations

### Immediate Deletion (Definitely Dead)
Delete the 5 definitely dead files immediately - they have zero runtime reachability.

### Deletion After Verification (Likely Dead)
Delete the 9 likely dead files after verifying no dynamic imports are used. Search for string-based imports or require() calls.

### Dependency Chain Cleanup
The 3 hook files form a dead dependency chain. Delete the entire chain unless useViewport is needed for future features.

### Public API Preservation
Keep all 20 public Halden UI components - they are part of the public API and may be used by external consumers or future features.

### Total Files to Delete: 14
- 5 definitely dead
- 9 likely dead (after verification)

### Total Files to Keep: 20
- Public Halden UI API components
