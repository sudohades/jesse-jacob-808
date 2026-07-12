import { SiteShell } from "@/components/site/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-rl pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-2xl">
          <h1 className="hd-h2">Page not found</h1>
          <p className="hd-body mt-4 text-muted-foreground">
            The page you’re looking for doesn’t exist.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}

