/**
 * Container Component
 * 
 * Unified layout container for consistent page widths and responsive behavior.
 * Replaces ad-hoc max-width usage throughout the application.
 */

import { cn } from "@/lib/utils/cn";

type ContainerSize = "page" | "content" | "article" | "narrow";

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
}

const sizeClasses: Record<ContainerSize, string> = {
  page: "max-w-6xl",
  content: "max-w-4xl",
  article: "max-w-3xl",
  narrow: "max-w-2xl",
};

export function Container({ children, size = "page", className }: ContainerProps) {
  return (
    <div className={cn("mx-auto px-6", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
