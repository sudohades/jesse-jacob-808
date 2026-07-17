import { notFound } from 'next/navigation';
import { ArticleRenderer } from '@/content/engine/renderers/ArticleRenderer';
import { getContentRegistry } from '@/content/engine/server';

export type PageProps = {
  params?: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;

  const slug = resolvedParams?.slug;

  const registry = await getContentRegistry({ collections: ['projects'] });

  if (!slug) notFound();

  const doc = registry.findBySlug('projects', slug);


  if (!doc) {
    notFound();
  }

  return <ArticleRenderer document={doc} />;
}

