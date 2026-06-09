/**
 * Design System - Color Tokens
 * 
 * Semantic color system providing a single source of truth for all color usage.
 * All components should reference these tokens rather than hardcoded values.
 */

export const colors = {
  // Background colors
  background: {
    primary: '#080808',    // Main page background
    secondary: '#0f0f0f',  // Card/surface backgrounds
    surface: '#111111',    // Elevated surfaces
    elevated: '#161616',   // Overlays, modals
    overlay: '#161616',    // Backdrop overlays
    border: '#1e1e1e',     // Default borders
    muted: '#2a2a2a',      // Subtle backgrounds
  },

  // Text colors
  text: {
    primary: '#f0f0f0',    // Primary text
    secondary: '#a0a0a0',  // Secondary text
    muted: '#606060',      // Muted/disabled text
    inverse: '#080808',    // Text on dark backgrounds
  },

  // Border colors
  border: {
    default: '#1e1e1e',    // Default borders
    subtle: '#2a2a2a',     // Subtle borders
    accent: 'rgba(210, 107, 255, 0.3)', // Accent borders
  },

  // Accent colors (purple/violet theme)
  accent: {
    primary: '#9b5cff',    // Primary accent (purple)
    primaryDim: 'rgba(155, 92, 255, 0.7)',
    primaryGlow: 'rgba(155, 92, 255, 0.18)',
    primaryPulse: 'rgba(155, 92, 255, 0.55)',
    
    secondary: '#b400ff',  // Secondary accent (violet)
    secondaryDim: 'rgba(180, 0, 255, 0.65)',
    secondaryGlow: 'rgba(180, 0, 255, 0.12)',
    
    tertiary: '#d26bff',   // Tertiary accent (light violet)
    tertiaryDim: 'rgba(210, 107, 255, 0.65)',
    tertiaryGlow: 'rgba(210, 107, 255, 0.10)',
  },

  // Status colors
  status: {
    success: 'rgba(34, 197, 94, 0.1)',
    successBorder: 'rgba(34, 197, 94, 0.3)',
    successText: '#22c55e',
    
    warning: 'rgba(234, 179, 8, 0.1)',
    warningBorder: 'rgba(234, 179, 8, 0.3)',
    warningText: '#eab308',
    
    error: 'rgba(239, 68, 68, 0.1)',
    errorBorder: 'rgba(239, 68, 68, 0.3)',
    errorText: '#ef4444',
  },
} as const;

export type ColorToken = typeof colors;
