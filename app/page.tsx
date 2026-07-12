import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/site/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { Heading } from "@/components/site/primitives/Heading";
import { Panel } from "@/components/site/primitives/Panel";
import { Divider } from "@/components/site/primitives/Divider";
import { Metadata } from "@/components/site/primitives/Metadata";

export default function HomePage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[52dvh] min-h-[420px] max-h-[640px] overflow-hidden">
          <img
            src="/Engineering_Lab_Hero_Server_Rack.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* static overlay (editorial calm) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-carbon-black-950/60 to-carbon-black-950" />

          <div className="relative z-20 flex h-full items-end px-6 pb-10 md:px-12 md:pb-16">
            <div className="max-w-4xl">
              <Eyebrow className="mb-6">
                <span className="text-bright-amber-500">■</span>&nbsp;&nbsp;Infrastructure & Systems Engineer | Linux Systems | Automation | Technical Research
              </Eyebrow>
              <Heading level={1}>
                I help engineering teams solve difficult infrastructure, systems, and AI engineering problems.
              </Heading>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial panels */}
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            <div className="md:border-r md:border-border md:pr-10">
              <Panel className="h-full border-none bg-transparent">
                <Metadata className="mb-4">EXPERTISE</Metadata>

                <p className="hd-body mt-0">
                  I specialize in diagnosing complex software failures, reverse engineering unfamiliar architectures, and building reliable solutions from first principles.
                </p>

              </Panel>
            </div>

            <div className="md:border-r md:border-border md:pr-10">
              <Panel className="h-full border-none bg-transparent">
                <Metadata className="mb-4">APPROACH</Metadata>

                <p className="hd-body mt-0">
                  Each project begins with understanding why a complex system behaves the way it does. I investigate unfamiliar architectures, validate assumptions with evidence, trace failures to their root cause, and then design solutions that are reliable, maintainable, and well understood.
                </p>

              </Panel>
            </div>

            <div>
              <Panel className="h-full border-none bg-transparent">
                <Metadata className="mb-4">COLLABORATION</Metadata>

                <p className="hd-body mt-0">
                  If you’re an engineering manager hiring infrastructure, systems, or AI engineers—or a technical founder looking for someone to solve difficult engineering problems—you’ll find examples of how I approach ambiguity, evaluate trade-offs, and deliver dependable solutions.
                </p>
                <p className="hd-body mt-4">
                  If that approach could help your team, reach me at
                  <span className="ml-1 hd-font-mono">jesse.jacob.808@gmail.com</span>.
                </p>

              </Panel>
            </div>
          </div>

          <div className="mt-14 hidden md:block">
            <Divider className="opacity-60" />
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}



