import type { ReactNode } from "react";
import { Container } from "../Container";
import { Eyebrow } from "./Eyebrow";

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
              <Eyebrow>
                <span className="text-bright-amber-500">■</span>&nbsp;&nbsp;{eyebrow}
              </Eyebrow>
            ) : null}
          </div>
          <div className="md:col-span-8">
            <h1 className="display-xl">{title}</h1>
            {lede ? <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">{lede}</p> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

