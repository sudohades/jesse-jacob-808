import { SiteShell } from "@/components/site/SiteShell";
import { Cpu, Target, Users } from "lucide-react";

export default function HomePage() {
  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
          <img
            src="/hero-car.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          
          {/* Animated overlay with gradient */}
          <div className="hero-overlay absolute inset-0 z-10 bg-gradient-to-r from-transparent via-carbon-black-950/70 to-carbon-black-950" />
          
          <div className="relative z-20 flex h-full items-end px-6 pb-8 md:px-12 md:pb-10">
            <h1 className="max-w-4xl text-[clamp(1.5rem,3vw,3rem)] md:text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[0.95] text-white">
              I help engineering teams solve difficult infrastructure, systems, and AI
              engineering problems.
            </h1>
          </div>
        </div>
      </section>
      
      {/* Content Section - Grid Layout */}
      <section className="container-rl py-8 md:py-16">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:h-[calc(100vh-200px)]">
          {/* Expertise Card */}
          <div className="group relative h-[30vh] md:h-full border-b md:border-r border-dark-amethyst-500/30 bg-carbon-black-950/50 p-6 hover:bg-carbon-black-950/70">
            <div className="flex h-full flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-display text-lg font-semibold text-foreground">Expertise</h2>
                <Cpu className="h-4 w-4 text-bright-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:text-dark-amethyst-500 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
              </div>
              <p className="text-sm text-muted-foreground">
                I'm an infrastructure, systems, and AI engineer specializing in diagnosing complex software failures, reverse engineering unfamiliar architectures, and building reliable solutions from first principles.
              </p>
            </div>
          </div>
          
          {/* Approach Card */}
          <div className="group relative h-[30vh] md:h-full border-b md:border-r border-dark-amethyst-500/30 bg-carbon-black-950/50 p-6 hover:bg-carbon-black-950/70">
            <div className="flex h-full flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-display text-lg font-semibold text-foreground">Approach</h2>
                <Target className="h-4 w-4 text-bright-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:text-dark-amethyst-500 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
              </div>
              <p className="text-sm text-muted-foreground">
                Every project in this portfolio begins with understanding why a complex software system behaves the way it does.
                I investigate unfamiliar architectures, challenge assumptions through evidence, and trace failures back to their root cause before designing solutions that are reliable, maintainable, and well understood.
              </p>
            </div>
          </div>
          
          {/* Collaboration Card */}
          <div className="group relative h-[30vh] md:h-full bg-carbon-black-950/50 p-6 hover:bg-carbon-black-950/70">
            <div className="flex h-full flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-display text-lg font-semibold text-foreground">Collaboration</h2>
                <Users className="h-4 w-4 text-bright-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:text-dark-amethyst-500 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
              </div>
              <p className="text-sm text-muted-foreground">
                If you're an engineering manager hiring infrastructure, systems, or AI engineers, or a technical founder looking for someone to solve difficult engineering problems, you'll find examples of how I approach ambiguity, evaluate trade-offs, and deliver dependable solutions.
              </p>
              <p className="text-sm text-muted-foreground">
                If you think that approach could benefit your team or your next project, I'd be pleased to discuss it. You can reach me directly at jesse.jacob.808@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

