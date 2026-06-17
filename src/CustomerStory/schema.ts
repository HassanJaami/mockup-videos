import { zColor } from "@remotion/zod-types";
import { z } from "zod";

export const statSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const customerStorySchema = z.object({
  customerName: z.string(),
  tagline: z.string(),
  accentColor: zColor(),
  challenge: z.object({
    headline: z.string(),
    description: z.string(),
    screenshot: z.string(),
  }),
  solution: z.object({
    headline: z.string(),
    description: z.string(),
    screenshot: z.string(),
  }),
  result: z.object({
    headline: z.string(),
    stats: z.array(statSchema).max(3),
    quote: z.string(),
    authorName: z.string(),
    authorTitle: z.string(),
    screenshot: z.string(),
  }),
});

export type CustomerStoryData = z.infer<typeof customerStorySchema>;
