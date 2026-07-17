import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { InlineToken, MdxNode } from './transform';
import { ContentDocument } from '../documents/types';
import { Body } from '@/components/halden-ui/typography/Body';
import { Heading } from '@/components/halden-ui/typography/Heading';
import { Surface } from '@/components/halden-ui/ui/Surface';

function assetPath(document: ContentDocument, src: string): string | null {
  return document.assetMap?.[src]?.path ?? null;
}

function renderBlockImage(document: ContentDocument, src: string, alt: string, key: React.Key) {
  const resolved = assetPath(document, src);
  if (!resolved) return null;
  return (
    <div key={key} className="mt-8 overflow-hidden rounded-xl border border-[var(--color-hairline)]">
      <Surface as="div" className="relative" style={{ aspectRatio: '16 / 10' }}>
        <Image src={resolved} alt={alt} fill sizes="(max-width: 768px) 100vw, 80vw" className="object-cover" />
      </Surface>
    </div>
  );
}

function renderInlineTokens(tokens: InlineToken[], document: ContentDocument): React.ReactNode {
  return tokens.map((token, index) => {
    switch (token.type) {
      case 'text':
        return <React.Fragment key={index}>{token.value}</React.Fragment>;
      case 'strong':
        return <strong key={index}>{renderInlineTokens(token.children, document)}</strong>;
      case 'em':
        return <em key={index}>{renderInlineTokens(token.children, document)}</em>;
      case 'inlineCode':
        return <code key={index} className="font-mono text-[0.95em]">{token.value}</code>;
      case 'link':
        return token.url.startsWith('/') ? (
          <Link key={index} href={token.url} title={token.title} className="hd-link">
            {renderInlineTokens(token.children, document)}
          </Link>
        ) : (
          <a key={index} href={token.url} title={token.title} target={token.url.startsWith('http') ? '_blank' : undefined} rel={token.url.startsWith('http') ? 'noreferrer' : undefined} className="hd-link">
            {renderInlineTokens(token.children, document)}
          </a>
        );
      case 'image': {
        const resolved = assetPath(document, token.src);
        return resolved ? <Image key={index} src={resolved} alt={token.alt} title={token.title} width={1} height={1} unoptimized className="inline-block h-auto w-auto max-w-full align-middle" /> : null;
      }
      case 'break':
        return <br key={index} />;
    }
  });
}

function renderNodes(nodes: MdxNode[], document: ContentDocument, prefix: string): React.ReactNode[] {
  return nodes.map((node, index) => renderMdxNode(node, document, `${prefix}-${index}`));
}

export function renderMdxNode(node: MdxNode, document: ContentDocument, key: React.Key): React.ReactNode {
  switch (node.type) {
    case 'hr':
      return <div key={key} className="my-6 h-px bg-[var(--color-hairline)]" />;
    case 'heading': {
      return <div key={key} className="mt-8"><Heading level={node.level as 1 | 2 | 3 | 4 | 5 | 6}>{renderInlineTokens(node.children, document)}</Heading></div>;
    }
    case 'paragraph':
      return <div key={key} className="mt-4"><Body>{renderInlineTokens(node.children, document)}</Body></div>;
    case 'image':
      return renderBlockImage(document, node.src, node.alt, key);
    case 'codeBlock':
      return <Surface key={key} as="div" className="mt-6 rounded-xl border border-[var(--color-hairline)] bg-[var(--color-panel)] p-4"><pre className="whitespace-pre-wrap font-mono text-sm"><code>{node.code}</code></pre></Surface>;
    case 'blockquote':
      return <blockquote key={key} className="mt-6 border-l border-[var(--color-hairline)] pl-4">{renderNodes(node.children, document, String(key))}</blockquote>;
    case 'list': {
      const List = node.ordered ? 'ol' : 'ul';
      return (
        <List key={key} className={node.ordered ? 'mt-6 list-decimal pl-5' : 'mt-6 list-disc pl-5'} {...(node.ordered && node.start ? { start: node.start } : {})}>
          {node.items.map((item, itemIndex) => <li key={itemIndex} className="mt-2">{renderNodes(item.children, document, `${String(key)}-${itemIndex}`)}</li>)}
        </List>
      );
    }
    case 'table':
      return (
        <Surface key={key} as="div" className="mt-6 overflow-x-auto rounded-xl border border-[var(--color-hairline)] p-4">
          <table className="w-full text-left">
            <tbody>
              {node.rows.map((row, rowIndex) => {
                const Cell = rowIndex === 0 ? 'th' : 'td';
                return <tr key={rowIndex}>{row.map((cell, cellIndex) => <Cell key={cellIndex} className={rowIndex === 0 ? 'border-b border-[var(--color-hairline)] pb-2 text-xs font-medium' : 'py-2 pr-4 text-sm'} style={{ textAlign: node.align[cellIndex] ?? undefined }}>{renderInlineTokens(cell, document)}</Cell>)}</tr>;
              })}
            </tbody>
          </table>
        </Surface>
      );
  }
}
