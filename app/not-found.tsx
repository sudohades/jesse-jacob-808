import Link from "next/link";
import { CTAButton } from "@/components/site/CTAButton";
import { SiteShell } from "@/components/site/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="flex min-h-[60dvh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mono-label mb-6 text-muted-foreground">
            <span className="text-primary">■</span>&nbsp;&nbsp;Error 404 · Off Track
          </div>
          <h1 className="display-xl">404</h1>
          <p className="mt-4 text-muted-foreground">
            The page you were looking for isn&apos;t in the paddock.
          </p>
          <CTAButton to="/" variant="outline">
            Return home
          </CTAButton>
        </div>
      </div>
    </SiteShell>
  );
}
