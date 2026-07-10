import { SiteShell } from "@/components/site/SiteShell";
import { CTAButton } from "@/components/site/CTAButton";

export default function ResourcesPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-3xl font-semibold md:text-5xl font-display tracking-wide">Resources</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Dummy placeholder content for the Resources page. To be replaced with
          guides, templates, tools, or learning materials that I will share.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton to="/resources/guides" variant="outline">
            Browse Guides
          </CTAButton>
          <CTAButton to="/resources/templates" variant="outline">
            Download Template
          </CTAButton>
        </div>
      </div>
    </SiteShell>
  );
}

