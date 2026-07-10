import { SiteShell } from "@/components/site/SiteShell";
import { CTAButton } from "@/components/site/CTAButton";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-3xl font-semibold md:text-5xl font-display tracking-wide">Projects</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Dummy placeholder content for the Projects page. To be replaced with my
          project portfolio and case studies.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton to="/projects/infrastructure" variant="outline">
            View Infrastructure Project
          </CTAButton>
          <CTAButton to="/projects/ai-systems" variant="outline">
            View AI Systems Project
          </CTAButton>
        </div>
      </div>
    </SiteShell>
  );
}

