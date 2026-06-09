"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type MdxImgProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
};

export type MdxRendererProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
  className?: string;
};

function parseMaybeNumber(v: number | string | undefined) {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export function MdxRenderer({ source, className }: MdxRendererProps) {
  const components = useMemo(
    () => ({
      h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
          {...props}
          className={cn(
            "text-[var(--text-primary)] font-bold tracking-tight text-2xl sm:text-3xl mt-10 mb-4",
            props.className
          )}
        />
      ),
      h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
          {...props}
          className={cn(
            "text-[var(--text-primary)] font-bold tracking-tight text-xl sm:text-2xl mt-8 mb-3",
            props.className
          )}
        />
      ),
      h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
          {...props}
          className={cn(
            "text-[var(--text-primary)] font-semibold tracking-tight text-lg mt-6 mb-2",
            props.className
          )}
        />
      ),
      p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props} className={cn("text-[var(--text-secondary)] leading-relaxed mb-3", props.className)} />
      ),
      a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
          {...props}
          className={cn(
            "text-[var(--accent-primary)] hover:underline underline-offset-4",
            props.className
          )}
        />
      ),
      code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
          {...props}
          className={cn(
            "font-[var(--font-jetbrains)] text-[0.95em] bg-[rgba(15,15,15,0.35)] backdrop-blur-lg border border-[rgba(255,255,255,0.08)] px-1.5 py-0.5 rounded",
            props.className
          )}
        />
      ),
      pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
          {...props}
          className={cn(
            "bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-xl p-4 overflow-x-auto mb-4",
            props.className
          )}
        />
      ),
      ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul {...props} className={cn("list-disc ml-5 mb-4 text-[var(--text-secondary)]", props.className)} />
      ),
      ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol {...props} className={cn("list-decimal ml-5 mb-4 text-[var(--text-secondary)]", props.className)} />
      ),
      blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
          {...props}
          className={cn(
            "border-l border-[var(--border-accent)] bg-[rgba(210,107,255,0.05)] p-4 rounded-lg text-[var(--text-secondary)] mb-4",
            props.className
          )}
        />
      ),
      table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 overflow-x-auto">
          <table
            {...props}
            className={cn(
              "min-w-full border-collapse border border-[rgba(255,255,255,0.08)] text-sm",
              props.className
            )}
          />
        </div>
      ),
      thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead
          {...props}
          className={cn("bg-[rgba(17,17,17,0.5)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]", props.className)}
        />
      ),
      tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody {...props} className={cn("divide-y divide-[rgba(255,255,255,0.08)]", props.className)} />
      ),
      tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr {...props} className={cn("hover:bg-[rgba(210,107,255,0.03)]", props.className)} />
      ),
      th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
          {...props}
          className={cn(
            "px-4 py-2 text-left font-semibold text-[var(--text-primary)] border-r border-[rgba(255,255,255,0.08)] last:border-r-0",
            props.className
          )}
        />
      ),
      td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
          {...props}
          className={cn(
            "px-4 py-2 text-[var(--text-secondary)] border-r border-[rgba(255,255,255,0.08)] last:border-r-0",
            props.className
          )}
        />
      ),
      img: (props: MdxImgProps) => {
        const src = props.src;
        if (!src) return null;

        const width = parseMaybeNumber(props.width) ?? 1200;
        const height = parseMaybeNumber(props.height) ?? 630;
        const alt = props.alt ?? "";

        // Support relative public assets (e.g. /projects/foo.png)
        // For remote images, Next/Image needs `remotePatterns` configured.
        return (
          <div className="my-6">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="rounded-xl border border-[var(--border-default)]"
            />
          </div>
        );
      },
    }),
    []
  );

  return (
    <article className={cn("prose-hades", className)}>
      <MDXRemote {...source} components={components} />
    </article>
  );
}

