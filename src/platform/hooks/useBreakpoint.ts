"use client";

import { useMemo } from "react";
import { useMediaQuery } from "./useMediaQuery";

export type Breakpoint = "sm" | "md" | "lg" | "xl";

const minWidths: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export type UseBreakpointOptions = {
  /** SSR-safe default. Use true only if you prefer the first paint to assume desktop. */
  initialMatches?: boolean;
};

/**
 * True when viewport is >= breakpoint (min-width).
 */
export function useBreakpoint(breakpoint: Breakpoint, options?: UseBreakpointOptions) {
  const query = useMemo(() => `(min-width: ${minWidths[breakpoint]}px)`, [breakpoint]);
  return useMediaQuery(query, options);
}

