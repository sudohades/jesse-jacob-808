import { Container } from "./Container";

type Props = {
  eyebrow: string;
  title: string;
  lede?: string;
};

export function PageHero({ eyebrow, title, lede }: Props) {
  return (
    <section className="relative border-b border-border pt-40 pb-24 md:pt-48 md:pb-32">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="mono-label mb-4 text-titanium">
              <span className="text-redline">■</span>&nbsp;&nbsp;{eyebrow}
            </div>
          </div>
          <div className="md:col-span-8">
            <h1 className="display-xl text-foreground">{title}</h1>
            {lede && (
              <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {lede}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
