import { SiteShell } from "@/components/site/SiteShell";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-2xl font-semibold md:text-4xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Dummy placeholder content for the Projects page. To be replaced with my
          project portfolio and case studies.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-md border border-border bg-secondary/50 px-4 py-2 text-xs uppercase tracking-[0.22em] transition-all hover:border-border hover:bg-secondary hover:text-foreground">
            View Project #1
          </button>
          <button className="rounded-md border border-border bg-secondary/50 px-4 py-2 text-xs uppercase tracking-[0.22em] transition-all hover:border-border hover:bg-secondary hover:text-foreground">
            View Project #2
          </button>
        </div>
      </div>
    </SiteShell>
  );
}

