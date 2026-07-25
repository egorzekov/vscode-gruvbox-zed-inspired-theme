# Zed Gruvbox

Gruvbox for VS Code, inspired by the [Zed](https://zed.dev) editor's take on the palette.

Currently ships one theme: **Zed Gruvbox Dark** (placeholder values, work in progress).

## How it works

Theme JSON is generated, not hand-edited. Colors live in TypeScript so variants can share a
single palette:

```
src/palette.ts                  # gruvbox colors + alpha() helper
src/types.ts                    # ColorTheme typings
src/themes/zed-gruvbox-dark.ts  # workbench colors + token rules
src/themes/index.ts             # registry of themes to emit
src/build.ts                    # writes themes/*.json
themes/                         # generated output (git-ignored)
```

The build fails if `src/themes/index.ts` and `contributes.themes` in `package.json` disagree.

## Development

```sh
pnpm install
pnpm build       # generate themes/*.json
pnpm typecheck   # tsc --noEmit
```

To try it live: open this folder in VS Code and press <kbd>F5</kbd> to launch an Extension
Development Host, then pick the theme via **Preferences: Color Theme**. Re-run `pnpm build`
and reload the window after editing colors.

Useful while tuning token rules: **Developer: Inspect Editor Tokens and Scopes** shows the
TextMate and semantic scopes under the cursor.

## Packaging

```sh
pnpm package     # typechecks, builds, emits a .vsix
code --install-extension vscode-gruvbox-zed-inspired-theme-0.0.1.vsix
```

> Requires Node 24+ — the build runs `.ts` files directly via Node's native type stripping.

## License

MIT
