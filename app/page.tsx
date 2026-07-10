import { SiteShell } from "@/components/site/SiteShell";
import { Cpu, Target, Users } from "lucide-react";

export default function HomePage() {
  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[55dvh] min-h-[450px] max-h-[700px] overflow-hidden">
          <img
            src="/hero-car.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          
          {/* Animated overlay with gradient */}
          <div className="hero-overlay absolute inset-0 z-10 bg-gradient-to-r from-transparent via-carbon-black-950/70 to-carbon-black-950" />
          
          <div className="relative z-20 flex h-full items-end px-6 pb-12 md:px-12 md:pb-16">
            <h1 className="max-w-4xl text-[clamp(1.75rem,4vw,3.5rem)] md:text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.1] text-white">
              I help engineering teams solve difficult infrastructure, systems, and AI
              engineering problems.
            </h1>
          </div>
        </div>
      </section>
      
      {/* Content Section - Grid Layout */}
      <section className="container-rl py-12 md:py-16">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:h-[calc(100dvh-200px)]">
          {/* Expertise Card */}
          <div className="group relative h-[35dvh] md:h-full seam-divider seam-divider-h md:seam-divider-v glass-matte p-8 transition-all duration-300 hover:shadow-card">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-display text-lg font-semibold text-foreground tracking-wide">Expertise</h2>
                <Cpu className="h-4 w-4 text-muted-foreground transition-all duration-300 ease-out group-hover:text-primary group-hover:drop-shadow-[0_0_12px_rgba(8,179,247,0.5)]" />
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                I'm an infrastructure, systems, and AI engineer specializing in diagnosing complex software failures, reverse engineering unfamiliar architectures, and building reliable solutions from first principles.
              </p>
            </div>
          </div>
          
          {/* Approach Card */}
          <div className="group relative h-[35dvh] md:h-full seam-divider seam-divider-h md:seam-divider-v glass-matte p-8 transition-all duration-300 hover:shadow-card">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-display text-lg font-semibold text-foreground tracking-wide">Approach</h2>
                <Target className="h-4 w-4 text-muted-foreground transition-all duration-300 ease-out group-hover:text-primary group-hover:drop-shadow-[0_0_12px_rgba(8,179,247,0.5)]" />
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Every project in this portfolio begins with understanding why a complex software system behaves the way it does.
                I investigate unfamiliar architectures, challenge assumptions through evidence, and trace failures back to their root cause before designing solutions that are reliable, maintainable, and well understood.
              </p>
            </div>
          </div>
          
          {/* Collaboration Card */}
          <div className="group relative h-[35dvh] md:h-full glass-matte p-8 transition-all duration-300 hover:shadow-card">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-display text-lg font-semibold text-foreground tracking-wide">Collaboration</h2>
                <Users className="h-4 w-4 text-muted-foreground transition-all duration-300 ease-out group-hover:text-primary group-hover:drop-shadow-[0_0_12px_rgba(8,179,247,0.5)]" />
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                If you're an engineering manager hiring infrastructure, systems, or AI engineers, or a technical founder looking for someone to solve difficult engineering problems, you'll find examples of how I approach ambiguity, evaluate trade-offs, and deliver dependable solutions.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                If you think that approach could benefit your team or your next project, I'd be pleased to discuss it. You can reach me directly at jesse.jacob.808@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

