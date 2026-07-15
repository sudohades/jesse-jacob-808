import * as React from "react";
import { cn } from "@/platform/lib/cn";
import { Surface, type SurfaceProps } from "../ui/Surface";

export interface GlassPanelProps extends SurfaceProps {
  padding?: "none" | "sm" | "md" | "lg";
  grid?: boolean;
}

const pads = { none: "", sm: "p-5", md: "p-7", lg: "p-10" };

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ padding = "md", grid, className, children, ...props }, ref) => (
    <Surface
      ref={ref}
      className={cn("overflow-hidden", grid && "hd-grid-bg", pads[padding], className)}
      {...props}
    >
      {children}
    </Surface>
  )
);
GlassPanel.displayName = "GlassPanel";
