# Duplicate Analysis

## Duplicate 1: cn() Utility Function

### Original Implementation
**Location**: `src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Duplicate Implementation
**Location**: `public/halden-ui/lib/cn.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes deterministically. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### Runtime Implementation
**Both are actively used**:
- `src/lib/utils.ts` - Used by all site components (15+ imports)
- `public/halden-ui/lib/cn.ts` - Used by all public Halden UI components (20+ imports)

### Differences
- **Implementation**: Identical
- **Documentation**: Public version has a JSDoc comment
- **Return Type**: Public version explicitly types return as `string`

### Risk Level
**MEDIUM** - Low functional risk, but maintenance burden

### Migration Complexity
**LOW** - Identical implementations, can consolidate to single location

### Recommendation
Consolidate to `public/halden-ui/lib/cn.ts` and have `src/lib/utils.ts` re-export it, or vice versa. The public location is more appropriate as the canonical source.

---

## Duplicate 2: Eyebrow Component

### Original Implementation
**Location**: `src/components/site/primitives/Eyebrow.tsx`

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  index?: number | string;
  as?: React.ElementType;
}

export function Eyebrow({
  index,
  as: Tag = "span",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <Tag
      className={cn("hd-eyebrow inline-flex items-center gap-2", className)}
      {...props}
    >
      {index !== undefined && (
        <span className="opacity-60">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      <span className="h-px w-4 bg-current opacity-40" />
      {children}
    </Tag>
  );
}
```

### Duplicate Implementation
**Location**: `public/halden-ui/components/typography/Eyebrow.tsx`

```typescript
import * as React from "react";
import { cn } from "../../lib/cn";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  index?: number | string;
  as?: React.ElementType;
}

export const Eyebrow = React.forwardRef<HTMLSpanElement, EyebrowProps>(
  ({ index, as: Tag = "span", className, children, ...props }, ref) => (
    <Tag ref={ref} className={cn("hd-eyebrow inline-flex items-center gap-2", className)} {...props}>
      {index !== undefined && (
        <span className="opacity-60">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      <span className="h-px w-4 bg-current opacity-40" />
      {children}
    </Tag>
  )
);
Eyebrow.displayName = "Eyebrow";
```

### Runtime Implementation
**Site version is used**:
- `src/components/site/primitives/Eyebrow.tsx` - Used by homepage and PageHeader (2 imports)
- `public/halden-ui/components/typography/Eyebrow.tsx` - Not imported by application

### Differences
- **forwardRef**: Public version uses forwardRef, site version does not
- **displayName**: Public version has displayName
- **Implementation**: Otherwise identical

### Risk Level
**LOW** - Only site version is used at runtime

### Migration Complexity
**LOW** - Public version is a superset (adds forwardRef)

### Recommendation
Migrate to public Halden UI version. The forwardRef pattern is better practice and the implementation is otherwise identical.

---

## Duplicate 3: Heading Component

### Original Implementation
**Location**: `src/components/site/primitives/Heading.tsx`

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: Level;
  gradient?: boolean;
  as?: React.ElementType;
};

export function Heading({
  level = 2,
  as,
  gradient,
  className,
  ...props
}: Props) {
  const Tag = (as ?? (`h${level}` as React.ElementType)) as React.ElementType;

  const styles: Record<Level, string> = {
    1: "hd-h1",
    2: "hd-h2",
    3: "hd-h3",
    4: "hd-h4",
    5: "hd-h5",
    6: "hd-h6",
  };

  return (
    <Tag
      className={cn(styles[level], gradient && "hd-text-gradient", className)}
      {...props}
    />
  );
}
```

### Duplicate Implementation
**Location**: `public/halden-ui/components/typography/Heading.tsx`

```typescript
import * as React from "react";
import { cn } from "../../lib/cn";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  as?: React.ElementType;
  gradient?: boolean;
}

const styles: Record<Level, string> = {
  1: "hd-h1", 2: "hd-h2", 3: "hd-h3",
  4: "hd-h4", 5: "hd-h5", 6: "hd-h6",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, as, gradient, className, ...props }, ref) => {
    const Tag = (as ?? (`h${level}` as React.ElementType)) as React.ElementType;
    return (
      <Tag
        ref={ref}
        className={cn(styles[level], gradient && "hd-text-gradient", className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";
```

### Runtime Implementation
**Site version is used**:
- `src/components/site/primitives/Heading.tsx` - Used by homepage and PageHeader (2 imports)
- `public/halden-ui/components/typography/Heading.tsx` - Not imported by application

### Differences
- **Type Export**: Public version exports HeadingProps interface
- **forwardRef**: Public version uses forwardRef, site version does not
- **displayName**: Public version has displayName
- **Implementation**: Otherwise identical

### Risk Level
**LOW** - Only site version is used at runtime

### Migration Complexity
**LOW** - Public version is a superset (adds forwardRef, better types)

### Recommendation
Migrate to public Halden UI version. The forwardRef pattern is better practice and the TypeScript types are more complete.

---

## Duplicate 4: Container Component

### Original Implementation
**Location**: `src/components/site/Container.tsx`

```typescript
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Width = "sm" | "md" | "lg" | "xl" | "full";

const widths: Record<Width, string> = {
  sm: "max-w-[720px]",
  md: "max-w-[960px]",
  lg: "max-w-[1200px]",
  xl: "max-w-[1400px]",
  full: "max-w-none",
};

export function Container({ className, width = "xl", ...props }: HTMLAttributes<HTMLDivElement> & { width?: Width }) {
  return (
    <div
      className={cn("mx-auto w-full px-6 sm:px-10", widths[width], className)}
      {...props}
    />
  );
}
```

### Duplicate Implementation
**Location**: `public/halden-ui/components/layout/Container.tsx`

```typescript
import * as React from "react";
import { cn } from "../../lib/cn";

type Width = "sm" | "md" | "lg" | "xl" | "full";
const widths: Record<Width, string> = {
  sm: "max-w-[720px]",
  md: "max-w-[960px]",
  lg: "max-w-[1200px]",
  xl: "max-w-[1400px]",
  full: "max-w-none",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: Width;
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ width = "xl", as: Tag = "div", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn("mx-auto w-full px-6 sm:px-10", widths[width], className)}
      {...props}
    />
  )
);
Container.displayName = "Container";
```

### Runtime Implementation
**Site version is used**:
- `src/components/site/Container.tsx` - Used by all pages and PageHeader (8 imports)
- `public/halden-ui/components/layout/Container.tsx` - Not imported by application

### Differences
- **forwardRef**: Public version uses forwardRef, site version does not
- **as prop**: Public version supports `as` prop for polymorphic components
- **Type Export**: Public version exports ContainerProps interface
- **displayName**: Public version has displayName
- **Implementation**: Otherwise identical

### Risk Level
**LOW** - Only site version is used at runtime

### Migration Complexity
**LOW** - Public version is a superset (adds forwardRef, as prop)

### Recommendation
Migrate to public Halden UI version. The forwardRef and as prop patterns are better practice.

---

## Duplicate 5: Surface Component

### Original Implementation
**Location**: `src/components/site/primitives/Surface.tsx`

```typescript
import { cn } from "@/lib/utils";
import * as React from "react";

export type SurfaceProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: "glass" | "soft" | "flat" | "nav";
  glow?: boolean;
};

export function Surface({
  variant = "glass",
  glow = false,
  className,
  ...props
}: SurfaceProps) {
  const variantClass =
    variant === "soft"
      ? "hd-glass hd-glass--soft"
      : variant === "flat"
        ? "hd-glass hd-glass--flat"
        : variant === "nav"
          ? "hd-glass hd-glass--nav"
          : "hd-glass";

  const Tag: any = "div";

  return (
    <Tag
      className={cn(variantClass, glow && "hd-glow-border", className)}
      {...props}
    />
  );
}
```

### Duplicate Implementation
**Location**: `public/halden-ui/components/ui/Surface.tsx`

```typescript
import * as React from "react";
import { cn } from "../../lib/cn";

type Variant = "glass" | "soft" | "flat" | "nav";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  glow?: boolean;
  as?: React.ElementType;
}

/** Base surface primitive. All matte-glass components compose from this. */
export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ variant = "glass", glow = false, as: Tag = "div", className, ...props }, ref) => {
    const variantClass =
      variant === "soft" ? "hd-glass hd-glass--soft"
      : variant === "flat" ? "hd-glass hd-glass--flat"
      : variant === "nav"  ? "hd-glass hd-glass--nav"
      : "hd-glass";
    return (
      <Tag
        ref={ref}
        className={cn(variantClass, glow && "hd-glow-border", className)}
        {...props}
      />
    );
  }
);
Surface.displayName = "Surface";
```

### Runtime Implementation
**Site version is used**:
- `src/components/site/primitives/Surface.tsx` - Used by Panel (1 import)
- `public/halden-ui/components/ui/Surface.tsx` - Not imported by application

### Differences
- **forwardRef**: Public version uses forwardRef, site version does not
- **as prop**: Public version supports `as` prop, site version uses `any` type
- **Type Safety**: Public version has better TypeScript types
- **Documentation**: Public version has JSDoc comment
- **Implementation**: Otherwise identical

### Risk Level
**LOW** - Only site version is used at runtime

### Migration Complexity
**LOW** - Public version is a superset (adds forwardRef, as prop, better types)

### Recommendation
Migrate to public Halden UI version. The forwardRef and as prop patterns are better practice, and the TypeScript types are safer.

---

## Duplicate 6: Divider Component

### Original Implementation
**Location**: `src/components/site/primitives/Divider.tsx`

```typescript
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        "bg-[var(--color-hairline)]",
        className
      )}
      {...props}
    />
  );
}
```

### Duplicate Implementation
**Location**: `public/halden-ui/components/ui/Divider.tsx`

```typescript
import * as React from "react";
import { cn } from "../../lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: React.ReactNode;
}

export function Divider({ orientation = "horizontal", label, className, ...props }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("h-full w-px bg-[var(--color-hairline)]", className)}
        {...props}
      />
    );
  }
  if (label) {
    return (
      <div
        role="separator"
        className={cn("flex w-full items-center gap-3", className)}
        {...props}
      >
        <div className="h-px flex-1 bg-[var(--color-hairline)]" />
        <span className="hd-label-mono">{label}</span>
        <div className="h-px flex-1 bg-[var(--color-hairline)]" />
      </div>
    );
  }
  return (
    <div
      role="separator"
      className={cn("h-px w-full bg-[var(--color-hairline)]", className)}
      {...props}
    />
  );
}
```

### Runtime Implementation
**Site version is used**:
- `src/components/site/primitives/Divider.tsx` - Used by homepage and about page (2 imports)
- `public/halden-ui/components/ui/Divider.tsx` - Not imported by application

### Differences
- **label prop**: Public version supports labeled dividers
- **ARIA attributes**: Public version adds role="separator" and aria-orientation
- **Implementation**: Site version is a subset of public version

### Risk Level
**LOW** - Only site version is used at runtime

### Migration Complexity
**LOW** - Public version is a superset (adds label support, ARIA attributes)

### Recommendation
Migrate to public Halden UI version. The ARIA attributes and label support are better for accessibility.

---

## Duplicate 7: MobileDrawer Component

### Original Implementation
**Location**: `src/components/halden-ui/navigation/MobileDrawer.tsx`

```typescript
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MobileDrawerItem {
  label: string;
  href: string;
}

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items: MobileDrawerItem[];
  footer?: React.ReactNode;
  className?: string;
}

export function MobileDrawer({ open, onClose, items, footer, className }: MobileDrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className={cn("fixed inset-0 z-[60] md:hidden", className)}>
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-background)_70%,transparent)] backdrop-blur-[6px] hd-animate-fade-in"
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-[100dvh] w-[86%] max-w-[380px] left-auto",
          "transform translate-x-0",
          "hd-glass hd-glass--nav flex flex-col p-6",
          "hd-animate-drawer-in-right rounded-l-[var(--radius-lg)] rounded-r-none"
        )}
      >
        <nav className="mt-10 flex flex-col gap-1">
          {items.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="hd-focus-ring flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-3 text-[15px] hd-transition hover:bg-[var(--color-surface-2)]/60"
            >
              <span className="flex items-center gap-3">
                {item.label}
                <span className="hd-font-mono text-[10px] opacity-50">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span aria-hidden className="text-[var(--color-muted-foreground)]">
                ←
              </span>
            </a>
          ))}
        </nav>
        {footer && <div className="mt-auto pt-6">{footer}</div>}
      </aside>
    </div>
  );
}
```

### Duplicate Implementation
**Location**: `public/halden-ui/components/navigation/MobileDrawer.tsx`

```typescript
"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface MobileDrawerItem {
  label: string;
  href: string;
}

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items: MobileDrawerItem[];
  footer?: React.ReactNode;
  className?: string;
}

export function MobileDrawer({ open, onClose, items, footer, className }: MobileDrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn("fixed inset-0 z-[60] md:hidden", className)}
    >
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-background)_70%,transparent)] backdrop-blur-[6px] hd-animate-fade-in"
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-[100dvh] w-[86%] max-w-[380px]",
          "hd-glass hd-glass--nav flex flex-col p-6",
          "hd-animate-drawer-in rounded-l-[var(--radius-lg)] rounded-r-none"
        )}

      >
        <nav className="mt-10 flex flex-col gap-1">
          {items.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="hd-focus-ring flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-3 text-[15px] hd-transition hover:bg-[var(--color-surface-2)]/60"
            >
              <span className="flex items-center gap-3">
                <span className="hd-font-mono text-[10px] opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </span>
              <span aria-hidden className="text-[var(--color-muted-foreground)]">→</span>
            </a>
          ))}
        </nav>
        {footer && <div className="mt-auto pt-6">{footer}</div>}
      </aside>
    </div>
  );
}
```

### Runtime Implementation
**Public version is used**:
- `src/components/halden-ui/navigation/MobileDrawer.tsx` - Not imported (0 imports)
- `public/halden-ui/components/navigation/MobileDrawer.tsx` - Used by SiteNavigation (1 import)

### Differences
- **Icon direction**: Site version uses ← (left arrow), public version uses → (right arrow)
- **Label position**: Site version puts label before index, public version puts index before label
- **CSS class**: Site version has `left-auto` and `transform translate-x-0`, public version does not
- **Implementation**: Nearly identical, minor visual differences

### Risk Level
**NONE** - Only public version is used at runtime, src version is dead

### Migration Complexity
**NONE** - Delete src version

### Recommendation
Delete `src/components/halden-ui/navigation/MobileDrawer.tsx` - it is not used and the public version is the runtime implementation.

---

## Duplicate 8: SiteNavigation Component

### Original Implementation
**Location**: `src/components/halden-ui/navigation/SiteNavigation.tsx`

### Duplicate Implementation
**Location**: `public/halden-ui/components/navigation/SiteNavigation.tsx`

### Runtime Implementation
**Src version is used**:
- `src/components/halden-ui/navigation/SiteNavigation.tsx` - Used by SiteHeader (1 import)
- `public/halden-ui/components/navigation/SiteNavigation.tsx` - Not imported by application

### Differences
- **Logo integration**: Src version imports and uses site-specific Logo component
- **usePathname**: Src version uses Next.js usePathname hook for active state detection
- **API**: Src version has different props (logoLabel vs wordmark)
- **Implementation**: Src version is an adapter that wraps public Halden UI components

### Risk Level
**NONE** - This is intentional adapter pattern, not a duplicate

### Migration Complexity
**N/A** - Adapter pattern is appropriate

### Recommendation
Keep src version as an adapter. This is the correct pattern for integrating site-specific elements with Halden UI components.

---

## Duplicate 9: Panel vs GlassPanel

### Original Implementation
**Location**: `src/components/site/primitives/Panel.tsx`

```typescript
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Surface } from "./Surface";

export function Panel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <Surface
      variant="glass"
      className={cn("p-8 md:p-10", className)}
      {...props}
    >
      {children}
    </Surface>
  );
}
```

### Duplicate Implementation
**Location**: `public/halden-ui/components/layout/GlassPanel.tsx`

```typescript
import * as React from "react";
import { cn } from "../../lib/cn";
import { Surface, type SurfaceProps } from "../ui/Surface";

export interface GlassPanelProps extends SurfaceProps {
  padding?: "none" | "sm" | "md" | "lg";
  grid?: boolean;
}

const pads = { none: "", sm: "p-5", md: "p-7", lg: "p-10" };

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ padding = "md", grid, className, children, ...props }, ref) => (
    <Surface
      ref={ref}
      className={cn("overflow-hidden", grid && "hd-grid-bg", pads[padding], className)}
      {...props}
    >
      {children}
    </Surface>
  )
);
GlassPanel.displayName = "GlassPanel";
```

### Runtime Implementation
**Site version (Panel) is used**:
- `src/components/site/primitives/Panel.tsx` - Used by all pages (6 imports)
- `public/halden-ui/components/layout/GlassPanel.tsx` - Not imported by application

### Differences
- **Padding options**: Public version has configurable padding (none/sm/md/lg), site version has fixed padding (p-8 md:p-10)
- **Grid support**: Public version supports grid background, site version does not
- **forwardRef**: Public version uses forwardRef, site version does not
- **API**: Different prop names and options
- **Implementation**: Public version is more feature-complete

### Risk Level
**LOW** - Only site version is used at runtime

### Migration Complexity
**MEDIUM** - Different APIs, would require prop mapping

### Recommendation
Migrate to public Halden UI version if the additional features (configurable padding, grid support) are desired. Otherwise keep site version if the simpler API is preferred.

---

## Duplicate 10: CTAButton vs Button

### Original Implementation
**Location**: `src/components/site/CTAButton.tsx`

### Duplicate Implementation
**Location**: `public/halden-ui/components/ui/Button.tsx`

### Runtime Implementation
**Site version (CTAButton) is used**:
- `src/components/site/CTAButton.tsx` - Used by all pages except homepage (5 imports)
- `public/halden-ui/components/ui/Button.tsx` - Not imported by application

### Differences
- **API**: CTAButton uses `to`/`href` props, Button uses standard button props with `asChild` pattern
- **Icons**: CTAButton has built-in icon support (up-right, right, none), Button does not
- **Variants**: Different variant names and implementations
- **Link integration**: CTAButton integrates with Next.js Link, Button is a pure button component
- **Implementation**: Fundamentally different components for different use cases

### Risk Level
**NONE** - These are different components for different purposes

### Migration Complexity
**N/A** - Not duplicates, different components

### Recommendation
Keep both. CTAButton is a link/button hybrid for navigation, Button is a pure action button. They serve different purposes.

---

## Summary

### Total Duplicates: 10

### True Duplicates (Identical or Near-Identical): 7
1. cn() utility function
2. Eyebrow component
3. Heading component
4. Container component
5. Surface component
6. Divider component
7. MobileDrawer component

### Functional Variants (Different APIs): 2
8. Panel vs GlassPanel (different features)
9. CTAButton vs Button (different purposes)

### Adapter Pattern (Intentional): 1
10. SiteNavigation (src version adapts public version)

### Risk Assessment

**Critical Risk**: None
**High Risk**: None
**Medium Risk**: 1 (cn() utility - maintenance burden)
**Low Risk**: 6 (component duplicates - only one version used at runtime)
**No Risk**: 3 (adapter pattern, functional variants)

### Migration Priority

**High Priority** (Easy wins, clear benefit):
1. Delete src MobileDrawer (dead code)
2. Consolidate cn() utility
3. Migrate Eyebrow to Halden UI
4. Migrate Heading to Halden UI
5. Migrate Container to Halden UI
6. Migrate Surface to Halden UI
7. Migrate Divider to Halden UI

**Medium Priority** (Requires API changes):
8. Evaluate Panel vs GlassPanel migration

**Low Priority** (Intentional differences):
9. Keep CTAButton vs Button separation
10. Keep SiteNavigation adapter pattern

### Migration Complexity Summary

- **LOW**: 7 duplicates (simple replacements)
- **MEDIUM**: 1 duplicate (API mapping required)
- **NONE**: 2 cases (intentional patterns)
