import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp, StaggerContainer } from "@/components/animations/FadeInUp";
import { siteConfig } from "@/lib/site-config";

export async function FeaturedServices() {
  const res = await fetch(`${siteConfig.baseUrl}/api/services?featured=true`, { cache: "no-store" });
  const services = (await res.json()).slice(0, 3);

  if (services.length === 0) return null;

  return (
    <section className="relative px-6 py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <div className="glow-line mb-16" aria-hidden />

        <FadeInUp className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            eyebrow="// services"
            title="Featured services."
            subtitle="Specialized technical services for infrastructure, automation, and systems work."
          />

          <Link
            href="/services"
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors font-medium whitespace-nowrap"
          >
            All services <ArrowRight size={14} aria-hidden />
          </Link>
        </FadeInUp>

        <StaggerContainer
          stagger={0.06}
          delayStart={0.1}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service: any) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="card-base group p-6 transition-all duration-300 hover:shadow-[0_0_24px_rgba(210,107,255,0.15)] hover:border-[rgba(210,107,255,0.3)]"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(15,15,15,0.35)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] transition-colors group-hover:border-[rgba(210,107,255,0.2)] group-hover:text-[var(--accent-primary)]">
                <Briefcase size={16} aria-hidden />
              </div>

              <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                {service.title}
              </h3>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
                  {service.pricing}
                </span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent-secondary)]" aria-hidden />
              </div>
            </Link>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
