# sudo-hades.dev

A personal engineering portfolio and technical publishing platform built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and a custom **Halden UI** design system.

The project is designed around one principle:

> Build software that communicates engineering competence through implementation rather than presentation.

Rather than functioning as a traditional portfolio, this repository serves as an extensible platform for publishing technical work, documenting engineering investigations, showcasing infrastructure projects, and providing consulting services across systems engineering, infrastructure, and applied AI.

---

## Overview

The application is built using the Next.js App Router with a layered architecture:

**Brand Configuration** → **Platform Core** → **Halden UI**

This separation ensures:
* Brand-agnostic design system (Halden UI)
* Framework-independent platform behaviors (Platform Core)
* Site-specific branding and composition (Brand Configuration)
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

```
Application Layer (app/)
    ↓
Site Components Layer (src/components/site/)
    ↓
Site Primitives Layer (src/components/site/primitives/)
    ↓
Halden UI Adapters Layer (src/components/halden-ui/)
    ↓
Halden UI Layer (public/halden-ui/)
    ↓
Utilities Layer (src/lib/, public/halden-ui/lib/)
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

Brand Configuration is framework-independent and consumed by Platform Core.

### Platform Core

Located in `src/platform/core/`, this layer provides:
* Framework-independent metadata types
* Sitemap generation
* Next.js adapters for metadata and sitemap

Platform Core consumes Brand Configuration and provides framework-agnostic platform behaviors.

### Halden UI

Located in `public/halden-ui/`, this is the canonical design system owning:
* Typography primitives and tokens
* Spacing system
* Layout containers
* Navigation primitives
* Cards, panels, buttons
* Glassmorphism components
* Animations
* Design tokens (CSS variables)
* Theme engine

Halden UI is brand-agnostic and portable. The application consumes Halden UI through adapters.

### Adapter Pattern

Site-specific concerns are integrated via adapters:
* `src/components/halden-ui/navigation/SiteNavigation.tsx` adapts Halden UI navigation to site branding and routing
* Adapters own integration, not design system redefinition

---

## Features

### Portfolio

Implemented as static pages under `app/`:
* Projects (`/projects`)
* Services (`/services`)
* Resources (`/resources`)
* About (`/about`)

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

Navigation adapts between desktop and mobile while maintaining a shared design language. Implemented via the adapter pattern integrating Halden UI navigation with site-specific branding.

### Static Generation

Pages are statically generated via Next.js App Router for performance and SEO.

### Token-Driven Styling

Design tokens are defined as CSS variables in Halden UI and consumed throughout the application:
* Semantic palette variables
* Hero gradient inputs
* Typography font variables
* Motion, shadow, and radius tokens

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
│
├── about/
├── blog/
├── projects/
├── resources/
├── services/
├── layout.tsx
├── globals.css
├── page.tsx
├── not-found.tsx
└── sitemap.ts

src/
│
├── components/
│   ├── site/              # Site-specific composition
│   │   ├── SiteShell.tsx
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── Logo.tsx
│   │   └── primitives/    # Site-specific primitives
│   └── halden-ui/         # Adapters for Halden UI
│       └── navigation/
│
├── config/                # Brand Configuration
│   ├── brand.ts
│   ├── navigation.ts
│   ├── metadata.ts
│   ├── author.ts
│   ├── social.ts
│   ├── business.ts
│   └── theme.ts
│
├── platform/              # Platform Core
│   ├── core/
│   │   ├── metadata/      # Framework-independent metadata
│   │   └── sitemap/       # Sitemap generation
│   ├── adapters/
│   │   └── next/          # Next.js adapters
│   ├── hooks/             # Platform hooks
│   ├── lib/               # Platform utilities
│   └── providers/         # Context providers
│
├── styles/                # Application-specific styles
│   ├── globals.css
│   ├── theme.css
│   ├── typography.css
│   ├── glass.css
│   └── animations.css
│
├── constants/
│   ├── colors.ts
│   └── typography.ts
│
└── lib/
    └── utils.ts

public/
│
├── halden-ui/             # Canonical Halden UI implementation
│   ├── components/
│   │   ├── typography/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── cards/
│   │   ├── hero/
│   │   ├── footer/
│   │   └── ui/
│   ├── styles/            # Halden UI CSS tokens
│   └── lib/               # Halden UI utilities
│
├── gradients/
├── overlays/
├── textures/
└── placeholder-images/

docs/
│
├── architecture/         # Architectural documentation
└── debug/                 # Debug reports
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

Halden UI is brand-agnostic and portable. Application components consume these primitives via adapters rather than redefining styles locally.

---

# Typography

Typography is managed through a centralized token system:

1. **Font variables exist**: `app/layout.tsx` loads fonts via `next/font/google` (Quantico, Share Tech Mono, Inter) and attaches CSS variables to `<html>`.
2. **App-level aliases exist**: Application global CSS aliases map Halden typography expectations to font variables.
3. **Typography primitives exist**: Halden UI typography primitives declare classes that consume the aliased font variables.

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

Pages should inherit spacing from shared layout components rather than applying custom padding individually.

---

# Navigation

The navigation system uses an adapter pattern:

* `SiteNavigation` adapter integrates Halden UI navigation with site-specific branding
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

Lint:

```bash
pnpm run lint
```

---

# Engineering Principles

This repository follows several engineering principles:

* Composition over duplication
* Stable architectural boundaries
* Configuration over hardcoding
* Design tokens over hardcoded values
* Shared primitives over page-specific implementations
* Accessibility by default
* Progressive enhancement
* Type safety
* Predictable architecture
* Platform portability
* Brand independence
* Incremental evolution
* Long-term maintainability

These principles describe implemented engineering decisions rather than aspirations.

---

# Future Work

## Content Platform
* MDX pipeline for blog content
* Content loading and frontmatter parsing
* Advanced MDX component library
* Search infrastructure
* RSS feeds
* Syntax highlighting improvements
* Reading progress

## Developer Experience
* Automated import boundary enforcement (ESLint rules)
* Consolidation of duplicate component implementations
* Dead code cleanup
* Halden UI package extraction

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

* preserve the design system
* avoid introducing duplicate components
* prefer extending shared primitives
* maintain accessibility
* keep architecture consistent

---

# License

Unless otherwise stated, all source code is released under the MIT License.

Written content, articles, photography, and branding remain the intellectual property of their respective authors.

---

## Author

**Jesse Jacob**

Systems Engineering • Infrastructure • AI Engineering

Building reliable systems, documenting engineering decisions, and solving difficult technical problems through first-principles thinking.
