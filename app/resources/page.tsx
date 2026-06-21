import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllContent } from "@/lib/server/content/mdx";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title:       "Resources",
  description: "Checklists, cheat sheets, and quick-start guides for Linux and infrastructure.",
  path:        "/resources",
});

export default function ResourcesPage() {
  const items = getAllContent("resources");

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeader
            eyebrow="// resources"
            title="Reference kit."
            subtitle="Curated guides I use when deploying and debugging systems."
          />
        </div>

        {items.length === 0 ? (
          <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
            No published resources found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {items.map((i) => (
              <article key={i.slug} className="card-base p-6">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="muted">{i.frontMatter.date}</Badge>
                  <Link
                    href={`/resources/${i.slug}`}
                    className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                    aria-label={`Open resource: ${i.frontMatter.title}`}
                  >
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>

                <h2 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  {i.frontMatter.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {i.frontMatter.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

