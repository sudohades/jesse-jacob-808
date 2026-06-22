import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbStructuredData } from "@/lib/seo/product-structured-data";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Check, Clock, DollarSign } from "lucide-react";
import { MarketplaceActions } from "@/components/shop/MarketplaceActions";
import { getServiceBySlug, getRelatedServices } from "@/lib/server/internal/service-by-slug";
import { getAllContent, type ProjectFrontMatter } from "@/lib/server/internal/mdx";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildMetadata({ title: "Service Not Found", path: "/services" });
  }

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service, 3);
  
  const allProjects = getAllContent("projects");
  const relatedProjects = allProjects.slice(0, 3);
  
  const relatedNotes = getAllContent("notes").slice(0, 3);
  
  const relatedResources = getAllContent("resources").slice(0, 3);

  // Generate structured data
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${service.slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbStructuredData }}
      />

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          <Link href="/services" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="status" dot>
                    {service.category}
                  </Badge>
                  {service.featured && (
                    <Badge variant="cyan" dot>
                      Featured
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                  {service.title}
                </h1>

                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Pricing & Delivery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card-base p-4">
                  <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2">
                    <DollarSign size={16} />
                    <span className="text-sm font-mono uppercase">Pricing</span>
                  </div>
                  <div className="text-lg font-semibold text-[var(--text-primary)]">
                    {service.pricing}
                  </div>
                </div>
                <div className="card-base p-4">
                  <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2">
                    <Clock size={16} />
                    <span className="text-sm font-mono uppercase">Delivery</span>
                  </div>
                  <div className="text-lg font-semibold text-[var(--text-primary)]">
                    {service.deliveryEstimate}
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              {service.deliverables.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                    Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable: any, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-[var(--text-secondary)]">
                        <Check size={16} className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {service.requirements && service.requirements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {service.requirements.map((requirement: any, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-[var(--text-secondary)]">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" aria-hidden />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar - Actions */}
            <div className="lg:col-span-1">
              <div className="card-base p-6 sticky top-8">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                  Get Started
                </h3>
                <MarketplaceActions
                  marketplaceLinks={service.marketplaceLinks}
                  offeringTitle={service.title}
                  customOrderSupported={service.customOrderSupported}
                />
              </div>
            </div>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.08)]">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Related Services
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((relatedService: any) => (
                  <Link
                    key={relatedService.id}
                    href={`/services/${relatedService.slug}`}
                    className="card-base p-6 group hover:border-[rgba(210,107,255,0.3)] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <Badge variant="status" dot className="text-xs">
                        {relatedService.category}
                      </Badge>
                      {relatedService.featured && (
                        <Badge variant="cyan" dot className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      {relatedService.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                      {relatedService.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-muted)]">{relatedService.pricing}</span>
                      <span className="text-[var(--text-muted)]">{relatedService.deliveryEstimate}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.08)]">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Related Projects
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((project) => {
                  const fm = project.frontMatter as unknown as ProjectFrontMatter;
                  return (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="card-base p-6 group hover:border-[rgba(210,107,255,0.3)] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <Badge variant="status" dot className="text-xs">
                          {fm.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                        {fm.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                        {fm.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {fm.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs text-[var(--text-muted)] font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Notes */}
          {relatedNotes.length > 0 && (
            <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.08)]">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Related Notes
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedNotes.map((note: any) => (
                  <Link
                    key={note.slug}
                    href={`/notes/${note.slug}`}
                    className="card-base p-6 group hover:border-[rgba(210,107,255,0.3)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <time className="text-xs text-[var(--text-muted)]">
                        {new Date(note.frontMatter.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      {note.frontMatter.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                      {note.frontMatter.description}
                    </p>
                    {note.frontMatter.tags && (
                      <div className="flex flex-wrap gap-2">
                        {note.frontMatter.tags.slice(0, 3).map((tag: any) => (
                          <Badge key={tag} variant="muted" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Resources */}
          {relatedResources.length > 0 && (
            <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.08)]">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Related Resources
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedResources.map((resource: any) => (
                  <Link
                    key={resource.slug}
                    href={`/resources/${resource.slug}`}
                    className="card-base p-6 group hover:border-[rgba(210,107,255,0.3)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <time className="text-xs text-[var(--text-muted)]">
                        {new Date(resource.frontMatter.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      {resource.frontMatter.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                      {resource.frontMatter.description}
                    </p>
                    {resource.frontMatter.tags && (
                      <div className="flex flex-wrap gap-2">
                        {resource.frontMatter.tags.slice(0, 3).map((tag: any) => (
                          <Badge key={tag} variant="muted" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
