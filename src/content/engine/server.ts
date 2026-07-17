/**
 * Content Engine - Server-Side Initialization
 * 
 * Server-side utilities for initializing the Content Engine in Next.js.
 * This should be called during build time or in server components.
 */

import { executePipeline, getRegistry, PipelineOptions } from './index';

// ============================================================================
// Server Initialization
// ============================================================================

/**
 * Initialize the content engine on the server
 * This function should be called during build time or in server components
 * to ensure the registry is populated with content documents.
 */
export async function initializeContentEngine(options?: PipelineOptions) {
  const registry = getRegistry();
  
  // Only initialize if not already initialized
  if (registry.isInitialized()) {
    return registry;
  }
  
  // A server registry represents one deterministic content corpus. Loading all
  // convention-discovered collections prevents the first route rendered from
  // deciding which later routes can query successfully.
  const result = await executePipeline({ ...options, collections: undefined });
  
  return result.registry;
}

/**
 * Get the registry (initializing if necessary)
 */
export async function getContentRegistry(options?: PipelineOptions) {
  return initializeContentEngine(options);
}
