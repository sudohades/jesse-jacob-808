import * as path from 'path';
import * as fs from 'fs';

import { AssetRef, ValidatedMetadata } from '../documents/types';

/**
 * Resolve asset paths relative to the document's collection directory.
 */
export function resolveAssetPath(
  assetPath: string,
  collection: string,
  docId: string,
  contentRoot: string
): string {
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(assetPath)) {
    return assetPath;
  }
  // If the path is already absolute (starts with /), return as-is.
  if (path.isAbsolute(assetPath)) {
    return assetPath;
  }

  // If the path starts with ./ or ../, resolve relative to document directory.
  if (assetPath.startsWith('./') || assetPath.startsWith('../')) {
    const docDir = path.join(contentRoot, collection, path.dirname(docId));
    const resolved = path.resolve(docDir, assetPath);
    return '/' + path.relative(contentRoot, resolved).replace(/\\/g, '/');
  }

  // Otherwise, resolve relative to the document directory.
  const docDir = path.join(contentRoot, collection, path.dirname(docId));
  const resolved = path.resolve(docDir, assetPath);
  return '/' + path.relative(contentRoot, resolved).replace(/\\/g, '/');
}

function assertResolvedLocalAsset(assetPath: string): void {
  if (!assetPath.startsWith('/')) return;
  const publicRoot = path.join(process.cwd(), 'public');
  const candidate = path.resolve(publicRoot, `.${assetPath}`);
  if (candidate !== publicRoot && !candidate.startsWith(`${publicRoot}${path.sep}`)) {
    throw new Error(`Resolved asset escapes the public directory: ${assetPath}`);
  }
  if (!fs.existsSync(candidate)) {
    throw new Error(`Resolved asset does not exist in public/: ${assetPath}`);
  }
}

export function resolveBasicAssets(
  metadata: ValidatedMetadata['metadata'],
  collection: string,
  docId: string,
  contentRoot: string
): Record<string, AssetRef> | undefined {
  const assetMap: Record<string, AssetRef> = {};
  let hasAssets = false;

  // Resolve cover image
  if (metadata.cover) {
    const resolvedPath = resolveAssetPath(metadata.cover.path, collection, docId, contentRoot);
    assertResolvedLocalAsset(resolvedPath);
    assetMap['cover'] = {
      ...metadata.cover,
      path: resolvedPath,
    };
    hasAssets = true;
  }

  // Resolve gallery images
  if (metadata.gallery && metadata.gallery.length > 0) {
    metadata.gallery.forEach((asset, index) => {
      const resolvedPath = resolveAssetPath(asset.path, collection, docId, contentRoot);
      assertResolvedLocalAsset(resolvedPath);
      assetMap[`gallery[${index}]`] = {
        ...asset,
        path: resolvedPath,
      };
    });
    hasAssets = true;
  }

  // Resolve SEO OG image
  if (metadata.seo?.ogImage) {
    const resolvedPath = resolveAssetPath(metadata.seo.ogImage.path, collection, docId, contentRoot);
    assertResolvedLocalAsset(resolvedPath);
    assetMap['seo.ogImage'] = {
      ...metadata.seo.ogImage,
      path: resolvedPath,
    };
    hasAssets = true;
  }

  return hasAssets ? assetMap : undefined;
}

export function resolveInlineImageAssets(
  inlineImageSrcs: string[],
  collection: string,
  docId: string,
  contentRoot: string
): Record<string, AssetRef> {
  const assetMap: Record<string, AssetRef> = {};

  for (const src of inlineImageSrcs) {
    const resolvedPath = resolveAssetPath(src, collection, docId, contentRoot);
    assertResolvedLocalAsset(resolvedPath);
    // Key by the raw src string so mdxToHalden can look up `assetMap[node.src]`.
    assetMap[src] = {
      type: 'image',
      path: resolvedPath,
      alt: undefined,
    };
  }

  return assetMap;
}
