import { SiteShell } from "@/components/site/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-2xl font-semibold md:text-4xl">About</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Dummy placeholder content for the About page. To be replaced with my
          engineering philosophy, background, and approach.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-md border border-foreground/60 bg-background px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-foreground hover:text-background">
            Read the Full Story
          </button>
          <button className="rounded-md border border-foreground/60 bg-background px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-foreground hover:text-background">
            Contact Me
          </button>
        </div>
      </div>
    </SiteShell>
  );
}

