import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { themes } from "./themes/index.ts";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(rootDir, "themes");

interface Manifest {
  contributes?: { themes?: { label?: string; path?: string }[] };
}

/** Fail loudly when a theme is emitted but never contributed (or vice versa). */
async function assertManifestInSync(fileNames: string[]): Promise<void> {
  const manifest: Manifest = JSON.parse(
    await readFile(join(rootDir, "package.json"), "utf8"),
  );
  const contributed = (manifest.contributes?.themes ?? [])
    .map((entry) => entry.path)
    .filter((path): path is string => typeof path === "string")
    .map((path) => basename(path));

  const missing = fileNames.filter((name) => !contributed.includes(name));
  const orphaned = contributed.filter((name) => !fileNames.includes(name));

  if (missing.length > 0 || orphaned.length > 0) {
    const details = [
      missing.length > 0 ? `not in package.json: ${missing.join(", ")}` : "",
      orphaned.length > 0 ? `contributed but not built: ${orphaned.join(", ")}` : "",
    ].filter(Boolean);
    throw new Error(`themes/ and package.json are out of sync (${details.join("; ")})`);
  }
}

async function build(): Promise<void> {
  await assertManifestInSync(themes.map(({ fileName }) => fileName));
  await mkdir(outDir, { recursive: true });

  for (const { fileName, theme } of themes) {
    const document = { $schema: "vscode://schemas/color-theme", ...theme };
    await writeFile(join(outDir, fileName), `${JSON.stringify(document, null, 2)}\n`, "utf8");
    console.log(`built themes/${fileName} — ${Object.keys(theme.colors).length} workbench colors, ${theme.tokenColors.length} token rules`);
  }
}

await build();
