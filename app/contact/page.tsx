import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig }    from "@/lib/site-config";
import { Mail, Github, Linkedin } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title:       "Contact",
  description: "Get in touch.",
  path:        "/contact",
});

export default function ContactPage() {
  const { socials } = siteConfig;
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-display-sm font-bold text-[var(--text-primary)] tracking-tight mb-4">
        Work with me.
      </h1>
      <p className="text-[var(--text-secondary)] mb-12 max-w-lg">
        Open to infrastructure consulting, technical audits, and interesting build collaborations.
      </p>

      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${socials.email}`}
          className="card-base flex items-center gap-4 p-5 group"
        >
          <Mail size={16} className="text-[var(--accent-primary)]" aria-hidden />
          <div>
            <div className="text-sm font-medium text-[var(--text-primary)]">Email</div>
            <div className="text-xs text-[var(--text-muted)]">{socials.email}</div>
          </div>
        </a>
        <a
          href={socials.github} target="_blank" rel="noopener noreferrer"
          className="card-base flex items-center gap-4 p-5 group"
        >
          <Github size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" aria-hidden />
          <div>
            <div className="text-sm font-medium text-[var(--text-primary)]">GitHub</div>
            <div className="text-xs text-[var(--text-muted)]">{socials.github}</div>
          </div>
        </a>
        <a
          href={socials.linkedin} target="_blank" rel="noopener noreferrer"
          className="card-base flex items-center gap-4 p-5 group"
        >
          <Linkedin size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" aria-hidden />
          <div>
            <div className="text-sm font-medium text-[var(--text-primary)]">LinkedIn</div>
            <div className="text-xs text-[var(--text-muted)]">{socials.linkedin}</div>
          </div>
        </a>
      </div>
    </section>
  );
}
