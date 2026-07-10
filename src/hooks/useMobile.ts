"use client";

import { useBreakpoint } from "./useBreakpoint";

export type UseMobileOptions = {
  /** SSR-safe default. */
  initialMatches?: boolean;
};

/**
 * True when viewport is below the `md` breakpoint.
 */
export function useMobile(options?: UseMobileOptions) {
  // mobile = !(min-width: 768px)
  const isMdUp = useBreakpoint("md", options);
  return !isMdUp;
}

