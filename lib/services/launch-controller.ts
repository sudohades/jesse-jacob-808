/**
 * Launch Controller Service
 * 
 * Abstract interface for launch state management.
 * This allows future integration with external schedulers (systemd timers, launch daemons, etc.)
 * without changing UI code.
 */

import { isLaunchComplete } from "@/lib/utils/launch";

/**
 * Launch controller interface
 * Implementations determine whether the site should be accessible
 */
export interface LaunchController {
  /**
   * Check if the site is open/accessible
   * @returns boolean - true if site should be accessible
   */
  isOpen(): boolean;
}

/**
 * Date-based launch controller
 * Uses the configured launch date from SITE_LAUNCH config
 */
export class DateBasedLaunchController implements LaunchController {
  isOpen(): boolean {
    return isLaunchComplete();
  }
}

/**
 * Factory function to get the appropriate launch controller
 * Currently returns DateBasedLaunchController
 * Future: can be extended to return different controllers based on config
 */
export function getLaunchController(): LaunchController {
  return new DateBasedLaunchController();
}
