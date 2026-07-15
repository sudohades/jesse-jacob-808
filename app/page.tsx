import Image from "next/image";
import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/halden-ui/layout/Container";
import { Eyebrow } from "@/components/halden-ui/typography/Eyebrow";
import { Heading } from "@/components/halden-ui/typography/Heading";
import { GlassPanel } from "@/components/halden-ui/layout/GlassPanel";
import { Divider } from "@/components/halden-ui/ui/Divider";
import { Metadata } from "@/components/site/primitives/Metadata";
import { author } from "@/config";


export default function HomePage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[45dvh] min-h-[360px] max-h-[520px] overflow-hidden">

          {/* Background Image */}
          <Image
            src="/hero.jpg"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />

          {/* Primary overlay */}
          <div
            className="
              absolute inset-0 z-10
              bg-gradient-to-t
              from-[var(--hero-overlay-bottom)]
              via-[var(--hero-overlay-middle)]
              to-[var(--hero-overlay-top)]
            "
          />

          {/* Secondary overlay behind content */}
          <div
            className="
              absolute inset-0 z-10
              bg-[radial-gradient(circle_at_30%_65%,var(--hero-overlay-focus)_0%,transparent_65%)]
            "
          />

          {/* Content */}
          <div
            className="
              relative z-20
              flex h-full items-end
              px-6 pb-10
              md:px-12 md:pb-14
            "
          >
            <div className="max-w-3xl">

              <Eyebrow className="mb-5">
                <span className="text-[var(--hero-accent)]">■</span>
                <span className="ml-3">
                  Infrastructure & Systems Engineer |
                  Linux Systems |
                  Automation |
                  Technical Research
                </span>
              </Eyebrow>

              <Heading
                level={1}
                gradient
                className="max-w-5xl"
              >


                I help engineering teams solve difficult
                infrastructure, systems, and AI engineering
                problems.
              </Heading>

            </div>
            </div>

          </div>
        </section>

      {/* Editorial panels */}
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            <div>
              <GlassPanel className="h-full border-none bg-transparent" padding="lg">
                <Metadata className="mb-4">EXPERTISE</Metadata>

                <p className="hd-body mt-0">
                  I specialize in diagnosing complex software failures, reverse engineering unfamiliar architectures, and building reliable solutions from first principles.
                </p>

              </GlassPanel>
            </div>

            <div>
              <GlassPanel className="h-full border-none bg-transparent" padding="lg">
                <Metadata className="mb-4">APPROACH</Metadata>

                <p className="hd-body mt-0">
                  Each project begins with understanding why a complex system behaves the way it does. 
                  I investigate unfamiliar architectures, validate assumptions with evidence, trace failures to their root cause, and then design solutions that are reliable, maintainable, and well understood.
                </p>

              </GlassPanel>
            </div>

            <div>
              <GlassPanel className="h-full border-none bg-transparent" padding="lg">
                <Metadata className="mb-4">COLLABORATION</Metadata>

                <p className="hd-body mt-0">
                  If you’re an engineering manager hiring infrastructure, systems, or AI engineers, or a technical founder looking for someone to solve difficult engineering problems, you’ll find examples of how I approach ambiguity, evaluate trade-offs, and deliver dependable solutions.
                </p>
                <p className="hd-body mt-4">
                  If that approach could help your team, reach me at
                </p>
                <a href={`mailto:${author.email}`} className="mt-2 inline-block hd-font-mono break-all text-[var(--hero-accent)]">
                  {author.email}
                </a>

              </GlassPanel>
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



