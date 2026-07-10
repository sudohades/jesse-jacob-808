import { SiteShell } from "@/components/site/SiteShell";
import { InteractiveText } from "@/components/site/Accordion";

export default function HomePage() {
  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden rounded-xl">
          <img
            src="/hero-car.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          
          {/* Animated overlay with gradient */}
          <div className="hero-overlay absolute inset-0 z-10 bg-gradient-to-r from-transparent via-carbon-black-950/70 to-carbon-black-950" />
          
          <div className="relative z-20 flex h-full items-end px-6 pb-8 md:px-12 md:pb-10">
            <h1 className="max-w-4xl text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[0.95] text-white">
              I help engineering teams solve difficult infrastructure, systems, and AI
              engineering problems.
            </h1>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="container-rl py-16 md:py-24">
        <div className="space-y-8">
          <div>
            <InteractiveText title="Expertise">
              <p>
                I'm an infrastructure, systems, and AI engineer specializing in diagnosing complex software failures, reverse engineering unfamiliar architectures, and building reliable solutions from first principles.
              </p>
            </InteractiveText>
          </div>
          
          <div>
            <InteractiveText title="Approach">
              <p>
                Every project in this portfolio begins with understanding why a complex software system behaves the way it does.
                I investigate unfamiliar architectures, challenge assumptions through evidence, and trace failures back to their root cause before designing solutions that are reliable, maintainable, and well understood.
              </p>
            </InteractiveText>
          </div>
          
          <div>
            <InteractiveText title="Collaboration">
              <p>
                If you're an engineering manager hiring infrastructure, systems, or AI engineers, or a technical founder looking for someone to solve difficult engineering problems, you'll find examples of how I approach ambiguity, evaluate trade-offs, and deliver dependable solutions.
              </p>
              <p>
                If you think that approach could benefit your team or your next project, I'd be pleased to discuss it. You can reach me directly at jesse.jacob.808@gmail.com
              </p>
            </InteractiveText>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

