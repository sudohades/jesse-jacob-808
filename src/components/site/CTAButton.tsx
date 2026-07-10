import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost" | "accent";

type Props = {
  to?: string;
  href?: string;
  variant?: Variant;
  children: ReactNode;
  icon?: "up-right" | "right" | "none";
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

export function CTAButton({
  to,
  href,
  variant = "solid",
  icon = "up-right",
  children,
  className,
  ...rest
}: Props) {
  const base =
    "group inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.22em] transition-all duration-200";
  const styles: Record<string, string> = {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-soft",
    outline:
      "border border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-soft",
    ghost: "text-foreground hover:text-accent hover:bg-accent/10",
    accent: "bg-bright-amber-500 text-carbon-black-950 hover:bg-bright-amber-600 hover:shadow-soft",
  };
  const Icon = icon === "right" ? ArrowRight : icon === "up-right" ? ArrowUpRight : null;
  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon className="h-4 w-4 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link href={to} className={cn(base, styles[variant], className)}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cn(base, styles[variant], className)} {...rest}>
      {content}
    </a>
  );
}
