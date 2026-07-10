import { SiteShell } from "@/components/site/SiteShell";

export default function ServicesPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-2xl font-semibold md:text-4xl">Services</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Dummy placeholder content for the Services page. To be replaced with
          how I apply my skills for others (offerings, deliverables, process).
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-md border border-border bg-secondary/50 px-4 py-2 text-xs uppercase tracking-[0.22em] transition-all hover:border-border hover:bg-secondary hover:text-foreground">
            Request a Consultation
          </button>
          <button className="rounded-md border border-border bg-secondary/50 px-4 py-2 text-xs uppercase tracking-[0.22em] transition-all hover:border-border hover:bg-secondary hover:text-foreground">
            See Service Packages
          </button>
        </div>
      </div>
    </SiteShell>
  );
}

