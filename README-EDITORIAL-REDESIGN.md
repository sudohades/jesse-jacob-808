# Editorial Redesign Notes (Work Log)

This document exists to capture implementation intent for the premium editorial redesign.

## Design goals
- Infrastructure/systems/AI expertise presented as an engineering consultancy publication.
- Content-first hierarchy; typography + spacing over decoration.
- Subtle surfaces: borders > blur > shadow; motion near-invisible.

## Design system primitives added
Located at: `src/components/site/primitives/`
- `Surface`, `Panel`
- `Eyebrow`, `Heading`, `Metadata`
- `Divider`, `PageHeader`
- `EditorialGrid`
- `NavigationItem`

## Current status
- Homepage + header/nav/shell updated to use the editorial language.
- Secondary pages are next to be refactored for consistent page header + editorial rhythm.

