import * as React from "react";
import { cn } from "../../lib/cn";
import { Surface } from "../ui/Surface";
import { CodeLabel } from "../typography/CodeLabel";

export interface ResourceCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  kind?: "paper" | "log" | "note" | "talk" | "spec";
  title: React.ReactNode;
  summary?: React.ReactNode;
  date?: string;
  readingTime?: string;
  href?: string;
}


export function ResourceCard({
  kind = "note", title, summary, date, readingTime, href, className, ...props
}: ResourceCardProps) {
  const Root: React.ElementType = href ? "a" : "div";
  return (
    <Surface
      as={Root}
      variant="soft"
      {...(href ? { href } : {})}
      className={cn("group flex flex-col gap-3 p-5 hd-transition hover:border-[var(--color-border)]", className)}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      <div className="flex items-center justify-between">
        <CodeLabel prefix="›">{kind}</CodeLabel>
        {date && <span className="hd-label-mono">{date}</span>}
      </div>
      <h3 className="hd-h5 hd-amber-underline w-fit">{title}</h3>
      {summary && <p className="hd-body text-[var(--color-muted-foreground)]">{summary}</p>}
      {readingTime && (
        <div className="mt-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[var(--color-hairline)]" />
          <span className="hd-label-mono">{readingTime}</span>
        </div>
      )}
    </Surface>
  );
}
