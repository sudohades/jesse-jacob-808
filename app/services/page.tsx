import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getServices, getServiceCategories } from "@/lib/services/get-services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock, DollarSign } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title:       "Services",
  description: "Infrastructure-focused engineering services: Linux administration, VPS setup, hardening, and automation.",
  path:        "/services",
});

export default function ServicesPage() {
  const allServices = getServices();
  const featuredServices = allServices.filter((s) => s.featured);
  const categories = getServiceCategories();

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeader
            eyebrow="// services"
            title="Engineering, delivered."
            subtitle="Technical consulting and build support — shaped like case studies, not slides."
          />
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          <Link href="/services">
            <Button variant="primary" size="sm">
              All Services
            </Button>
          </Link>
          {categories.map((category) => (
            <Link key={category} href={`/services?category=${category}`}>
              <Button variant="ghost" size="sm">
                {category}
              </Button>
            </Link>
          ))}
        </div>

        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="cyan" dot>
                Featured
              </Badge>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Featured Services
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* All Services */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
            All Services
          </h2>
          {allServices.length === 0 ? (
            <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
              No services available yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {allServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 card-base p-6 text-[var(--text-secondary)]">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">Workflow</div>
          <ol className="mt-3 space-y-2">
            <li className="flex gap-3">
              <span className="font-mono text-[var(--accent-primary)]">01</span>
              <span>Problem intake and constraints mapping.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[var(--accent-primary)]">02</span>
              <span>Proposed solution and implementation plan (with checkpoints).</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[var(--accent-primary)]">03</span>
              <span>Delivery with documentation you can reuse.</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: any }) {
  return (
    <article className="card-base p-6 group">
      <div className="flex items-start justify-between gap-4">
        <Badge variant="status" dot>
          {service.category}
        </Badge>
        {service.featured && (
          <Badge variant="cyan" dot>
            Featured
          </Badge>
        )}
      </div>

      <h2 className="mt-4 text-lg font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
        <Link href={`/services/${service.slug}`}>
          {service.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{service.description}</p>

      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <DollarSign size={16} />
          <span>{service.pricing}</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <Clock size={16} />
          <span>{service.deliveryEstimate}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
        >
          View details <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

