export { tokens as designTokens } from "../platform/lib/design-tokens";

/** Semantic color keys. Values resolve to CSS variables at runtime. */
export const semanticColors = {
  background:        "var(--color-background)",
  foreground:        "var(--color-foreground)",
  surface:           "var(--color-surface)",
  surfaceElevated:   "var(--color-surface-2)",
  panel:             "var(--color-panel)",
  muted:             "var(--color-muted)",
  mutedForeground:   "var(--color-muted-foreground)",
  border:            "var(--color-border)",
  hairline:          "var(--color-hairline)",
  ring:              "var(--color-ring)",
  primary:           "var(--color-primary)",
  primaryForeground: "var(--color-primary-foreground)",
  accent:            "var(--color-accent)",
  highlight:         "var(--color-highlight)",
  glow:              "var(--color-glow)",
} as const;
