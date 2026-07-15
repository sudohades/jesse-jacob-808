import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/halden-ui/layout/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { GlassPanel } from "@/components/halden-ui/layout/GlassPanel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { Button } from "@/components/halden-ui/ui/Button";

export default function ResourcesPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Resources" title="Engineering notes & templates" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <GlassPanel padding="md">
              <div className="flex flex-col gap-6">
                <Metadata>GUIDES</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Deep technical writeups for infrastructure, systems diagnosis, and
                  AI engineering—focused on reproducible reasoning.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/resources/guides">
                      Browse guides
                    </a>
                  </Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel padding="md">
              <div className="flex flex-col gap-6">
                <Metadata>TEMPLATES</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Practical starting points: evaluation checklists, runbook patterns,
                  and architecture documentation structures.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/resources/templates">
                      Download templates
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

