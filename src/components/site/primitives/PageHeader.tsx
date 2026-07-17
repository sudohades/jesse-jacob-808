import type { ReactNode } from "react";
import { Container } from "../../halden-ui/layout/Container";
import { Eyebrow } from "../../halden-ui/typography/Eyebrow";
import { Heading } from "../../halden-ui/typography/Heading";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  compact?: boolean;
  contained?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  lede,
  compact = false,
  contained = true,
}: PageHeaderProps) {
  const content = (
    <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-4">
        {eyebrow ? <Eyebrow index="">{eyebrow}</Eyebrow> : null}
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
  );

  return (
    <section className={compact ? "pb-8 pt-5 md:pb-10 md:pt-7" : "pb-12 pt-24 md:pb-16 md:pt-32"}>
      {contained ? <Container>{content}</Container> : content}
    </section>
  );
}

