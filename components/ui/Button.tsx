import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "neon";
type ButtonSize    = "sm" | "md" | "lg";

const base = "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary-dim)] active:scale-[0.98] shadow-[0_0_16px_rgba(210,107,255,0.25)] hover:shadow-[0_0_24px_rgba(210,107,255,0.35)]",
  secondary:
    "bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] text-[var(--text-primary)] hover:border-[rgba(210,107,255,0.3)] hover:shadow-[0_0_12px_rgba(210,107,255,0.15)] active:scale-[0.98]",
  ghost:
    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(15,15,15,0.35)] hover:backdrop-blur-lg active:scale-[0.98]",
  neon:
    "border border-[rgba(210,107,255,0.35)] text-[var(--accent-primary)] hover:bg-[rgba(210,107,255,0.08)] hover:border-[rgba(210,107,255,0.5)] hover:shadow-[0_0_20px_rgba(210,107,255,0.2)] active:scale-[0.98]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8  px-3 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?:    ButtonSize;
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

type ButtonLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & { external?: boolean };

export function ButtonLink({
  variant = "secondary",
  size    = "md",
  className,
  external,
  children,
  ...props
}: ButtonLinkProps) {
  if (external) {
    const { href, ...rest } = props;
    return (
      <a
        href={href as string}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], sizes[size], className)}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
