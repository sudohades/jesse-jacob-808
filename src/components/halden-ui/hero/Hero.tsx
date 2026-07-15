import * as React from "react";
import { cn } from "@/platform/lib/cn";
import { Container } from "../layout/Container";
import { Heading } from "../typography/Heading";
import { Body } from "../typography/Body";
import { Eyebrow } from "../typography/Eyebrow";
import { HeroBackground } from "./HeroBackground";
import { HeroOverlay } from "./HeroOverlay";

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
  backgroundSrc?: string;
  align?: "left" | "center";
  minHeight?: string;
}


export function Hero({
  eyebrow,
  title,
  description,
  actions,
  meta,
  backgroundSrc,
  align = "left",
  minHeight = "min(92dvh, 900px)",
  className,
  ...props
}: HeroProps) {
  return (
    <section
      className={cn("relative isolate flex items-end overflow-hidden", className)}
      style={{ minHeight }}
      {...props}
    >
      <HeroBackground src={backgroundSrc} />
      <HeroOverlay />

      <Container className={cn("relative py-24 sm:py-32", align === "center" && "text-center")}>
        <div className={cn("flex flex-col gap-8", align === "center" && "items-center")}>
          {eyebrow && <Eyebrow index="01">{eyebrow}</Eyebrow>}
          <Heading level={1} gradient className={cn("max-w-4xl", align === "center" && "mx-auto")}>
            {title}
          </Heading>
          {description && (
            <Body size="lg" muted className={cn("max-w-2xl", align === "center" && "mx-auto")}>
              {description}
            </Body>
          )}
          {actions && <div className={cn("flex flex-wrap gap-3", align === "center" && "justify-center")}>{actions}</div>}
          {meta && <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[.14em] uppercase text-[var(--color-muted-foreground)]">{meta}</div>}
        </div>
      </Container>
    </section>
  );
}
