import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/halden-ui/layout/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { ProjectCard } from "@/components/halden-ui/cards/ProjectCard";
import { ServiceCard } from "@/components/halden-ui/cards/ServiceCard";
import { getContentRegistry } from "@/content/engine/server";
import { renderCards } from "@/content/engine";

export default async function ServicesPage() {
  // Initialize the content engine and get the registry
  const registry = await getContentRegistry({ collections: ['services'] });
  
  // Query published service cards
  const services = registry.query({
    collection: 'services',
    status: 'published',
    visibility: 'public',
    kind: 'card',
  });
  
  // Render documents as cards
  const cardResults = renderCards(services);
  
  return (
    <SiteShell>
      <PageHeader eyebrow="Services" title="Engineering consultancy" />

      <section className="pb-24 md:pb-32">
        <Container>
          {cardResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {cardResults.map((result, index) => (
                result.component === 'ServiceCard'
                  ? <ServiceCard key={index} {...result.props} />
                  : <ProjectCard key={index} {...result.props} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>No services found.</p>
            </div>
          )}
        </Container>
      </section>
    </SiteShell>
  );
}
