# Customer Story Videos

Programmatic video pipeline that renders 1920×1080 MP4 case study videos for each customer. Built on [Remotion](https://www.remotion.dev/).

Each video is ~21–46s depending on the number of feature screenshots, rendered at 30fps in H.264.

---

## Project structure

```
├── public/
│   └── customers/
│       └── <folder-name>/       # one folder per customer
│           ├── 1.png            # challenge screenshot
│           ├── 2.png … N-1.png  # feature screenshots (1 per 5s scene)
│           └── N.png            # result screenshot
│
├── src/
│   ├── customers.ts             # auto-generated — DO NOT edit by hand
│   ├── CustomerStory/
│   │   ├── schema.ts            # Zod schema (single source of truth for data shape)
│   │   ├── constants.ts         # FPS, scene durations, colours
│   │   ├── IntroScene.tsx
│   │   ├── StoryScene.tsx       # challenge scene
│   │   ├── FeatureTourScene.tsx # one instance per feature screenshot
│   │   ├── ResultScene.tsx
│   │   ├── OutroScene.tsx
│   │   └── BrowserFrame.tsx     # shared screenshot wrapper
│   └── Root.tsx                 # registers a Remotion Composition per customer
│
├── scripts/
│   ├── generate-compositions.mjs  # rebuilds src/customers.ts from public/customers/
│   ├── render-all.mjs             # renders every customer → output/*.mp4 + zip
│   ├── render-customer.mjs        # renders a single customer by folder name
│   ├── new-customer.mjs           # scaffolds a new customer folder
│   └── story-from-casestudy.mjs   # helper to draft story.json from raw copy
│
└── output/                        # rendered MP4s + customer-stories.zip (git-ignored)
```

---

## Scene breakdown

| Scene | Duration | Source |
|---|---|---|
| Intro | 5s | `customerName`, `tagline`, `websiteUrl`, `accentColor` |
| Challenge | 5s | `challenge.headline`, `challenge.description`, screenshot `1.png` |
| Feature tour | 5s × N | one scene per item in `features[]`, screenshots `2.png … N-1.png` |
| Result | 6s | `result.headline`, up to 3 `stats`, `quote`, last screenshot |
| Outro | 5s | `customerName`, `websiteUrl` |

Minimum video length (1 feature): **26s**. Each additional feature adds 5s.

---

## Data shape (`schema.ts`)

```ts
{
  customerName: string
  tagline:      string
  websiteUrl:   string        // e.g. "stammer.ai" — no https://
  accentColor:  string        // hex, e.g. "#A855F7"

  challenge: {
    headline:    string
    description: string
    screenshot:  string       // "customers/<folder>/1.png"
  }

  features: Array<{           // at least 1 required
    screenshot: string
    label:      string
  }>

  result: {
    headline:    string
    stats:       Array<{ value: string; label: string }>  // max 3
    quote:       string
    authorName:  string
    authorTitle: string
    screenshot:  string       // "customers/<folder>/N.png"
  }
}
```

---

## Commands

### Install
```bash
npm install
```

### Preview in Remotion Studio
```bash
npm run dev
```
Opens the studio at `localhost:3000` — live-reload on code and asset changes.

### Render all customers
```bash
npm run render:all
```
Bundles once, renders every customer in sequence, outputs to `output/`, then zips everything to `output/customer-stories.zip`.

### Render a single customer
```bash
npm run render:one <folder-name>
# e.g.
npm run render:one stammer-ai
```

### Add a new customer
```bash
npm run new-customer "Company Name"
```
Creates `public/customers/company-name/` with a pre-filled `story.json` template, then:
1. Edit `story.json` with real copy
2. Add numbered screenshots (`1.png`, `2.png`, …)
3. Run `npm run gen` to regenerate `src/customers.ts`
4. Preview with `npm run dev`, then render with `npm run render:one company-name`

### Regenerate `src/customers.ts`
```bash
npm run gen
```
Required after adding or removing a customer folder.

### Zip all rendered videos
```bash
npm run zip
```
Creates `output/customer-stories.zip` from all `output/*.mp4` files.

---

## Adding a customer — full checklist

- [ ] `npm run new-customer "Company Name"` — scaffold folder
- [ ] Edit `public/customers/<folder>/story.json`
- [ ] Add screenshots numbered from `1.png` (challenge) through the feature shots to the final result shot
- [ ] `npm run gen` — regenerate `src/customers.ts`
- [ ] `npm run dev` — verify all scenes look correct in Studio
- [ ] `npm run render:one <folder>` — render the final MP4

---

## Output

Rendered files land in `output/` (git-ignored):

```
output/
├── alertora.mp4
├── stammer-ai.mp4
├── ...
└── customer-stories.zip
```
