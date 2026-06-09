"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ProjectItem } from "@/lib/projects/get-projects";

interface ProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
  isLoading?: boolean;
}

const statusVariant = {
  active: "active",
  ongoing: "blue",
  archived: "muted",
  draft: "muted",
} as const;

export function ProjectCard({ project, onClick, isLoading }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXVal = (e.clientX - rect.left) / width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseXVal);
    y.set(mouseYVal);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      className={cn(
        "relative group perspective-1000 cursor-pointer",
        "transition-all duration-500 ease-out"
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
      {/* Card container with depth */}
      <motion.div
        animate={{
          scale: isLoading ? 0.98 : isHovered ? 1.02 : 1,
          y: isLoading ? -2 : isHovered ? -4 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className={cn(
          "relative h-full p-6 rounded-xl border",
          "bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border-[rgba(255,255,255,0.08)]",
          "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]",
          "group-hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3),0_8px_16px_-8px_rgba(0,0,0,0.2)]",
          "group-hover:border-[rgba(210,107,255,0.25)]",
          "transition-shadow duration-500",
          "overflow-hidden"
        )}
      >
        {/* Ambient glow effect */}
        <motion.div
          animate={{
            opacity: isLoading ? 0.6 : isHovered ? 0.4 : 0.1,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-[rgba(210,107,255,0.1)] via-transparent to-[rgba(6,182,212,0.1)] pointer-events-none"
        />

        {/* Gleam animation */}
        <motion.div
          animate={{
            x: isHovered ? ["-100%", "200%"] : ["-100%", "-100%"],
            opacity: isHovered ? [0, 0.6, 0.6, 0] : [0, 0.15, 0.15, 0],
          }}
          transition={{
            duration: isHovered ? 1.5 : 4,
            repeat: isHovered ? Infinity : Infinity,
            repeatDelay: isHovered ? 0.5 : 2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent skew-x-12" />
        </motion.div>

        {/* Edge reflection */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none"
        />

        {/* Loading state indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-[vav(--rg-surf(ce/9/900 backdrop-blursmm z-10"
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full"
              />
              <span className="text-sm text-[var(--text-muted)] font-medium">
                Opening project workspace...
              </span>
            </div>
          </motion.div>
        )}

        {/* Card content */}
        <div className="relative z-0 h-full flex flex-col">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full border",
                statusVariant[project.frontMatter.status] === "active" && "bg-[rgba(34,197,94,0.1)] border-[rgba(34,197,94,0.3)] text-[var(--green)]",
                statusVariant[project.frontMatter.status] === "blue" && "bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.3)] text-[var(--accent-secondary)]",
                statusVariant[project.frontMatter.status] === "muted" && "bg-[rgba(156,163,175,0.1)] border-[rgba(156,163,175,0.3)] text-[var(--text-muted)]"
              )}
            >
              {project.frontMatter.status}
            </span>
            
            <div className="flex gap-2">
              {project.frontMatter.repositoryUrl && (
                <a
                  href={project.frontMatter.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(255,255,255,0.08)]",
                    "text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all",
                    "hover:border-[rgba(210,107,255,0.3)] hover:text-[var(--accent-secondary)]",
                    "hover:scale-110"
                  )}
                  aria-label="View repository"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={14} aria-hidden />
                </a>
              )}
              {project.frontMatter.liveDemoUrl && (
                <a
                  href={project.frontMatter.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(255,255,255,0.08)]",
                    "text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all",
                    "hover:border-[rgba(210,107,255,0.3)] hover:text-[var(--accent-secondary)]",
                    "hover:scale-110"
                  )}
                  aria-label="View live demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} aria-hidden />
                </a>
              )}
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(255,255,255,0.08)]",
                  "text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all",
                  "hover:border-[rgba(210,107,255,0.3)] hover:text-[var(--accent-secondary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl",
                  "hover:scale-110"
                )}
              >
                <ArrowUpRight size={14} aria-hidden />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {project.frontMatter.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-4 line-clamp-3">
            {project.frontMatter.summary}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {project.frontMatter.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.65rem] tracking-wider uppercase text-[var(--text-muted)] border border-[rgba(255,255,255,0.08)] rounded-full px-2 py-0.5 bg-[rgba(15,15,15,0.35)] backdrop-blur-xl"
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
      </motion.div>
    </motion.div>
  );
}
