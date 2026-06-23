/**
 * Launch Feature Flag Module
 * 
 * Runtime-safe launch feature flag system.
 * No environment variables in runtime logic.
 * Safe for Vercel Edge + Node hybrid runtime.
 */

/**
 * Launch date constant in ISO 8601 format (UTC)
 */
export const LAUNCH_DATE = "2026-06-26T06:26:06Z";

/**
 * Check if current time is before launch date
 * 
 * @returns true if before launch date, false if at or after launch date
 */
export function isBeforeLaunch(): boolean {
  const now = new Date();
  const launchDate = new Date(LAUNCH_DATE);
  return now < launchDate;
}

/**
 * Get time remaining until launch
 * 
 * @returns Object with hours, minutes, seconds remaining, or null if launch is complete
 */
export function getTimeRemaining(): {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
} | null {
  const now = new Date();
  const launchDate = new Date(LAUNCH_DATE);
  const diff = launchDate.getTime() - now.getTime();

  if (diff <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
  };
}

/**
 * Check if launch is enabled (after launch date)
 * 
 * @returns true if launch is complete, false if before launch date
 */
export function isLaunchEnabled(): boolean {
  return !isBeforeLaunch();
}
