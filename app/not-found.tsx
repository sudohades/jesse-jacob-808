import { SiteShell } from "@/components/site/SiteShell";
import Link from "next/link";
import { CTAButton } from "@/components/site/CTAButton";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-rl pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-xl">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-primary">■</span>&nbsp;&nbsp;Error 404
          </div>
          <h1 className="display-xl">Not found</h1>
          <p className="mt-4 text-muted-foreground">
            The page you were looking for isn&apos;t in the system.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton to="/" variant="outline" icon="none">
              Return home
            </CTAButton>
            <CTAButton to="/projects" variant="outline" icon="none">
              View projects
            </CTAButton>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

