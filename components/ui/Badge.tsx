import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "cyan" | "blue" | "violet" | "muted" | "active" | "status";

const variants: Record<BadgeVariant, string> = {
  default: "bg-[rgba(17,17,17,0.5)] backdrop-blur-xl border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)]",
  cyan:    "bg-[rgba(155,92,255,0.12)] border-[rgba(155,92,255,0.3)] text-[var(--accent-primary)] shadow-[0_0_6px_rgba(155,92,255,0.15)]",

  // Treat legacy `blue` as purple/violet to avoid any remaining blue glow.
  blue:    "bg-[rgba(210,107,255,0.12)] border-[rgba(210,107,255,0.3)] text-[var(--accent-secondary)] shadow-[0_0_6px_rgba(210,107,255,0.15)]",

  violet:  "bg-[rgba(210,107,255,0.12)] border-[rgba(210,107,255,0.3)] text-[var(--accent-secondary)] shadow-[0_0_6px_rgba(210,107,255,0.15)]",
  muted:   "bg-transparent border-[var(--bg-muted)] text-[var(--text-muted)]",
  // Legacy glow: swap cyan/blue-ish RGBA to violet/purple to keep palette consistent.
  active:  "bg-[rgba(210,107,255,0.12)] border-[rgba(210,107,255,0.3)] text-[var(--accent-secondary)] shadow-[0_0_6px_rgba(210,107,255,0.15)]",
  status:  "bg-[rgba(210,107,255,0.1)] border-[rgba(210,107,255,0.25)] text-[var(--accent-secondary)] shadow-[0_0_5px_rgba(210,107,255,0.12)]",
};



interface BadgeProps {
  children:  React.ReactNode;
  variant?:  BadgeVariant;
  dot?:      boolean;
  className?: string;
}

export function Badge({ children, variant = "default", dot, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border rounded-full px-2 py-0.5",
        "font-mono text-[0.65rem] font-medium tracking-wide uppercase",
        variants[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "inline-block w-1.5 h-1.5 rounded-full",
            variant === "active" || variant === "status" || variant === "cyan"
              ? "bg-[var(--accent-primary)] animate-pulse"
              : "bg-current"
          )}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}
