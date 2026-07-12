import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/site/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { Panel } from "@/components/site/primitives/Panel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { CTAButton } from "@/components/site/CTAButton";

export default function ResourcesPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Resources" title="Engineering notes & templates" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <Panel>
              <div className="flex flex-col gap-6">
                <Metadata>GUIDES</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Deep technical writeups for infrastructure, systems diagnosis, and
                  AI engineering—focused on reproducible reasoning.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/resources/guides" variant="outline" icon="none">
                    Browse guides
                  </CTAButton>
                </div>
              </div>
            </Panel>

            <Panel>
              <div className="flex flex-col gap-6">
                <Metadata>TEMPLATES</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Practical starting points: evaluation checklists, runbook patterns,
                  and architecture documentation structures.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/resources/templates" variant="outline" icon="none">
                    Download templates
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

