import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/halden-ui/layout/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { GlassPanel } from "@/components/halden-ui/layout/GlassPanel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { Button } from "@/components/halden-ui/ui/Button";

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Blog" title="Editorial engineering writing" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>LATEST</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Short, precise writeups on production debugging, architecture tradeoffs,
                  and practical systems design.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/blog/latest">
                      View latest
                    </a>
                  </Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>SERIES</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Ongoing technical series: failure modes, reliability patterns, and
                  applied AI engineering.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/blog/categories">
                      Browse categories
                    </a>
                  </Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>SUBSCRIBE</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Occasional technical notes—no spam, just engineered clarity.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/blog/subscribe">
                      Subscribe
                    </a>
                  </Button>
                </div>
              </div>
            </GlassPanel>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

