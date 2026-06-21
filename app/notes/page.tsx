import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllContent } from "@/lib/server/content/mdx";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title:       "Notes",
  description: "Concise technical notes — infrastructure patterns, Linux, and automation.",
  path:        "/notes",
});

export default function NotesPage() {
  const notes = getAllContent("notes");

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeader
            eyebrow="// notes"
            title="Practical notes."
            subtitle="Short, useful write-ups — problems I solved, patterns I reuse."
          />
        </div>

        {notes.length === 0 ? (
          <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
            No published notes found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {notes.map((n) => (
              <article key={n.slug} className="card-base p-6">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="muted">{n.frontMatter.date}</Badge>
                  <Link
                    href={`/notes/${n.slug}`}
                    className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                    aria-label={`Open note: ${n.frontMatter.title}`}
                  >
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>

                <h2 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  {n.frontMatter.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {n.frontMatter.description}
                </p>

                {n.frontMatter.readTime ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded-full px-2 py-0.5 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl">
                      {n.frontMatter.readTime}
                    </span>
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

