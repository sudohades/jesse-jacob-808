import * as React from "react";
import { cn } from "../../lib/cn";

export interface HeroOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "low" | "medium" | "high";
}

export function HeroOverlay({ intensity = "medium", className, style, ...props }: HeroOverlayProps) {
  const alpha = intensity === "low" ? 0.35 : intensity === "high" ? 0.8 : 0.6;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-[5]", className)}
      style={{
        background:
          `linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-background) ${alpha * 100}%, transparent) 60%, var(--color-background) 100%)`,
        ...style,
      }}
      {...props}
    />
  );
}
