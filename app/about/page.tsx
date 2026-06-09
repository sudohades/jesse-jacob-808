import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig }    from "@/lib/site-config";
import { AboutEasterEgg } from "@/components/sections/AboutEasterEgg";


export const metadata: Metadata = buildMetadata({
  title:       "About",
  description: `About ${siteConfig.name} — Linux systems engineer and builder.`,
  path:        "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-display-sm font-bold text-[var(--text-primary)] tracking-tight">
          About
        </h1>
        <div className="sm:pb-1">
          <AboutEasterEgg />
        </div>
      </div>
      <div className="prose-hades mt-6">

  <p>
    My entry into Linux started the same way many engineers discover it:
    curiosity, frustration, and the realization that understanding a system
    is often more valuable than simply using it.
  </p>

  <p>
    What began as experimenting with distributions and command-line tools
    eventually evolved into managing servers, automating repetitive work,
    troubleshooting production issues, and designing systems that could
    continue operating long after the initial deployment.
  </p>

  <p>
    Over time I became increasingly interested in infrastructure rather than
    applications alone. Reliable systems depend on far more than code:
    networking, observability, deployment strategy, backups, monitoring,
    security, and documentation all play critical roles.
  </p>

  <p>
    Today most of my work revolves around Linux administration,
    infrastructure automation, VPS management, embedded systems,
    and full-stack platforms that integrate with real-world services.
  </p>

  <p>
    I maintain this site as a public engineering notebook. Build logs,
    notes, resources, and project writeups serve both as documentation
    and as a record of lessons learned while solving practical problems.
  </p>

  <p>
    My current interests include automation-first operations,
    self-hosted infrastructure, embedded networking,
    fintech platforms, observability, and scalable deployment workflows.
  </p>

</div>
    </section>
  );
}
