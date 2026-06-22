import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectsSectionClient } from "./ProjectsSectionClient";
import { siteConfig } from "@/lib/site-config";

export async function ProjectsSection() {
  const res = await fetch(`${siteConfig.baseUrl}/api/content/projects?type=projects&all=true`, { cache: "no-store" });
  const allProjects = await res.json();
  const projects = allProjects.filter((p: any) => p.frontMatter.status === "active" || p.frontMatter.status === "ongoing").slice(0, 6);

  return (
    <section className="relative px-6 py-24" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl">
        <div className="glow-line mb-16" aria-hidden />

        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            eyebrow="// projects"
            title="Featured work."
            subtitle="Selected projects across embedded systems, fintech, and infrastructure."
          />

          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors font-medium whitespace-nowrap"
          >
            All projects <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        <ProjectsSectionClient projects={projects} />
      </div>
    </section>
  );
}
