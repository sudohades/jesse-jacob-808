import * as React from "react";
import { cn } from "@/platform/lib/cn";

type Size = "sm" | "md" | "lg";

export interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: Size;
  muted?: boolean;
  as?: React.ElementType;
}

const sizes: Record<Size, string> = { sm: "hd-body", md: "hd-body-lg", lg: "hd-lead" };

export const Body = React.forwardRef<HTMLParagraphElement, BodyProps>(
  ({ size = "md", muted, as: Tag = "p", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(sizes[size], muted && "text-[var(--color-muted-foreground)]", className)}
      {...props}
    />
  )
);
Body.displayName = "Body";
