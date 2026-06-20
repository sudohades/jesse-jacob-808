import Link from "next/link";
import { ArrowRight, FileText, BookOpen, Wrench } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp } from "@/components/animations/FadeInUp";
import { getLatestContent } from "@/lib/content/get-latest-content";

const typeIcons: Record<string, React.ReactNode> = {
  blog: <FileText size={12} />,
  notes: <BookOpen size={12} />,
  "build-log": <Wrench size={12} />,
};

const typeLabels: Record<string, string> = {
  blog: "Blog",
  notes: "Notes",
  "build-log": "Build Log",
};

const typePaths: Record<string, string> = {
  blog: "/blog",
  notes: "/notes",
  "build-log": "/build-log",
};

export function LatestContent() {
  const items = getLatestContent(6);

  if (items.length === 0) return null;

  return (
    <section className="relative px-6 py-24" aria-labelledby="content-heading">
      <div className="mx-auto max-w-6xl">
        <div className="glow-line mb-16" aria-hidden />

        <FadeInUp>
          <SectionHeader
            eyebrow="// content"
            title="Latest content."
            subtitle="Recent articles, notes, and build logs from the workshop."
          />
        </FadeInUp>

        <FadeInUp delay={0.1} className="mt-12 flex flex-col divide-y divide-[rgba(255,255,255,0.08)]">
          {items.map((item) => (
            <Link
              key={`${item.type}-${item.slug}`}
              href={`${typePaths[item.type]}/${item.slug}`}
              className="group flex items-start justify-between gap-6 py-5 hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl -mx-4 px-4 rounded-lg transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] group-hover:border-[rgba(210,107,255,0.2)] group-hover:text-[var(--accent-secondary)] transition-colors">
                  {typeIcons[item.type]}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[0.6rem] text-[var(--text-muted)] uppercase tracking-wider">
                      {typeLabels[item.type]}
                    </span>
                    <span className="font-mono text-[0.6rem] text-[var(--text-muted)]">
                      {item.frontMatter.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--accent-secondary)] transition-colors">
                    {item.frontMatter.title}
                  </h3>

                  {item.frontMatter.description && (
                    <p className="mt-0.5 text-xs text-[var(--text-muted)] line-clamp-1">
                      {item.frontMatter.description}
                    </p>
                  )}
                </div>
              </div>
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" aria-hidden />
            </Link>
          ))}
        </FadeInUp>
      </div>
    </section>
  );
}
