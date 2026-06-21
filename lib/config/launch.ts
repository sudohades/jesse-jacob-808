/**
 * Launch Configuration
 * 
 * Single source of truth for website launch gate system.
 * Controls when the site becomes accessible to visitors.
 */

export const SITE_LAUNCH = {
  /**
   * Enable or disable the launch gate
   * Set to false to disable the gate and make the site fully accessible
   */
  enabled: true,

  /**
   * Launch date/time in ISO 8601 format (UTC)
   * The site will become accessible after this date/time
   */
  launchDate: "2026-06-26T06:26:06Z",

  /**
   * Launch page title
   */
  title: "Everything in its right place",

  /**
   * Launch page subtitle/description
   */
  subtitle: "Hold on tight, I'm just getting ready to make this experience a journey",

  /**
   * Show countdown timer on launch page
   */
  showCountdown: true,

  /**
   * Optional status message below countdown
   */
  statusMessage: "Here, a token of good fortune for your journey",

  /**
   * Footer text for launch page
   */
  footerText: "© 2026 sudo-hades. All rights reserved.",
} as const;

export type LaunchConfig = typeof SITE_LAUNCH;
