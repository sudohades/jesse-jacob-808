"use client";

import { cn } from "@/lib/utils/cn";

export type MdxRendererProps = {
  source: { content: string; frontmatter?: Record<string, unknown> };
  className?: string;
};

export function MdxRenderer({ source, className }: MdxRendererProps) {
  return (
    <article className={cn("prose-hades", className)}>
      <div className="whitespace-pre-wrap text-[var(--text-secondary)] leading-relaxed">
        {source.content}
      </div>
    </article>
  );
}

