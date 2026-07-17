"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/platform/lib/utils";

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
            item.href.startsWith("/") ? (
            <Link
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
                →
              </span>
            </Link>
            ) : (
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
                <span aria-hidden className="text-[var(--color-muted-foreground)]">→</span>
              </a>
            )
          ))}
        </nav>
        {footer && <div className="mt-auto pt-6">{footer}</div>}
      </aside>
    </div>
  );
}
