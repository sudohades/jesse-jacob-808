import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { Panel } from "@/components/site/primitives/Panel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { CTAButton } from "@/components/site/CTAButton";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Projects" title="Selected engineering work" />

      <section className="pb-24 md:pb-32">
        <div className="container-rl">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>INFRASTRUCTURE</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Reliability-first system design: operational correctness, safe
                  deployability, and observability that reduces time-to-diagnosis.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/projects/infrastructure" variant="outline" icon="none">
                    Infrastructure case study
                  </CTAButton>
                </div>
              </div>
            </Panel>

            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>AI SYSTEMS</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Applied AI engineering with measurable outcomes: evaluation
                  pipelines, reliability under uncertainty, and secure
                  integration.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/projects/ai-systems" variant="outline" icon="none">
                    AI systems case study
                  </CTAButton>
                </div>
              </div>
            </Panel>

            <Panel className="h-full">
              <div className="flex h-full flex-col gap-6">
                <Metadata>SYSTEMS</Metadata>
                <p className="text-muted-foreground leading-relaxed">
                  Reverse engineering unfamiliar architectures and rebuilding
                  clarity into complex software behavior.
                </p>
                <div className="mt-auto">
                  <CTAButton to="/resources" variant="outline" icon="none">
                    Read engineering notes
                  </CTAButton>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

