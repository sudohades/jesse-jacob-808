# Content Specification

## Purpose

This is the authoring and data contract for local content documents. Content
describes meaning; renderers describe presentation. Every document lives below
`content/<collection>/` and is compiled before a route can render it.

## File conventions

```text
content/
  projects/<slug>/index.mdx
  blog/<slug>/index.mdx
  resources/<slug>/index.mdx
  services/<slug>/index.mdx
  pages/<slug>/index.mdx
```

`.md` and `.mdx` files are discovered recursively. The builder derives a
stable ID from the path and a URL slug from the document convention. Collection
names are folder names; do not add loader code for a new collection.

## Frontmatter

All documents require the following frontmatter fields:

```yaml
---
title: Example title
description: A concise, public description.
status: published       # draft | published
visibility: public      # public | private | unlisted
kind: card
layout: project
---
```

Optional common fields:

```yaml
summary: Short card copy.
date: 2026-01-01
updated: 2026-01-02
featured: true
tags: [systems, mdx]
authors: [hades]
technologies: [TypeScript, Next.js]
links:
  - label: Repository
    url: https://example.com
cover:
  type: image
  path: /placeholder-images/hero-placeholder.svg
  alt: Descriptive alternative text
gallery:
  - type: image
    path: ./diagram.svg
seo:
  ogImage:
    type: image
    path: ./og.png
  twitterCard: summary_large_image
```

`kind` and `layout` currently select intent but are not yet a strict variant
schema. Use the existing `card`/`project` convention for current fixtures;
new combinations need a validation and renderer change before authoring.

## Asset contract

An asset reference has `type`, `path`, and optional `alt`. Relative paths are
resolved from the MDX document’s directory; root paths refer to `public/`.
Local resolved assets must exist in `public/` and cannot escape it. Markdown
images follow the same rule.

```md
![Architecture diagram](./architecture.svg)
```

Do not put raw filesystem paths, Tailwind classes, or runtime imports in MDX.
Remote image support is not currently defined. Use a local public asset until
a remote-image policy and Next configuration are introduced.

## Body authoring contract

The body is semantic Markdown/MDX. Current supported Markdown is:

- headings and paragraphs;
- strong, emphasis, inline code, links, hard breaks, and images;
- fenced code blocks, blockquotes, ordered/unordered nested lists;
- GFM tables and horizontal rules.

The compiler preserves source order and hierarchy. A list item can contain
paragraphs, nested lists, quotes, and other supported blocks. Inline formatting
is recursive, so combinations such as `**strong and *emphasis***` retain their
structure.

## Unsupported authoring

Raw HTML, MDX JSX components, JavaScript expressions, imports/exports, and
Markdown constructs without a semantic IR mapping are rejected. This is
intentional: presentation and executable behavior must be centrally registered
before authors can use them.

Future custom components will be represented as typed semantic blocks, with a
documented schema and renderer mapping. Authors will not import UI components.

## Publication behavior

`status` and `visibility` are document metadata. Listing routes currently ask
for `published` and `public` card documents; detail routes look up by collection
and slug. Do not assume an unpublished/private document is safe to expose until
route-level publication policy is expanded and tested.

## Derived fields

The builder, not authors, creates the slug, excerpt, reading time, canonical
URL when a site URL is supplied, and `assetMap`. Related documents, search
tokens, table of contents, blocks, and page layout data are planned additions,
not current authoring fields.
