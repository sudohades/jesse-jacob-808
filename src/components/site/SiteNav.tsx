import Link from "next/link";

const navItems: Array<{ label: string; href: string }> = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function SiteNav() {
  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-1 text-xs md:gap-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex items-center rounded-md border border-border/40 bg-background/40 px-3 py-2 text-muted-foreground transition-colors hover:border-border/70 hover:bg-background hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

