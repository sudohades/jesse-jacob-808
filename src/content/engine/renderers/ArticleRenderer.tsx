/**
 * Content Engine - Article Renderer Stage
 *
 * Generic ArticleRenderer: consumes only ContentDocument and produces
 * a Halden UI presentation composition.
 *
 * Generic implementation supports any document kind/layout. This preserves the vertical
 * slice goal: typed ContentDocument → fully rendered detail route.
 */

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ContentDocument, AssetRef } from '../documents/types';
import { Container } from '@/components/halden-ui/layout/Container';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHeader } from '@/components/site/primitives/PageHeader';
import { BackNavigation } from '@/components/site/BackNavigation';

import { Body } from '@/components/halden-ui/typography/Body';
import { Badge } from '@/components/halden-ui/ui/Badge';
import { CodeLabel } from '@/components/halden-ui/typography/CodeLabel';
import { renderMdxNode } from '../mdx/mdxToHalden';
import { MdxNode, MdxTransformResult } from '../mdx/transform';

function hasSemanticBody(content: unknown): content is MdxTransformResult {
  return typeof content === 'object' && content !== null && Array.isArray((content as { nodes?: unknown }).nodes);
}

// ArticleRenderer owns composition; MDX rendering is delegated to a centralized mapping layer.

export function ArticleRenderer({ document }: { document: ContentDocument }) {
  const cover = document.assetMap?.['cover'] as (AssetRef & { path: string }) | undefined;
  const coverSrc = cover?.path;
  const coverAlt = cover?.alt || document.metadata.title;

  const techs = document.metadata.technologies || [];
  const links = document.metadata.links || [];

  const nodes: MdxNode[] = hasSemanticBody(document.content) ? document.content.nodes : [];

  return (
    <SiteShell>
      <Container>
        <BackNavigation collection={document.collection} />
        <PageHeader
          eyebrow={document.collection}
          title={document.metadata.title}
          compact
          contained={false}
        />


      {document.metadata.description && (
        <div className="mt-6">
          <Body muted>{document.metadata.description}</Body>
        </div>
      )}

      {techs.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {techs.map((t) => (
            <Badge key={t} tone="neutral">
              {t}
            </Badge>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {links.map((l) => (
            l.url.startsWith('/') ? (
              <Link key={l.url} href={l.url} className="hd-link">
                {l.label}
              </Link>
            ) : (
              <a
                key={l.url}
                href={l.url}
                target={l.url.startsWith('http') ? '_blank' : undefined}
                rel={l.url.startsWith('http') ? 'noreferrer' : undefined}
                className="hd-link"
              >
                {l.label}
              </a>
            )
          ))}
        </div>
      )}

      {coverSrc && (
        <div className="relative mt-8 overflow-hidden rounded-xl border border-[var(--color-hairline)]">
          <div className="relative" style={{ aspectRatio: '16 / 9' }}>
            <Image
              src={coverSrc}
              alt={coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <article className="mt-10">
        {nodes.map((node, index) => renderMdxNode(node, document, index))}
      </article>

      {/* Debug-style code label for Phase 1 parity */}
      {document.metadata.tags?.[0] && (
        <div className="mt-10">
          <CodeLabel prefix="//">{document.metadata.tags[0]}</CodeLabel>
        </div>
      )}
      </Container>
    </SiteShell>
  );
}
