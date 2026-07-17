/**
 * Content Engine - Pipeline Orchestration
 * 
 * Main entry point for the Content Engine pipeline.
 * Orchestrates all stages: discovery → loader → parser → validation → builder → registry
 * 
 * This is the primary interface for loading and indexing content documents.
 */

import { discoverCollections, discoverDocuments } from './discovery/discovery';
import { loadDocuments } from './loader/filesystem';
import { parseDocuments } from './mdx/parse';
import { transformMdxBody } from './mdx/transform';
import { validateDocuments } from './validation/schemas';

import { buildDocuments, BuilderContext } from './builder/documentBuilder';
import { getRegistry, Registry } from './registry/registry';
import { ContentDocument } from './documents/types';

// ============================================================================
// Pipeline Configuration
// ============================================================================

export interface PipelineOptions {
  collections?: string[];
  context?: BuilderContext;
  registry?: Registry;
  failFast?: boolean;
}

export interface PipelineResult {
  documents: ContentDocument[];
  errors: Array<{ document: string; error: Error }>;
  registry: Registry;
}

// ============================================================================
// Pipeline Execution
// ============================================================================

/**
 * Execute the complete Content Engine pipeline
 * 
 * This function orchestrates all stages:
 * 1. Discovery - Find documents in the filesystem
 * 2. Loader - Read file contents
 * 3. Parser - Extract frontmatter and content
 * 4. Validation - Validate metadata against schema
 * 5. Builder - Enrich into typed documents
 * 6. Registry - Index documents for querying
 * 
 * @param options - Pipeline configuration options
 * @returns Pipeline result with documents and any errors
 */
export async function executePipeline(options: PipelineOptions = {}): Promise<PipelineResult> {
  const {
    collections: targetCollections,
    context = {},
    registry = getRegistry(),
    failFast = true,
  } = options;
  
  const errors: Array<{ document: string; error: Error }> = [];
  const documents: ContentDocument[] = [];
  
  // Stage 1: Discovery
  const collectionsToProcess = targetCollections || discoverCollections();
  
  if (collectionsToProcess.length === 0) {
    console.warn('No collections found during discovery');
    return { documents, errors, registry };
  }
  
  const allDocRefs = collectionsToProcess.flatMap(collection => 
    discoverDocuments(collection)
  );
  
  if (allDocRefs.length === 0) {
    console.warn('No documents found during discovery');
    return { documents, errors, registry };
  }
  
  console.log(`Discovered ${allDocRefs.length} documents across ${collectionsToProcess.length} collections`);
  
  // Stage 2: Loader
  let loadedDocs;
  try {
    loadedDocs = loadDocuments(allDocRefs);
  } catch (error) {
    throw new Error(`Loader stage failed: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  // Stage 3: Parser
  let parsedDocs;
  try {
    parsedDocs = parseDocuments(loadedDocs);
  } catch (error) {
    throw new Error(`Parser stage failed: ${error instanceof Error ? error.message : String(error)}`);
  }

  // Stage 4: MDX Transform
  const transformedDocs: import('./documents/types').ParsedDoc[] = [];
  for (const parsedDoc of parsedDocs) {
    try {
      transformedDocs.push({ ...parsedDoc, content: transformMdxBody(parsedDoc) });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errors.push({ document: parsedDoc.ref.id, error: err });
      if (failFast) {
        throw new Error(`MDX transform failed for ${parsedDoc.ref.id}: ${err.message}`);
      }
    }
  }


  // Stage 5: Validation

  const validatedDocs: Array<{ parsedDoc: import('./documents/types').ParsedDoc; validated: import('./documents/types').ValidatedMetadata }> = [];

  const validationErrors: Array<{ document: string; error: Error }> = [];
  
  for (const parsedDoc of transformedDocs) {
    try {
      const validated = validateDocument(parsedDoc);
      validatedDocs.push({ parsedDoc, validated });

    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      validationErrors.push({
        document: parsedDoc.ref.id,
        error: err,
      });
      
      if (failFast) {
        throw new Error(`Validation failed for ${parsedDoc.ref.id}: ${err.message}`);
      }
    }
  }
  
  if (validationErrors.length > 0) {
    console.warn(`Validation failed for ${validationErrors.length} documents`);
    validationErrors.forEach(({ document, error }) => {
      console.error(`  - ${document}: ${error.message}`);
    });
  }
  
  errors.push(...validationErrors);
  
  // Stage 6: Builder

  const builtDocs: ContentDocument[] = [];
  const builderErrors: Array<{ document: string; error: Error }> = [];
  
  for (const { parsedDoc, validated } of validatedDocs) {
    try {
      const built = buildDocument(parsedDoc, validated, context);
      builtDocs.push(built);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      builderErrors.push({
        document: parsedDoc.ref.id,
        error: err,
      });
      
      if (failFast) {
        throw new Error(`Builder failed for ${parsedDoc.ref.id}: ${err.message}`);
      }
    }
  }
  
  if (builderErrors.length > 0) {
    console.warn(`Builder failed for ${builderErrors.length} documents`);
    builderErrors.forEach(({ document, error }) => {
      console.error(`  - ${document}: ${error.message}`);
    });
  }
  
  errors.push(...builderErrors);
  
  // Stage 6: Registry
  registry.initialize(builtDocs);
  
  console.log(`Pipeline complete: ${builtDocs.length} documents indexed, ${errors.length} errors`);
  
  return {
    documents: builtDocs,
    errors,
    registry,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validate a single document with better error handling
 */
function validateDocument(parsedDoc: import('./documents/types').ParsedDoc) {
  return validateDocuments([parsedDoc])[0];
}

/**
 * Build a single document with better error handling
 */
function buildDocument(
  parsedDoc: import('./documents/types').ParsedDoc,
  validated: import('./documents/types').ValidatedMetadata,
  context: BuilderContext
) {
  return buildDocuments([parsedDoc], [validated], context)[0];
}

// ============================================================================
// Convenience Functions
// ============================================================================

/**
 * Initialize the content engine with a single collection
 */
export async function initializeCollection(collection: string, options?: Omit<PipelineOptions, 'collections'>): Promise<PipelineResult> {
  return executePipeline({ ...options, collections: [collection] });
}

/**
 * Initialize the content engine with all collections
 */
export async function initializeAll(options?: PipelineOptions): Promise<PipelineResult> {
  return executePipeline(options);
}

// Re-export key types and classes
export type { ContentDocument } from './documents/types';
export { Registry, getRegistry, resetRegistry } from './registry/registry';
export { renderCard, canRenderCard, renderCards } from './renderers/CardRenderer';
export { ValidationError } from './validation/schemas';
