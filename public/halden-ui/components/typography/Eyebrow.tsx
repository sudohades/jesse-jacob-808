import * as React from "react";
import { cn } from "../../lib/cn";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  index?: number | string;
  as?: React.ElementType;
}

export const Eyebrow = React.forwardRef<HTMLSpanElement, EyebrowProps>(
  ({ index, as: Tag = "span", className, children, ...props }, ref) => (
    <Tag ref={ref} className={cn("hd-eyebrow inline-flex items-center gap-2", className)} {...props}>
      {index !== undefined && (
        <span className="opacity-60">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      <span className="h-px w-4 bg-current opacity-40" />
      {children}
    </Tag>
  )
);
Eyebrow.displayName = "Eyebrow";
