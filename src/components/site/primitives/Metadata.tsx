import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Metadata({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

