# Content Engine Architecture

## Scope

The Content Engine compiles local MDX into `ContentDocument` values. It owns
content ingestion, semantic interpretation, validation, derived data, and
lookup. React routes request documents; renderers compose them; Halden UI
styles them.

```text
Filesystem → Discovery → Loader → Frontmatter Parser → AST Transform
           → Validation → Builder/Assets → Registry → Renderer → Halden UI
```

## Pipeline contracts

| Stage | Input | Output | Owns | Must not own |
|---|---|---|---|---|
| Filesystem | `content/` | files | source storage | UI concerns |
| Discovery | directories | `DocRef` | deterministic collection/path IDs | file parsing |
| Loader | `DocRef` | `LoadedDoc` | UTF-8 source read | validation/rendering |
| Parser | `LoadedDoc` | `ParsedDoc` | YAML frontmatter/body separation | Markdown semantics |
| AST transform | raw body | semantic IR | MDX/GFM syntax and source order | metadata policy/UI |
| Validation | frontmatter | metadata | shared content constraints | derived fields |
| Builder | IR + metadata | `ContentDocument` | slug, excerpt, read time, asset map | UI rendering |
| Registry | documents | lookup/query API | indexing and collection filtering | parsing/rendering |
| Renderer | document | React tree | page/card composition | IO/parsing/validation |

## Semantic MDX model

`src/content/engine/mdx/transform.ts` uses unified with `remark-parse`,
`remark-gfm`, and `remark-mdx`. It traverses the syntax tree in source order;
it does not scan source with regular expressions.

The renderer-neutral IR supports:

- blocks: heading, paragraph, image, fenced/indented code, blockquote, list,
  table, and thematic break;
- recursive inlines: text, strong, emphasis, inline code, link, image, and
  hard break;
- recursive list items and blockquotes;
- source positions carried from the parser for diagnostics.

Unsupported MDX JSX, expressions, HTML, or unmodeled Markdown nodes fail the
transform explicitly. Adding a feature requires a semantic IR node and mapping
rule; it must never be passed through as unvalidated JSX.

## Metadata and document boundary

Frontmatter becomes `ContentDocument.metadata`; body content becomes the
semantic IR in `ContentDocument.content`. The builder may add an excerpt,
reading time, canonical URL, and `assetMap`. A renderer may read these fields
but must not derive or mutate them.

Current common metadata includes title, description, status, visibility,
optional dates, tags, authors, technologies, links, cover, gallery, and SEO.
`kind` and `layout` are required today but still strings. A schema registry and
discriminated document variants are planned before block/page expansion.

## Assets

Assets flow through one builder-owned path:

```text
frontmatter refs + semantic image nodes
          ↓
assetResolution.ts
          ↓
ContentDocument.assetMap
          ↓
renderer lookup by original image reference
```

Relative references are resolved from the document directory to a public URL.
Local public targets must exist and may not escape `public/`. Renderers never
construct a path or fall back to an unresolved image string. Remote-image
policy is intentionally not defined yet; add it with Next image configuration
and validation rather than treating it as a local asset.

## Registry and server lifecycle

The registry indexes documents by collection-qualified ID and by slug within a
collection. Duplicate IDs and slugs fail indexing. Collection listings use an
explicit collection filter, so an all-collection server registry cannot leak
blog or resources cards into projects.

Server initialization intentionally discovers the full corpus once. This
prevents the first rendered route from deciding which collection is available
to later routes. The current cache is process-local only; content fingerprint
and invalidation behavior remain future work.

## Rendering boundary

`ArticleRenderer` is the shared detail composition and delegates body nodes to
`mdxToHalden.tsx`. `CardRenderer` creates listing props. Both receive already
built documents. They may select presentation primitives, but they cannot read
the filesystem, parse MDX, validate metadata, or resolve assets.

Detail routes currently exist for projects, blog, resources, and services.
They retrieve by collection/slug and pass the result to ArticleRenderer. The
page collection is indexed but does not yet have a PageRenderer or declarative
route. Notes are not implemented.

## Extension procedure

1. Define the collection/kind schema and supported metadata.
2. Add semantic IR support only if the authoring syntax is new.
3. Add builder enrichment and asset rules where required.
4. Register a renderer strategy for the validated kind/layout.
5. Add parser, builder, registry, and rendered-output fixtures.
6. Add the route last.

This order keeps the compiler stable while the portfolio grows from articles
to cards, pages, layouts, and future block documents.
