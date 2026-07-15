import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/halden-ui/layout/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { GlassPanel } from "@/components/halden-ui/layout/GlassPanel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { Button } from "@/components/halden-ui/ui/Button";

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Services" title="Engineering consultancy" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>DIAGNOSIS</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Failure analysis and root cause tracing across distributed systems.
                  Evidence-first investigations that convert uncertainty into design
                  decisions.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/services/packages">
                      Service packages
                    </a>
                  </Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>ARCHITECTURE</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Systems design for reliability, deployability, and maintainability.
                  Clear interfaces, controlled change, and operational clarity.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/projects">
                      See architecture work
                    </a>
                  </Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>AI INTEGRATION</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Pragmatic AI engineering: evaluation pipelines, safe rollout
                  strategies, and secure integration into production systems.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/resources">
                      Read notes
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

