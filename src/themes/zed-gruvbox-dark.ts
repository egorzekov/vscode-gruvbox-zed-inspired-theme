import { alpha, gruvboxDark as p } from "../palette.ts";
import type { ColorTheme } from "../types.ts";

/**
 * PLACEHOLDER — Zed Gruvbox Dark.
 *
 * Enough workbench + token rules to load and look sane; the intent is to fill
 * this out against Zed's gruvbox-dark theme.
 *
 * TODO: terminal ansi colours, git decorations, diff editor, peek view,
 * notifications, minimap, bracket pair colours, full semantic token map.
 */
export const zedGruvboxDark: ColorTheme = {
  name: "Zed Gruvbox Dark",
  type: "dark",
  semanticHighlighting: true,

  colors: {
    // Base
    focusBorder: p.bg3,
    foreground: p.fg1,
    descriptionForeground: p.fg4,
    errorForeground: p.brightRed,
    "widget.border": p.bg2,
    "selection.background": alpha(p.brightBlue, 0.4),

    // Editor
    "editor.background": p.bg0,
    "editor.foreground": p.fg1,
    "editorLineNumber.foreground": p.bg4,
    "editorLineNumber.activeForeground": p.fg2,
    "editorCursor.foreground": p.fg1,
    "editor.selectionBackground": p.bg2,
    "editor.selectionHighlightBackground": alpha(p.bg2, 0.6),
    "editor.wordHighlightBackground": alpha(p.bg2, 0.6),
    "editor.findMatchBackground": alpha(p.brightYellow, 0.35),
    "editor.findMatchHighlightBackground": alpha(p.brightYellow, 0.2),
    "editor.lineHighlightBackground": p.bg0Soft,
    "editorWhitespace.foreground": p.bg2,
    "editorIndentGuide.background1": p.bg1,
    "editorIndentGuide.activeBackground1": p.bg3,

    // Workbench chrome
    "activityBar.background": p.bg0Hard,
    "activityBar.foreground": p.fg2,
    "activityBar.inactiveForeground": p.bg4,
    "activityBarBadge.background": p.brightYellow,
    "activityBarBadge.foreground": p.bg0,
    "sideBar.background": p.bg0Hard,
    "sideBar.foreground": p.fg2,
    "sideBarSectionHeader.background": p.bg0Hard,
    "sideBarSectionHeader.foreground": p.fg3,
    "statusBar.background": p.bg0Hard,
    "statusBar.foreground": p.fg3,
    "statusBar.noFolderBackground": p.bg0Hard,
    "statusBar.debuggingBackground": p.brightOrange,
    "statusBar.debuggingForeground": p.bg0,
    "titleBar.activeBackground": p.bg0Hard,
    "titleBar.activeForeground": p.fg2,
    "titleBar.inactiveBackground": p.bg0Hard,
    "titleBar.inactiveForeground": p.bg4,

    // Tabs
    "editorGroupHeader.tabsBackground": p.bg0Hard,
    "tab.activeBackground": p.bg0,
    "tab.activeForeground": p.fg1,
    "tab.inactiveBackground": p.bg0Hard,
    "tab.inactiveForeground": p.bg4,
    "tab.border": p.bg0Hard,
    "tab.activeBorderTop": p.brightYellow,

    // Lists
    "list.activeSelectionBackground": p.bg2,
    "list.activeSelectionForeground": p.fg0,
    "list.inactiveSelectionBackground": p.bg1,
    "list.inactiveSelectionForeground": p.fg2,
    "list.hoverBackground": p.bg1,
    "list.highlightForeground": p.brightYellow,

    // Inputs, dropdowns, buttons
    "input.background": p.bg1,
    "input.foreground": p.fg1,
    "input.border": p.bg2,
    "input.placeholderForeground": p.bg4,
    "dropdown.background": p.bg1,
    "dropdown.foreground": p.fg1,
    "dropdown.border": p.bg2,
    "button.background": p.bg2,
    "button.foreground": p.fg0,
    "button.hoverBackground": p.bg3,

    // Panels and terminal shell
    "panel.background": p.bg0,
    "panel.border": p.bg2,
    "panelTitle.activeForeground": p.fg1,
    "panelTitle.inactiveForeground": p.bg4,
    "terminal.background": p.bg0,
    "terminal.foreground": p.fg1,

    // Diagnostics
    "editorError.foreground": p.brightRed,
    "editorWarning.foreground": p.brightYellow,
    "editorInfo.foreground": p.brightBlue,
    "editorHint.foreground": p.brightAqua,
  },

  semanticTokenColors: {
    // TODO: expand once the TextMate rules below are settled.
    property: p.brightBlue,
    variable: p.fg1,
    "variable.readonly": p.brightPurple,
    parameter: p.fg1,
    function: p.brightGreen,
    method: p.brightGreen,
    class: p.brightYellow,
    interface: p.brightYellow,
    type: p.brightYellow,
    enumMember: p.brightPurple,
    namespace: p.brightAqua,
  },

  tokenColors: [
    {
      name: "Comment",
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: p.gray, fontStyle: "italic" },
    },
    {
      name: "String",
      scope: ["string", "constant.other.symbol"],
      settings: { foreground: p.brightGreen },
    },
    {
      name: "Escape / template punctuation",
      scope: ["constant.character.escape", "punctuation.definition.template-expression"],
      settings: { foreground: p.brightOrange },
    },
    {
      name: "Number, boolean, constant",
      scope: ["constant.numeric", "constant.language", "support.constant"],
      settings: { foreground: p.brightPurple },
    },
    {
      name: "Keyword, storage, operator",
      scope: ["keyword", "storage.type", "storage.modifier", "keyword.operator"],
      settings: { foreground: p.brightRed },
    },
    {
      name: "Function and method",
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: p.brightGreen, fontStyle: "bold" },
    },
    {
      name: "Type, class, interface",
      scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"],
      settings: { foreground: p.brightYellow },
    },
    {
      name: "Variable and parameter",
      scope: ["variable", "variable.parameter", "meta.definition.variable"],
      settings: { foreground: p.fg1 },
    },
    {
      name: "Property and key",
      scope: ["variable.other.property", "support.type.property-name", "meta.object-literal.key"],
      settings: { foreground: p.brightBlue },
    },
    {
      name: "Tag",
      scope: ["entity.name.tag"],
      settings: { foreground: p.brightBlue },
    },
    {
      name: "Attribute",
      scope: ["entity.other.attribute-name"],
      settings: { foreground: p.brightAqua, fontStyle: "italic" },
    },
    {
      name: "Punctuation",
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: p.fg3 },
    },
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: p.brightRed, fontStyle: "underline" },
    },
    {
      name: "Markdown heading",
      scope: ["markup.heading"],
      settings: { foreground: p.brightGreen, fontStyle: "bold" },
    },
    {
      name: "Markdown link",
      scope: ["markup.underline.link", "string.other.link"],
      settings: { foreground: p.brightBlue, fontStyle: "underline" },
    },
    {
      name: "Diff inserted",
      scope: ["markup.inserted"],
      settings: { foreground: p.brightGreen },
    },
    {
      name: "Diff deleted",
      scope: ["markup.deleted"],
      settings: { foreground: p.brightRed },
    },
  ],
};
