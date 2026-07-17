# Styling Architecture

## Runtime entrypoint

`app/layout.tsx` imports `src/styles/globals.css`. That file is the single
runtime stylesheet entrypoint and imports Tailwind, animation utilities, theme,
typography, glass, and animation layers.

```text
app/layout.tsx
  → src/styles/globals.css
    → Tailwind + tw-animate-css
    → theme.css
    → typography.css
    → glass.css
    → animations.css
```

Do not move orchestration to `app/globals.css` unless the root layout import is
changed at the same time. The application stylesheet is not the active entry
point today.

## Token model

`theme.css` owns semantic palette, radius, blur, motion, shadows, grid, and
gradient tokens. Components consume variables such as `--color-background`,
`--color-foreground`, `--color-hairline`, `--radius-*`, and `--blur-*` instead
of introducing local hard-coded visual systems.

`next/font` supplies Quantico, Share Tech Mono, and Inter variables on the
root HTML element. `globals.css` aliases them to `--font-display`,
`--font-sans`, and `--font-mono`; typography primitives consume those aliases.

## Component presentation

- `Heading`, `Body`, `Eyebrow`, and `CodeLabel` apply named typography classes.
- `Surface`, `GlassPanel`, and related UI components consume surface/blur/token
  variables rather than defining independent palette values.
- Page and renderer code may use utility classes for local layout, but reusable
  visual rules belong in the presentation layer.
- Hero text/overlays use named hero token inputs, not copied gradient colors.

## Glass and production behavior

Glass surfaces use standard `backdrop-filter` plus the WebKit-prefixed form.
The unprefixed declaration is protected by `@supports` so production CSS
optimization retains it. Verify compiled output and a real browser when
changing glass declarations; development and production optimization differ.

## Styling rules

1. Import the global chain once from the root layout.
2. Add a semantic token before introducing a reusable visual value.
3. Keep typography and glass behavior in their shared primitive/style layers.
4. Preserve focus-visible treatment and respect reduced-motion behavior.
5. Do not infer a component is unused solely from a static import scan; check
   routes, dynamic usage, and intended public API first.

## Verification checklist

- Typecheck and production build pass.
- Compiled CSS contains required typography, token, and glass selectors.
- Browser checks confirm fonts, hero treatment, responsive navigation, surfaces,
  keyboard focus, and mobile overflow behavior.
- A new style does not duplicate an existing token or primitive responsibility.
