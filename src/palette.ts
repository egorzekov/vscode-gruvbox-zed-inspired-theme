import type { Hex } from "./types.ts";

/**
 * Gruvbox dark palette (medium background).
 * Source of truth for every dark variant; tweak values here rather than in
 * individual theme files so variants stay consistent.
 */
export const gruvboxDark = {
  bg0Hard: "#1d2021",
  bg0: "#282828",
  bg0Soft: "#32302f",
  bg1: "#3c3836",
  bg2: "#504945",
  bg3: "#665c54",
  bg4: "#7c6f64",

  fg0: "#fbf1c7",
  fg1: "#ebdbb2",
  fg2: "#d5c4a1",
  fg3: "#bdae93",
  fg4: "#a89984",

  gray: "#928374",

  red: "#cc241d",
  green: "#98971a",
  yellow: "#d79921",
  blue: "#458588",
  purple: "#b16286",
  aqua: "#689d6a",
  orange: "#d65d0e",

  brightRed: "#fb4934",
  brightGreen: "#b8bb26",
  brightYellow: "#fabd2f",
  brightBlue: "#83a598",
  brightPurple: "#d3869b",
  brightAqua: "#8ec07c",
  brightOrange: "#fe8019",
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
