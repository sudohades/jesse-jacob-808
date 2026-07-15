"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "@/platform/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & { delay?: number };

/**
 * Lightweight scroll-triggered fade+rise. Intentionally minimal —
 * the design language calls for restraint over showy motion.
 */
export function Reveal({ className, delay = 0, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
