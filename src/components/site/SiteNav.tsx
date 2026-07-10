import Link from "next/link";

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
      ? "w-full justify-center rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:border-border hover:bg-secondary hover:text-foreground"
      : "inline-flex items-center rounded-lg border border-transparent px-4 py-2 text-muted-foreground transition-all duration-200 hover:border-border hover:bg-secondary/50 hover:text-foreground";

  return (
    <nav aria-label="Primary">
      <ul className={listClassName}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClassName}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


