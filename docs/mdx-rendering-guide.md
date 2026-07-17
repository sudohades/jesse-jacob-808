# MDX Rendering Guide

## Principle

Authors write semantic content. The Content Engine parses it into an ordered
semantic tree, and the renderer maps that tree to Halden UI presentation.
Authors do not write utility classes, token names, layout wrappers, imports, or
React components in MDX.

```text
MDX source → semantic IR → Article/Card renderer → Halden UI → HTML
```

The same source produces the same semantic tree regardless of route or
collection. Renderers control composition; Halden UI controls typography,
spacing, surfaces, responsiveness, themes, and interactions.

## Supported Markdown

| Authoring syntax | Semantic result | Presentation rule |
|---|---|---|
| `#` through `######` | heading | real heading element with Halden typography |
| paragraphs | paragraph | Halden Body and standard vertical rhythm |
| `**strong**`, `*em*` | recursive inline nodes | semantic `strong`/`em` styling |
| `` `code` `` | inline code | monospace inline styling |
| `[label](url)` | link | accessible link with external-link behavior |
| `![alt](path)` | image | resolved `assetMap` image, responsive container |
| fenced code | code block | readable surface and preformatted code |
| `>` | blockquote | accent border and recursively rendered content |
| ordered/unordered lists | list/list item | semantic list, including nested blocks |
| GFM table | table/rows/cells | responsive overflow wrapper and cell typography |
| `---` | thematic break | tokenized divider |

Formatting can nest in paragraphs, headings, links, lists, quotes, and table
cells where Markdown permits it. Author order is preserved: a code block or
table stays exactly where it appears in the document.

## Images and assets

Images must have useful alternative text and use an approved local public path
or a path relative to their document. The builder resolves every cover,
gallery, SEO, and inline-image reference before rendering.

```md
![Network topology](./topology.svg)
```

Renderers only read `document.assetMap`. They never construct a public URL or
fall back to an unresolved Markdown path. A missing local target is a build
error, not a broken image in production.

## Links and code

Use descriptive labels rather than bare URLs. External links open safely with
the renderer’s external-link policy. Fenced code may include a language label:

````md
```ts
export const answer = 42;
```
````

Code is content, not an executable MDX expression. Syntax highlighting and a
copy control are presentation enhancements; neither changes the authoring
contract.

## Lists, quotes, and tables

Use normal Markdown indentation for nested lists. A list item can contain a
paragraph and a child list; do not use HTML to force spacing. Blockquotes can
contain supported blocks and inline formatting. Tables are GFM tables and
should use concise text; the renderer provides horizontal scrolling on narrow
screens.

```md
1. Establish the baseline.
   - Capture evidence.
   - Record the decision.

> **Important:** preserve the rollback path.
```

## Intentional restrictions

The compiler rejects raw HTML, JSX components, JavaScript expressions,
imports/exports, and unsupported syntax. This keeps untrusted author content
out of the presentation/runtime boundary and avoids one-off styling APIs.

When a new semantic capability is needed—such as `Callout`, `Gallery`, or
`Timeline`—first define its content schema and semantic IR node, then add a
central renderer mapping and tests. Do not introduce it by importing a UI
component inside an MDX file.

## Accessibility and responsive behavior

Use meaningful heading levels, descriptive image alt text, informative link
labels, and code fences with a language when known. The renderer preserves
semantic HTML, theme tokens, focus behavior, and responsive media/table
constraints. Avoid animation on long-form body text; any renderer animation
must respect reduced-motion preferences.

## Debugging an MDX document

1. Confirm required frontmatter and an allowed `kind`/`layout`.
2. Confirm every local image exists beneath `public/` after resolution.
3. Remove JSX/HTML/expressions and replace them with supported Markdown.
4. If a needed construct is unsupported, add it through the engine contract,
   not a route-local renderer workaround.
