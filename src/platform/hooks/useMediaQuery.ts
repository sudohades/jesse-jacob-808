"use client";

import { useEffect, useMemo, useState } from "react";

export type UseMediaQueryOptions = {
  /** Value used during SSR / first client render to avoid hydration mismatch. */
  initialMatches?: boolean;
};

function getSafeWindow() {
  return typeof window !== "undefined" ? window : null;
}

export function useMediaQuery(query: string, options?: UseMediaQueryOptions) {
  const initialMatches = options?.initialMatches ?? false;

  const mql = useMemo(() => {
    const w = getSafeWindow();
    if (!w) return null;
    return w.matchMedia(query);
  }, [query]);

  const [matches, setMatches] = useState<boolean>(initialMatches);

  useEffect(() => {
    const w = getSafeWindow();
    if (!w || !mql) return;

    // Set the correct value after mount to avoid hydration mismatch.
    setMatches(mql.matches);

    // Prefer addEventListener where available.
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    }

    mql.addListener(listener);
    return () => mql.removeListener(listener);

  }, [mql]);

  return matches;
}

