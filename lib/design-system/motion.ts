/**
 * Design System - Motion Tokens
 * 
 * Centralized motion system for consistent animations and transitions.
 * All motion should reference these tokens.
 */

export const motion = {
  // Easing functions
  easing: {
    // Standard easings
    ease: [0.25, 0.1, 0.25, 1] as const,
    easeIn: [0.42, 0, 1, 1] as const,
    easeOut: [0, 0, 0.58, 1] as const,
    easeInOut: [0.42, 0, 0.58, 1] as const,
    
    // Custom easings for premium feel
    easeOutCubic: [0.22, 0.61, 0.36, 1] as const,
    easeOutQuart: [0.25, 1, 0.5, 1] as const,
    easeOutExpo: [0.16, 1, 0.3, 1] as const,
  },

  // Durations (in milliseconds)
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  },

  // Spring presets for Framer Motion
  spring: {
    gentle: { stiffness: 300, damping: 30 } as const,
    default: { stiffness: 400, damping: 25 } as const,
    snappy: { stiffness: 500, damping: 20 } as const,
    bouncy: { stiffness: 400, damping: 10 } as const,
  },

  // Delays
  delay: {
    none: 0,
    short: 100,
    normal: 200,
    long: 500,
  },
} as const;

export type MotionToken = typeof motion;
