import * as React from "react";
import { cn } from "@/platform/lib/cn";
import { Surface } from "../ui/Surface";
import { Heading } from "../typography/Heading";
import { Body } from "../typography/Body";
import { CodeLabel } from "../typography/CodeLabel";

export interface ServiceCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  code?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon?: React.ReactNode;
  tags?: string[];
  price?: { amount: number; currency: string };
}


export function ServiceCard({
  code, title, description, icon, tags, price, className, ...props
}: ServiceCardProps) {
  return (
    <Surface className={cn("hd-hover-lift group flex flex-col gap-5 p-6", className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        {icon && (
          <div className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-hairline)] bg-[var(--color-surface-2)]/60 text-[var(--color-accent)]">
            {icon}
          </div>
        )}
        {code && <CodeLabel prefix="§">{code}</CodeLabel>}
        {price && (
          <div className="ml-auto text-right">
            <div className="hd-label-mono">From</div>
            <div className="hd-font-display text-sm text-[var(--color-foreground)]">
              {new Intl.NumberFormat(undefined, { style: "currency", currency: price.currency }).format(price.amount)}
            </div>
          </div>
        )}
      </div>
      <Heading level={4}>{title}</Heading>
      <Body muted>{description}</Body>
      {tags && tags.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {tags.map((t) => (
            <li key={t} className="hd-font-mono rounded-full border border-[var(--color-hairline)] px-2 py-0.5 text-[10px] tracking-[.14em] uppercase text-[var(--color-muted-foreground)]">
              {t}
            </li>
          ))}
        </ul>
      )}
    </Surface>
  );
}
