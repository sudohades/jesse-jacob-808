"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/platform/lib/cn";

export interface NavigationItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  index?: number | string;
  active?: boolean;
  label: string;
}

export const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ index, active, label, className, href = "#", ...props }, ref) => {
    const content = <>
      {index !== undefined && (
        <span className="hd-font-mono mr-1.5 text-[10px] opacity-50">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      {label}
      {active && (
        <span className="pointer-events-none absolute inset-x-3 -bottom-px h-px bg-[var(--color-highlight)]" />
      )}
    </>;
    const ariaCurrent: React.AriaAttributes["aria-current"] = active ? "page" : undefined;
    const sharedProps = {
      ref,
      "aria-current": ariaCurrent,
      className: cn(
        "hd-focus-ring group relative rounded-[var(--radius-sm)] px-3 py-2 text-[13px]",
        "hd-transition hover:text-[var(--color-foreground)]",
        active ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]",
        className
      ),
      ...props,
    };
    return href.startsWith("/") ? <Link href={href} {...sharedProps}>{content}</Link> : <a href={href} {...sharedProps}>{content}</a>;
  }
);
NavigationItem.displayName = "NavigationItem";
