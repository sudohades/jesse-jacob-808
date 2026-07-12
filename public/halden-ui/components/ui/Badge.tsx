import * as React from "react";
import { cn } from "../../lib/cn";

type Tone = "neutral" | "primary" | "accent" | "amber" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-[var(--color-surface-2)] text-[var(--color-muted-foreground)] border-[var(--color-hairline)]",
  primary: "bg-[color-mix(in_oklab,var(--color-primary)_16%,transparent)] text-[var(--color-primary)] border-[color-mix(in_oklab,var(--color-primary)_35%,transparent)]",
  accent:  "bg-[color-mix(in_oklab,var(--color-accent)_16%,transparent)] text-[var(--color-accent)] border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)]",
  amber:   "bg-[color-mix(in_oklab,var(--color-highlight)_18%,transparent)] text-[var(--color-highlight)] border-[color-mix(in_oklab,var(--color-highlight)_40%,transparent)]",
  danger:  "bg-[rgba(220,60,60,.15)] text-[#ff8a8a] border-[rgba(220,60,60,.35)]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = "neutral", dot = false, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "hd-font-mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "text-[10px] tracking-[.14em] uppercase leading-none",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";
