"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface NavigationItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  index?: number | string;
  active?: boolean;
  label: string;
}

export const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ index, active, label, className, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn(
        "hd-focus-ring group relative rounded-[var(--radius-sm)] px-3 py-2 text-[13px]",
        "hd-transition hover:text-[var(--color-foreground)]",
        active ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]",
        className
      )}
      {...props}
    >
      {index !== undefined && (
        <span className="hd-font-mono mr-1.5 text-[10px] opacity-50">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      {label}
      {active && (
        <span className="pointer-events-none absolute inset-x-3 -bottom-px h-px bg-[var(--color-highlight)]" />
      )}
    </a>
  )
);
NavigationItem.displayName = "NavigationItem";
