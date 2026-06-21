import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllContent } from "@/lib/server/content/mdx";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title:       "Blog",
  description: "Long-form technical writing on Linux, automation, DevOps, and systems.",
  path:        "/blog",
});

export default function BlogPage() {
  const posts = getAllContent("blog");

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeader
            eyebrow="// blog"
            title="Engineering journal."
            subtitle="Long-form entries: problem → solution → docs → lessons."
          />
        </div>

        {posts.length === 0 ? (
          <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
            No published blog posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {posts.map((p) => (
              <article key={p.slug} className="card-base p-6 hover:cursor-pointer group">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="muted">{p.frontMatter.date}</Badge>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors"
                    aria-label={`Open blog post: ${p.frontMatter.title}`}
                  >
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>

                <h2 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  {p.frontMatter.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {p.frontMatter.description}
                </p>

                {p.frontMatter.readTime ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded-full px-2 py-0.5 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl">
                      {p.frontMatter.readTime}
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

