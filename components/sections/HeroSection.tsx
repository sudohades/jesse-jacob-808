"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import { ArrowRight, Terminal } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

const ImageReveal = dynamic(() => import("@/components/ui/ImageReveal").then(mod => ({ default: mod.ImageReveal })), { ssr: false });

const easeOut = [0.22, 0.61, 0.36, 1] as const;

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section
      className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center px-6 pt-20 pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative">
            {/* Terminal prompt badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.35)] backdrop-blur-lg px-4 py-1.5"
            >
              <Terminal size={12} className="text-[var(--accent-primary)]" aria-hidden />
              <span className="font-mono text-[0.7rem] font-medium tracking-widest text-[var(--accent-primary)] uppercase">
                {hero.greeting}
              </span>
            </motion.div>

            {/* Main headline */}
            <h1
              id="hero-heading"
              className="max-w-4xl text-[var(--text-primary)] font-bold"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.25rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
            >
              {hero.headline.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.09, ease: easeOut }}
                  className="block"
                >
                  {i === hero.headline.length - 1 ? (
                    <span className="text-gradient-cyan">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
              className="mt-6 max-w-2xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: easeOut }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              {hero.cta.map((btn) => (
                <ButtonLink
                  key={btn.href}
                  href={btn.href}
                  variant={btn.variant}
                  size="lg"
                >
                  {btn.label}
                  {btn.variant === "primary" && <ArrowRight size={16} aria-hidden />}
                </ButtonLink>
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="hidden absolute bottom-10 left-1/2 -translate-x-1/2 sm:flex flex-col items-center gap-2"
              aria-hidden
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="h-8 w-px bg-gradient-to-b from-[rgba(210,107,255,0.4)] to-transparent"
              />
            </motion.div>
          </div>

          {/* Profile visual identity */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[320px] lg:max-w-none"
            >
              <div className="absolute -inset-3 rounded-[28px] bg-[rgba(15,15,15,0.35)] backdrop-blur-xl blur-xl" aria-hidden />
              <div className="absolute -inset-1 rounded-[26px] border border-[rgba(255,255,255,0.08)]" aria-hidden />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-[24px] card-base"
              >
                <div
                  className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(155,92,255,0.25)_0%,transparent_55%)]"
                  aria-hidden
                />
                <ImageReveal
                  src="/profile/profile.jpg"
                  alt="Profile"
                  mode="reveal"
                  aspectRatio="1 / 1.05"
                  sizes="(max-width: 1024px) 320px, 360px"
                  priority
                  pixelSize={7}
                  transitionMs={950}
                  className="relative overflow-hidden rounded-[24px]"
                  style={{ filter: "saturate(1.05) contrast(1.02)" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
