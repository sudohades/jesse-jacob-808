import { SiteShell } from "@/components/site/SiteShell";
import { CTAButton } from "@/components/site/CTAButton";

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-3xl font-semibold md:text-5xl font-display tracking-wide">About</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Dummy placeholder content for the About page. To be replaced with my
          engineering philosophy, background, and approach.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton to="/about/story" variant="outline">
            Read the Full Story
          </CTAButton>
          <CTAButton to="mailto:jesse.jacob.808@gmail.com" variant="outline">
            Contact Me
          </CTAButton>
        </div>
      </div>
    </SiteShell>
  );
}

