/**
 * Generate story.json from a case study using Claude AI.
 *
 * Usage:
 *   npm run story:gen <folder-name> <path/to/casestudy.txt>
 *   npm run story:gen <folder-name> <https://example.com/case-study>
 *
 * Requires:
 *   ANTHROPIC_API_KEY env var
 *
 * Creates:
 *   public/customers/<folder-name>/story.json
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

const [folderName, caseStudySource] = process.argv.slice(2);

if (!folderName || !caseStudySource) {
  console.error("Usage: npm run story:gen <folder-name> <case-study.txt|url>");
  console.error("Requires: ANTHROPIC_API_KEY env var");
  process.exit(1);
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
  process.exit(1);
}

// Create customer directory if needed
const customerDir = resolve(ROOT, "public/customers", folderName);
if (!existsSync(customerDir)) {
  mkdirSync(customerDir, { recursive: true });
  console.log(`Created: public/customers/${folderName}/`);
}

// Count existing numbered screenshots to determine feature count
const pngs = readdirSync(customerDir)
  .filter((f) => /^\d+\.png$/i.test(f))
  .sort((a, b) => parseInt(a) - parseInt(b));

// screenshot layout: 1=challenge, 2..N-1=features, N=result
// default to 6 screenshots (4 features) if none exist yet
const screenshotCount = pngs.length >= 3 ? pngs.length : 6;
const featureCount = screenshotCount - 2;

console.log(
  `Screenshots found: ${pngs.length > 0 ? pngs.join(", ") : "none (defaulting to 6 — 4 features)"}`
);
console.log(`Generating story with ${featureCount} feature(s)...\n`);

// Read case study content
let caseStudyContent;
if (caseStudySource.startsWith("http://") || caseStudySource.startsWith("https://")) {
  console.log(`Fetching: ${caseStudySource}`);
  const res = await fetch(caseStudySource);
  if (!res.ok) {
    console.error(`Fetch failed: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  caseStudyContent = await res.text();
} else {
  const filePath = resolve(process.cwd(), caseStudySource);
  if (!existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  caseStudyContent = readFileSync(filePath, "utf-8");
}

// Build the screenshot path lines for the prompt
const featurePathLines = Array.from(
  { length: featureCount },
  (_, i) => `  features[${i}].screenshot = "customers/${folderName}/${i + 2}.png"`
).join("\n");

const client = new Anthropic();

console.log("Calling Claude to extract story data...");

const response = await client.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 8000,
  tools: [
    {
      name: "create_story_json",
      description: "Create a structured customer story JSON from case study content",
      input_schema: {
        type: "object",
        additionalProperties: false,
        required: [
          "customerName",
          "tagline",
          "websiteUrl",
          "accentColor",
          "challenge",
          "features",
          "result",
        ],
        properties: {
          customerName: {
            type: "string",
            description: "The company or product name",
          },
          tagline: {
            type: "string",
            description:
              "Compelling one-liner describing value — 'How [Company] [achieved X]' or a sharp value proposition (max 100 chars)",
          },
          websiteUrl: {
            type: "string",
            description: "Domain only, no protocol — e.g. 'example.com'",
          },
          accentColor: {
            type: "string",
            description:
              "Hex color (#RRGGBB) matching the brand's primary color. Must be vibrant and readable on a dark navy (#0A0F1E) background.",
          },
          challenge: {
            type: "object",
            additionalProperties: false,
            required: ["headline", "description", "screenshot"],
            properties: {
              headline: {
                type: "string",
                description: "Short punchy problem headline (max 60 chars)",
              },
              description: {
                type: "string",
                description:
                  "2–3 sentences describing the pain point or situation before the product",
              },
              screenshot: {
                type: "string",
                description: `Fixed value: "customers/${folderName}/1.png"`,
              },
            },
          },
          features: {
            type: "array",
            description: `Exactly ${featureCount} key features or capabilities that solved the problem`,
            minItems: featureCount,
            maxItems: featureCount,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["screenshot", "label"],
              properties: {
                screenshot: {
                  type: "string",
                  description: "Path to screenshot file (pre-assigned, do not change)",
                },
                label: {
                  type: "string",
                  description:
                    "Feature caption — 2–5 words, title case (e.g. 'AI-Powered Matching', 'Real-Time Dashboard')",
                },
              },
            },
          },
          result: {
            type: "object",
            additionalProperties: false,
            required: [
              "headline",
              "stats",
              "quote",
              "authorName",
              "authorTitle",
              "screenshot",
            ],
            properties: {
              headline: {
                type: "string",
                description: "Outcome headline — what was achieved (max 70 chars)",
              },
              stats: {
                type: "array",
                description: "Exactly 3 impactful metrics from the case study",
                minItems: 3,
                maxItems: 3,
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["value", "label"],
                  properties: {
                    value: {
                      type: "string",
                      description:
                        "The metric value (e.g. '10×', '40%', '$2M', '1,000+')",
                    },
                    label: {
                      type: "string",
                      description: "What this measures — 2–4 words",
                    },
                  },
                },
              },
              quote: {
                type: "string",
                description:
                  "A compelling customer quote or testimonial. Use a real quote if available; otherwise craft one that authentically captures the impact.",
              },
              authorName: {
                type: "string",
                description:
                  "Name of the person quoted, or the company name if no individual is identified",
              },
              authorTitle: {
                type: "string",
                description:
                  "Job title and company (e.g. 'CEO, Acme Corp') or the product category",
              },
              screenshot: {
                type: "string",
                description: `Fixed value: "customers/${folderName}/${screenshotCount}.png"`,
              },
            },
          },
        },
      },
    },
  ],
  tool_choice: { type: "tool", name: "create_story_json" },
  messages: [
    {
      role: "user",
      content: `You are extracting data for a customer success story video from a case study document.

Read the case study and fill in the story structure. Be concise and punchy — this becomes video text.

Screenshot paths are fixed — use exactly these values:
  challenge.screenshot = "customers/${folderName}/1.png"
${featurePathLines}
  result.screenshot = "customers/${folderName}/${screenshotCount}.png"

For stats: use real numbers from the case study. If there are more than 3, pick the most impressive.
For the quote: use a direct quote if available. If not, write one that captures the customer's sentiment.
For accentColor: pick a vibrant hex color that matches the brand (must work on dark navy background).

CASE STUDY:
---
${caseStudyContent}
---`,
    },
  ],
});

// Extract structured output from tool call
const toolUse = response.content.find((b) => b.type === "tool_use");
if (!toolUse) {
  console.error(
    "Claude did not return a tool call. Response:",
    JSON.stringify(response.content, null, 2)
  );
  process.exit(1);
}

const story = toolUse.input;

// Enforce correct screenshot paths regardless of what Claude returned
story.challenge.screenshot = `customers/${folderName}/1.png`;
story.features.forEach((feature, i) => {
  feature.screenshot = `customers/${folderName}/${i + 2}.png`;
});
story.result.screenshot = `customers/${folderName}/${screenshotCount}.png`;

// Write story.json
const outputPath = resolve(customerDir, "story.json");
writeFileSync(outputPath, JSON.stringify(story, null, 2) + "\n");

console.log(`\n✅  Generated: public/customers/${folderName}/story.json\n`);
console.log(`  Customer : ${story.customerName}`);
console.log(`  Tagline  : ${story.tagline}`);
console.log(`  Color    : ${story.accentColor}`);
console.log(`  Features : ${story.features.map((f) => f.label).join(", ")}`);
console.log(
  `  Stats    : ${story.result.stats.map((s) => `${s.value} ${s.label}`).join(" · ")}`
);
console.log(`\nNext steps:`);
console.log(`  1. Review  public/customers/${folderName}/story.json`);
console.log(
  `  2. Add     ${screenshotCount} screenshots → public/customers/${folderName}/1.png … ${screenshotCount}.png`
);
console.log(`  3. Run     npm run gen`);
console.log(`  4. Render  npm run render:one ${folderName}`);
