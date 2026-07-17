/**
 * Content Engine - Discovery Stage
 * 
 * Discovers collections and candidate documents based on filesystem conventions.
 * 
 * Responsibilities:
 * - Discover collections based on directory structure
 * - Generate DocRef candidates (collection, id, path)
 * - Never parse MDX or validate metadata
 */

import { DocRef } from '../documents/types';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Configuration
// ============================================================================

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const SUPPORTED_EXTENSIONS = ['.mdx', '.md'];

// ============================================================================
// Discovery Functions
// ============================================================================

/**
 * Discover all collections in the content directory
 * Collections are determined by directory structure under content/
 */
export function discoverCollections(): string[] {
  if (!fs.existsSync(CONTENT_ROOT)) {
    return [];
  }

  const entries = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true });
  
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
}

/**
 * Discover all documents in a specific collection
 * Returns DocRef candidates for each document found
 */
export function discoverDocuments(collection: string): DocRef[] {
  const collectionPath = path.join(CONTENT_ROOT, collection);
  
  if (!fs.existsSync(collectionPath)) {
    return [];
  }

  const docRefs: DocRef[] = [];
  
  // Recursively walk the collection directory
  function walk(dir: string, relativePath: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const entryRelativePath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory()) {
        // Recurse into subdirectories
        walk(fullPath, entryRelativePath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        
        // Check if this is a supported content file
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          // Generate document ID from the relative path
          // Remove extension and normalize path separators
          const id = entryRelativePath
            .replace(ext, '')
            .replace(/\\/g, '/');
          
          docRefs.push({
            collection,
            id,
            path: fullPath,
          });
        }
      }
    }
  }
  
  walk(collectionPath, '');
  
  return docRefs.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Discover all documents across all collections
 */
export function discoverAllDocuments(): DocRef[] {
  const collections = discoverCollections();
  const allDocRefs: DocRef[] = [];
  
  for (const collection of collections) {
    const docRefs = discoverDocuments(collection);
    allDocRefs.push(...docRefs);
  }
  
  return allDocRefs;
}
