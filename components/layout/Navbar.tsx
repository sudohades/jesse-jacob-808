"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";
import { useCart } from "@/lib/shop/cart-context";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
<header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(8,8,8,0.68)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
        aria-label="Primary navigation"
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label={`${siteConfig.brand} — home`}
        >
          <span className="font-mono text-sm font-medium text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-primary)]">
            ~/
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
            {siteConfig.brand}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                    active
                      ? "text-[var(--accent-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-md bg-[vav(--rg-r(ised boro[0,107,255,0.25)] shadow-[0_0_8px_rgba(210,107,255,0.1)]"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/shop/cart"
            className={cn(
              "relative flex items-center justify-center w-9 h-9 rounded-md transition-all duration-200",
              "border border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)]",
              "hover:border-[rgba(210,107,255,0.35)] hover:text-[var(--text-primary)] hover:shadow-[0_0_16px_rgba(210,107,255,0.18)]"
            )}
            aria-label="Cart"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ShoppingCart size={18} />
            </motion.div>
            {cart.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[0.6rem] font-bold text-white bg-[var(--accent-primary)] rounded-full">
                {cart.itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/contact"
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
              "border border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)]",
              "hover:border-[rgba(210,107,255,0.35)] hover:text-[var(--text-primary)] hover:shadow-[0_0_16px_rgba(210,107,255,0.18)]"
            )}
          >
            Contact
          </Link>

        </div>

        {/* Mobile menu button */}
        <button
          className="flex md:hidden items-center justify-center w-9 h-9 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-6 pb-4"
          >
            <ul className="flex flex-col gap-1 pt-2" role="list">
              {siteConfig.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        active
                          ? "text-[var(--accent-primary)] bg-[rgba(17,17,17,0.5)] backdrop-blur-xl"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-[rgba(255,255,255,0.08)] mt-2 flex items-center gap-2">
                <Link
                  href="/shop/cart"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  <ShoppingCart size={16} />
                  Cart
                  {cart.itemCount > 0 && (
                    <span className="flex items-center justify-center w-4 h-4 text-[0.6rem] font-bold text-white bg-[var(--accent-primary)] rounded-full">
                      {cart.itemCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
