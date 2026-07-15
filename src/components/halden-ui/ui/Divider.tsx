import * as React from "react";
import { cn } from "@/platform/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: React.ReactNode;
}

export function Divider({ orientation = "horizontal", label, className, ...props }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("h-full w-px bg-[var(--color-hairline)]", className)}
        {...props}
      />
    );
  }
  if (label) {
    return (
      <div
        role="separator"
        className={cn("flex w-full items-center gap-3", className)}
        {...props}
      >
        <div className="h-px flex-1 bg-[var(--color-hairline)]" />
        <span className="hd-label-mono">{label}</span>
        <div className="h-px flex-1 bg-[var(--color-hairline)]" />
      </div>
    );
  }
  return (
    <div
      role="separator"
      className={cn("h-px w-full bg-[var(--color-hairline)]", className)}
      {...props}
    />
  );
}
