/**
 * Design System - Shadow Tokens
 * 
 * Centralized shadow system for consistent elevation.
 */

export const shadows = {
  // Elevation shadows
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Card shadows
  card: '0 1px 0 0 rgba(255, 255, 255, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
  cardHover: '0 0 0 1px rgba(210, 107, 255, 0.3), 0 4px 24px rgba(210, 107, 255, 0.15), 0 0 40px rgba(210, 107, 255, 0.08)',

  // Glow effects
  glow: {
    primary: '0 0 20px rgba(155, 92, 255, 0.25), 0 0 40px rgba(155, 92, 255, 0.1)',
    secondary: '0 0 20px rgba(180, 0, 255, 0.25), 0 0 40px rgba(180, 0, 255, 0.1)',
    tertiary: '0 0 20px rgba(210, 107, 255, 0.25), 0 0 40px rgba(210, 107, 255, 0.1)',
  },

  // Inner shadows
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

export type ShadowToken = typeof shadows;
