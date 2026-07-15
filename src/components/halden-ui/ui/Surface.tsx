import * as React from "react";
import { cn } from "@/platform/lib/cn";

type Variant = "glass" | "soft" | "flat" | "nav";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  glow?: boolean;
  as?: React.ElementType;
}

/** Base surface primitive. All matte-glass components compose from this. */
export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ variant = "glass", glow = false, as: Tag = "div", className, ...props }, ref) => {
    const variantClass =
      variant === "soft" ? "hd-glass hd-glass--soft"
      : variant === "flat" ? "hd-glass hd-glass--flat"
      : variant === "nav"  ? "hd-glass hd-glass--nav"
      : "hd-glass";
    return (
      <Tag
        ref={ref}
        className={cn(variantClass, glow && "hd-glow-border", className)}
        {...props}
      />
    );
  }
);
Surface.displayName = "Surface";
