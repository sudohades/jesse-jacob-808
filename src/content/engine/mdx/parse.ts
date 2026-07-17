/** Parser stage: isolate YAML frontmatter from the raw MDX body. */

import * as yaml from 'js-yaml';

import { LoadedDoc, ParsedDoc } from '../documents/types';

function extractFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const lines = content.replace(/^\uFEFF/, '').split(/\r?\n/);
  if (lines[0]?.trim() !== '---') {
    return { frontmatter: {}, body: content };
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (closingIndex === -1) {
    throw new Error('Frontmatter starts with --- but has no closing delimiter');
  }

  const loaded = yaml.load(lines.slice(1, closingIndex).join('\n'));
  if (loaded === undefined || loaded === null) {
    return { frontmatter: {}, body: lines.slice(closingIndex + 1).join('\n') };
  }
  if (typeof loaded !== 'object' || Array.isArray(loaded)) {
    throw new Error('Frontmatter must be a YAML mapping');
  }

  return {
    frontmatter: loaded as Record<string, unknown>,
    body: lines.slice(closingIndex + 1).join('\n'),
  };
}

export function parseDocument(loadedDoc: LoadedDoc): ParsedDoc {
  const { frontmatter, body } = extractFrontmatter(loadedDoc.content);
  return { ref: loadedDoc.ref, frontmatter, content: body };
}

export function parseDocuments(loadedDocs: LoadedDoc[]): ParsedDoc[] {
  return loadedDocs.map(parseDocument);
}
