/**
 * Minimal typings for a VS Code color theme document.
 * Only the parts we author are modelled; `colors` keys are open-ended on
 * purpose because VS Code adds new ones every release.
 */

export type Hex = `#${string}`;

export type FontStyle = "" | "bold" | "italic" | "underline" | "strikethrough" | string;

export interface TokenColor {
  name?: string;
  scope: string | string[];
  settings: {
    foreground?: Hex;
    background?: Hex;
    fontStyle?: FontStyle;
  };
}

export type SemanticTokenSetting =
  | Hex
  | {
      foreground?: Hex;
      fontStyle?: FontStyle;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
    };

export interface ColorTheme {
  name: string;
  type: "dark" | "light";
  semanticHighlighting?: boolean;
  colors: Record<string, Hex>;
  semanticTokenColors?: Record<string, SemanticTokenSetting>;
  tokenColors: TokenColor[];
}

export interface ThemeArtifact {
  /** Output file name inside `themes/`, must match package.json contributes.themes[].path */
  fileName: string;
  theme: ColorTheme;
}
