/**
 * Content Engine - Schema Validation Stage
 * 
 * Validates parsed frontmatter and ensures document model correctness.
 * 
 * Responsibilities:
 * - Validate frontmatter against schema
 * - Ensure required fields are present
 * - Validate field types and values
 * - Never compute enrichment fields
 * 
 * Phase 1: Simple validation with clear error messages
 * Later phases can integrate Zod or similar for more sophisticated validation
 */

import { ParsedDoc, ValidatedMetadata, ContentMetadata, DocumentStatus, DocumentVisibility, AssetRef, AssetType } from '../documents/types';

// ============================================================================
// Validation Errors
// ============================================================================

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ============================================================================
// Type Guards
// ============================================================================

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isDocumentStatus(value: unknown): value is DocumentStatus {
  return value === 'draft' || value === 'published';
}

function isDocumentVisibility(value: unknown): value is DocumentVisibility {
  return value === 'public' || value === 'private' || value === 'unlisted';
}

function isAssetType(value: unknown): value is AssetType {
  return value === 'image' || value === 'file' || value === 'link';
}

// ============================================================================
// Field Validation
// ============================================================================

function validateRequiredString(value: unknown, fieldName: string): string {
  if (!isString(value) || value.trim() === '') {
    throw new ValidationError(`Field '${fieldName}' is required and must be a non-empty string`, fieldName);
  }
  return value;
}

function validateOptionalString(value: unknown, fieldName: string): string | undefined {
  if (value === undefined || value === null) return undefined;
  
  // Handle Date objects (from YAML parsing)
  if (value instanceof Date) {
    return value.toISOString();
  }
  
  if (!isString(value)) {
    throw new ValidationError(`Field '${fieldName}' must be a string if provided`, fieldName);
  }
  return value;
}

function validateStatus(value: unknown): DocumentStatus {
  if (!isDocumentStatus(value)) {
    throw new ValidationError(`Field 'status' must be either 'draft' or 'published'`, 'status');
  }
  return value;
}

function validateVisibility(value: unknown): DocumentVisibility {
  if (!isDocumentVisibility(value)) {
    throw new ValidationError(`Field 'visibility' must be one of: 'public', 'private', 'unlisted'`, 'visibility');
  }
  return value;
}

function validateOptionalStringArray(value: unknown, fieldName: string): string[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isArray(value)) {
    throw new ValidationError(`Field '${fieldName}' must be an array if provided`, fieldName);
  }
  if (!value.every(item => isString(item))) {
    throw new ValidationError(`Field '${fieldName}' must be an array of strings`, fieldName);
  }
  return value as string[];
}

function validateOptionalAssetRef(value: unknown, fieldName: string): AssetRef | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isObject(value)) {
    throw new ValidationError(`Field '${fieldName}' must be an object if provided`, fieldName);
  }
  
  const obj = value;
  if (!isString(obj.type) || !isString(obj.path)) {
    throw new ValidationError(`Field '${fieldName}' must have 'type' and 'path' string properties`, fieldName);
  }
  
  if (!isAssetType(obj.type)) {
    throw new ValidationError(`Field '${fieldName}.type' must be one of: 'image', 'file', 'link'`, fieldName);
  }
  
  return {
    type: obj.type,
    path: obj.path,
    alt: validateOptionalString(obj.alt, `${fieldName}.alt`),
  };
}

function validateOptionalAssetRefArray(value: unknown, fieldName: string): AssetRef[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isArray(value)) {
    throw new ValidationError(`Field '${fieldName}' must be an array if provided`, fieldName);
  }
  
  return value.map((item, index) => {
    if (!isObject(item)) {
      throw new ValidationError(`Field '${fieldName}[${index}]' must be an object`, fieldName);
    }
    const validated = validateOptionalAssetRef(item, `${fieldName}[${index}]`);
    if (!validated) {
      throw new ValidationError(`Field '${fieldName}[${index}]' must have 'type' and 'path' properties`, fieldName);
    }
    return validated;
  });
}

function validateOptionalLinksArray(value: unknown, fieldName: string): Array<{ label: string; url: string }> | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isArray(value)) {
    throw new ValidationError(`Field '${fieldName}' must be an array if provided`, fieldName);
  }
  
  return value.map((item, index) => {
    if (!isObject(item)) {
      throw new ValidationError(`Field '${fieldName}[${index}]' must be an object`, fieldName);
    }
    const obj = item as Record<string, unknown>;
    if (!isString(obj.label) || !isString(obj.url)) {
      throw new ValidationError(`Field '${fieldName}[${index}]' must have 'label' and 'url' string properties`, fieldName);
    }
    return { label: obj.label, url: obj.url };
  });
}

function validateOptionalServicePrice(value: unknown): ContentMetadata['price'] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isObject(value) || typeof value.amount !== 'number' || !Number.isFinite(value.amount) || value.amount < 0) {
    throw new ValidationError("Field 'price' must have a non-negative numeric 'amount'", 'price');
  }
  if (!isString(value.currency) || !/^[A-Z]{3}$/.test(value.currency)) {
    throw new ValidationError("Field 'price.currency' must be a three-letter uppercase currency code", 'price.currency');
  }
  return { amount: value.amount, currency: value.currency };
}

function validateOptionalSeo(value: unknown, fieldName: string): ContentMetadata['seo'] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isObject(value)) {
    throw new ValidationError(`Field '${fieldName}' must be an object if provided`, fieldName);
  }
  
  const obj = value as Record<string, unknown>;
  const result: ContentMetadata['seo'] = {};
  
  if (obj.ogImage !== undefined && obj.ogImage !== null) {
    result.ogImage = validateOptionalAssetRef(obj.ogImage, `${fieldName}.ogImage`);
    if (!result.ogImage) {
      throw new ValidationError(`Field '${fieldName}.ogImage' must have 'type' and 'path' properties`, fieldName);
    }
  }
  
  if (obj.twitterCard !== undefined && obj.twitterCard !== null) {
    if (!isString(obj.twitterCard)) {
      throw new ValidationError(`Field '${fieldName}.twitterCard' must be a string`, fieldName);
    }
    const validCards: Array<'summary' | 'summary_large_image' | 'app' | 'player'> = ['summary', 'summary_large_image', 'app', 'player'];
    if (!validCards.includes(obj.twitterCard as 'summary' | 'summary_large_image' | 'app' | 'player')) {
      throw new ValidationError(`Field '${fieldName}.twitterCard' must be one of: ${validCards.join(', ')}`, fieldName);
    }
    result.twitterCard = obj.twitterCard as 'summary' | 'summary_large_image' | 'app' | 'player';
  }
  
  return Object.keys(result).length > 0 ? result : undefined;
}

// ============================================================================
// Metadata Validation
// ============================================================================

function validateMetadata(frontmatter: Record<string, unknown>): ContentMetadata {
  // Required fields
  const title = validateRequiredString(frontmatter.title, 'title');
  const description = validateRequiredString(frontmatter.description, 'description');
  const status = validateStatus(frontmatter.status);
  const visibility = validateVisibility(frontmatter.visibility);
  
  // Optional fields
  const summary = validateOptionalString(frontmatter.summary, 'summary');
  const date = validateOptionalString(frontmatter.date, 'date');
  const updated = validateOptionalString(frontmatter.updated, 'updated');
  const featured = frontmatter.featured === true;
  const tags = validateOptionalStringArray(frontmatter.tags, 'tags');
  const cover = validateOptionalAssetRef(frontmatter.cover, 'cover');
  const gallery = validateOptionalAssetRefArray(frontmatter.gallery, 'gallery');
  const authors = validateOptionalStringArray(frontmatter.authors, 'authors');
  const technologies = validateOptionalStringArray(frontmatter.technologies, 'technologies');
  const links = validateOptionalLinksArray(frontmatter.links, 'links');
  const price = validateOptionalServicePrice(frontmatter.price);
  const seo = validateOptionalSeo(frontmatter.seo, 'seo');
  
  return {
    title,
    description,
    summary,
    status,
    visibility,
    date,
    updated,
    featured,
    tags,
    cover,
    gallery,
    authors,
    technologies,
    links,
    price,
    seo,
  };
}

// ============================================================================
// Main Validation Function
// ============================================================================

/**
 * Validate a parsed document's frontmatter
 * Returns validated metadata with kind and layout
 */
export function validateDocument(parsedDoc: ParsedDoc): ValidatedMetadata {
  const { frontmatter } = parsedDoc;
  
  // Validate required fields for kind and layout
  const kind = validateRequiredString(frontmatter.kind, 'kind');
  const layout = validateRequiredString(frontmatter.layout, 'layout');
  
  // Validate metadata
  const metadata = validateMetadata(frontmatter);
  
  return {
    metadata,
    kind,
    layout,
  };
}

/**
 * Validate multiple documents
 */
export function validateDocuments(parsedDocs: ParsedDoc[]): ValidatedMetadata[] {
  return parsedDocs.map(doc => validateDocument(doc));
}
