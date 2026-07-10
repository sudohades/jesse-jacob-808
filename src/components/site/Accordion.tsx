"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type InteractiveTextProps = {
  title: string;
  children: React.ReactNode;
};

export function InteractiveText({ title, children }: InteractiveTextProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="font-display text-lg font-semibold text-foreground transition-all duration-200 hover:text-primary cursor-pointer"
      >
        {title}
      </button>

      {/* Subtle popup - reveals to the right side */}
      {isOpen && (
        <div className="absolute left-full top-0 z-50 ml-2 w-80 rounded-lg border border-border bg-card/95 backdrop-blur-sm p-4 shadow-soft animate-in fade-in slide-in-from-left-1 duration-200">
          <div className="text-sm text-muted-foreground">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
