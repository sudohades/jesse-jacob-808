import Link from "next/link";
import { ArrowLeft, Tag, Timer, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

type ArticleShellProps = {
  title: string;
  description?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  backHref?: string;
  children: React.ReactNode;
};

export function ArticleShell({
  title,
  description,
  date,
  readTime,
  tags,
  backHref,
  children,
}: ArticleShellProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      {backHref && (
        <div className="mb-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <ArrowLeft size={16} aria-hidden />
            Back
          </Link>
        </div>
      )}

      <header>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {date && (
              <Badge variant="muted">
                <span className="inline-flex items-center gap-2">
                  <Tag size={12} aria-hidden />
                  {date}
                </span>
              </Badge>
            )}
            {readTime && (
              <Badge variant="muted">
                <span className="inline-flex items-center gap-2">
                  <Timer size={12} aria-hidden />
                  {readTime}
                </span>
              </Badge>
            )}
          </div>

          <h1 className="text-display-sm font-bold tracking-tight text-[var(--text-primary)]">
            {title}
          </h1>

          {description && <p className="text-[var(--text-secondary)] text-base leading-relaxed">{description}</p>}

          {tags?.length ? (
            <div className="flex flex-wrap gap-2 mt-2" aria-label="Tags">
              {tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.65rem] tracking-wider uppercase text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded-full px-2.5 py-0.5 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className={cn("mt-10")}>{children}</div>

      <footer className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
          <BookOpen size={14} aria-hidden />
          Documentation → Learning
        </div>
      </footer>
    </section>
  );
}

