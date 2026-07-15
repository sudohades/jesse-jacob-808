import * as React from "react";
import { cn } from "@/platform/lib/cn";

export interface HeroBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  grid?: boolean;
  ambient?: boolean;
}

/** Cinematic hero background. Compose with HeroOverlay for text legibility. */
export function HeroBackground({
  src,
  grid = true,
  ambient = true,
  className,
  style,
  ...props
}: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
      style={style}
      {...props}
    >
      {src && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${src})` }}
        />
      )}
      {grid && <div className="absolute inset-0 hd-grid-bg opacity-70" />}
      {ambient && (
        <>
          <div
            className="absolute -top-40 right-0 h-[560px] w-[560px] rounded-full hd-animate-ambient"
            style={{ background: "radial-gradient(closest-side, rgba(190,28,227,.22), transparent 70%)" }}
          />
          <div
            className="absolute -bottom-40 -left-20 h-[520px] w-[520px] rounded-full hd-animate-ambient"
            style={{ background: "radial-gradient(closest-side, rgba(8,179,247,.18), transparent 70%)" }}
          />
        </>
      )}
    </div>
  );
}
