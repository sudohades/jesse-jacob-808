/**
 * Content Engine - Document Builder Stage
 * 
 * Enriches parsed content into a stable typed representation.
 * 
 * Responsibilities:
 * - Generate slug from document ID
 * - Compute excerpts and reading time
 * - Resolve asset paths
 * - Generate canonical URLs
 * - Create immutable ContentDocument
 * - Must not render UI
 * 
 * Phase 1: Basic enrichment (slug, excerpt, reading time, asset resolution)
 */

import { ParsedDoc, ValidatedMetadata, ContentDocument } from '../documents/types';
import * as path from 'path';

import { resolveBasicAssets, resolveInlineImageAssets } from './assetResolution';




// ============================================================================
// Builder Context
// ============================================================================

export interface BuilderContext {
  siteUrl?: string;
  contentRoot?: string;
}

// ============================================================================
// Slug Generation
// ============================================================================

/**
 * Generate a URL-safe slug from a document ID
 * Phase 1: Simple slugification - replace spaces and special chars
 */
function generateSlug(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ============================================================================
// Excerpt Generation
// ============================================================================

/**
 * Generate an excerpt from content
 * Phase 1: Simple text extraction from first paragraph
 */
function generateExcerpt(content: string | unknown, maxLength: number = 160): string {
  const str = typeof content === 'string' ? content : JSON.stringify(content);
  // Remove markdown syntax
  const plainText = str

    .replace(/^#+\s+/gm, '') // Remove headings
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.slice(0, maxLength - 3) + '...';
}

// ============================================================================
// Reading Time Calculation
// ============================================================================

/**
 * Calculate estimated reading time in minutes
 * Based on average reading speed of 200 words per minute
 */
function calculateReadingTime(content: string | unknown): number {
  const str = typeof content === 'string' ? content : JSON.stringify(content);
  const wordCount = str.split(/\s+/).length;

  return Math.ceil(wordCount / 200);
}

function sourceText(content: unknown): string {
  if (typeof content === 'string') return content;
  if (
    typeof content === 'object' &&
    content !== null &&
    'raw' in content &&
    typeof (content as { raw?: unknown }).raw === 'string'
  ) {
    return (content as { raw: string }).raw;
  }
  return '';
}

// ============================================================================
// Canonical URL Generation
// ============================================================================

/**
 * Generate canonical URL for a document
 */
function generateCanonicalUrl(
  collection: string,
  slug: string,
  siteUrl?: string
): string | undefined {
  if (!siteUrl) return undefined;
  
  return `${siteUrl}/${collection}/${slug}`;
}

// ============================================================================
// Document Building
// ============================================================================

/**
 * Build a ContentDocument from parsed and validated data
 */
function resolveSlugFromRef(collection: string, id: string): string {
  // Convention-based slug normalization for all collections.
  // Goals:
  // - content/<collection>/<slug>/index.mdx          -> slug
  // - content/<collection>/<slug>/<slug>.mdx        -> slug
  // - otherwise fall back to the full id

  const normalized = id.replace(/\\/g, '/');

  // <slug>/index
  if (normalized.endsWith('/index')) {
    return normalized.split('/')[0];
  }

  // <slug>/<slug>
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length >= 2) {
    const last = segments[segments.length - 1];
    const prev = segments[segments.length - 2];
    if (last === prev) return last;

    // <collection>/<slug>
    // For this repo's layout, the intended route slug is usually the first folder.
    return segments[segments.length - 1];
  }

  return id;
}

export function buildDocument(

  parsedDoc: ParsedDoc,
  validated: ValidatedMetadata,
  context: BuilderContext = {}
): ContentDocument {
  const { ref, content } = parsedDoc;
  const { metadata, kind, layout } = validated;
  
  const contentRoot = context.contentRoot || path.join(process.cwd(), 'content');
  
  // Generate derived fields
  const slug = generateSlug(resolveSlugFromRef(ref.collection, ref.id));
  const rawContent = sourceText(content);
  const excerpt = generateExcerpt(rawContent);
  const readingTimeMinutes = calculateReadingTime(rawContent);

  const assetMap = resolveBasicAssets(metadata, ref.collection, ref.id, contentRoot);

  // Inline asset resolution (engine-owned; renderers must not fall back to raw paths)
  const transformed = content as { inlineImageSrcs?: string[] } | undefined;
  const inlineImageSrcs: string[] = transformed?.inlineImageSrcs || [];
  const inlineAssetMap = inlineImageSrcs.length
    ? resolveInlineImageAssets(inlineImageSrcs, ref.collection, ref.id, contentRoot)
    : undefined;

  const mergedAssetMap = {
    ...(assetMap || {}),
    ...(inlineAssetMap || {}),
  };

  const canonicalUrl = generateCanonicalUrl(ref.collection, slug, context.siteUrl);

  
  // Build the immutable ContentDocument
  const document: ContentDocument = {
    // Document Identity
    id: ref.id,
    slug,
    collection: ref.collection,
    kind,
    
    // Layout / Rendering Metadata
    layout,
    metadata,
    
    // Content Payload
    content,
    
    // Engine Derived Fields
    excerpt,
    readingTimeMinutes,
    canonicalUrl,
    assetMap: mergedAssetMap,
  };
  
  return document;
}

/**
 * Build multiple documents
 */
export function buildDocuments(
  parsedDocs: ParsedDoc[],
  validatedDocs: ValidatedMetadata[],
  context: BuilderContext = {}
): ContentDocument[] {
  if (parsedDocs.length !== validatedDocs.length) {
    throw new Error('Parsed documents and validated documents must have the same length');
  }
  
  return parsedDocs.map((parsedDoc, index) => 
    buildDocument(parsedDoc, validatedDocs[index], context)
  );
}
