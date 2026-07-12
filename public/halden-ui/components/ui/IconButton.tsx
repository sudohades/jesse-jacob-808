import * as React from "react";
import { cn } from "../../lib/cn";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  label: string;
}

const sizes = { sm: "h-8 w-8", md: "h-9 w-9", lg: "h-11 w-11" };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "md", label, className, children, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      className={cn(
        "hd-focus-ring grid place-items-center rounded-[var(--radius-sm)]",
        "border border-[var(--color-hairline)] bg-[var(--color-surface-2)]/60",
        "text-[var(--color-foreground)] hd-transition hover:border-[var(--color-border)] hover:text-[var(--color-highlight)]",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
IconButton.displayName = "IconButton";
