import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost" | "redline";

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
    "group inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.22em] transition-all duration-300";
  const styles: Record<Variant, string> = {
    solid: "bg-foreground text-background hover:bg-redline hover:text-background",
    outline:
      "border border-foreground/80 text-foreground hover:bg-foreground hover:text-background",
    ghost: "text-foreground hover:text-redline",
    redline: "bg-redline text-background hover:bg-redline-glow",
  };
  const Icon = icon === "right" ? ArrowRight : icon === "up-right" ? ArrowUpRight : null;
  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
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
