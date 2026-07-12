import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/site/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { Panel } from "@/components/site/primitives/Panel";
import { Metadata } from "@/components/site/primitives/Metadata";
import { Divider } from "@/components/site/primitives/Divider";
import { CTAButton } from "@/components/site/CTAButton";

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="About" title="Engineering philosophy" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">

            <div className="md:col-span-7">
              <Panel>
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
              </Panel>
            </div>

            <div className="md:col-span-5">
              <Panel>
                <div className="flex flex-col gap-6">
                  <Metadata>CONTACT</Metadata>
                  <p className="text-muted-foreground leading-relaxed">
                    If you’re hiring for infrastructure, systems engineering, or
                    applied AI—and you care about evidence-driven architecture—reach
                    out.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <CTAButton
                      to="mailto:jesse.jacob.808@gmail.com"
                      variant="outline"
                      icon="none"
                    >
                      Email Jesse
                    </CTAButton>
                    <CTAButton to="/projects" variant="outline" icon="none">
                      See work
                    </CTAButton>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}


