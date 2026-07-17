import { notFound } from 'next/navigation';

import { ArticleRenderer } from '@/content/engine/renderers/ArticleRenderer';
import { getContentRegistry } from '@/content/engine/server';

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const document = (await getContentRegistry()).findBySlug('resources', slug);
  if (!document) notFound();
  return <ArticleRenderer document={document} />;
}
