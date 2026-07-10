import Link from "next/link";
import { NavigationItem } from "./primitives/NavigationItem";


const navItems: Array<{ label: string; href: string }> = [

  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function SiteNav({
  variant = "horizontal",
}: {
  variant?: "horizontal" | "vertical";
}) {
  const listClassName =
    variant === "vertical"
      ? "flex flex-col gap-3"
      : "flex items-center gap-1 text-xs md:gap-2";

  const linkClassName =
    variant === "vertical"
      ? "w-full justify-center px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-0"
      : "inline-flex items-center px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-0";


  return (
    <nav aria-label="Primary">
      <ul className={listClassName}>
        {navItems.map((item) => (
          <li key={item.href}>
            <NavigationItem href={item.href} className={linkClassName}>
              {item.label}
            </NavigationItem>
          </li>
        ))}

      </ul>
    </nav>
  );
}


