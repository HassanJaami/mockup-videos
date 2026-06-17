/**
 * Renders a single customer story video by folder name.
 *
 * Usage:
 *   npm run render:one <folder-name>
 *   npm run render:one acme
 */

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { existsSync, mkdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { enableTailwind } from "@remotion/tailwind-v4";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

const folderName = process.argv[2];
if (!folderName) {
  console.error("Usage: npm run render:one <folder-name>");
  console.error("Example: npm run render:one acme");
  process.exit(1);
}

const storyPath = resolve(ROOT, "public/customers", folderName, "story.json");
if (!existsSync(storyPath)) {
  console.error(`No story.json found at: public/customers/${folderName}/story.json`);
  process.exit(1);
}

const data = JSON.parse(readFileSync(storyPath, "utf-8"));
const outputDir = resolve(ROOT, "output");
const outputPath = resolve(outputDir, `${folderName}.mp4`);

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

console.log(`Rendering: ${data.customerName}`);
console.log("Bundling project...\n");

const serveUrl = await bundle({
  entryPoint: resolve(ROOT, "src/index.ts"),
  webpackOverride: enableTailwind,
});

const composition = await selectComposition({
  serveUrl,
  id: "CustomerStory",
  inputProps: data,
});

await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  outputLocation: outputPath,
  inputProps: data,
  onProgress({ progress }) {
    const pct = Math.round(progress * 100);
    process.stdout.write(`\rRendering... ${pct}%`);
  },
});

process.stdout.write("\r");
console.log(`✅ Done: output/${folderName}.mp4`);
