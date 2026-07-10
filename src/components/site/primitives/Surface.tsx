import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "panel" | "subtle";
};

/**
 * Surface: disciplined background material. Prefer borders/spacing over glow.
 */
export function Surface({
  variant = "panel",
  className,
  ...props
}: Props) {
  const base = "rounded-[var(--radius-lg)] border border-border";
  const variants: Record<string, string> = {
    panel: "bg-secondary/20",
    subtle: "bg-secondary/10",
    default: "bg-background",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}

