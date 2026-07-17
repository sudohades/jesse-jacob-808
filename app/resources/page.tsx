import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/halden-ui/layout/Container";
import { PageHeader } from "@/components/site/primitives/PageHeader";
import { ProjectCard } from "@/components/halden-ui/cards/ProjectCard";
import { getContentRegistry } from "@/content/engine/server";
import { renderCards } from "@/content/engine";

export default async function ResourcesPage() {
  // Initialize the content engine and get the registry
  const registry = await getContentRegistry({ collections: ['resources'] });
  
  // Query published resource cards
  const resources = registry.query({
    collection: 'resources',
    status: 'published',
    visibility: 'public',
    kind: 'card',
  });
  
  // Render documents as cards
  const cardResults = renderCards(resources);
  
  return (
    <SiteShell>
      <PageHeader eyebrow="Resources" title="Engineering notes & templates" />

      <section className="pb-24 md:pb-32">
        <Container>
          {cardResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {cardResults.map((result, index) => (
                <ProjectCard key={index} {...result.props} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>No resources found.</p>
            </div>
          )}
        </Container>
      </section>
    </SiteShell>
  );
}
