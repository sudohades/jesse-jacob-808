# Runtime Risks

## Critical Risks

### Risk 1: Duplicate Utility Functions (cn)

**Category**: Duplicate Ownership

**Severity**: CRITICAL

**Description**: The `cn()` utility function is duplicated in two locations with identical implementations:
- `src/lib/utils.ts` (used by site components)
- `public/halden-ui/lib/cn.ts` (used by Halden UI components)

**Impact**:
- Maintenance burden: Changes must be made in two places
- Potential for divergence: Implementations could drift apart over time
- Confusion: Developers may not know which version to use or modify

**Evidence**:
- Both files contain identical code
- Both are actively imported by their respective component sets
- grep_search shows 15+ imports of src version, 20+ imports of public version

**Mitigation**:
- Consolidate to single location (public/halden-ui/lib/cn.ts)
- Have src/lib/utils.ts re-export for backward compatibility
- Gradually migrate imports over time

**Migration Complexity**: LOW

---

## High Risks

### Risk 2: Duplicate Component Implementations

**Category**: Duplicate Ownership

**Severity**: HIGH

**Description**: Multiple component implementations exist between site primitives and Halden UI:
- Eyebrow (site vs Halden UI)
- Heading (site vs Halden UI)
- Container (site vs Halden UI)
- Surface (site vs Halden UI)
- Divider (site vs Halden UI)

**Impact**:
- Ambiguity about which implementation is canonical
- Halden UI versions have better patterns (forwardRef, as prop, better types)
- Site versions lack modern React patterns
- Potential for inconsistent behavior if both are used

**Evidence**:
- Site versions are actively used in application
- Halden UI versions are not imported but are more feature-complete
- Code comparison shows Halden UI versions are supersets

**Mitigation**:
- Migrate to Halden UI versions (they are supersets)
- Update all site component imports
- Delete site primitive duplicates after migration

**Migration Complexity**: LOW to MEDIUM

---

### Risk 3: Unconventional Halden UI Location

**Category**: Structural Risk

**Severity**: HIGH

**Description**: Halden UI (a TypeScript/React library) is located in the `public/` directory, which is typically reserved for static assets.

**Impact**:
- Confusion about directory structure conventions
- Potential build tool issues (some tools may ignore public/ for compilation)
- Deployment concerns (public/ contents are typically served as-is)
- Version control confusion (public/ often excluded from some linters)

**Evidence**:
- public/halden-ui/ contains .tsx, .ts files
- public/ directory conventionally for static assets (images, fonts, etc.)
- Halden UI has package.json suggesting it's meant to be a publishable package

**Mitigation**:
- Move Halden UI to dedicated location (e.g., packages/halden-ui or src/halden-ui)
- Update all import paths
- Consider monorepo structure if Halden UI is meant to be published

**Migration Complexity**: MEDIUM

---

## Medium Risks

### Risk 4: Dead Code Accumulation

**Category**: Maintenance Risk

**Severity**: MEDIUM

**Description**: Significant amount of dead code exists in the repository:
- 5 definitely dead files
- 9 likely dead files
- 3 possibly dead files (hook dependency chain)

**Impact**:
- Maintenance burden: Dead code must be maintained alongside active code
- Confusion: Developers may waste time investigating dead components
- Bundle size: Dead code may be included in builds (though tree-shaking should remove it)
- Onboarding complexity: New developers must distinguish between active and dead code

**Evidence**:
- grep_search shows zero imports for many components
- Comments indicate some are placeholders (ViewportProvider, SiteNav)
- Hook chain has no entry point

**Mitigation**:
- Delete definitely dead files immediately
- Verify likely dead files for dynamic imports, then delete
- Determine if hook chain is needed for future features

**Migration Complexity**: LOW

---

### Risk 5: Weak Boundary Enforcement

**Category**: Architectural Risk

**Severity**: MEDIUM

**Description**: Import boundaries are enforced only by convention, with no technical enforcement mechanisms.

**Impact**:
- Developers may accidentally violate boundaries
- No automated detection of boundary violations
- Relies on developer discipline and code review
- Boundaries may erode over time

**Evidence**:
- No ESLint rules for import ordering
- No build-time checks for cross-layer imports
- Mixed use of alias paths and relative paths
- No TypeScript path mapping restrictions

**Mitigation**:
- Implement ESLint import/order rules
- Add path aliases for all layers
- Consider build-time import restrictions
- Document boundary patterns in team guidelines

**Migration Complexity**: MEDIUM

---

### Risk 6: Ambiguous Subsystem Ownership

**Category**: Architectural Risk

**Severity**: MEDIUM

**Description**: Multiple subsystems have ambiguous ownership between site primitives and Halden UI:
- Typography (Eyebrow, Heading)
- Layout (Container, Panel, Surface)
- Buttons (CTAButton vs Button)
- Panels (Panel vs GlassPanel)

**Impact**:
- Unclear which implementation should be used for new features
- Potential for inconsistent patterns across the codebase
- Difficulty in planning migrations
- Team confusion about canonical implementations

**Evidence**:
- Duplicate implementations exist
- Both versions are functional
- No clear documentation on which to use
- Migration analysis shows ambiguity

**Mitigation**:
- Establish clear ownership for each subsystem
- Document canonical implementations
- Create migration plan for resolving duplicates
- Enforce ownership through code review

**Migration Complexity**: MEDIUM

---

## Low Risks

### Risk 7: Unused Halden UI Components

**Category**: Unused Code Risk

**Severity**: LOW

**Description**: Many Halden UI components are not used in the current application:
- Button, IconButton, Badge, GlowBorder, Surface
- Body, CodeLabel
- Container, Section, GridLayout, GlassPanel
- SiteNavigation, NavigationLogo
- Hero, HeroBackground, HeroOverlay
- ServiceCard, ProjectCard, ResourceCard
- Footer

**Impact**:
- Confusion about which components should be used
- Maintenance burden for unused code
- Potential for future use (may be intentional)

**Evidence**:
- grep_search shows no imports of these components
- They are exported via barrel export
- Application uses site primitives instead

**Mitigation**:
- Determine if components are prepared for future use
- If yes, document as "reserved for future use"
- If no, consider removing from public API or marking as experimental

**Migration Complexity**: LOW

---

### Risk 8: Hook Dependency Chain Uncertainty

**Category**: Unused Code Risk

**Severity**: LOW

**Description**: A chain of hooks exists but appears to be unused:
- useViewport → useMobile → useBreakpoint → useMediaQuery

**Impact**:
- Unclear if hooks are prepared for future use or dead code
- If needed in future, may require re-implementation
- Maintenance burden for unused code

**Evidence**:
- No direct imports of any hook in the chain
- useViewport is the entry point but not imported
- Hooks appear functional but unused

**Mitigation**:
- Determine if hooks are needed for planned features
- If yes, document intended use cases
- If no, delete entire chain

**Migration Complexity**: LOW

---

### Risk 9: No-Op ViewportProvider

**Category**: Placeholder Risk

**Severity**: LOW

**Description**: ViewportProvider exists as a no-op placeholder that does not provide any context.

**Impact**:
- Confusion about its purpose
- May suggest incomplete implementation
- Wastes developer time investigating

**Evidence**:
- Component renders children without providing context
- Comment states it's a placeholder
- Not imported anywhere

**Mitigation**:
- Delete if not needed
- Implement properly if viewport context is needed

**Migration Complexity**: LOW

---

### Risk 10: Mixed Import Path Patterns

**Category**: Code Quality Risk

**Severity**: LOW

**Description**: Mixed use of alias paths (@/) and relative paths for imports.

**Impact**:
- Inconsistent import patterns
- Reduced code readability
- Potential for confusion

**Evidence**:
- Site components use @/ alias paths
- Halden UI adapters use relative paths to public/halden-ui
- No consistent pattern across the codebase

**Mitigation**:
- Add path alias for public/halden-ui
- Standardize on alias paths for all internal imports
- Use relative paths only for local imports

**Migration Complexity**: LOW

---

## Risk Summary

### Risk Count by Severity

- **Critical**: 1
- **High**: 2
- **Medium**: 3
- **Low**: 4

### Risk Categories

- **Duplicate Ownership**: 2 risks (Critical, High)
- **Structural Risk**: 1 risk (High)
- **Maintenance Risk**: 1 risk (Medium)
- **Architectural Risk**: 2 risks (Medium)
- **Unused Code Risk**: 3 risks (Low)
- **Placeholder Risk**: 1 risk (Low)
- **Code Quality Risk**: 1 risk (Low)

### Risk Matrix

| Risk | Severity | Impact | Likelihood | Risk Score | Priority |
|------|----------|--------|------------|------------|----------|
| Duplicate cn() utility | Critical | High | High | 9 | 1 |
| Duplicate components | High | High | High | 9 | 2 |
| Halden UI in public/ | High | Medium | Medium | 6 | 3 |
| Dead code accumulation | Medium | Medium | High | 6 | 4 |
| Weak boundary enforcement | Medium | Medium | Medium | 4 | 5 |
| Ambiguous subsystem ownership | Medium | Medium | Medium | 4 | 6 |
| Unused Halden UI components | Low | Low | Low | 1 | 7 |
| Hook chain uncertainty | Low | Low | Low | 1 | 8 |
| No-Op ViewportProvider | Low | Low | Low | 1 | 9 |
| Mixed import paths | Low | Low | Low | 1 | 10 |

### Mitigation Priority

### Immediate (Critical)
1. **Duplicate cn() utility** - Consolidate to single location

### High Priority (High Severity)
2. **Duplicate components** - Migrate to Halden UI versions
3. **Halden UI in public/** - Move to dedicated location

### Medium Priority (Medium Severity)
4. **Dead code accumulation** - Delete dead files
5. **Weak boundary enforcement** - Implement ESLint rules
6. **Ambiguous subsystem ownership** - Establish clear ownership

### Low Priority (Low Severity)
7. **Unused Halden UI components** - Document or remove
8. **Hook chain uncertainty** - Determine need or delete
9. **No-Op ViewportProvider** - Delete or implement
10. **Mixed import paths** - Standardize on alias paths

### Risk Interdependencies

**Dependency Chain**:
- Risk 1 (cn utility) → Risk 6 (ambiguous ownership)
- Risk 2 (duplicate components) → Risk 6 (ambiguous ownership)
- Risk 3 (Halden UI location) → Risk 10 (import paths)
- Risk 4 (dead code) → Risk 8 (hook chain)

**Recommended Mitigation Order**:
1. Resolve Risk 1 (cn utility) - foundational, affects many components
2. Resolve Risk 2 (duplicate components) - clears ambiguity
3. Resolve Risk 4 (dead code) - reduces maintenance burden
4. Resolve Risk 3 (Halden UI location) - structural improvement
5. Resolve Risk 6 (ambiguous ownership) - depends on 1, 2
6. Resolve Risk 5 (boundary enforcement) - long-term improvement
7. Resolve remaining low-priority risks

### Overall Risk Assessment

**Current Risk Level**: MEDIUM

**Rationale**:
- Critical risk is isolated and easily fixable
- High risks are structural but have clear mitigation paths
- Medium risks are manageable with proper processes
- Low risks are minor and can be addressed incrementally

**Risk Trend**: STABLE (not degrading)

**Confidence Level**: HIGH (evidence-backed analysis)

### Recommendations

### Short-term (1-2 weeks)
1. Consolidate cn() utility
2. Delete definitely dead files
3. Migrate Eyebrow and Heading to Halden UI

### Medium-term (1-2 months)
4. Migrate remaining duplicate components
5. Move Halden UI to dedicated location
6. Implement ESLint boundary rules

### Long-term (3-6 months)
7. Resolve all ambiguous ownership
8. Clean up unused Halden UI components
9. Standardize import patterns
10. Establish ongoing boundary enforcement

### Success Metrics
- Zero duplicate implementations
- Zero dead code
- Clear ownership for all subsystems
- Automated boundary enforcement
- Consistent import patterns
