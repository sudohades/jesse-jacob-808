import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Surface } from "./Surface";

export function Panel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <Surface
      variant="glass"
      className={cn("p-8 md:p-10", className)}
      {...props}
    >
      {children}
    </Surface>
  );
}


