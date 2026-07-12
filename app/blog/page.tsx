import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/site/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { Panel } from "@/components/site/primitives/Panel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { CTAButton } from "@/components/site/CTAButton";

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Blog" title="Editorial engineering writing" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>LATEST</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Short, precise writeups on production debugging, architecture tradeoffs,
                  and practical systems design.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/blog/latest" variant="outline" icon="none">
                    View latest
                  </CTAButton>
                </div>
              </div>
            </Panel>

            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>SERIES</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Ongoing technical series: failure modes, reliability patterns, and
                  applied AI engineering.
                </p>
                <div className="mt-auto">
                  <CTAButton
                    to="/blog/categories"
                    variant="outline"
                    icon="none"
                  >
                    Browse categories
                  </CTAButton>
                </div>
              </div>
            </Panel>

            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>SUBSCRIBE</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Occasional technical notes—no spam, just engineered clarity.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/blog/subscribe" variant="outline" icon="none">
                    Subscribe
                  </CTAButton>
                </div>
              </div>
            </Panel>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

