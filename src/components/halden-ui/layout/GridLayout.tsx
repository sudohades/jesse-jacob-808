import * as React from "react";
import { cn } from "@/platform/lib/cn";

export interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
  as?: React.ElementType;
}

const gaps = { sm: "gap-4", md: "gap-6", lg: "gap-8" };
const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-12",
};

export const GridLayout = React.forwardRef<HTMLDivElement, GridLayoutProps>(
  ({ cols = 3, gap = "md", as: Tag = "div", className, ...props }, ref) => (
    <Tag ref={ref} className={cn("grid", colsMap[cols], gaps[gap], className)} {...props} />
  )
);
GridLayout.displayName = "GridLayout";
