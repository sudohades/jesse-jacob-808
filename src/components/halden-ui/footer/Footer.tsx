import * as React from "react";
import { cn } from "@/platform/lib/cn";
import { Container } from "../layout/Container";

export interface FooterColumn {
  title: string;
  items: { label: string; href: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  wordmark?: string;
  tagline?: React.ReactNode;
  coordinates?: string;
  columns?: FooterColumn[];
  copyright?: React.ReactNode;
  meta?: React.ReactNode;
}

export function Footer({
  wordmark = "HALDEN",
  tagline,
  coordinates,
  columns = [],
  copyright,
  meta,
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn("hd-glass hd-glass--flat mt-32 border-t border-[var(--color-hairline)]", className)}
      {...props}
    >
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="hd-font-display text-lg tracking-wide">{wordmark}</div>
            {tagline && (
              <p className="mt-3 max-w-sm text-sm text-[var(--color-muted-foreground)]">
                {tagline}
              </p>
            )}
            {coordinates && (
              <div className="mt-6 flex items-center gap-3">
                <span className="hd-label-mono">Coordinates</span>
                <span className="hd-font-mono text-xs">{coordinates}</span>
              </div>
            )}
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="hd-label-mono">{col.title}</div>
              <ul className="mt-4 space-y-2">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="hd-amber-underline text-sm text-[var(--color-foreground)]/90 hover:text-[var(--color-foreground)]">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-hairline)] pt-6 text-xs text-[var(--color-muted-foreground)] sm:flex-row sm:items-center">
          {copyright && <div className="hd-font-mono">{copyright}</div>}
          {meta && <div className="hd-font-mono">{meta}</div>}
        </div>
      </Container>
    </footer>
  );
}
