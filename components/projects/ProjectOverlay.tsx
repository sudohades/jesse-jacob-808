"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { serializeMdx } from "@/lib/mdx/serialize";
import { MdxRenderer } from "@/lib/content/mdxRenderer";
import type { ProjectItem } from "@/lib/types/project";

interface ProjectOverlayProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectOverlay({
  project,
  isOpen,
  onClose,
}: ProjectOverlayProps) {
  const [mdxSource, setMdxSource] =
    useState<
      { content: string; frontmatter?: Record<string, unknown> } | null
    >(null);

  const [isLoading, setIsLoading] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function loadContent() {
      if (!project) {
        setMdxSource(null);
        return;
      }

      setIsLoading(true);

      try {
        const source = await serializeMdx(project.content);

        setMdxSource(source);
      } catch (error) {
        console.error("Failed to serialize MDX:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [project]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      document.body.style.overflow = "hidden";

      overlayRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const overlay = overlayRef.current;

    const focusableElements = overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement =
      focusableElements[focusableElements.length - 1] as HTMLElement;

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

    overlay.addEventListener("keydown", handleTab);

    return () => {
      overlay.removeEventListener("keydown", handleTab);
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
          transition: {
            duration: 0.2,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            duration: 0.15,
          },
        },
      };

  const contentVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: {
          opacity: 0,
          y: 8,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.2,
          },
        },
        exit: {
          opacity: 0,
          y: 8,
          transition: {
            duration: 0.15,
          },
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={contentRef}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              flex
              max-h-[90vh]
              w-full
              max-w-4xl
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-[rgba(255,255,255,0.08)]
              bg-[rgba(15,15,15,0.85)]
              backdrop-blur-xl
              -webkit-backdrop-blur-xl
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,17,0.95)] backdrop-blur-md p-6">
              <div className="flex-1">
                <h2
                  id="project-title"
                  className="mb-2 text-2xl font-bold tracking-tight text-[var(--text-primary)]"
                >
                  {project.frontMatter.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <time dateTime={project.frontMatter.date}>
                      {new Date(
                        project.frontMatter.date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Tag size={14} />
                    <span className="capitalize">
                      {project.frontMatter.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close project details"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-[rgba(255,255,255,0.08)]
                  text-[var(--text-muted)]
                  transition-colors
                  hover:border-[rgba(210,107,255,0.3)]
                  hover:text-[var(--accent-secondary)]
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.9)] backdrop-blur-md p-4">
              {project.frontMatter.repositoryUrl && (
                <a
                  href={project.frontMatter.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-[rgba(255,255,255,0.08)]
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-[var(--text-primary)]
                    transition-colors
                    hover:border-[rgba(210,107,255,0.3)]
                    hover:text-[var(--accent-secondary)]
                  "
                >
                  <Github size={16} />
                  Repository
                </a>
              )}

              {project.frontMatter.liveDemoUrl && (
                <a
                  href={project.frontMatter.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-[rgba(255,255,255,0.08)]
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-[var(--text-primary)]
                    transition-colors
                    hover:border-[rgba(210,107,255,0.3)]
                    hover:text-[var(--accent-secondary)]
                  "
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-10 w-10 rounded-full border-2 border-[var(--accent-primary)] border-t-transparent"
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

            {/* Footer */}
            <div className="border-t border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,17,0.95)] backdrop-blur-md p-4">
              <div className="flex flex-wrap gap-2">
                {project.frontMatter.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-full
                      border
                      border-[rgba(255,255,255,0.08)]
                      bg-[rgba(15,15,15,0.6)]
                      px-3
                      py-1
                      font-mono
                      text-xs
                      uppercase
                      tracking-wider
                      text-[var(--text-muted)]
                    "
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