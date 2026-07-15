import type { HTMLAttributes } from "react";
import { cn } from "@/platform/lib/utils";

export function Metadata({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "hd-font-mono text-[11px] tracking-[.14em] uppercase text-[var(--color-muted-foreground)]",
        className
      )}
      {...props}
    />
  );
}


