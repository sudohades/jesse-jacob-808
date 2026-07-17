/**
 * Content Engine - Document Types
 * 
 * Canonical types for the Content Engine pipeline.
 * These types represent the immutable, typed documents that flow through the engine.
 */

// ============================================================================
// Asset References
// ============================================================================

export type AssetType = 'image' | 'file' | 'link';

export interface AssetRef {
  type: AssetType;
  path: string;
  alt?: string;
}

// ============================================================================
// Metadata
// ============================================================================

export type DocumentStatus = 'draft' | 'published';
export type DocumentVisibility = 'public' | 'private' | 'unlisted';

export interface ServicePrice {
  amount: number;
  currency: string;
}

export interface ContentMetadata {
  title: string;
  description: string;
  summary?: string;
  status: DocumentStatus;
  visibility: DocumentVisibility;
  date?: string; // ISO-8601
  updated?: string; // ISO-8601
  
  // Optional common fields
  featured?: boolean;
  tags?: string[];
  cover?: AssetRef;
  gallery?: AssetRef[];
  authors?: string[];
  links?: Array<{ label: string; url: string }>;
  technologies?: string[];
  price?: ServicePrice;
  
  seo?: {
    ogImage?: AssetRef;
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  };
}

// ============================================================================
// Pipeline Stage Types
// ============================================================================

/**
 * DocRef - Discovery stage output
 * Reference to a document candidate on the filesystem
 */
export interface DocRef {
  collection: string;
  id: string;
  path: string;
}

/**
 * LoadedDoc - Loader stage output
 * Raw file content loaded from filesystem
 */
export interface LoadedDoc {
  ref: DocRef;
  content: string;
}

/**
 * ParsedDoc - Parser stage output
 * Parsed frontmatter and content representation
 */
export interface ParsedDoc {
  ref: DocRef;
  frontmatter: Record<string, unknown>;
  content: unknown; // Parsed content representation (AST/compiled form)
}

/**
 * ValidatedMetadata - Schema Validation stage output
 * Validated and typed metadata
 */
export interface ValidatedMetadata {
  metadata: ContentMetadata;
  kind: string;
  layout: string;
}

// ============================================================================
// Canonical ContentDocument
// ============================================================================

/**
 * ContentDocument - The canonical typed document
 * Immutable representation created by Document Builder
 */
export interface ContentDocument {
  // Document Identity
  id: string;
  slug: string;
  collection: string;
  kind: string;
  
  // Layout / Rendering Metadata
  layout: string;
  metadata: ContentMetadata;
  
  // Content Payload
  content: unknown;
  
  // Engine Derived Fields (added by Document Builder)
  excerpt?: string;
  readingTimeMinutes?: number;
  canonicalUrl?: string;
  assetMap?: Record<string, AssetRef>;
  related?: Array<{ id: string; collection: string; kind: string }>;
  search?: {
    titleTokens: string[];
    descriptionTokens: string[];
    tagsTokens: string[];
  };
  tableOfContents?: Array<{ id: string; text: string; level: number }>;
}

// ============================================================================
// Registry Types
// ============================================================================

export interface CollectionHandle {
  name: string;
  documents: ContentDocument[];
}

export interface RegistryQueryOptions {
  collection?: string;
  status?: DocumentStatus;
  visibility?: DocumentVisibility;
  kind?: string;
  layout?: string;
  featured?: boolean;
  tags?: string[];
  limit?: number;
  offset?: number;
}
