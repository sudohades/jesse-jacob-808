import dynamic from "next/dynamic";
import { HeroSection }      from "@/components/sections/HeroSection";
import { ExpertiseSection }  from "@/components/sections/ExpertiseSection";

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection").then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="h-96 animate-pulse bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-lg" />,
});

const CurrentBuild = dynamic(() => import("@/components/sections/CurrentBuild").then(mod => ({ default: mod.CurrentBuild })), {
  loading: () => <div className="h-64 animate-pulse bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-lg" />,
});

const RecentNotes = dynamic(() => import("@/components/sections/RecentNotes").then(mod => ({ default: mod.RecentNotes })), {
  loading: () => <div className="h-80 animate-pulse bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-lg" />,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExpertiseSection />
      <ProjectsSection />
      <CurrentBuild />
      <RecentNotes />
    </>
  );
}

