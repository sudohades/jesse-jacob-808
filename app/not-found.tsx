import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mono-label mb-6 text-muted-foreground">
            <span className="text-primary">■</span>&nbsp;&nbsp;Error 404 · Off Track
          </div>
          <h1 className="display-xl">404</h1>
          <p className="mt-4 text-muted-foreground">
            The page you were looking for isn&apos;t in the paddock.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 border border-border bg-secondary/50 px-6 py-3 text-xs uppercase tracking-[0.22em] transition-all hover:border-border hover:bg-secondary hover:text-foreground"
          >
            Return home
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
