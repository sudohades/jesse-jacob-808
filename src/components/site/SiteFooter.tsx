import * as React from "react";
import { brand } from "@/config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-6 bg-background/50 backdrop-blur-[6px]">
      <div className="container-rl">
        <div className="text-xs text-muted-foreground">
          © {year} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}



