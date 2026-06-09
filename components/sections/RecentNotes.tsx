import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp }      from "@/components/animations/FadeInUp";

// Placeholder notes — replace with MDX-driven content loader
const PLACEHOLDER_NOTES = [
  {
    slug: "systemd-service-hardening",
    title: "Systemd Service Hardening Checklist",
    excerpt: "A practical baseline for reducing service exposure and improving resilience.",
    date: "2026-06",
    readTime: "7 min",
  },

  {
    slug: "journalctl-production-debugging",
    title: "Using journalctl for Production Debugging",
    excerpt: "Patterns that consistently reduce investigation time during incidents.",
    date: "2026-06",
    readTime: "6 min",
  },

  {
    slug: "docker-image-hygiene",
    title: "Docker Image Hygiene and Operational Safety",
    excerpt: "Reducing attack surface while improving deployment speed.",
    date: "2026-06",
    readTime: "8 min",
  },
];

export function RecentNotes() {
  return (
    <section className="relative px-6 py-24" aria-labelledby="notes-heading">
      <div className="mx-auto max-w-6xl">
        <div className="glow-line mb-16" aria-hidden />

        <FadeInUp className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            eyebrow="// notes"
            title="Recent notes."
            subtitle="Short-form technical writing — things worth documenting."
          />

          <Link
            href="/notes"
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors font-medium whitespace-nowrap"
          >
            All notes <ArrowRight size={14} aria-hidden />

          </Link>
        </FadeInUp>

        <FadeInUp delay={0.1} className="mt-12 flex flex-col divide-y divide-[rgba(255,255,255,0.08)]">
          {PLACEHOLDER_NOTES.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group flex items-start justify-between gap-6 py-5 hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl -mx-4 px-4 rounded-lg transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] group-hover:border-[rgba(210,107,255,0.2)] group-hover:text-[var(--accent-secondary)] transition-colors">
                  <FileText size={11} aria-hidden />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--accent-secondary)] transition-colors">
                    {note.title}
                  </h3>

                  <p className="mt-0.5 text-xs text-[var(--text-muted)] line-clamp-1">
                    {note.excerpt}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-3 text-[var(--text-muted)]">
                <span className="font-mono text-[0.65rem]">{note.readTime}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              </div>
            </Link>
          ))}
        </FadeInUp>
      </div>
    </section>
  );
}
