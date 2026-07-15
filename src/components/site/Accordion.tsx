"use client";

import { useState } from "react";

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
        <div className="absolute left-full top-0 z-50 ml-2 w-80 rounded-lg glass-floating p-4 shadow-soft animate-in fade-in slide-in-from-left-1 duration-200">
          <div className="relative z-10 text-sm text-muted-foreground">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
