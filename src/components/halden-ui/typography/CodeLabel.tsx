import * as React from "react";
import { cn } from "@/platform/lib/cn";

export interface CodeLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefix?: string;
}

export const CodeLabel = React.forwardRef<HTMLSpanElement, CodeLabelProps>(
  ({ prefix, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "hd-font-mono inline-flex items-center gap-1.5 text-[11px] tracking-[.08em] text-[var(--color-muted-foreground)]",
        className
      )}
      {...props}
    >
      {prefix && <span className="text-[var(--color-highlight)] opacity-80">{prefix}</span>}
      {children}
    </span>
  )
);
CodeLabel.displayName = "CodeLabel";
