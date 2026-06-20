"use client";

import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import type { ProjectItem } from "@/lib/projects/get-projects";

interface ProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
  isLoading?: boolean;
}

const statusBadgeVariant: Record<string, "cyan" | "violet" | "muted"> = {
  active: "cyan",
  ongoing: "violet",
  archived: "muted",
  draft: "muted",
};

export function ProjectCard({
  project,
  onClick,
  isLoading,
}: ProjectCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "card-base group relative overflow-hidden cursor-pointer h-full",
        "transition-all duration-300",
        "hover:border-[rgba(210,107,255,0.3)]",
        "hover:shadow-[0_0_24px_rgba(210,107,255,0.15)]"
      )}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.frontMatter.title} project details`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent-primary)] border-t-transparent" />
            <span className="text-sm text-[var(--text-muted)]">
              Opening project...
            </span>
          </div>
        </div>
      )}

      <div className="p-6 h-full flex flex-col">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant={statusBadgeVariant[project.frontMatter.status] || "muted"}>
            {project.frontMatter.status}
          </Badge>

          <div className="flex gap-2">
            {project.frontMatter.repositoryUrl && (
              <a
                href={project.frontMatter.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View repository"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md",
                  "border border-[rgba(255,255,255,0.08)]",
                  "text-[var(--text-muted)]",
                  "transition-colors duration-200",
                  "hover:border-[rgba(210,107,255,0.3)]",
                  "hover:text-[var(--accent-secondary)]"
                )}
              >
                <Github size={14} />
              </a>
            )}

            {project.frontMatter.liveDemoUrl && (
              <a
                href={project.frontMatter.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live demo"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md",
                  "border border-[rgba(255,255,255,0.08)]",
                  "text-[var(--text-muted)]",
                  "transition-colors duration-200",
                  "hover:border-[rgba(210,107,255,0.3)]",
                  "hover:text-[var(--accent-secondary)]"
                )}
              >
                <ExternalLink size={14} />
              </a>
            )}

            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md",
                "border border-[rgba(255,255,255,0.08)]",
                "text-[var(--text-muted)]",
                "transition-colors duration-200",
                "hover:border-[rgba(210,107,255,0.3)]",
                "hover:text-[var(--accent-secondary)]"
              )}
            >
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-base font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
          {project.frontMatter.title}
        </h3>

        {/* Summary */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
          {project.frontMatter.summary}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.frontMatter.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[0.65rem] tracking-wider uppercase text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded-full px-2 py-0.5 bg-[rgba(15,15,15,0.35)]"
            >
              {tech}
            </span>
          ))}

          {project.frontMatter.technologies.length > 4 && (
            <span className="font-mono text-[0.65rem] tracking-wider uppercase text-[var(--text-muted)]">
              +{project.frontMatter.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
