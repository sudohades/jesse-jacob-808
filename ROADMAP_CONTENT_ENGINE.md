# Content Engine Roadmap

## Purpose

The Content Engine turns repository-owned MDX into validated, typed documents
and renders those documents through Halden UI. It is a compiler pipeline, not
a CMS and not a collection of route-specific Markdown readers.

This roadmap is the implementation-status source of truth. The companion
documents are:

- [Content specification](docs/content-specification.md): data contract.
- [Engine architecture](docs/content-engine-architecture.md): stage boundaries.
- [MDX rendering guide](docs/mdx-rendering-guide.md): supported authoring and presentation rules.

## Current state — Vertical Slice 004 complete

The engine now supports project, blog, resource, service, and page collection
discovery. Projects, blog, resources, and services have listing/detail routes;
the page collection is indexed but is not yet routed declaratively.

```text
content/ → discovery → loader → frontmatter parser → AST transform
        → validation → builder/assets → registry → renderer → Halden UI
```

Implemented capabilities:

- Convention-based, deterministic discovery of `.md` and `.mdx` documents.
- YAML frontmatter isolation and common metadata validation.
- Unified/remark parsing with GFM and MDX syntax recognition.
- Ordered, recursive semantic IR for headings, paragraphs, formatting, links,
  images, code, blockquotes, lists, tables, and thematic breaks.
- Explicit failure for unsupported MDX/Markdown nodes rather than silent text
  degradation.
- Builder-owned cover, gallery, SEO, and inline-image `assetMap` resolution.
- Local public-asset existence and traversal validation.
- Collection-qualified registry IDs, duplicate detection, and collection query
  filtering.
- Shared ArticleRenderer and centralized semantic-node mapping.

## Architectural rules

1. The parser/transform owns syntax interpretation. Renderers never inspect
   raw Markdown or use Markdown regular expressions.
2. The semantic IR preserves source order and nested hierarchy.
3. Frontmatter, computed fields, and body nodes stay separate.
4. The builder owns derived fields and asset resolution; renderers use only
   `ContentDocument` data and resolved asset references.
5. Routes are thin requesters. Halden UI remains presentation-only.
6. New content types extend schemas and renderer selection; they do not add
   bespoke filesystem loaders.

## What is deliberately not complete

- Document variants are still represented by string `kind`/`layout` fields;
  they are not discriminated TypeScript unions.
- Validation has no collection/kind schema registry, URL/date policy, or
  structured diagnostics object.
- The registry has no content fingerprinting or development invalidation.
- Renderer selection is still route-level; `CardRenderer` is project-card
  shaped and ArticleRenderer has no layout variants.
- Page blocks, custom MDX components, notes, table of contents, related
  content, search, and declarative page routes are not implemented.
- Compiler and integration fixtures are needed before claiming production
  readiness.

## Vertical Slice 005 — Compiler confidence and typed rendering

**Goal:** make the corrected compiler path testable, typed, and safe to extend.

1. Add fixture tests for source order, nested lists/quotes, mixed inline
   formatting, escaping, tables, images, invalid assets, and unsupported MDX.
2. Introduce stage-aware diagnostics with document path and source location.
3. Define strict shared plus collection/kind metadata schemas and typed
   document/IR payloads.
4. Add a renderer selector keyed by validated kind/layout; make cards explicit
   presentation variants rather than universal ProjectCards.
5. Define registry fingerprint/cache behavior and test multi-collection
   initialization in any route order.

**Completion criteria:** all supported syntax is covered by parser-to-renderer
tests; invalid documents fail with actionable diagnostics; and projects, blog,
and resources render through typed renderer selection without collection-order
dependence.

## Vertical Slice 006 — Declarative pages and blocks

**Depends on VS005.** Define a `page` document variant, an allowlisted block
schema, and a PageRenderer. Migrate two existing static pages only after their
blocks have stable typed contracts. Custom MDX components must compile into
registered semantic blocks; authors must never import presentation components.

## Change checklist

Before adding a content feature, confirm: parser support, IR representation,
schema validation, builder enrichment, asset policy, renderer mapping,
fixture coverage, and route behavior. Update these three documents in the
same change when a supported capability changes.
