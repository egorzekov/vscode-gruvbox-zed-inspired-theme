import type { Hex } from "./types.ts";

/**
 * Zed's Gruvbox Dark palette, verbatim.
 *
 * Every value below appears literally in `themes[0].style` of
 * `assets/themes/gruvbox/gruvbox.json` (Zed's `Gruvbox Dark`). Classic Gruvbox
 * shades that Zed does not use (`#1d2021`, `#32302f`, `#3c3836`, `#504945`,
 * `#665c54`, `#7c6f64`, `#bdae93`) are deliberately absent, so a colour can
 * never drift away from the source theme.
 *
 * Zed rounds some colours by a single channel between roles — `syntaxRed`
 * (#fb4833) vs `brightRed` (#fb4934) vs `deleted` (#fb4a35), and likewise for
 * green and yellow. Those are kept separate rather than collapsed, because the
 * distinction is what the source theme states.
 *
 * Not modelled: Zed's `terminal.ansi.dim_*` ramp, `accents` (only `#fd801b`
 * from `players[2]` is borrowed, for the debugging status bar) and
 * `players[1..7]`, none of which have VS Code colour IDs.
 */
export const gruvboxDark = {
  // Surfaces — `background`, `surface.background`, `editor.background`
  bg: "#4c4642",
  surface: "#3a3735",
  editorBg: "#282828",
  elementActive: "#5b524c",

  // Borders — `border`, `border.variant`, `border.focused`, `border.disabled`
  border: "#5b534d",
  borderVariant: "#494340",
  borderFocused: "#303a36",
  borderDisabled: "#544c48",
  trackBorder: "#373432",

  // Text — `text`, `text.muted`, `text.placeholder`, `editor.foreground`
  text: "#fbf1c7",
  textMuted: "#c5b597",
  textPlaceholder: "#998b78",
  editorFg: "#ebdbb2",
  dimFg: "#766b5d",

  // Gutter and inline hints — `editor.line_number`, `predictive`, `hint`
  lineNumber: "#6e6b5e",
  lineNumberActive: "#dedcd3",
  lineNumberHover: "#c9c5b6",
  invisible: "#928474",
  predictive: "#717363",
  hint: "#8c957d",

  // Syntax neutrals — `punctuation`, `comment`, `comment.doc`, `punctuation.delimiter`
  punctuation: "#d5c4a1",
  comment: "#a89984",
  docComment: "#c6b697",
  delimiter: "#e5d5ad",

  // Normal ANSI — `terminal.ansi.*`
  red: "#cc241d",
  green: "#98971a",
  yellow: "#d79921",
  blue: "#458588",
  magenta: "#b16286",
  cyan: "#689d6a",

  // Bright ANSI — `terminal.ansi.bright_*`
  brightBlack: "#928374",
  brightRed: "#fb4934",
  brightGreen: "#b8bb26",
  brightYellow: "#fabd2f",
  brightBlue: "#83a598",
  brightMagenta: "#d3869b",
  brightCyan: "#8ec07c",

  // Syntax accents — `keyword`, `function`, `type`, `enum`
  syntaxRed: "#fb4833",
  syntaxGreen: "#b8bb25",
  syntaxYellow: "#fabd2e",
  syntaxOrange: "#fe7f18",
  accentOrange: "#fd801b",

  // Status — `created`, `modified`, `deleted` and their surfaces
  added: "#b7bb26",
  addedBg: "#322b11",
  addedBorder: "#4a4516",
  modified: "#f9bd2f",
  modifiedBg: "#572e10",
  modifiedBorder: "#754916",
  deleted: "#fb4a35",
  deletedBg: "#590a0f",
  deletedBorder: "#771617",
  infoBg: "#1e2321",

  // Search — `search.active_match_background`
  searchMatch: "#c09f3f",
} as const satisfies Record<string, Hex>;

export type GruvboxDark = typeof gruvboxDark;

/** Append an 8-bit alpha channel to a 6-digit hex colour. */
export function alpha(color: Hex, opacity: number): Hex {
  if (opacity < 0 || opacity > 1) {
    throw new RangeError(`opacity must be within [0, 1], got ${opacity}`);
  }
  const channel = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${color}${channel}`;
}
