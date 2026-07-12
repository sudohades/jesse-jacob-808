import * as React from "react";
import { cn } from "../../lib/cn";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  as?: React.ElementType;
  gradient?: boolean;
}

const styles: Record<Level, string> = {
  1: "hd-h1", 2: "hd-h2", 3: "hd-h3",
  4: "hd-h4", 5: "hd-h5", 6: "hd-h6",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, as, gradient, className, ...props }, ref) => {
    const Tag = (as ?? (`h${level}` as React.ElementType)) as React.ElementType;
    return (
      <Tag
        ref={ref}
        className={cn(styles[level], gradient && "hd-text-gradient", className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";
