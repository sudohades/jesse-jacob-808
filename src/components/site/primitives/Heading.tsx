import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level?: 2 | 3;
};

export function Heading({ level = 2, className, ...props }: Props) {
  const Tag = (level === 3 ? "h3" : "h2") as any;
  return (
    <Tag
      className={cn(
        "font-display font-semibold tracking-wide",
        level === 2 ? "text-xl md:text-2xl" : "text-lg md:text-xl",
        className
      )}
      {...props}
    />
  );
}

