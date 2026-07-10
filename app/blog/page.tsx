import { SiteShell } from "@/components/site/SiteShell";
import { CTAButton } from "@/components/site/CTAButton";

export default function BlogPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-3xl font-semibold md:text-5xl font-display tracking-wide">Blog</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Dummy placeholder content for the Blog page. To be replaced with my
          posts, writing cadence, and topic categories.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton to="/blog/latest" variant="outline">
            View Latest Post
          </CTAButton>
          <CTAButton to="/blog/subscribe" variant="outline">
            Subscribe for Updates
          </CTAButton>
        </div>
      </div>
    </SiteShell>
  );
}

