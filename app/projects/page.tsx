import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { ProjectsSectionClient } from "@/components/sections/ProjectsSectionClient";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title:       "Projects",
  description: "A collection of infrastructure, automation, and web projects.",
  path:        "/projects",
});

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const res = await fetch(`${siteConfig.baseUrl}/api/content/projects?type=projects&all=true`, { cache: "no-store" });
  const projects = await res.json();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-display-sm font-bold text-[var(--text-primary)] tracking-tight mb-4">
        Projects
      </h1>
      <p className="text-[var(--text-secondary)] mb-12 max-w-xl">
        Infrastructure, automation, embedded systems, and web — built to solve real problems.
      </p>
      <ProjectsSectionClient projects={projects} />
    </section>
  );
}
