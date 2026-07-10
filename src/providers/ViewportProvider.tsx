"use client";

import type { ReactNode } from "react";

// Placeholder for future shared viewport context.
// Current implementation keeps hooks SSR-safe and avoids duplicate listeners.

export function ViewportProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

