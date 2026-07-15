"use client";

import { SiteNavigation } from "@/components/halden-ui/navigation/SiteNavigation";
import type { MobileDrawerItem } from "@/components/halden-ui/navigation/MobileDrawer";
import { navigation, brand } from "@/config";

const items: MobileDrawerItem[] = navigation.main;

export function SiteHeader() {
  return (
    <SiteNavigation
      items={items}
      activeHref={undefined}
      logoLabel={brand.name}
      sticky
    />
  );
}

