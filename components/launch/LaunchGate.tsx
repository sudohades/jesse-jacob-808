"use client";

import { SITE_LAUNCH } from "@/lib/config/launch";
import { CountdownTimer } from "./CountdownTimer";
import { siteConfig } from "@/lib/site-config";
import { motion } from "framer-motion";

export function LaunchGate() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[var(--background-primary)] px-4 py-12 sm:px-6">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primaryGlow)] via-transparent to-[var(--accent-secondaryGlow)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-tertiaryGlow)_0%,_transparent_50%)]" />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            rounded-2xl
            border
            border-[rgba(255,255,255,0.08)]
            bg-[rgba(15,15,15,0.85)]
            backdrop-blur-xl
            -webkit-backdrop-blur-xl
            p-8
            shadow-2xl
            sm:p-12
            lg:p-16
          "
        >
          {/* Logo/Brand */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              {siteConfig.brand}
            </h1>
            <div className="mt-2 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />
          </div>

          {/* Title */}
          <h2 className="mb-4 text-center text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
            {SITE_LAUNCH.title}
          </h2>

          {/* Subtitle */}
          <p className="mb-8 text-center text-base text-[var(--text-secondary)] sm:text-lg lg:text-xl">
            {SITE_LAUNCH.subtitle}
          </p>

          {/* Countdown */}
          {SITE_LAUNCH.showCountdown && (
            <div className="mb-8">
              <CountdownTimer />
            </div>
          )}

          {/* Status message */}
          {SITE_LAUNCH.statusMessage && (
            <p className="mb-8 text-center text-sm text-[var(--text-muted)] sm:text-base">
              {SITE_LAUNCH.statusMessage}
            </p>
          )}

          {/* Footer */}
          <div className="mt-12 border-t border-[rgba(255,255,255,0.08)] pt-8 text-center">
            <p className="text-xs text-[var(--text-muted)] sm:text-sm">
              {SITE_LAUNCH.footerText}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
