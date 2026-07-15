import * as React from "react";
import { cn } from "@/platform/lib/cn";

type Width = "sm" | "md" | "lg" | "xl" | "full";
const widths: Record<Width, string> = {
  sm: "max-w-[720px]",
  md: "max-w-[960px]",
  lg: "max-w-[1200px]",
  xl: "max-w-[1400px]",
  full: "max-w-none",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: Width;
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ width = "xl", as: Tag = "div", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn("mx-auto w-full px-6 sm:px-10", widths[width], className)}
      {...props}
    />
  )
);
Container.displayName = "Container";
