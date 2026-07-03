import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbStructuredData } from "@/lib/seo/product-structured-data";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Calendar, Github, ExternalLink } from "lucide-react";
import { MdxRenderer } from "@/lib/content/mdxRenderer";


import { getContentItem, getContentSlugs, type ProjectFrontMatter } from "@/lib/server/internal/mdx";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getContentSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentItem("projects", slug);

  if (!project) {
    return buildMetadata({ title: "Project Not Found", path: "/projects" });
  }

  const fm = project.frontMatter as unknown as ProjectFrontMatter;

  return buildMetadata({
    title: fm.title,
    description: fm.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getContentItem("projects", slug);

  if (!project) {
    notFound();
  }

  const fm = project.frontMatter as unknown as ProjectFrontMatter;


  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: fm.title, url: `/projects/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbStructuredData }}
      />

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Link href="/projects" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="status" dot>
                {fm.status}
              </Badge>
              {fm.tags.map((tag) => (
                <Badge key={tag} variant="muted" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {fm.title}
            </h1>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              {fm.summary}
            </p>

            <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Calendar size={16} aria-hidden />
                <time dateTime={fm.date}>
                  {new Date(fm.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[rgba(255,255,255,0.08)]">
            {fm.repositoryUrl && (
              <a
                href={fm.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-[var(--text-primary)] hover:border-[rgba(210,107,255,0.3)] hover:text-[var(--accent-secondary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl transition-all text-sm font-medium"
              >
                <Github size={16} aria-hidden />
                Repository
              </a>
            )}
            {fm.liveDemoUrl && (
              <a
                href={fm.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-[var(--text-primary)] hover:border-[rgba(210,107,255,0.3)] hover:text-[var(--accent-secondary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl transition-all text-sm font-medium"
              >
                <ExternalLink size={16} aria-hidden />
                Live Demo
              </a>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <MdxRenderer source={project.content} />


          </div>

          <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex flex-wrap gap-2">
              {fm.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs tracking-wider uppercase text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded-full px-3 py-1 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
