"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MdxRenderer } from "@/lib/content/mdxRenderer";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ProjectItem } from "@/lib/projects/get-projects";

interface ProjectOverlayProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectOverlay({ project, isOpen, onClose }: ProjectOverlayProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Load MDX content when project changes
  useEffect(() => {
    async function loadContent() {
      if (!project) {
        setMdxSource(null);
        return;
      }

      setIsLoading(true);
      try {
        const source = await serialize(project.content, {
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        });
        setMdxSource(source);
      } catch (error) {
        console.error("Failed to serialize MDX:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [project]);

  // Handle escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      
      // Focus management
      if (overlayRef.current) {
        overlayRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Focus trap within overlay
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const overlayRefCurrent = overlayRef.current;
    const focusableElements = overlayRefCurrent.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    overlayRefCurrent.addEventListener("keydown", handleTab);
    return () => {
      overlayRefCurrent.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  const overlayVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
        },
      };

  const contentVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
      }
    : {
        hidden: { 
          opacity: 0,
          scale: 0.95,
          y: 20,
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.1,
          }
        },
        exit: {
          opacity: 0,
          scale: 0.95,
          y: 20,
          transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
        },
      };

  return (
    <AnimatePresence mode="wait">
      {isOpen && project && (
        <motion.div
          ref={overlayRef}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          tabIndex={-1}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Overlay content */}
          <motion.div
            ref={contentRef}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,17,0.5)] backdrop-blur-xl">
              <div className="flex-1">
                <h2 
                  id="project-title"
                  className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-2"
                >
                  {project.frontMatter.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} aria-hidden />
                    <time dateTime={project.frontMatter.date}>
                      {new Date(project.frontMatter.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag size={14} aria-hidden />
                    <span className="capitalize">{project.frontMatter.status}</span>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:border-[rgba(210,107,255,0.3)] hover:text-[var(--accent-secondary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl transition-all"
                aria-label="Close project details"
              >
                <X size={20} aria-hidden />
              </button>
            </div>

            {/* Action bar */}
            <div className="flex items-center gap-3 p-4 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.25)] backdrop-blur-xl">
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

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full"
                    />
                    <span className="text-sm text-[var(--text-muted)]">
                      Loading project content...
                    </span>
                  </div>
                </div>
              ) : mdxSource ? (
                <MdxRenderer source={mdxSource} />
              ) : null}
            </div>

            {/* Technologies footer */}
            <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,17,0.5)] backdrop-blur-xl">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
