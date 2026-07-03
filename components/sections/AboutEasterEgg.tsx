"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

import { Sparkles, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const ImageReveal = dynamic(() => import("@/components/ui/ImageReveal").then(mod => ({ default: mod.ImageReveal })), { ssr: false });

const UNLOCK_WINDOW_MS = 1800; // 1.5–2s window

export function AboutEasterEgg() {
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [a11yLabelId] = useState(() => `about-easter-dialog-title-${Math.random().toString(16).slice(2)}`);

  const reducedMotion = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const close = () => setOpen(false);
  const unlock = () => {
    setUnlocked(true);
    setOpen(true);
    setClickTimes([]);
  }; 


  // Triple-click detection.
  useEffect(() => {
    if (!clickTimes.length) return;

    const latest = clickTimes[clickTimes.length - 1];
    const cutoff = latest - UNLOCK_WINDOW_MS;
    const pruned = clickTimes.filter((t) => t >= cutoff);

    if (pruned.length >= 3) {
      // Success: do nothing for single/double; only unlock on third within window.
      unlock();
      setClickTimes([]);
      return;
    }

    if (pruned.length !== clickTimes.length) setClickTimes(pruned);
  }, [clickTimes]);

  // Focus management for modal.
  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (open) return;
    lastFocusedRef.current?.focus?.();
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const iconLabel = useMemo(
    () => (unlocked ? "Unlocked" : "Try triple-click"),
    [unlocked]
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          // Triple-click detection (single/double do nothing)
          setClickTimes((prev) => {
            const now = Date.now();
            // Keep only clicks inside the window to avoid unbounded growth.
            const cutoff = now - UNLOCK_WINDOW_MS;
            const pruned = prev.filter((t) => t >= cutoff);
            return [...pruned, now];
          });
        }}

        aria-label={iconLabel}
        className="group inline-flex items-center gap-2 rounded-full border border-[rgba(210,107,255,0.25)] bg-[rgba(210,107,255,0.06)] px-3 py-2 text-sm text-[var(--accent-primary)] hover:border-[rgba(210,107,255,0.45)] hover:bg-[rgba(210,107,255,0.1)] transition-all"
      >
        <motion.span
          aria-hidden
          animate={reducedMotion ? undefined : { rotate: [0, 12, 0] }}
          transition={{ duration: 1.4, repeat: unlocked ? Infinity : 0, ease: "easeInOut" }}
        >
          <Sparkles size={16} />
        </motion.span>
        <span className="font-mono text-xs tracking-wider uppercase opacity-90">sudo</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="about-easter-overlay"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(0,0,0,0.65)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              // Outside click dismissal.
              if (e.target === e.currentTarget) close();
            }}
            role="presentation"
          >
            <motion.div
              className="w-[min(680px,92vw)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby={a11yLabelId}
              initial={reducedMotion ? { scale: 1, y: 0, opacity: 1 } : { scale: 0.98, y: 10, opacity: 0 }}
              animate={reducedMotion ? { scale: 1, y: 0, opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
              exit={reducedMotion ? { scale: 1, y: 0, opacity: 0 } : { scale: 0.98, y: 10, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {/* Prevent layout shift by using fixed overlay + internal sizing. */}
              <div className="card-base rounded-[18px] overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,17,0.5)] backdrop-blur-xl">
                  <h2 id={a11yLabelId} className="font-mono text-sm text-[var(--text-primary)]">
                    Secret handshake
                  </h2>

                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(255,255,255,0.08)] hover:border-[rgba(210,107,255,0.35)] hover:text-[var(--accent-primary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl transition-colors"
                  >
                    <X size={16} aria-hidden />
                  </button>
                </div>

                <div className="relative px-4 py-6">
                  <AnimatePresence mode="wait">
                    {unlocked ? (
                      <motion.div
                        key="easter-image"
                        className="relative mx-auto aspect-[16/9] w-full max-w-[620px]"
                        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                        transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                      >
                        <ImageReveal
                          src={siteConfig.content.aboutEasterEggImage}
                          alt="Unlocked secret image"
                          mode="static"
                          aspectRatio="16 / 9"
                          sizes="(max-width: 768px) 92vw, 620px"
                          priority
                          className="relative overflow-hidden rounded-[12px]"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="locked-state"
                        className="mx-auto max-w-[620px] rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,17,0.5)] backdrop-blur-xl p-6 text-center"
                        initial={{ opacity: 1 }}
                      >
                        <p className="font-mono text-sm text-[var(--text-secondary)]">
                          Triple-click to unlock…
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

