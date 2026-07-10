import { SiteShell } from "@/components/site/SiteShell";
import { CTAButton } from "@/components/site/CTAButton";

export default function ServicesPage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-2xl font-semibold md:text-4xl font-display tracking-wide">Services</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Dummy placeholder content for the Services page. To be replaced with
          how I apply my skills for others (offerings, deliverables, process).
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton to="/contact" variant="outline">
            Request a Consultation
          </CTAButton>
          <CTAButton to="/services/packages" variant="outline">
            See Service Packages
          </CTAButton>
        </div>
      </div>
    </SiteShell>
  );
}

