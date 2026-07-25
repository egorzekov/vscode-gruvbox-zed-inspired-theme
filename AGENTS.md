# Zed Gruvbox — Agent Notes

A VS Code color theme extension. Gruvbox, following the Zed editor's take on the palette.
Currently ships one theme: **Zed Gruvbox Dark**, ported from Zed's `Gruvbox Dark`.

## Commands

```sh
pnpm install
pnpm build       # node src/build.ts -> themes/*.json
pnpm typecheck   # tsc --noEmit
pnpm package     # typecheck + build, then vsce package into dist/
pnpm clean       # rm -rf themes dist
```

There is no test suite. `pnpm typecheck && pnpm build` is the verification loop after any
color change; the build also enforces the manifest invariant described below.

## Architecture

Theme JSON is **generated, never hand-edited**. Editing `themes/*.json` directly is always
wrong — it is git-ignored and overwritten by the next build.

```
src/palette.ts                  # gruvbox colors + alpha() helper — single source of truth
src/types.ts                    # ColorTheme typings
src/themes/zed-gruvbox-dark.ts  # workbench colors, semantic tokens, TextMate rules
src/themes/index.ts             # registry of themes to emit
src/build.ts                    # writes themes/*.json
themes/                         # generated (git-ignored)
dist/                           # packaged .vsix (git-ignored)
```

A color theme runs no code: VS Code loads only `package.json` and the `themes/*.json` it
points at. Nothing under `src/` ships — see `.vscodeignore`.

## Constraints worth knowing

- **Node 24+ required.** `pnpm build` runs `.ts` files directly via native type stripping;
  there is no bundler and no `tsx`. Consequences: relative imports must carry explicit
  `.ts` extensions, and `tsconfig.json` sets `erasableSyntaxOnly`, so `enum`, `namespace`,
  and parameter properties will not compile.
- **Adding a variant is a two-file change:** register it in `src/themes/index.ts` *and* in
  `contributes.themes` in `package.json`. `assertManifestInSync` in `src/build.ts` fails
  the build if the two disagree, in either direction.
- **`.gitignore` patterns are anchored** (`/themes/`, `/dist/`). Unanchored `themes/` also
  matches `src/themes/` and silently untracks the actual source.
- **pnpm 11 ignores the `pnpm` field in `package.json`.** Build-script approvals live in
  `pnpm-workspace.yaml` under `allowBuilds`; `@vscode/vsce-sign` and `keytar` are denied
  there because this repo packages but never signs or publishes. Without those entries,
  `pnpm install` hard-fails.
- `.vscodeignore` excludes `dist/**`, otherwise vsce packages the previous `.vsix` inside
  the new one.
- Not marketplace-ready: `publisher` is a placeholder, and there is no `repository` field
  (vsce warns on every package), icon, or screenshot.

## Conventions

- All colors come from `gruvboxDark` in `src/palette.ts`. Do not inline hex literals in a
  theme file; add or adjust a palette entry instead, so future variants stay consistent.
- `gruvboxDark` holds **only values that appear literally in Zed's `Gruvbox Dark`**. Classic
  Gruvbox shades Zed never uses (`#1d2021`, `#3c3836`, `#504945`, `#665c54`, …) are absent on
  purpose, and Zed's one-channel role variants (`#fb4833` keyword vs `#fb4934` bright red vs
  `#fb4a35` error) are kept as separate entries rather than collapsed. Adding a palette entry
  means finding it in the upstream JSON first.
- Lowercase 6-digit hex. For transparency use `alpha(color, 0..1)` rather than writing an
  8-digit value by hand.
- Group `colors` keys by workbench area with a short comment header, matching the existing
  layout in `src/themes/zed-gruvbox-dark.ts`.
- Give every `tokenColors` entry a `name` — it is what shows up when debugging scopes.

## Tuning workflow

Press <kbd>F5</kbd> to launch an Extension Development Host (`.vscode/launch.json` runs the
build first), then select the theme via **Preferences: Color Theme**. After editing colors,
re-run `pnpm build` and reload the window. **Developer: Inspect Editor Tokens and Scopes**
reveals the TextMate and semantic scopes under the cursor — use it before inventing a scope
selector.

## Zed Gruvbox Dark token source

The upstream reference lives outside this repo:

`/Users/egorzekov/dev/other/zed/assets/themes/gruvbox/gruvbox.json`

- The `"Gruvbox Dark"` theme begins at line 7.
- UI tokens are under `themes[0].style`.
- Syntax tokens are under `themes[0].style.syntax` (line 189).
- The Gruvbox Dark theme block ends around line 427.
- The file defines six themes in `themes[]`, in this order: `Gruvbox Dark`,
  `Gruvbox Dark Hard` (line 429), `Gruvbox Dark Soft` (851), `Gruvbox Light` (1273),
  `Gruvbox Light Hard` (1695), `Gruvbox Light Soft` (2117). Those are the sources if more
  variants get added.

Zed and VS Code do not share token names, so porting is a mapping exercise, not a copy:
Zed's `style` keys (`background`, `element.hover`, `border.variant`, …) have to be matched
to VS Code workbench colors by hand, and Zed's syntax captures (`variable.special`,
`punctuation.delimiter`, …) to TextMate scopes plus `semanticTokenColors`.
