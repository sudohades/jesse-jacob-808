"use client";

import { motion } from "framer-motion";
import {
  Terminal, Zap, Layers, Globe, Server, Briefcase, LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp, StaggerContainer } from "@/components/animations/FadeInUp";
import { siteConfig } from "@/lib/site-config";

const iconMap: Record<string, LucideIcon> = {
  terminal: Terminal,
  zap:      Zap,
  layers:   Layers,
  globe:    Globe,
  server:   Server,
  briefcase: Briefcase,
};

export function ExpertiseSection() {
  return (
    <section
      className="relative px-6 py-24"
      aria-labelledby="expertise-heading"
    >
      {/* Section line */}
      <div className="mx-auto max-w-6xl">
        <div className="glow-line mb-16" aria-hidden />

        <FadeInUp>
          <SectionHeader
            eyebrow="// expertise"
            title="What I build."
            subtitle="Deep systems work from kernel-level Linux to production web platforms — with a focus on practical, reliable automation."
          />
        </FadeInUp>

        <StaggerContainer
          stagger={0.06}
          delayStart={0.1}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {siteConfig.expertise.map((item) => {
            const Icon = iconMap[item.icon] ?? Terminal;
            return (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,0.61,0.36,1] } },
                }}
                className="card-base group p-6 cursor-default"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] transition-colors group-hover:border-[rgba(210,107,255,0.2)] group-hover:text-[var(--accent-primary)]">
                  <Icon size={16} aria-hidden />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight mb-1.5">
                  {item.label}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
