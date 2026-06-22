"use client";

import { StaggerContainer } from "@/components/animations/FadeInUp";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectOverlay } from "@/components/projects/ProjectOverlay";
import type { ProjectItem } from "@/lib/types/project";

interface ProjectsSectionClientProps {
  projects: ProjectItem[];
}

export function ProjectsSectionClient({ projects }: ProjectsSectionClientProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [loadingProjectSlug, setLoadingProjectSlug] = useState<string | null>(null);

  function handleProjectClick(project: ProjectItem) {
    setLoadingProjectSlug(project.slug);
    
    // Simulate loading delay for the "launching" effect
    setTimeout(() => {
      setSelectedProject(project);
      setIsOverlayOpen(true);
      setLoadingProjectSlug(null);
    }, 800);
  }

  function handleCloseOverlay() {
    setIsOverlayOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  }

  return (
    <>
      <StaggerContainer
        stagger={0.08}
        delayStart={0.1}
        className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
            }}
            className="h-full"
          >
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project)}
              isLoading={loadingProjectSlug === project.slug}
            />
          </motion.div>
        ))}
      </StaggerContainer>

      <ProjectOverlay
        project={selectedProject}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </>
  );
}
