/**
 * Launch Utility Functions
 * 
 * Server-side utilities for checking launch status and calculating remaining time.
 * Uses server time to avoid client-side clock manipulation.
 */

import { SITE_LAUNCH } from "@/lib/config/launch";

/**
 * Check if the launch is complete (site is accessible)
 * 
 * @returns true if site should be accessible, false if launch gate should be shown
 */
export function isLaunchComplete(): boolean {
  // If launch gate is disabled, site is always accessible
  if (!SITE_LAUNCH.enabled) {
    return true;
  }

  // Check for bypass mode (development)
  if (process.env.NEXT_PUBLIC_BYPASS_LAUNCH === "true") {
    return true;
  }

  // Disable launch gate during build to allow static generation
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "phase-production-build") {
    return true;
  }

  const now = new Date();
  const launchDate = new Date(SITE_LAUNCH.launchDate);

  return now >= launchDate;
}

/**
 * Get remaining time until launch
 * 
 * @returns Object with days, hours, minutes, seconds remaining, or null if launch is complete
 */
export function getRemainingTime(): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
} | null {
  if (isLaunchComplete()) {
    return null;
  }

  const now = new Date();
  const launchDate = new Date(SITE_LAUNCH.launchDate);
  const diff = launchDate.getTime() - now.getTime();

  if (diff <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
  };
}

/**
 * Check if preview mode is allowed and active
 * 
 * @param searchParams URL search params
 * @returns true if preview mode should be enabled
 */
export function isPreviewMode(searchParams?: URLSearchParams): boolean {
  // Preview mode must be explicitly allowed
  if (process.env.NEXT_PUBLIC_ALLOW_PREVIEW !== "true") {
    return false;
  }

  // Preview parameter must be present
  if (!searchParams?.has("preview")) {
    return false;
  }

  return searchParams.get("preview") === "1";
}

/**
 * Determine whether the launch gate should be shown based on environment and launch status
 * 
 * Environment-aware logic:
 * - development (NODE_ENV=development) → false (bypass gate)
 * - vercel preview (VERCEL_ENV=preview) → false (bypass gate)
 * - production before launch → true (show gate)
 * - production after launch → false (bypass gate)
 * 
 * @returns true if launch gate should be shown, false if it should be bypassed
 */
export function shouldShowLaunchGate(): boolean {
  // If launch gate is disabled, never show it
  if (!SITE_LAUNCH.enabled) {
    return false;
  }

  // Bypass in development environment
  if (process.env.NODE_ENV === "development") {
    return false;
  }

  // Bypass in Vercel preview deployments
  if (process.env.VERCEL_ENV === "preview") {
    return false;
  }

  // Disable launch gate during build to allow static generation
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "phase-production-build") {
    return false;
  }

  // Check if launch is complete based on date
  const now = new Date();
  const launchDate = new Date(SITE_LAUNCH.launchDate);

  // Show gate if launch is not yet complete
  return now < launchDate;
}
