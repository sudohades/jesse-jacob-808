/**
 * Content Engine - Registry Stage
 * 
 * Indexes typed documents and provides a stable query API.
 * 
 * Responsibilities:
 * - Index typed documents by collection, id, and slug
 * - Provide generic query methods (getCollection, findBySlug, findById)
 * - Own caching strategy
 * - Must never parse MDX or render UI
 * 
 * Phase 1: In-memory registry with basic indexing
 */

import { ContentDocument, CollectionHandle, RegistryQueryOptions } from '../documents/types';

// ============================================================================
// Registry Implementation
// ============================================================================

export class Registry {
  private documents: Map<string, ContentDocument> = new Map();
  private byCollection: Map<string, Set<string>> = new Map();
  private bySlug: Map<string, Map<string, string>> = new Map(); // collection -> slug -> id
  private initialized = false;

  private documentKey(collection: string, id: string): string {
    return `${collection}:${id}`;
  }

  /**
   * Initialize the registry with typed documents
   * This is the main entry point for indexing documents
   */
  initialize(documents: ContentDocument[]): void {
    // Clear existing state
    this.documents.clear();
    this.byCollection.clear();
    this.bySlug.clear();
    
    // Index documents
    for (const doc of documents) {
      this.indexDocument(doc);
    }
    
    this.initialized = true;
  }

  /**
   * Index a single document
   */
  private indexDocument(doc: ContentDocument): void {
    const { id, collection, slug } = doc;
    const key = this.documentKey(collection, id);
    
    // Store document by ID
    if (this.documents.has(key)) {
      throw new Error(`Duplicate document id '${id}' in collection '${collection}'`);
    }
    this.documents.set(key, doc);
    
    // Index by collection
    if (!this.byCollection.has(collection)) {
      this.byCollection.set(collection, new Set());
    }
    this.byCollection.get(collection)!.add(key);
    
    // Index by slug within collection
    if (!this.bySlug.has(collection)) {
      this.bySlug.set(collection, new Map());
    }
    const slugMap = this.bySlug.get(collection)!;
    if (slugMap.has(slug)) {
      throw new Error(`Duplicate slug '${slug}' in collection '${collection}'`);
    }
    slugMap.set(slug, key);
  }

  /**
   * Discover and index all documents from the content directory
   * This is a convenience method that runs the full pipeline
   */
  async discover(): Promise<void> {
    const { executePipeline } = await import('../index');
    await executePipeline({ registry: this });
  }

  /**
   * Get all documents in a collection
   */
  getCollection(name: string): CollectionHandle | null {
    const ids = this.byCollection.get(name);
    if (!ids || ids.size === 0) {
      return null;
    }
    
    const documents: ContentDocument[] = [];
    for (const id of ids) {
      const doc = this.documents.get(id);
      if (doc) {
        documents.push(doc);
      }
    }
    
    return {
      name,
      documents,
    };
  }

  /**
   * Find a document by slug within a collection
   */
  findBySlug(collection: string, slug: string): ContentDocument | null {
    const slugMap = this.bySlug.get(collection);
    if (!slugMap) {
      return null;
    }
    
    const key = slugMap.get(slug);
    if (!key) {
      return null;
    }
    return this.documents.get(key) || null;
  }

  /**
   * Find a document by ID within a collection
   */
  findById(collection: string, id: string): ContentDocument | null {
    const doc = this.documents.get(this.documentKey(collection, id));
    if (!doc) {
      return null;
    }
    
    return doc;
  }

  /**
   * Query documents with optional filters
   */
  query(options: RegistryQueryOptions = {}): ContentDocument[] {
    let results = Array.from(this.documents.values());
    
    // Apply filters
    results = results.filter(doc => {
      if (options.collection && doc.collection !== options.collection) {
        return false;
      }
      // Status filter
      if (options.status && doc.metadata.status !== options.status) {
        return false;
      }
      
      // Visibility filter
      if (options.visibility && doc.metadata.visibility !== options.visibility) {
        return false;
      }
      
      // Kind filter
      if (options.kind && doc.kind !== options.kind) {
        return false;
      }
      
      // Layout filter
      if (options.layout && doc.layout !== options.layout) {
        return false;
      }
      
      // Featured filter
      if (options.featured !== undefined && doc.metadata.featured !== options.featured) {
        return false;
      }
      
      // Tags filter (document must have all specified tags)
      if (options.tags && options.tags.length > 0) {
        const docTags = doc.metadata.tags || [];
        const hasAllTags = options.tags.every(tag => docTags.includes(tag));
        if (!hasAllTags) {
          return false;
        }
      }
      
      return true;
    });
    
    // Sort by date (newest first) if date is available
    results.sort((a, b) => {
      const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
      const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
      return dateB - dateA;
    });
    
    // Apply pagination
    if (options.offset !== undefined && options.offset > 0) {
      results = results.slice(options.offset);
    }
    
    if (options.limit !== undefined && options.limit > 0) {
      results = results.slice(0, options.limit);
    }
    
    return results;
  }

  /**
   * Get all available collections
   */
  getCollections(): string[] {
    return Array.from(this.byCollection.keys());
  }

  /**
   * Check if the registry has been initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Get the total number of indexed documents
   */
  size(): number {
    return this.documents.size;
  }
}

// ============================================================================
// Singleton Registry Instance
// ============================================================================

// Global registry instance for the application
let globalRegistry: Registry | null = null;

/**
 * Get or create the global registry instance
 */
export function getRegistry(): Registry {
  if (!globalRegistry) {
    globalRegistry = new Registry();
  }
  return globalRegistry;
}

/**
 * Reset the global registry (useful for testing)
 */
export function resetRegistry(): void {
  globalRegistry = null;
}
