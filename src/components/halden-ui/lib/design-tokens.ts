/**
 * Design tokens — single source of truth for the Halden UI system.
 * All values mirror CSS variables declared in styles/theme.css so they can
 * be consumed either from JS/TS (charts, canvas, motion) or from CSS.
 */

export const tokens = {
  color: {
    // Frozen Lake — primary
    lake: {
      50: "#e6f7fe", 100: "#cef0fd", 200: "#9ce1fc", 300: "#6bd2fa",
      400: "#39c3f9", 500: "#08b3f7", 600: "#0690c6", 700: "#056c94",
      800: "#034863", 900: "#022431", 950: "#011923",
    },
    // Lavender Grey — secondary
    grey: {
      50: "#f1f1f4", 100: "#e2e3e9", 200: "#c5c7d3", 300: "#a9abbc",
      400: "#8c8fa6", 500: "#6f7390", 600: "#595c73", 700: "#434556",
      800: "#2c2e3a", 900: "#16171d", 950: "#101014",
    },
    // Carbon Black — dark surfaces
    carbon: {
      50: "#f3f4f1", 100: "#e7e8e3", 200: "#d0d2c6", 300: "#b8bbaa",
      400: "#a0a48e", 500: "#898e71", 600: "#6d715b", 700: "#525544",
      800: "#37392d", 900: "#1b1c17", 950: "#131410",
    },
    // Bright Amber — accent
    amber: {
      50: "#fefae6", 100: "#fdf5ce", 200: "#fcec9c", 300: "#fae26b",
      400: "#f9d939", 500: "#f7cf08", 600: "#c6a606", 700: "#947c05",
    },
    // Dark Amethyst — ambient glow only
    amethyst: { 500: "#be1ce3", 700: "#721188", 900: "#26062d" },
  },
  radius: { xs: "6px", sm: "8px", md: "12px", lg: "14px", xl: "18px", "2xl": "22px" },
  space:  { 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "20px", 6: "24px", 8: "32px", 10: "40px", 12: "48px", 16: "64px", 20: "80px", 24: "96px", 32: "128px" },
  blur:   { xs: "6px", sm: "10px", md: "18px", lg: "28px", xl: "40px" },
  shadow: {
    hairline: "0 0 0 1px rgba(226,227,233,0.08)",
    panel:    "0 20px 60px -30px rgba(0,0,0,.7), 0 8px 30px -20px rgba(190,28,227,.25)",
    glow:     "0 0 40px -8px rgba(190,28,227,.35)",
    focus:    "0 0 0 2px var(--color-background), 0 0 0 4px var(--color-ring)",
  },
  duration: { instant: "80ms", fast: "160ms", base: "240ms", slow: "480ms", slower: "720ms" },
  easing:   {
    standard: "cubic-bezier(.2,.7,.2,1)",
    entrance: "cubic-bezier(.16,.84,.32,1)",
    exit:     "cubic-bezier(.4,0,.6,1)",
  },
  font: {
    display: 'var(--font-display, "Quantico"), ui-sans-serif, system-ui, sans-serif',
    sans:    'var(--font-sans, "Inter"), ui-sans-serif, system-ui, sans-serif',
    mono:    'var(--font-mono, "Share Tech Mono"), ui-monospace, "SFMono-Regular", monospace',
  },
} as const;

export type Tokens = typeof tokens;
