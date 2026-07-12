import * as React from "react";
import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: Level;
  gradient?: boolean;
  as?: React.ElementType;
};

export function Heading({
  level = 2,
  as,
  gradient,
  className,
  ...props
}: Props) {
  const Tag = (as ?? (`h${level}` as React.ElementType)) as React.ElementType;

  const styles: Record<Level, string> = {
    1: "hd-h1",
    2: "hd-h2",
    3: "hd-h3",
    4: "hd-h4",
    5: "hd-h5",
    6: "hd-h6",
  };

  return (
    <Tag
      className={cn(styles[level], gradient && "hd-text-gradient", className)}
      {...props}
    />
  );
}


