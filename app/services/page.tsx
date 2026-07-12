import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/site/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { Panel } from "@/components/site/primitives/Panel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { CTAButton } from "@/components/site/CTAButton";

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Services" title="Engineering consultancy" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>DIAGNOSIS</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Failure analysis and root cause tracing across distributed systems.
                  Evidence-first investigations that convert uncertainty into design
                  decisions.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/services/packages" variant="outline" icon="none">
                    Service packages
                  </CTAButton>
                </div>
              </div>
            </Panel>

            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>ARCHITECTURE</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Systems design for reliability, deployability, and maintainability.
                  Clear interfaces, controlled change, and operational clarity.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/projects" variant="outline" icon="none">
                    See architecture work
                  </CTAButton>
                </div>
              </div>
            </Panel>

            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>AI INTEGRATION</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Pragmatic AI engineering: evaluation pipelines, safe rollout
                  strategies, and secure integration into production systems.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/resources" variant="outline" icon="none">
                    Read notes
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

