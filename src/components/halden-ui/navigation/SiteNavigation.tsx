"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo as SiteWordmarkLogo } from "@/components/site/Logo";


import { NavigationItem } from "../../../../public/halden-ui/components/navigation/NavigationItem";
import { HamburgerButton } from "../../../../public/halden-ui/components/navigation/HamburgerButton";
import { MobileDrawer, type MobileDrawerItem } from "../../../../public/halden-ui/components/navigation/MobileDrawer";

export interface SiteNavigationProps {
  items: MobileDrawerItem[];
  activeHref?: string;
  wordmark?: string;
  logoLabel?: string;
  cta?: { label: string; href: string };
  status?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export function SiteNavigation({
  items,
  activeHref,
  wordmark,
  logoLabel,
  cta,
  status,
  className,
  sticky = true,
}: SiteNavigationProps) {
  const pathname = usePathname();
  const resolvedActiveHref = activeHref ?? pathname;

  const [open, setOpen] = React.useState(false);

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (!sticky) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sticky]);

  return (
    <header
      className={cn(
        sticky && "fixed inset-x-0 top-0 z-50",
        "hd-transition",
        sticky && (scrolled ? "px-3 pt-3 sm:px-6 sm:pt-4" : "px-0 pt-0"),
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1400px] items-center gap-4 hd-transition",
          scrolled
            ? "hd-glass hd-glass--nav h-14 px-4 sm:px-5"
            : "h-16 border-b border-[var(--color-hairline)] px-6 sm:px-10"
        )}
      >
        <a href="/" aria-label="Home" className="shrink-0">
          <SiteWordmarkLogo />
        </a>


        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {items.map((item, i) => (
            <NavigationItem
              key={item.href}
              href={item.href}
              index={i + 1}
              label={item.label}
              active={resolvedActiveHref ? resolvedActiveHref === item.href : i === 0}
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-3" aria-label="Header actions">
          {status}
          {cta && (
            <a
              href={cta.href}
              className="hd-focus-ring hidden items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-hairline)] bg-[var(--color-surface-2)]/60 px-3 py-1.5 text-[12px] text-[var(--color-foreground)] hd-transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)] sm:inline-flex"
            >
              {cta.label} <span aria-hidden>→</span>
            </a>
          )}
          <HamburgerButton open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </div>

      <MobileDrawer open={open} onClose={() => setOpen(false)} items={items} />
    </header>
  );
}

