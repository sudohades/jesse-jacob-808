/**
 * STRICT SERVER BOUNDARY LAYER
 *
 * ⚠️ CRITICAL: This is the ONLY file allowed to touch:
 * - fs
 * - path
 * - gray-matter
 * - process.cwd
 *
 * All file system access and MDX parsing MUST go through this layer.
 * This ensures Node.js-only code never leaks into Edge/SSR contexts.
 *
 * NEVER import this file directly in React components.
 * ONLY import this in API routes with export const runtime = "nodejs"
 */

import {
  getContentSlugs as getSlugsSync,
  getContentItem as getItemSync,
  getAllContent as getAllSync,
  type ContentType,
  type FrontMatter,
  type ProjectFrontMatter,
  type ContentItem,
} from "../internal/mdx";

export const runtime = "nodejs";

export type { ContentType, FrontMatter, ProjectFrontMatter, ContentItem };

/**
 * Get all content slugs for a given type
 * ONLY callable from API routes with runtime = "nodejs"
 */
export async function getContentSlugs(type: ContentType): Promise<string[]> {
  return getSlugsSync(type);
}

/**
 * Get a single content item by type and slug
 * ONLY callable from API routes with runtime = "nodejs"
 */
export async function getContentItem(type: ContentType, slug: string): Promise<ContentItem | null> {
  return getItemSync(type, slug);
}

/**
 * Get all published content for a given type
 * ONLY callable from API routes with runtime = "nodejs"
 */
export async function getAllContent(type: ContentType): Promise<ContentItem[]> {
  return getAllSync(type);
}

/**
 * Get content by type and optional slug
 * Unified interface for API routes
 */
export async function getContent(type: ContentType, slug?: string): Promise<ContentItem | ContentItem[] | null> {
  if (slug) {
    return await getContentItem(type, slug);
  }
  return await getAllContent(type);
}
