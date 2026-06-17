/**
 * Scaffolds a new customer folder under public/customers/.
 *
 * Usage:
 *   npm run new-customer "Company Name"
 *
 * Creates:
 *   public/customers/company-name/
 *     story.json   ← pre-filled template, edit before rendering
 *     (add challenge.png, solution.png, result.png here)
 */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

const customerName = process.argv[2];
if (!customerName) {
  console.error("Usage: npm run new-customer \"Company Name\"");
  process.exit(1);
}

// Convert "Company Name" → "company-name"
const folderName = customerName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const customerDir = resolve(ROOT, "public/customers", folderName);

if (existsSync(customerDir)) {
  console.error(`Folder already exists: public/customers/${folderName}/`);
  process.exit(1);
}

mkdirSync(customerDir, { recursive: true });

const template = {
  customerName,
  tagline: `How ${customerName} [achieved result] in [timeframe]`,
  accentColor: "#6366F1",
  challenge: {
    headline: "What was the core problem they faced?",
    description:
      "2-3 sentences describing the challenge, pain point, or situation before using your product.",
    screenshot: `customers/${folderName}/challenge.png`,
  },
  solution: {
    headline: "How did your product solve it?",
    description:
      "2-3 sentences describing what they used, how they implemented it, and what changed.",
    screenshot: `customers/${folderName}/solution.png`,
  },
  result: {
    headline: "What was the measurable outcome?",
    stats: [
      { value: "0×", label: "Key Metric 1" },
      { value: "0%", label: "Key Metric 2" },
      { value: "$0k", label: "Key Metric 3" },
    ],
    quote: "Direct quote from the customer about the impact.",
    authorName: "First Last",
    authorTitle: `Job Title, ${customerName}`,
    screenshot: `customers/${folderName}/result.png`,
  },
};

writeFileSync(
  resolve(customerDir, "story.json"),
  JSON.stringify(template, null, 2) + "\n"
);

console.log(`✅ Created: public/customers/${folderName}/\n`);
console.log("Next steps:");
console.log(`  1. Edit   public/customers/${folderName}/story.json`);
console.log(`  2. Add    public/customers/${folderName}/challenge.png`);
console.log(`  3. Add    public/customers/${folderName}/solution.png`);
console.log(`  4. Add    public/customers/${folderName}/result.png`);
console.log(`  5. Render npm run render:one ${folderName}`);
