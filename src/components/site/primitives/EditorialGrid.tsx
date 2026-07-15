import type { HTMLAttributes } from "react";
import { cn } from "@/platform/lib/utils";

/**
 * Editorial grid wrapper.
 * Migrated to match Halden UI responsive spacing conventions.
 */
export function EditorialGrid({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3",
        className
      )}
      {...props}
    />
  );
}


