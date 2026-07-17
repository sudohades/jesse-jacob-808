# Documentation Guide

This directory contains active repository documentation. Historical trackers
and duplicate investigations were consolidated on 2026-07-17; current files
describe the implementation rather than preserving every intermediate step.

## Start here

| Area | Primary document | Purpose |
|---|---|---|
| Repository/runtime | [architecture/README.md](architecture/README.md) | Layers, request flow, ownership, risks |
| Styling | [architecture/styling.md](architecture/styling.md) | CSS entrypoint, tokens, typography, glass |
| Content contract | [content-specification.md](content-specification.md) | Frontmatter, collections, asset rules |
| Content compiler | [content-engine-architecture.md](content-engine-architecture.md) | Pipeline and extension boundaries |
| MDX authoring | [mdx-rendering-guide.md](mdx-rendering-guide.md) | Supported semantic Markdown |
| Current content work | [../ROADMAP_CONTENT_ENGINE.md](../ROADMAP_CONTENT_ENGINE.md) | Status and next milestones |
| Resolved incidents | [debug/README.md](debug/README.md) | Tooling/styling recovery record |

## Documentation rules

1. Prefer the implementation over a document when they disagree.
2. Keep specifications concise and current; move completed checklists into the
   roadmap rather than keeping parallel plans.
3. Record an incident only when its root cause or operational prevention remains
   useful. Do not retain duplicate debugging transcripts.
4. Update the relevant contract and roadmap in the same change when a supported
   capability changes.
5. New documentation should answer a durable engineering question, not narrate
   routine edits.

## Current repository status

The UI runtime uses a layered site/Halden/platform model. The Content Engine
now has AST-backed MDX rendering for its supported Markdown subset. Its next
milestone is compiler fixtures, structured diagnostics, typed variants, renderer
selection, and cache behavior—not additional authoring syntax.
