# sudo-hades.dev

A personal engineering portfolio and technical publishing platform built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and a custom **Halden UI** design system.

The project is designed around one principle:

> Build software that communicates engineering competence through implementation rather than presentation.

Rather than functioning as a traditional portfolio, this repository serves as an extensible platform for publishing technical work, documenting engineering investigations, showcasing infrastructure projects, and providing consulting services across systems engineering, infrastructure, and applied AI.

---

## Overview

The application is built using the Next.js App Router and emphasizes:

* modular architecture
* reusable UI primitives
* MDX-driven content
* consistent typography and design tokens
* progressive enhancement
* responsive layouts
* accessibility-first navigation
* long-term maintainability

Content and presentation are intentionally separated so the website behaves more like a documentation platform than a collection of static pages.

---

## Features

### Portfolio

Showcases engineering work, investigations, infrastructure projects, and consulting services.

### MDX Publishing

Technical articles, notes, research, and build logs are authored as MDX and rendered through a shared content pipeline.

### Halden UI Design System

A custom component library providing:

* typography tokens
* spacing system
* responsive layout primitives
* glassmorphism components
* animations
* reusable navigation
* cards
* panels
* buttons

The website consumes Halden UI rather than defining page-specific styling.

### Responsive Navigation

Navigation adapts between desktop and mobile while maintaining a shared design language.

### Type-safe Content

Content metadata is parsed and validated before rendering.

### Static Generation

Pages are statically generated where appropriate for performance and SEO.

---

# Technology Stack

## Framework

* Next.js 15
* React 19
* TypeScript

## Styling

* Tailwind CSS
* CSS Design Tokens
* Halden UI
* next/font

## Content

* MDX
* gray-matter

## Animation

* CSS animations
* Framer Motion (where appropriate)

---

# Repository Structure

```text
app/
│
├── about/
├── blog/
├── build-log/
├── notes/
├── projects/
├── resources/
├── services/
├── contact/
│
├── layout.tsx
├── globals.css
└── page.tsx

components/
│
├── site/
├── halden-ui/
└── ui/

content/
│
├── blog/
├── notes/
├── projects/
├── resources/
└── build-log/

lib/
│
├── mdx/
├── content/
├── utils/
└── helpers/

public/
│
├── images/
├── icons/
└── halden-ui/
```

---

# Design Philosophy

The website intentionally minimizes unnecessary visual noise.

Instead of relying on heavy visual effects, it communicates through:

* strong typography
* spacing
* hierarchy
* content structure
* restrained animation
* engineering-focused language

Every component should contribute to clarity.

---

# Halden UI

The project includes an internal design system named **Halden UI**.

Halden UI provides:

* typography
* layout containers
* spacing primitives
* navigation
* cards
* panels
* animations
* design tokens

Application components consume these primitives rather than redefining styles locally.

This keeps the styling architecture centralized and consistent.

---

# Content Architecture

All long-form content lives outside the application logic.

Typical workflow:

```text
MDX
↓

Frontmatter parsing
↓

Metadata generation
↓

Static routing
↓

Shared layout

↓

Rendered page
```

This separation allows content to evolve independently from the application.

---

# Typography

Typography is managed through a centralized token system.

Fonts are loaded using `next/font` and exposed through CSS variables consumed by Halden UI.

Typography should never be hardcoded inside individual components.

---

# Layout

Layout is based on reusable primitives.

Typical hierarchy:

```text
Layout

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

The navigation system is responsive and consists of:

* desktop navigation
* mobile drawer
* shared navigation primitives
* route-aware active state
* reusable animation system

Navigation behavior should remain consistent across all pages.

---

# Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run production:

```bash
npm start
```

Lint:

```bash
npm run lint
```

---

# Engineering Principles

This repository follows several engineering principles:

* Composition over duplication
* Design tokens over hardcoded values
* Shared primitives over page-specific implementations
* Accessibility by default
* Progressive enhancement
* Type safety
* Predictable architecture
* Incremental refactoring

---

# Future Work

Planned improvements include:

* advanced MDX component library
* search
* syntax highlighting improvements
* RSS feeds
* project filtering
* reading progress
* dark/light theme enhancements
* diagram rendering
* infrastructure write-ups
* interactive engineering case studies

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
