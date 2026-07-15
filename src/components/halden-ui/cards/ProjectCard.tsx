import Image from "next/image";
import * as React from "react";
import { cn } from "@/platform/lib/cn";
import { Surface } from "../ui/Surface";
import { Heading } from "../typography/Heading";
import { Body } from "../typography/Body";
import { CodeLabel } from "../typography/CodeLabel";
import { Badge } from "../ui/Badge";

export interface ProjectCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  image?: string;
  imageAlt?: string;
  code?: string;
  client?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tags?: string[];
  href?: string;
  status?: "live" | "shipped" | "wip" | "research";
  aspect?: string;
}


const statusTone = {
  live: "primary", shipped: "amber", wip: "accent", research: "neutral",
} as const;

export function ProjectCard({
  image, imageAlt = "", code, client, title, description, tags, href,
  status, aspect = "16 / 10", className, ...props
}: ProjectCardProps) {
  const Root: React.ElementType = href ? "a" : "div";
  return (
    <Surface
      as={Root}
      {...(href ? { href } : {})}
      className={cn("hd-hover-lift group block overflow-hidden", className)}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {image && (
        <div className="relative overflow-hidden border-b border-[var(--color-hairline)]" style={{ aspectRatio: aspect }}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            className="h-full w-full object-cover hd-transition group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(19,20,16,.5)_100%)]" />
          {status && (
            <div className="absolute left-4 top-4">
              <Badge tone={statusTone[status]} dot>{status}</Badge>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          {code && <CodeLabel prefix="//">{code}</CodeLabel>}
          {client && <span className="hd-label-mono">{client}</span>}
        </div>
        <Heading level={4}>{title}</Heading>
        {description && <Body muted>{description}</Body>}
        {tags && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li key={t} className="hd-font-mono rounded-full border border-[var(--color-hairline)] px-2 py-0.5 text-[10px] tracking-[.14em] uppercase text-[var(--color-muted-foreground)]">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Surface>
  );
}
