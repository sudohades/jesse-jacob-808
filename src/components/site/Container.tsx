import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Width = "sm" | "md" | "lg" | "xl" | "full";

const widths: Record<Width, string> = {
  sm: "max-w-[720px]",
  md: "max-w-[960px]",
  lg: "max-w-[1200px]",
  xl: "max-w-[1400px]",
  full: "max-w-none",
};

export function Container({ className, width = "xl", ...props }: HTMLAttributes<HTMLDivElement> & { width?: Width }) {
  return (
    <div
      className={cn("mx-auto w-full px-6 sm:px-10", widths[width], className)}
      {...props}
    />
  );
}

