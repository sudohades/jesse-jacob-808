import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/platform/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "accent";
type Size = "sm" | "md" | "lg";



const base =
  "hd-focus-ring inline-flex items-center justify-center gap-2 font-[var(--font-sans)] " +
  "font-medium select-none whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none " +
  "transition-[background,color,border-color,box-shadow,transform] duration-[var(--duration-base)] " +
  "ease-[var(--ease-standard)] active:translate-y-px";

const sizes: Record<Size, string> = {
  sm: "h-8  px-3   text-[12px] rounded-[var(--radius-sm)]",
  md: "h-10 px-4   text-[13px] rounded-[var(--radius-md)]",
  lg: "h-12 px-5.5 text-[14px] rounded-[var(--radius-md)]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] " +
    "hover:brightness-110 shadow-[0_8px_24px_-12px_rgba(8,179,247,.6)]",
  secondary:
    "bg-[var(--color-surface-2)] text-[var(--color-foreground)] " +
    "border border-[var(--color-hairline)] hover:border-[var(--color-border)]",
  ghost:
    "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)]",
  outline:
    "bg-transparent text-[var(--color-foreground)] border border-[var(--color-hairline)] " +
    "hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]",
  accent:
    "bg-[var(--color-highlight)] text-[var(--color-highlight-foreground)] " +
    "hover:brightness-105",
};



type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

type ButtonButtonProps = React.ComponentPropsWithoutRef<"button">;

type ButtonSlotProps = React.ComponentPropsWithoutRef<typeof Slot>;

export type ButtonProps = ButtonOwnProps &
  ({ asChild?: false } & ButtonButtonProps | { asChild: true } & ButtonSlotProps);

export const Button = React.forwardRef<React.ElementRef<"button">, ButtonProps>(
  ({ variant = "primary", size = "md", className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";




