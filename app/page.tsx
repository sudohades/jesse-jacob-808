import { HeroSection }      from "@/components/sections/HeroSection";
import { ExpertiseSection }  from "@/components/sections/ExpertiseSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CurrentBuild } from "@/components/sections/CurrentBuild";
import { LatestContent } from "@/components/sections/LatestContent";
import { RecentNotes } from "@/components/sections/RecentNotes";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExpertiseSection />
      <ProjectsSection />
      <FeaturedServices />
      <FeaturedProducts />
      <CurrentBuild />
      <LatestContent />
      <RecentNotes />
    </>
  );
}

