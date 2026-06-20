import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProjectBySlug, getProjects } from "@/lib/projects/get-projects";
import { generateBreadcrumbStructuredData } from "@/lib/seo/product-structured-data";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Calendar, Github, ExternalLink } from "lucide-react";
import { serialize } from "next-mdx-remote/serialize";
import { MdxRendererClient } from "@/components/content/MdxRendererClient";

// Skip static generation to avoid SSR issues with client components
export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({ title: "Project Not Found", path: "/projects" });
  }

  return buildMetadata({
    title: project.frontMatter.title,
    description: project.frontMatter.summary,
    path: `/projects/${project.slug}`,
  });
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const mdxSource = await serialize(project.content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.frontMatter.title, url: `/projects/${project.slug}` },
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
                {project.frontMatter.status}
              </Badge>
              {project.frontMatter.tags.map((tag) => (
                <Badge key={tag} variant="muted" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {project.frontMatter.title}
            </h1>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              {project.frontMatter.summary}
            </p>

            <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Calendar size={16} aria-hidden />
                <time dateTime={project.frontMatter.date}>
                  {new Date(project.frontMatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[rgba(255,255,255,0.08)]">
            {project.frontMatter.repositoryUrl && (
              <a
                href={project.frontMatter.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-[var(--text-primary)] hover:border-[rgba(210,107,255,0.3)] hover:text-[var(--accent-secondary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl transition-all text-sm font-medium"
              >
                <Github size={16} aria-hidden />
                Repository
              </a>
            )}
            {project.frontMatter.liveDemoUrl && (
              <a
                href={project.frontMatter.liveDemoUrl}
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
            <MdxRendererClient source={mdxSource} />
          </div>

          <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex flex-wrap gap-2">
              {project.frontMatter.technologies.map((tech) => (
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
