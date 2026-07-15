import * as React from "react";
import { cn } from "@/platform/lib/cn";

export interface GlowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: string;
  intensity?: "low" | "medium" | "high";
}

/** Ambient amethyst→lake gradient border. Wrap any surface. */
export const GlowBorder = React.forwardRef<HTMLDivElement, GlowBorderProps>(
  ({ radius = "var(--radius-lg)", intensity = "medium", className, children, style, ...props }, ref) => {
    const opacity = intensity === "low" ? 0.35 : intensity === "high" ? 0.85 : 0.6;
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ borderRadius: radius, ...style }}
        {...props}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px"
          style={{
            borderRadius: `calc(${radius} + 1px)`,
            padding: 1,
            background:
              "linear-gradient(135deg, rgba(190,28,227,.45), transparent 40%, rgba(8,179,247,.35))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor" as unknown as string,
            maskComposite: "exclude",
            opacity,
          }}
        />
        {children}
      </div>
    );
  }
);
GlowBorder.displayName = "GlowBorder";
