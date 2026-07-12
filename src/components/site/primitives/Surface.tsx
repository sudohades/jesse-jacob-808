import { cn } from "@/lib/utils";
import * as React from "react";

/**
 * Foundation Surface primitive.
 * Migrated to the canonical Halden UI implementation (public/halden-ui/components/ui/Surface).
 */
export type SurfaceProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: "glass" | "soft" | "flat" | "nav";
  glow?: boolean;
};

export function Surface({
  variant = "glass",
  glow = false,
  className,
  ...props
}: SurfaceProps) {
  const variantClass =
    variant === "soft"
      ? "hd-glass hd-glass--soft"
      : variant === "flat"
        ? "hd-glass hd-glass--flat"
        : variant === "nav"
          ? "hd-glass hd-glass--nav"
          : "hd-glass";

  const Tag: any = "div";

  return (
    <Tag
      className={cn(variantClass, glow && "hd-glow-border", className)}
      {...props}
    />
  );
}


