import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        "bg-border",
        className
      )}
      {...props}
    />
  );
}

