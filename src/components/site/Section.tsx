import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  eyebrow?: string;
  index?: string;
  title?: ReactNode;
  lede?: ReactNode;
  bare?: boolean;
};

/**
 * Consistent editorial section wrapper: mono eyebrow + index counter on
 * the left column, large title and lede stacked in the main column.
 */
export function Section({
  eyebrow,
  index,
  title,
  lede,
  bare,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("relative py-24 md:py-32", className)} {...props}>
      <Container>
        {(eyebrow || title || lede) && !bare && (
          <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              {index && (
                <div className="mono-label mb-4 text-titanium">
                  <span className="text-redline">■</span>&nbsp;&nbsp;{index}
                </div>
              )}
              {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            </div>
            <div className="md:col-span-8">
              {title && <h2 className="display-lg text-foreground">{title}</h2>}
              {lede && (
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                  {lede}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
