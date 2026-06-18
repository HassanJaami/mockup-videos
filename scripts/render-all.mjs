/**
 * Renders a CustomerStory MP4 for every customer folder under public/customers/.
 *
 * Each customer folder must contain:
 *   story.json      — matches the CustomerStory schema
 *   challenge.png   — screenshot for the challenge scene
 *   solution.png    — screenshot for the solution scene
 *   result.png      — screenshot for the result scene
 *
 * Usage:
 *   npm run render:all
 *
 * Output:
 *   output/<customer-folder-name>.mp4
 */

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { enableTailwind } from "@remotion/tailwind-v4";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const CUSTOMERS_DIR = resolve(ROOT, "public/customers");
const OUTPUT_DIR = resolve(ROOT, "output");
const ENTRY_POINT = resolve(ROOT, "src/index.ts");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Discover customers ───────────────────────────────────────────────────────

const toCompositionId = (folder) =>
  folder
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

const customerFolders = readdirSync(CUSTOMERS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (customerFolders.length === 0) {
  console.error("No customer folders found in public/customers/");
  process.exit(1);
}

const customers = customerFolders
  .map((folder) => {
    const storyPath = resolve(CUSTOMERS_DIR, folder, "story.json");
    if (!existsSync(storyPath)) {
      console.warn(`⚠  Skipping '${folder}' — no story.json found`);
      return null;
    }
    return {
      folder,
      id: toCompositionId(folder),
      data: JSON.parse(readFileSync(storyPath, "utf-8")),
    };
  })
  .filter(Boolean);

if (customers.length === 0) {
  console.error("No customers with story.json found. Run: npm run new-customer <name>");
  process.exit(1);
}

console.log(`Found ${customers.length} customer(s): ${customers.map((c) => c.data.customerName).join(", ")}\n`);

// ── Bundle once ──────────────────────────────────────────────────────────────

console.log("Bundling project...");
const serveUrl = await bundle({
  entryPoint: ENTRY_POINT,
  webpackOverride: enableTailwind,
});
console.log("Bundle ready.\n");

// ── Render each customer ──────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

for (const { folder, id, data } of customers) {
  const outputPath = resolve(OUTPUT_DIR, `${folder}.mp4`);
  console.log(`🎬 Rendering: ${data.customerName} (${id})`);

  try {
    const composition = await selectComposition({
      serveUrl,
      id,
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
        process.stdout.write(`\r   ${pct}%`);
      },
    });

    process.stdout.write("\r");
    console.log(`✅ output/${folder}.mp4\n`);
    passed++;
  } catch (err) {
    process.stdout.write("\r");
    console.error(`❌ Failed: ${data.customerName}`);
    console.error(`   ${err.message}\n`);
    failed++;
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

console.log("─".repeat(40));
console.log(`Rendered ${passed}/${customers.length} video(s)${failed ? ` · ${failed} failed` : ""}`);
if (passed > 0) console.log(`Videos saved to: output/`);

// ── Zip all MP4s ─────────────────────────────────────────────────────────────

if (passed > 0) {
  const zipPath = resolve(ROOT, "output", "customer-stories.zip");
  console.log("\nCreating zip...");
  try {
    execSync(`cd "${OUTPUT_DIR}" && zip -j "${zipPath}" *.mp4`, { stdio: "inherit" });
    console.log(`📦 output/customer-stories.zip`);
  } catch (err) {
    console.error("❌ Zip failed:", err.message);
  }
}
