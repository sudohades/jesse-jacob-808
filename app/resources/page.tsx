import { SiteShell } from "@/components/site/SiteShell";

export default function ResourcesPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-2xl font-semibold md:text-4xl">Resources</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Dummy placeholder content for the Resources page. To be replaced with
          guides, templates, tools, or learning materials that I will share.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-md border border-foreground/60 bg-background px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-foreground hover:text-background">
            Browse Guides
          </button>
          <button className="rounded-md border border-foreground/60 bg-background px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-foreground hover:text-background">
            Download Template
          </button>
        </div>
      </div>
    </SiteShell>
  );
}

