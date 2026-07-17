# sudo-hades.dev

A personal engineering portfolio and technical publishing platform built with
**Next.js 15**, **TypeScript**, **Tailwind CSS**, a custom **Halden UI** design
system, and an MDX-backed Content Engine.

The project is designed around one principle:

> Build software that communicates engineering competence through implementation rather than presentation.

Rather than functioning as a traditional portfolio, this repository serves as
an extensible platform for publishing technical work, documenting engineering
investigations, showcasing infrastructure projects, and providing consulting
services across systems engineering, infrastructure, and applied AI.

---

## Overview

The application is built using the Next.js App Router with a layered
architecture:

**Brand Configuration** → **Platform Core** → **Halden UI**

Content-backed routes add a compiler path that turns local MDX into typed,
semantic documents before it reaches a renderer.

This separation ensures:

* Brand-agnostic design system (Halden UI)
* Framework-independent platform behaviors (Platform Core)
* Site-specific branding and composition (Brand Configuration)
* Repository-owned, typed content documents
* Reusable UI primitives over page-specific implementations
* Token-driven styling system
* Progressive enhancement
* Responsive layouts
* Accessibility-first navigation
* Long-term maintainability

---

## Architecture

### Layered Dependency Direction

The repository follows a strict layered architecture:

```text
Application Layer (app/)
    ↓
Site Components Layer (src/components/site/)
    ↓
Content / Platform Layers (src/content/, src/platform/)
    ↓
Halden UI Layer (src/components/halden-ui/, src/styles/)
    ↓
Utilities and Configuration (src/lib/, src/config/)
```

Content documents follow a complementary compiler pipeline:

```text
Filesystem → Discovery → Loader → Frontmatter → MDX/GFM AST
           → Semantic IR → Validation → Builder/Assets → Registry → Renderer
```

### Brand Configuration

Located in `src/config/`, this layer owns:

* Brand identity (name, wordmark, tagline)
* Navigation structure
* Site metadata (title, description, OpenGraph)
* Social links
* Author information
* Business details
* Theme configuration

Brand Configuration is framework-independent and consumed by Platform Core and
site composition.

### Platform Core

Located in `src/platform/core/`, this layer provides:

* Framework-independent metadata types
* Sitemap generation
* Next.js adapters for metadata and sitemap

Platform Core consumes Brand Configuration and provides framework-agnostic
platform behaviors.

### Halden UI

Located in `src/components/halden-ui/` and `src/styles/`, Halden UI is the
canonical design system owning:

* Typography primitives and tokens
* Spacing system
* Layout containers
* Navigation primitives
* Cards, panels, buttons
* Glassmorphism components
* Animations
* Design tokens (CSS variables)
* Theme engine

Halden UI is brand-agnostic and portable. The application consumes these
primitives through site components and adapters; Halden UI does not load files,
parse MDX, or import route logic.

### Content Engine

Located in `src/content/engine/`, this layer owns:

* Convention-based content discovery under `content/`
* YAML frontmatter isolation and validation
* Ordered MDX/GFM semantic transformation
* Derived document metadata and asset resolution
* Registry indexing and collection/slug lookup
* Renderer composition for typed content documents

The engine preserves author order and nested Markdown structure. Renderers use
semantic nodes and resolved `assetMap` entries; they never parse raw Markdown
or construct local asset paths.

### Adapter Pattern

Site-specific concerns are integrated via adapters:

* `src/components/halden-ui/navigation/SiteNavigation.tsx` adapts navigation
  primitives to site branding and routing state.
* Content renderers adapt typed documents to Halden UI primitives.
* Adapters own integration, not design-system redefinition.

---

## Features

### Portfolio and Publishing

Content-driven routes are available for:

* Projects (`/projects`, `/projects/[slug]`)
* Blog (`/blog`, `/blog/[slug]`)
* Resources (`/resources`, `/resources/[slug]`)
* Services (`/services`, `/services/[slug]`)

The home page and About page remain static compositions while declarative page
rendering is developed.

### Halden UI Design System

A custom component library providing:

* Typography tokens (Quantico, Share Tech Mono, Inter)
* Spacing system
* Responsive layout primitives
* Glassmorphism components
* Animations
* Reusable navigation primitives
* Cards, panels, buttons

The website consumes Halden UI rather than defining page-specific styling.

### Responsive Navigation

Navigation adapts between desktop and mobile while maintaining a shared design
language. The adapter pattern integrates Halden UI navigation with site
branding and route-aware state.

### Server Rendering and Static Optimization

The site uses Next.js App Router server components by default. Next.js applies
static optimization where the route and data allow it, preserving performance
and SEO without making content routes parse source at render time.

### Token-Driven Styling

Design tokens are defined as CSS variables and consumed throughout the
application:

* Semantic palette variables
* Hero gradient inputs
* Typography font variables
* Motion, shadow, radius, and blur tokens

---

## Technology Stack

### Framework

* Next.js 15
* React 19
* TypeScript

### Styling

* Tailwind CSS v4
* CSS Design Tokens
* Halden UI
* next/font (Quantico, Share Tech Mono, Inter)
* tw-animate-css

### Content

* unified and remark parsing
* remark-gfm and remark-mdx
* js-yaml frontmatter handling

### Component Libraries

* @radix-ui/react-slot (Radix composition patterns)
* lucide-react (icons)

### Utilities

* clsx
* tailwind-merge

### Analytics

* @vercel/analytics

### Animation

* CSS animations

---

# Repository Structure

```text
app/
├── about/
├── blog/
├── projects/
├── resources/
├── services/
├── layout.tsx
├── page.tsx
└── sitemap.ts

content/
├── projects/
├── blog/
├── resources/
├── services/
└── pages/

src/
├── components/
│   ├── site/              # Site-specific composition
│   └── halden-ui/         # Presentation primitives and adapters
├── content/engine/        # Content compiler, assets, registry, renderers
├── config/                # Brand configuration
├── platform/              # Core metadata/sitemap and Next adapters
├── styles/                # Runtime CSS tokens and primitive styles
├── constants/
└── lib/

public/
├── projects/
├── gradients/
├── overlays/
├── textures/
└── placeholder-images/

docs/
├── architecture/          # Runtime and styling guides
├── debug/                 # Durable recovery notes
├── content-specification.md
├── content-engine-architecture.md
└── mdx-rendering-guide.md
```

---

# Design Philosophy

The website intentionally minimizes unnecessary visual noise.

Instead of relying on heavy visual effects, it communicates through:

* Strong typography
* Spacing
* Hierarchy
* Content structure
* Restrained animation
* Engineering-focused language

Every component should contribute to clarity.

---

# Halden UI

The project includes an internal design system named **Halden UI**.

Halden UI owns:

* Typography primitives and tokens
* Layout containers
* Spacing primitives
* Navigation primitives
* Cards, panels, buttons
* Animations
* Design tokens
* Theme engine

Halden UI is brand-agnostic and portable. Application components consume these
primitives through adapters rather than redefining styles locally.

---

# Typography

Typography is managed through a centralized token system:

1. **Font variables exist**: `app/layout.tsx` loads fonts via `next/font/google`
   (Quantico, Share Tech Mono, Inter) and attaches CSS variables to `<html>`.
2. **App-level aliases exist**: Runtime global CSS maps Halden typography
   expectations to font variables.
3. **Typography primitives exist**: Halden UI typography primitives declare
   classes that consume the aliased font variables.

Typography should never be hardcoded inside individual components.

---

# Layout

Layout is based on reusable primitives.

Typical hierarchy:

```text
RootLayout (app/layout.tsx)
    ↓
SiteShell
    ↓
Container
    ↓
Section
    ↓
Content
```

Pages should inherit spacing from shared layout components rather than applying
custom padding individually.

---

# Navigation

The navigation system uses an adapter pattern:

* `SiteNavigation` integrates navigation primitives with site branding
* Desktop navigation and mobile drawer
* Route-aware active state via Next.js hooks
* Shared navigation primitives from Halden UI
* Reusable animation system

Navigation behavior remains consistent across all pages.

---

# Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm run dev
```

Build the application:

```bash
pnpm run build
```

Run production:

```bash
pnpm start
```

Typecheck:

```bash
pnpm exec tsc --noEmit
```

---

# Engineering Principles

This repository follows several engineering principles:

* Composition over duplication
* Stable architectural boundaries
* Configuration over hardcoding
* Design tokens over hardcoded values
* Shared primitives over page-specific implementations
* Semantic content over presentation embedded in MDX
* Accessibility by default
* Progressive enhancement
* Type safety
* Predictable architecture
* Platform portability
* Brand independence
* Incremental evolution
* Long-term maintainability

These principles describe implemented engineering decisions rather than
aspirations.

---

# Documentation

* [Documentation guide](docs/README.md)
* [Runtime architecture](docs/architecture/README.md)
* [Styling architecture](docs/architecture/styling.md)
* [Content specification](docs/content-specification.md)
* [Content Engine architecture](docs/content-engine-architecture.md)
* [MDX rendering guide](docs/mdx-rendering-guide.md)
* [Content Engine roadmap](ROADMAP_CONTENT_ENGINE.md)

---

# Future Work

## Content Platform

* Compiler fixtures and structured diagnostics
* Typed document variants and renderer selection
* Registry fingerprinting and cache behavior
* Declarative pages and registered semantic blocks
* Search infrastructure
* RSS feeds
* Syntax highlighting improvements
* Reading progress

## Developer Experience

* Automated import boundary enforcement
* Consolidation of duplicate component implementations
* Verified dead-code cleanup
* Halden UI package extraction when independent publication is required

## Publishing

* Project filtering
* Diagram rendering
* Infrastructure write-ups
* Interactive engineering case studies

## Design System Evolution

* Full consolidation to Halden UI primitives
* Dark/light theme enhancements
* Additional theme expansions

---

# Contributing

Although primarily a personal project, issues and discussions are welcome.

When contributing:

* Preserve the design system
* Avoid introducing duplicate components
* Prefer extending shared primitives
* Maintain accessibility
* Keep architecture consistent
* Extend MDX through the content contract rather than route-local parsing

---

# License

Unless otherwise stated, all source code is released under the MIT License.

Written content, articles, photography, and branding remain the intellectual
property of their respective authors.

---

## Author

**Jesse Jacob**

Systems Engineering • Infrastructure • AI Engineering

Building reliable systems, documenting engineering decisions, and solving
difficult technical problems through first-principles thinking.
