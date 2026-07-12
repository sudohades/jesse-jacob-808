import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Navigation item primitive.
 * Migrated to Halden UI semantics so header + drawer share one visual language.
 */
export function NavigationItem({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-3 py-2 text-sm text-muted-foreground transition-colors",
        "rounded-[var(--radius-md)]",
        active
          ? "text-foreground"
          : "hover:text-foreground focus-visible:outline-none",
        active && "border-b border-[var(--color-hairline)]",
        className
      )}
    >
      {children}
    </Link>
  );
}


