"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface HamburgerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
  label?: string;
}

export const HamburgerButton = React.forwardRef<HTMLButtonElement, HamburgerButtonProps>(
  ({ open, label = "Toggle menu", className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-expanded={open}
      className={cn(
        "hd-focus-ring grid h-9 w-9 place-items-center rounded-[var(--radius-sm)]",
        "border border-[var(--color-hairline)] text-[var(--color-foreground)] md:hidden",
        className
      )}
      {...props}
    >
      <span className="sr-only">{label}</span>
      <div className="relative flex h-3 w-4 flex-col justify-between">
        <span className={cn("h-px w-full bg-current hd-transition origin-center", open && "translate-y-[5px] rotate-45")} />
        <span className={cn("h-px w-full bg-current hd-transition", open && "opacity-0")} />
        <span className={cn("h-px w-full bg-current hd-transition origin-center", open && "-translate-y-[5px] -rotate-45")} />
      </div>
    </button>
  )
);
HamburgerButton.displayName = "HamburgerButton";
