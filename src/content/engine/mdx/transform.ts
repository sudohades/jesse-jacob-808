/**
 * Semantic MDX transform.
 *
 * Parsing is delegated to the unified/remark AST pipeline. This module only
 * translates that ordered syntax tree into the engine's renderer-neutral IR.
 */

import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';

import { ParsedDoc } from '../documents/types';

export interface SourcePosition {
  start: { line: number; column: number; offset?: number };
  end: { line: number; column: number; offset?: number };
}

type SyntaxNode = {
  type: string;
  value?: string;
  children?: SyntaxNode[];
  position?: SourcePosition;
  depth?: number;
  lang?: string | null;
  url?: string;
  alt?: string;
  title?: string | null;
  ordered?: boolean;
  start?: number | null;
  align?: Array<'left' | 'right' | 'center' | null>;
};

export type InlineToken =
  | { type: 'text'; value: string; position?: SourcePosition }
  | { type: 'strong'; children: InlineToken[]; position?: SourcePosition }
  | { type: 'em'; children: InlineToken[]; position?: SourcePosition }
  | { type: 'inlineCode'; value: string; position?: SourcePosition }
  | { type: 'link'; children: InlineToken[]; url: string; title?: string; position?: SourcePosition }
  | { type: 'image'; alt: string; src: string; title?: string; position?: SourcePosition }
  | { type: 'break'; position?: SourcePosition };

export type MdxNode =
  | { type: 'heading'; level: number; children: InlineToken[]; position?: SourcePosition }
  | { type: 'paragraph'; children: InlineToken[]; position?: SourcePosition }
  | { type: 'image'; alt: string; src: string; title?: string; position?: SourcePosition }
  | { type: 'codeBlock'; language?: string; code: string; position?: SourcePosition }
  | { type: 'blockquote'; children: MdxNode[]; position?: SourcePosition }
  | { type: 'table'; align: Array<'left' | 'right' | 'center' | null>; rows: InlineToken[][][]; position?: SourcePosition }
  | { type: 'list'; ordered: boolean; start?: number; items: Array<{ children: MdxNode[]; position?: SourcePosition }>; position?: SourcePosition }
  | { type: 'hr'; position?: SourcePosition };

export interface MdxTransformResult {
  nodes: MdxNode[];
  raw: string;
  inlineImageSrcs: string[];
}

export class MdxTransformError extends Error {
  constructor(message: string, public readonly position?: SourcePosition) {
    super(message);
    this.name = 'MdxTransformError';
  }
}

function positionOf(node: SyntaxNode): SourcePosition | undefined {
  return node.position;
}

function unsupported(node: SyntaxNode): never {
  const location = node.position
    ? ` at ${node.position.start.line}:${node.position.start.column}`
    : '';
  throw new MdxTransformError(`Unsupported MDX/Markdown node '${node.type}'${location}`, node.position);
}

function transformInline(nodes: SyntaxNode[], imageSources: Set<string>): InlineToken[] {
  return nodes.map((node): InlineToken => {
    switch (node.type) {
      case 'text':
        return { type: 'text', value: node.value ?? '', position: positionOf(node) };
      case 'strong':
        return { type: 'strong', children: transformInline(node.children ?? [], imageSources), position: positionOf(node) };
      case 'emphasis':
        return { type: 'em', children: transformInline(node.children ?? [], imageSources), position: positionOf(node) };
      case 'inlineCode':
        return { type: 'inlineCode', value: node.value ?? '', position: positionOf(node) };
      case 'link':
        return {
          type: 'link',
          children: transformInline(node.children ?? [], imageSources),
          url: node.url ?? '',
          ...(node.title ? { title: node.title } : {}),
          position: positionOf(node),
        };
      case 'image': {
        const src = node.url ?? '';
        imageSources.add(src);
        return {
          type: 'image',
          alt: node.alt ?? '',
          src,
          ...(node.title ? { title: node.title } : {}),
          position: positionOf(node),
        };
      }
      case 'break':
        return { type: 'break', position: positionOf(node) };
      default:
        return unsupported(node);
    }
  });
}

function transformBlocks(nodes: SyntaxNode[], imageSources: Set<string>): MdxNode[] {
  return nodes.map((node): MdxNode => {
    switch (node.type) {
      case 'heading':
        return {
          type: 'heading',
          level: node.depth ?? 1,
          children: transformInline(node.children ?? [], imageSources),
          position: positionOf(node),
        };
      case 'paragraph': {
        const children = transformInline(node.children ?? [], imageSources);
        // A standalone Markdown image is a block-level semantic image. Images
        // mixed with prose remain inline tokens and retain their source order.
        if (children.length === 1 && children[0].type === 'image') {
          const image = children[0];
          return { type: 'image', alt: image.alt, src: image.src, ...(image.title ? { title: image.title } : {}), position: positionOf(node) };
        }
        return { type: 'paragraph', children, position: positionOf(node) };
      }
      case 'code':
        return {
          type: 'codeBlock',
          ...(node.lang ? { language: node.lang } : {}),
          code: node.value ?? '',
          position: positionOf(node),
        };
      case 'blockquote':
        return { type: 'blockquote', children: transformBlocks(node.children ?? [], imageSources), position: positionOf(node) };
      case 'list':
        return {
          type: 'list',
          ordered: node.ordered === true,
          ...(node.ordered && node.start !== null && node.start !== undefined ? { start: node.start } : {}),
          items: (node.children ?? []).map((item) => {
            if (item.type !== 'listItem') return unsupported(item);
            return { children: transformBlocks(item.children ?? [], imageSources), position: positionOf(item) };
          }),
          position: positionOf(node),
        };
      case 'table':
        return {
          type: 'table',
          align: node.align ?? [],
          rows: (node.children ?? []).map((row) => {
            if (row.type !== 'tableRow') return unsupported(row);
            return (row.children ?? []).map((cell) => {
              if (cell.type !== 'tableCell') return unsupported(cell);
              return transformInline(cell.children ?? [], imageSources);
            });
          }),
          position: positionOf(node),
        };
      case 'thematicBreak':
        return { type: 'hr', position: positionOf(node) };
      default:
        return unsupported(node);
    }
  });
}

/** Parse MDX, GFM and Markdown into an ordered renderer-neutral document IR. */
export function transformMdxBody(parsedDoc: ParsedDoc): MdxTransformResult {
  if (typeof parsedDoc.content !== 'string') {
    throw new MdxTransformError('MDX transform requires the parser stage to provide a raw body string');
  }

  const raw = parsedDoc.content;
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMdx)
    .parse(raw) as unknown as SyntaxNode;

  if (tree.type !== 'root') {
    throw new MdxTransformError('MDX parser did not return a root document node');
  }

  const imageSources = new Set<string>();
  return {
    nodes: transformBlocks(tree.children ?? [], imageSources),
    raw,
    inlineImageSrcs: [...imageSources],
  };
}
