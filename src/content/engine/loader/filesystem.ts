/**
 * Content Engine - Loader Stage
 * 
 * Reads file bytes/strings for a DocRef.
 * 
 * Responsibilities:
 * - Read file content from filesystem
 * - Return LoadedDoc with raw text
 * - Never render UI or perform validation
 */

import { DocRef, LoadedDoc } from '../documents/types';
import * as fs from 'fs';

// ============================================================================
// Loader Functions
// ============================================================================

/**
 * Load a document from the filesystem
 * Takes a DocRef and returns the raw file content
 */
export function loadDocument(ref: DocRef): LoadedDoc {
  try {
    const content = fs.readFileSync(ref.path, 'utf-8');
    
    return {
      ref,
      content,
    };
  } catch (error) {
    throw new Error(`Failed to load document at ${ref.path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Load multiple documents
 */
export function loadDocuments(refs: DocRef[]): LoadedDoc[] {
  return refs.map(ref => loadDocument(ref));
}
