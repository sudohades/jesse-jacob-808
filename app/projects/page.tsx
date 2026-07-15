import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/halden-ui/layout/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { GlassPanel } from "@/components/halden-ui/layout/GlassPanel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { Button } from "@/components/halden-ui/ui/Button";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Projects" title="Selected engineering work" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>INFRASTRUCTURE</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Reliability-first system design: operational correctness, safe
                  deployability, and observability that reduces time-to-diagnosis.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/projects/infrastructure">
                      Infrastructure case study
                    </a>
                  </Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>AI SYSTEMS</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Applied AI engineering with measurable outcomes: evaluation
                  pipelines, reliability under uncertainty, and secure integration.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/projects/ai-systems">
                      AI systems case study
                    </a>
                  </Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="h-full" padding="md">
              <div className="flex h-full flex-col gap-6">
                <Metadata>SYSTEMS</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Reverse engineering unfamiliar architectures and rebuilding clarity
                  into complex software behavior.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" asChild>
                    <a href="/resources">
                      Read engineering notes
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

