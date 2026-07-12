import type { ReactNode } from "react";
import { Container } from "../Container";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:gap-12 items-start">
          <div className="md:col-span-4">
            {eyebrow ? (
              <Eyebrow index="">{eyebrow}</Eyebrow>
            ) : null}
          </div>
          <div className="md:col-span-8">
            {typeof title === "string" ? (
              <Heading level={1}>{title}</Heading>
            ) : (
              <div className="hd-h1">{title}</div>
            )}
            {lede ? (
              <p className="mt-8 max-w-2xl text-[18px] leading-[28px] text-muted-foreground md:text-[20px]">
                {lede}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}


