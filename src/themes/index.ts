import type { ThemeArtifact } from "../types.ts";
import { zedGruvboxDark } from "./zed-gruvbox-dark.ts";

/**
 * Every theme emitted by `pnpm build`.
 * Adding a variant means adding it here AND to `contributes.themes`
 * in package.json — the build verifies the two stay in sync.
 */
export const themes: ThemeArtifact[] = [
  { fileName: "zed-gruvbox-dark.json", theme: zedGruvboxDark },
];
