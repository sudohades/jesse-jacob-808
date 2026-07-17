# Resolved Incidents and Recovery Notes

This is the durable record for resolved styling and tooling incidents. Detailed
debug transcripts were removed after their operational lessons were absorbed
here and in the architecture documents.

## Runtime CSS entrypoint regression

**Symptom:** Tailwind utilities and tokenized presentation disappeared at
runtime.

**Cause:** the root layout imports `src/styles/globals.css`, while orchestration
had temporarily been placed in `app/globals.css`. The loaded file did not then
include the complete Tailwind/style chain.

**Resolution:** keep Tailwind and the theme/typography/glass/animation imports
in `src/styles/globals.css`, the actual runtime entrypoint.

**Prevention:** whenever CSS is moved, trace the import from `app/layout.tsx`
to the emitted stylesheet and verify a production build.

## Typography and hero-token regression

**Symptom:** custom fonts and hero treatment appeared to fall back or disappear.

**Cause:** runtime alias/token declarations were not guaranteed to exist in the
active stylesheet chain.

**Resolution:** the active stylesheet defines font aliases from `next/font`
variables and the required hero inputs. Shared typography classes consume those
aliases.

**Prevention:** trace `next/font` → root HTML variables → CSS aliases →
typography selector → rendered element before changing typography plumbing.

## Production glass blur regression

**Symptom:** backdrop blur worked in development but not in an optimized build.

**Cause:** production CSS optimization retained only a prefixed filter form.

**Resolution:** retain the standard declaration in an `@supports
(backdrop-filter: blur(1px))` block alongside the WebKit-prefixed declaration.

**Prevention:** inspect generated CSS and test a production browser build after
editing glass rules.

## ESLint configuration recovery

**Symptom:** ESLint initialization failed with circular JSON serialization.

**Cause:** the Next ESLint preset did not align with the installed ESLint 9
configuration path.

**Resolution:** `eslint-config-next` uses the Next 15-compatible preset while
the minimal `.eslintrc.json` remains unchanged.

**Prevention:** distinguish configuration initialization failures from ordinary
lint findings; validate the toolchain with a production build after dependency
changes.
