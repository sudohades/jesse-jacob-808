import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { getAllContent } from "@/lib/server/internal/mdx";

export const metadata: Metadata = buildMetadata({
  title:       "Build Log",
  description: "Authentic build and deployment notes — commands, configs, and lessons learned.",
  path:        "/build-log",
});

export default async function BuildLogPage() {
  const logs = getAllContent("build-log");

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeader
            eyebrow="// build log"
            title="Hands-on builds."
            subtitle="Deployments, configs, automation runs — documented like I actually did them."
          />
        </div>

        {logs.length === 0 ? (
          <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
            No published build logs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
             {logs.map((l: any) => (
              <article key={l.slug} className="card-base p-6">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="muted">{l.frontMatter.date}</Badge>
                  <Link
                    href={`/build-log/${l.slug}`}
                    className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                    aria-label={`Open build log: ${l.frontMatter.title}`}
                  >
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>

                <h2 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  {l.frontMatter.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {l.frontMatter.description}
                </p>

                {l.frontMatter.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {l.frontMatter.tags.map((t: any) => (
                      <span
                        key={t}
                        className="font-mono text-[0.6rem] tracking-wider uppercase text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded-full px-2 py-0.5 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

