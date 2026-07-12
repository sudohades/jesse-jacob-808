"use client";

import { SiteNavigation } from "@/components/halden-ui/navigation/SiteNavigation";
import type { MobileDrawerItem } from "@/components/halden-ui/navigation/MobileDrawer";


const items: MobileDrawerItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  return (
    <SiteNavigation
      items={items}
      activeHref={undefined}
      logoLabel="Sudo Hades"
      sticky
    />
  );
}

