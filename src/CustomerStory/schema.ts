import { zColor } from "@remotion/zod-types";
import { z } from "zod";

export const statSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const featureSchema = z.object({
  screenshot: z.string(),
  label: z.string(),
});

export const customerStorySchema = z.object({
  customerName: z.string(),
  tagline: z.string(),
  websiteUrl: z.string(),
  accentColor: zColor(),
  challenge: z.object({
    headline: z.string(),
    description: z.string(),
    screenshot: z.string(), // screenshot 1
  }),
  features: z.array(featureSchema).min(1), // screenshots 2..N-1
  result: z.object({
    headline: z.string(),
    stats: z.array(statSchema).max(3),
    quote: z.string(),
    authorName: z.string(),
    authorTitle: z.string(),
    screenshot: z.string(), // last screenshot
  }),
});

export type CustomerStoryData = z.infer<typeof customerStorySchema>;
