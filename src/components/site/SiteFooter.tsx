import * as React from "react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-6 bg-background/50 backdrop-blur-[6px]">
      <div className="container-rl">
        <div className="text-xs text-muted-foreground">
          © {year} Sudo Hades. All rights reserved.
        </div>
      </div>
    </footer>
  );
}



