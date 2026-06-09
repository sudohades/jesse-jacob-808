/**
 * Design System - Spacing Tokens
 * 
 * Centralized spacing system for consistent layout.
 */

export const spacing = {
  // Base spacing scale (in rem)
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px

  // Section spacing
  section: {
    sm: '3rem',     // 48px
    md: '6rem',     // 96px
    lg: '9rem',     // 144px
  },

  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type SpacingToken = typeof spacing;
