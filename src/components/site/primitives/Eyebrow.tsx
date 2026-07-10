import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement>;

export function Eyebrow({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

