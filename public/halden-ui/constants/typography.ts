/** Typographic scale — pair with next/font/google variables. */
export const typography = {
  fontFamily: {
    display: 'var(--font-display, "Quantico"), ui-sans-serif, system-ui, sans-serif',
    sans:    'var(--font-sans, "Inter"), ui-sans-serif, system-ui, sans-serif',
    mono:    'var(--font-mono, "Share Tech Mono"), ui-monospace, monospace',
  },
  scale: {
    micro:  { size: "11px",  lh: "16px", tracking: "0.14em" },
    label:  { size: "12px",  lh: "16px", tracking: "0.08em" },
    body:   { size: "14px",  lh: "22px", tracking: "0" },
    bodyLg: { size: "16px",  lh: "26px", tracking: "0" },
    lead:   { size: "18px",  lh: "28px", tracking: "-0.005em" },
    h6:     { size: "16px",  lh: "22px", tracking: "0" },
    h5:     { size: "18px",  lh: "24px", tracking: "-0.005em" },
    h4:     { size: "22px",  lh: "28px", tracking: "-0.01em" },
    h3:     { size: "28px",  lh: "34px", tracking: "-0.012em" },
    h2:     { size: "40px",  lh: "46px", tracking: "-0.015em" },
    h1:     { size: "clamp(44px, 6vw, 72px)", lh: "1.02", tracking: "-0.02em" },
    display:{ size: "clamp(64px, 9vw, 120px)", lh: "0.98", tracking: "-0.03em" },
  },
} as const;

export type TypographyScale = keyof typeof typography.scale;
