import type { Config } from "tailwindcss";

const shadows = {
  glow: {
    primary: "0 0 16px rgba(155, 92, 255, 0.25)",
    secondary: "0 0 16px rgba(210, 107, 255, 0.25)",
    tertiary: "0 0 16px rgba(180, 0, 255, 0.25)",
  },

  card: "0 4px 20px rgba(0,0,0,0.25)",

  cardHover: "0 8px 30px rgba(0,0,0,0.35)",
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core backgrounds
        bg: {
          base:    "#080808",
          surface: "#0f0f0f",
          raised:  "#111111",
          overlay: "#161616",
          border:  "#1e1e1e",
          muted:   "#2a2a2a",
        },
        // Text scale
        text: {
          primary:   "#f0f0f0",
          secondary: "#a0a0a0",
          muted:     "#606060",
          inverse:   "#080808",
        },
        // Neon accents — muted, premium
        cyan:   { DEFAULT: "#00e5ff", dim: "#00b8cc", glow: "rgba(0,229,255,0.15)" },
        blue:   { DEFAULT: "#0088ff", dim: "#0066cc", glow: "rgba(0,136,255,0.12)" },
        violet: { DEFAULT: "#b400ff", dim: "#8800cc", glow: "rgba(180,0,255,0.10)" },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:  ["var(--font-jetbrains)", "Menlo", "monospace"],
      },
      fontSize: {
        "display-2xl": ["4.5rem",  { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.035em" }],
        "display-lg":  ["3rem",    { lineHeight: "1.1",  letterSpacing: "-0.03em" }],
        "display-md":  ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.2",  letterSpacing: "-0.02em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "mesh-drift": "meshDrift 25s ease-in-out infinite alternate",
        "mesh-drift-2": "meshDrift2 30s ease-in-out infinite alternate",
        "mesh-drift-3": "meshDrift3 35s ease-in-out infinite alternate",
        "cursor-blink": "cursorBlink 1.1s step-end infinite",
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        meshDrift: {
          "0%":   { transform: "translate(0%, 0%) scale(1)" },
          "100%": { transform: "translate(8%, 6%) scale(1.05)" },
        },
        meshDrift2: {
          "0%":   { transform: "translate(0%, 0%) scale(1)" },
          "100%": { transform: "translate(-10%, 8%) scale(1.08)" },
        },
        meshDrift3: {
          "0%":   { transform: "translate(0%, 0%) scale(1)" },
          "100%": { transform: "translate(6%, -8%) scale(1.04)" },
        },
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url('/images/noise.svg')",
      },
      boxShadow: {
        "glow-primary": shadows.glow.primary,
        "glow-secondary": shadows.glow.secondary,
        "glow-tertiary": shadows.glow.tertiary,
        "card": shadows.card,
        "card-hover": shadows.cardHover,
        // Legacy aliases for backward compatibility
        "glow-cyan": shadows.glow.primary,
        "glow-blue": shadows.glow.secondary,
        "glow-violet": shadows.glow.tertiary,
      },
    },
  },
  plugins: [],
};

export default config;
