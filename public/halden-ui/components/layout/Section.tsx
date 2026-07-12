import * as React from "react";
import { cn } from "../../lib/cn";
import { Container, type ContainerProps } from "./Container";
import { Eyebrow } from "../typography/Eyebrow";
import { Heading } from "../typography/Heading";
import { Body } from "../typography/Body";

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {

  id?: string;
  eyebrow?: React.ReactNode;
  eyebrowIndex?: number | string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  containerWidth?: ContainerProps["width"];
  bleed?: boolean;
}


export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, eyebrow, eyebrowIndex, title, description, containerWidth = "xl", bleed, className, children, ...props }, ref) => (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative py-24 sm:py-32",
        bleed ? "" : "border-t border-[var(--color-hairline)]",
        className
      )}
      {...props}
    >
      <Container width={containerWidth}>
        {(eyebrow || title || description) && (
          <header className="mb-14 flex flex-col gap-4 sm:mb-20">
            {eyebrow && <Eyebrow index={eyebrowIndex}>{eyebrow}</Eyebrow>}
            {title && <Heading level={2} gradient className="max-w-3xl">{title}</Heading>}
            {description && (
              <Body size="lg" muted className="max-w-2xl">{description}</Body>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  )
);
Section.displayName = "Section";
