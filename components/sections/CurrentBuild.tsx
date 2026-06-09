import { Activity } from "lucide-react";
import { Badge }         from "@/components/ui/Badge";
import { FadeInUp }      from "@/components/animations/FadeInUp";
import { siteConfig }   from "@/lib/site-config";

export function CurrentBuild() {
  const { currentBuild } = siteConfig;

  return (
    <section className="relative px-6 py-16" aria-labelledby="current-build-heading">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <div className="card-base relative overflow-hidden p-8 md:p-10">
            {/* Background accent */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(210,107,255,0.06), transparent)",
              }}

            />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-4">
                {/* Label */}
                <div className="flex items-center gap-2.5">
                  <Activity size={14} className="text-[var(--accent-primary)]" aria-hidden />
                  <span className="mono-tag" id="current-build-heading">Currently Building</span>
                </div>

                {/* Title & description */}
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
                    {currentBuild.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                    {currentBuild.description}
                  </p>
                </div>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2" aria-label="Tech stack">
                  {currentBuild.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[0.65rem] tracking-wider uppercase text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded-full px-2.5 py-0.5 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status badge */}
              <div className="flex flex-row md:flex-col items-start gap-3">
                <Badge variant="status" dot>
                  {currentBuild.status}
                </Badge>
                <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
                  Since {currentBuild.startedAt}
                </span>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
