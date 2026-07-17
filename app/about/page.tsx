import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/halden-ui/layout/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { GlassPanel } from "@/components/halden-ui/layout/GlassPanel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { Divider } from "@/components/halden-ui/ui/Divider";
import { Button } from "@/components/halden-ui/ui/Button";
import { author } from "@/config";
import Link from "next/link";

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="About" title="Engineering philosophy" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">

            <div className="md:col-span-7">
              <GlassPanel padding="md">
                <div className="flex flex-col gap-6">
                  <Metadata>METHOD</Metadata>
                  <p className="text-muted-foreground leading-relaxed">
                    I design systems like engineering instruments: clear interfaces,
                    predictable behavior under load, and verifiable assumptions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    My work focuses on infrastructure reliability, systems
                    observability, and pragmatic AI integration—always grounded in
                    failure modes and operational reality.
                  </p>
                  <Divider className="bg-border" />
                  <p className="text-muted-foreground leading-relaxed">
                    The goal is simple: build what can be trusted, not what can be
                    demoed.
                  </p>
                </div>
              </GlassPanel>
            </div>

            <div className="md:col-span-5">
              <GlassPanel padding="md">
                <div className="flex flex-col gap-6">
                  <Metadata>CONTACT</Metadata>
                  <p className="text-muted-foreground leading-relaxed">
                    If you’re hiring for infrastructure, systems engineering, or
                    applied AI—and you care about evidence-driven architecture—reach
                    out.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button variant="outline" asChild>
                      <Link href={`mailto:${author.email}`}>
                        Email {author.name}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/projects">
                        See work
                      </Link>
                    </Button>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}


