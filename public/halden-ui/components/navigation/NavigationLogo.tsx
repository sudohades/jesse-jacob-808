"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface NavigationLogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  wordmark?: string;
  label?: string;
}

export function NavigationLogo({
  href = "/",
  wordmark = "HALDEN",
  label,
  className,
  ...props
}: NavigationLogoProps) {
  return (
    <a
      href={href}
      className={cn(
        "hd-focus-ring flex items-center gap-2.5 rounded-[var(--radius-sm)]",
        className
      )}
      {...props}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="1.5" y="1.5" width="21" height="21" rx="3"
              stroke="currentColor" opacity="0.4" />
        <path d="M6 6h6a4 4 0 0 1 0 8H6V6Zm0 8v4M14 12l4 6"
              stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="6" r="1.2" fill="var(--color-highlight)" />
      </svg>
      <span className="hd-font-display text-[15px] tracking-wide">{wordmark}</span>
      {label && (
        <span className="hd-label-mono hidden sm:inline">/ {label}</span>
      )}
    </a>
  );
}
