/**
 * Content Engine - Card Renderer Stage
 *
 * Translates typed documents into Halden UI component props.
 *
 * Responsibilities:
 * - Consume ContentDocument
 * - Extract and transform data for Halden UI components
 * - Return props for UI components
 * - Must never compute enrichment or derived fields
 * - Must never perform file IO, parsing, or validation
 *
 * Generic implementation supports any document kind/layout.
 */

import { ContentDocument } from '../documents/types';
import { ProjectCardProps } from '@/components/halden-ui/cards/ProjectCard';

// ============================================================================
// Renderer Types
// ============================================================================

export interface RenderResult {
  component: 'ProjectCard';
  props: ProjectCardProps;
}

// ============================================================================
// Card Renderer
// ============================================================================

/**
 * Render a ContentDocument as a ProjectCard
 * This renderer handles documents with kind="card" and layout="project"
 */
export function renderCard(document: ContentDocument): RenderResult {
  const { metadata, slug, collection, assetMap } = document;
  
  // Extract cover image from asset map if available
  const coverImage = assetMap?.['cover'];
  const imageSrc = coverImage ? coverImage.path : undefined;
  const imageAlt = coverImage?.alt || metadata.title;
  
  // Use the first tag as a "code" label if available
  const code = metadata.tags && metadata.tags.length > 0 ? metadata.tags[0] : undefined;
  
  // Build the ProjectCard props
  const props: ProjectCardProps = {
    title: metadata.title,
    description: metadata.summary || metadata.description,
    tags: metadata.tags,
    href: `/${collection}/${slug}`,
    image: imageSrc,
    imageAlt: imageAlt,
    code: code,
    status: metadata.status === 'published' ? 'live' : undefined,
  };
  
  return {
    component: 'ProjectCard',
    props,
  };
}

/**
 * Check if a document can be rendered as a card
 */
export function canRenderCard(document: ContentDocument): boolean {
  return document.kind === 'card';
}

/**
 * Render multiple documents as cards
 */
export function renderCards(documents: ContentDocument[]): RenderResult[] {
  return documents
    .filter(canRenderCard)
    .map(renderCard);
}
