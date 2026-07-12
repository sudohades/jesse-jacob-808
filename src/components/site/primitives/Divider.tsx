import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

/**
 * Divider primitive.
 * Migrated to Halden UI semantics using the shared border hairline token.
 */
export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        "bg-[var(--color-hairline)]",
        className
      )}
      {...props}
    />
  );
}


