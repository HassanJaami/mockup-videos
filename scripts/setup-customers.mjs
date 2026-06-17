/**
 * One-time setup: copies all 15 customers from Downloads into public/customers/,
 * renames screenshots to challenge/solution/result, and writes story.json for each.
 *
 * Usage: node scripts/setup-customers.mjs
 */

import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const SRC = "/Users/hassanali/Downloads/CaseStudies";
const DEST = resolve(ROOT, "public/customers");

// ── Customer definitions ──────────────────────────────────────────────────────
// screenshots: [challengeNum, solutionNum, resultNum] from the Mockups folder

const CUSTOMERS = [
  {
    folder: "alertora",
    src: "Alertora",
    screenshots: [1, 4, 7],
    story: {
      customerName: "Alertora",
      tagline: "AI-powered WhatsApp safety companion for solo travelers",
      accentColor: "#10B981",
      challenge: {
        headline: "Fragmented travel info leaves travelers unprepared",
        description:
          "Solo travelers relied on multiple scattered sources for destination guidance, making it time-consuming and stressful to access critical information quickly while on the road.",
        screenshot: "customers/alertora/challenge.png",
      },
      solution: {
        headline: "Instant travel guidance through WhatsApp",
        description:
          "Alertora delivers AI-powered travel guidance through WhatsApp — an interface travelers already trust — providing destination insights, safety tips, and local guidance on demand.",
        screenshot: "customers/alertora/solution.png",
      },
      result: {
        headline: "Smarter, safer travel through conversation",
        stats: [
          { value: "Zero", label: "Extra Apps Needed" },
          { value: "24/7", label: "Travel Guidance" },
          { value: "AI", label: "Safety Companion" },
        ],
        quote:
          "Alertora supports users throughout their travel experiences while maintaining a familiar and user-friendly interaction model.",
        authorName: "Alertora",
        authorTitle: "AI Travel Safety Platform",
        screenshot: "customers/alertora/result.png",
      },
    },
  },
  {
    folder: "axirify",
    src: "Axirify",
    screenshots: [1, 4, 8],
    story: {
      customerName: "Axirify",
      tagline: "AI-powered property management platform with CRM & project management",
      accentColor: "#6366F1",
      challenge: {
        headline: "Disconnected systems slowing property operations",
        description:
          "Property management teams juggled multiple tools for leases, CRM, payments, and projects — creating duplicate data entry, limited visibility, and growing administrative overhead.",
        screenshot: "customers/axirify/challenge.png",
      },
      solution: {
        headline: "One unified platform for all operations",
        description:
          "Evolve Edge built Axirify as a single SaaS platform that centralizes property management, CRM, and project workflows — with AI automation reducing manual effort at every step.",
        screenshot: "customers/axirify/solution.png",
      },
      result: {
        headline: "Unified operations, zero duplicate work",
        stats: [
          { value: "4→1", label: "Systems Consolidated" },
          { value: "Zero", label: "Duplicate Data Entry" },
          { value: "AI", label: "Powered Operations" },
        ],
        quote:
          "Property management, CRM, and project management now live in a single platform instead of multiple disconnected tools.",
        authorName: "Axirify",
        authorTitle: "Property & Operations Management Platform",
        screenshot: "customers/axirify/result.png",
      },
    },
  },
  {
    folder: "backlink-brain",
    src: "Backlink Brain",
    screenshots: [1, 4, 7],
    story: {
      customerName: "Backlink Brain",
      tagline: "AI-powered outreach platform for SEO backlink discovery & campaign management",
      accentColor: "#F59E0B",
      challenge: {
        headline: "Manual backlink outreach limits scale",
        description:
          "SEO professionals spent excessive time on repetitive outreach tasks, juggling multiple tools and struggling to maintain consistency as campaign volumes grew.",
        screenshot: "customers/backlink-brain/challenge.png",
      },
      solution: {
        headline: "Automated outreach from a single platform",
        description:
          "Backlink Brain centralizes SEO outreach and campaign execution with intelligent automation — helping teams manage large-scale initiatives without the manual overhead.",
        screenshot: "customers/backlink-brain/solution.png",
      },
      result: {
        headline: "More strategy, less repetitive work",
        stats: [
          { value: "Zero", label: "Manual Outreach Tasks" },
          { value: "1", label: "Unified Platform" },
          { value: "AI", label: "Link Discovery" },
        ],
        quote:
          "Backlink Brain enables SEO teams to dedicate more time to strategic decision-making and less time to repetitive operational tasks.",
        authorName: "Backlink Brain",
        authorTitle: "AI SEO Outreach Platform",
        screenshot: "customers/backlink-brain/result.png",
      },
    },
  },
  {
    folder: "ce-tax",
    src: "CE Tax",
    screenshots: [1, 2, 3],
    story: {
      customerName: "CE Tax",
      tagline: "Unified financial management system for invoicing, transactions & compliance",
      accentColor: "#3B82F6",
      challenge: {
        headline: "Fragmented finance tools create costly gaps",
        description:
          "Growing businesses managed invoices, transactions, and reporting across separate disconnected tools — creating administrative overhead and limiting financial visibility.",
        screenshot: "customers/ce-tax/challenge.png",
      },
      solution: {
        headline: "All financial operations in one place",
        description:
          "CE Tax consolidates invoicing, transaction management, and compliance into a single platform — reducing complexity and giving finance teams a clear, centralized view.",
        screenshot: "customers/ce-tax/solution.png",
      },
      result: {
        headline: "Centralized, confident financial management",
        stats: [
          { value: "1", label: "Unified Platform" },
          { value: "Zero", label: "Fragmented Processes" },
          { value: "100%", label: "Centralized Records" },
        ],
        quote:
          "CE Tax enables businesses to work more effectively and maintain greater confidence in their financial operations.",
        authorName: "CE Tax",
        authorTitle: "Financial Management Platform",
        screenshot: "customers/ce-tax/result.png",
      },
    },
  },
  {
    folder: "celleasy",
    src: "CellEasy",
    screenshots: [1, 2, 4],
    story: {
      customerName: "CellEasy",
      tagline: "E-commerce platform for Rogers dealers with sales attribution & tracking",
      accentColor: "#EF4444",
      challenge: {
        headline: "No way to track which rep made each online sale",
        description:
          "Standard e-commerce platforms couldn't attribute sales to individual representatives, making it impossible for Rogers dealers to measure team performance or distribute commissions fairly.",
        screenshot: "customers/celleasy/challenge.png",
      },
      solution: {
        headline: "Purpose-built e-commerce for wireless dealers",
        description:
          "CellEasy links every online purchase to the sales rep who generated it — giving dealers full performance visibility while customers enjoy a seamless shopping experience.",
        screenshot: "customers/celleasy/solution.png",
      },
      result: {
        headline: "Digital commerce built for dealer teams",
        stats: [
          { value: "100%", label: "Sales Attribution" },
          { value: "1", label: "Online Platform" },
          { value: "Zero", label: "Commission Disputes" },
        ],
        quote:
          "CellEasy bridged the gap between traditional retail sales structures and digital commerce.",
        authorName: "CellEasy",
        authorTitle: "Wireless Retail E-Commerce Platform",
        screenshot: "customers/celleasy/result.png",
      },
    },
  },
  {
    folder: "dare",
    src: "DARE",
    screenshots: [1, 3, 5],
    story: {
      customerName: "DARE",
      tagline: "Agentic AI research platform for scientists and PhD researchers",
      accentColor: "#8B5CF6",
      challenge: {
        headline: "Advanced AI was locked behind engineering expertise",
        description:
          "Researchers at institutions like Carnegie Mellon needed custom AI agents for large-scale analysis — but building them required dedicated engineering teams most labs didn't have.",
        screenshot: "customers/dare/challenge.png",
      },
      solution: {
        headline: "AI agents built by researchers, not engineers",
        description:
          "DARE provides an intuitive no-code interface for configuring AI-driven research workflows — running entirely within institutional infrastructure to keep sensitive data secure.",
        screenshot: "customers/dare/solution.png",
      },
      result: {
        headline: "AI research democratized at Carnegie Mellon",
        stats: [
          { value: "CMU", label: "Deployed At" },
          { value: "100%", label: "Data Stays In-House" },
          { value: "Zero", label: "Coding Required" },
        ],
        quote:
          "DARE has transformed AI-powered research from an engineering challenge into an accessible tool for scientific discovery.",
        authorName: "DARE",
        authorTitle: "Agentic AI Research Platform",
        screenshot: "customers/dare/result.png",
      },
    },
  },
  {
    folder: "gold-selling-standards",
    src: "Gold Selling Standards",
    screenshots: [1, 4, 7],
    story: {
      customerName: "Gold Selling Standards",
      tagline: "AI-powered sales call intelligence for performance analysis & coaching",
      accentColor: "#EAB308",
      challenge: {
        headline: "Most sales calls go unreviewed and uncoached",
        description:
          "Managers could only review a fraction of calls, making coaching reactive and inconsistent — while critical behavioral patterns and deal insights were lost after every conversation.",
        screenshot: "customers/gold-selling-standards/challenge.png",
      },
      solution: {
        headline: "Every call analyzed, every rep coached",
        description:
          "Gold Selling Standards automatically processes sales conversations at scale, turning them into structured coaching insights that give managers complete team visibility.",
        screenshot: "customers/gold-selling-standards/solution.png",
      },
      result: {
        headline: "Consistent coaching across every conversation",
        stats: [
          { value: "100%", label: "Calls Analyzed" },
          { value: "Zero", label: "Unreviewed Conversations" },
          { value: "AI", label: "Coaching Insights" },
        ],
        quote:
          "Gold Selling Standards helped us transition toward a more structured and insight-driven approach to sales coaching.",
        authorName: "Gold Selling Standards",
        authorTitle: "AI Sales Coaching Platform",
        screenshot: "customers/gold-selling-standards/result.png",
      },
    },
  },
  {
    folder: "hg-garage",
    src: "HG Garage",
    screenshots: [1, 4, 7],
    story: {
      customerName: "HG Garage",
      tagline: "Automated inventory management for automotive parts suppliers",
      accentColor: "#F97316",
      challenge: {
        headline: "Spreadsheets can't keep up with multi-channel inventory",
        description:
          "Automotive parts suppliers managed inventory, COGS, and financials manually across disconnected systems — leading to stock errors, duplicate entry, and no clear view of profitability.",
        screenshot: "customers/hg-garage/challenge.png",
      },
      solution: {
        headline: "Automated inventory across every sales channel",
        description:
          "HG Garage synchronizes inventory across all connected marketplaces in real time, automating COGS tracking and centralizing business performance into a single dashboard.",
        screenshot: "customers/hg-garage/solution.png",
      },
      result: {
        headline: "Streamlined operations, accurate inventory",
        stats: [
          { value: "Zero", label: "Manual Tracking" },
          { value: "100%", label: "Channel Sync" },
          { value: "1", label: "Unified Dashboard" },
        ],
        quote:
          "HG Garage transformed inventory operations into a more streamlined and scalable process, empowering businesses to operate with greater confidence.",
        authorName: "HG Garage",
        authorTitle: "Automotive Inventory Management Platform",
        screenshot: "customers/hg-garage/result.png",
      },
    },
  },
  {
    folder: "insidermemes",
    src: "Insidermemes",
    screenshots: [1, 3, 6],
    story: {
      customerName: "Insidermemes",
      tagline: "AI-powered meme generator for viral content creation",
      accentColor: "#EC4899",
      challenge: {
        headline: "Creating timely memes takes too long",
        description:
          "Content creators and brands struggled to find suitable templates, align text correctly, and produce memes quickly enough to stay relevant — slowing content production and missing trending moments.",
        screenshot: "customers/insidermemes/challenge.png",
      },
      solution: {
        headline: "From idea to meme in seconds",
        description:
          "Insidermemes lets users browse thousands of templates, receive AI-powered suggestions, and generate polished memes through an intuitive interface — no design experience needed.",
        screenshot: "customers/insidermemes/solution.png",
      },
      result: {
        headline: "Instant memes, zero design skills required",
        stats: [
          { value: "Seconds", label: "Idea to Meme" },
          { value: "1000s", label: "of Templates" },
          { value: "Zero", label: "Design Skills Needed" },
        ],
        quote:
          "Insidermemes delivers a faster and more accessible approach to meme creation for brands and creators.",
        authorName: "Insidermemes",
        authorTitle: "AI Meme Creation Platform",
        screenshot: "customers/insidermemes/result.png",
      },
    },
  },
  {
    folder: "notifier",
    src: "Notifier",
    screenshots: [1, 5, 9],
    story: {
      customerName: "Notifier",
      tagline: "AI-powered social listening and brand monitoring platform",
      accentColor: "#06B6D4",
      challenge: {
        headline: "Brand conversations happen faster than teams can track",
        description:
          "Organizations had limited visibility into social conversations shaping customer perception — delayed awareness meant missed opportunities to engage, respond, and protect their reputation.",
        screenshot: "customers/notifier/challenge.png",
      },
      solution: {
        headline: "Real-time visibility into every brand mention",
        description:
          "Notifier centralizes social monitoring with AI-driven classification and sentiment analysis — giving teams a single place to track, prioritize, and act on what's being said about their brand.",
        screenshot: "customers/notifier/solution.png",
      },
      result: {
        headline: "Always-on brand monitoring, zero missed signals",
        stats: [
          { value: "24/7", label: "Brand Monitoring" },
          { value: "Real-time", label: "Sentiment Insights" },
          { value: "Zero", label: "Missed Mentions" },
        ],
        quote:
          "Notifier transformed social listening from a resource-intensive process into an efficient, actionable capability.",
        authorName: "Notifier",
        authorTitle: "AI Brand Monitoring Platform",
        screenshot: "customers/notifier/result.png",
      },
    },
  },
  {
    folder: "samwise",
    src: "Samwise",
    screenshots: [1, 3, 5],
    story: {
      customerName: "Samwise AI",
      tagline: "AI-powered federal contracting platform for government opportunities",
      accentColor: "#14B8A6",
      challenge: {
        headline: "Sorting through federal contracts wastes hours",
        description:
          "Government contractors spent excessive time manually reviewing high volumes of opportunities across multiple sources — making it hard to identify relevant pursuits before deadlines passed.",
        screenshot: "customers/samwise/challenge.png",
      },
      solution: {
        headline: "AI surfaces the right contracts instantly",
        description:
          "Samwise AI continuously analyzes available federal opportunities and surfaces those most aligned with each contractor's capabilities — reducing research time and improving pursuit decisions.",
        screenshot: "customers/samwise/solution.png",
      },
      result: {
        headline: "Faster decisions, stronger contract pipeline",
        stats: [
          { value: "Zero", label: "Missed Opportunities" },
          { value: "Faster", label: "Opportunity Evaluation" },
          { value: "AI", label: "Powered Discovery" },
        ],
        quote:
          "Samwise AI helps contractors focus more time on strategic growth and proposal development.",
        authorName: "Samwise AI",
        authorTitle: "Federal Contracting Intelligence Platform",
        screenshot: "customers/samwise/result.png",
      },
    },
  },
  {
    folder: "scoutside",
    src: "Scoutside",
    screenshots: [1, 4, 8],
    story: {
      customerName: "Scoutside",
      tagline: "AI-powered college lacrosse recruiting platform for student-athletes",
      accentColor: "#22C55E",
      challenge: {
        headline: "Student-athletes miss opportunities they never knew existed",
        description:
          "The college recruiting landscape was overwhelming and opaque — athletes lacked structured guidance, missed relevant programs, and made decisions without the data to back them up.",
        screenshot: "customers/scoutside/challenge.png",
      },
      solution: {
        headline: "Personalized recruiting intelligence for athletes",
        description:
          "Scoutside uses AI to match student-athletes with college programs aligned to their goals — giving them a clear, confident path through the recruiting process.",
        screenshot: "customers/scoutside/solution.png",
      },
      result: {
        headline: "Confident athletes, smarter recruiting decisions",
        stats: [
          { value: "1", label: "Recruiting Platform" },
          { value: "AI", label: "Powered Matching" },
          { value: "Zero", label: "Missed Opportunities" },
        ],
        quote:
          "Scoutside delivers a more confident and structured path through the recruiting process.",
        authorName: "Scoutside",
        authorTitle: "AI College Recruiting Platform",
        screenshot: "customers/scoutside/result.png",
      },
    },
  },
  {
    folder: "stammer-ai",
    src: "Stammer AI",
    screenshots: [1, 4, 7],
    story: {
      customerName: "Stammer AI",
      tagline: "AI-powered white-label platform for conversational AI agents",
      accentColor: "#A855F7",
      challenge: {
        headline: "Building AI agents required expensive engineering teams",
        description:
          "Agencies and businesses faced a painful gap: custom AI builds were too costly, while off-the-shelf tools lacked white-labeling and enterprise capabilities — leaving revenue on the table.",
        screenshot: "customers/stammer-ai/challenge.png",
      },
      solution: {
        headline: "Launch white-labeled AI agents with zero code",
        description:
          "Stammer AI lets businesses build, customize, and deploy fully branded conversational AI solutions through an intuitive no-code interface — with enterprise-grade reliability at launch speed.",
        screenshot: "customers/stammer-ai/solution.png",
      },
      result: {
        headline: "New AI revenue streams, launched in hours",
        stats: [
          { value: "Zero", label: "Code Required" },
          { value: "100%", label: "White-labeled" },
          { value: "Millions", label: "Conversations Handled" },
        ],
        quote:
          "Stammer AI transformed from a bold vision into a production-ready platform helping businesses across the world harness conversational AI.",
        authorName: "Stammer AI",
        authorTitle: "White-Label AI Agent Platform",
        screenshot: "customers/stammer-ai/result.png",
      },
    },
  },
  {
    folder: "talentar",
    src: "TalentArc",
    screenshots: [1, 4, 8],
    story: {
      customerName: "TalentArc",
      tagline: "AI-powered recruitment platform for smarter, faster hiring",
      accentColor: "#0EA5E9",
      challenge: {
        headline: "Manually screening hundreds of applicants is unsustainable",
        description:
          "Recruiters spent most of their time on repetitive screening, leading to inconsistent evaluations, delayed hiring, and a poor candidate experience that cost top talent.",
        screenshot: "customers/talentar/challenge.png",
      },
      solution: {
        headline: "AI-powered candidate screening and matching",
        description:
          "TalentArc introduces an intelligent evaluation layer that scores and prioritizes candidates against role requirements — letting recruiters focus on interviews, not inbox management.",
        screenshot: "customers/talentar/solution.png",
      },
      result: {
        headline: "Faster hiring, stronger candidate matches",
        stats: [
          { value: "Zero", label: "Manual Screening" },
          { value: "Faster", label: "Hiring Decisions" },
          { value: "AI", label: "Candidate Scoring" },
        ],
        quote:
          "TalentArc improved the overall quality and speed of hiring decisions, enabling teams to identify strong talent more efficiently.",
        authorName: "TalentArc",
        authorTitle: "AI Recruitment Platform",
        screenshot: "customers/talentar/result.png",
      },
    },
  },
  {
    folder: "zinng",
    src: "Zinng",
    screenshots: [1, 3, 6],
    story: {
      customerName: "Zinng AI",
      tagline: "AI-powered customer communication platform for small businesses",
      accentColor: "#F43F5E",
      challenge: {
        headline: "Missed calls mean lost customers for small businesses",
        description:
          "Small businesses couldn't respond to every inquiry in real time — after-hours calls went unanswered, communication channels were fragmented, and potential customers moved on.",
        screenshot: "customers/zinng/challenge.png",
      },
      solution: {
        headline: "One inbox for every customer conversation",
        description:
          "Zinng AI centralizes calls, texts, and voicemails into a single dashboard — with AI handling after-hours inquiries so businesses stay responsive around the clock.",
        screenshot: "customers/zinng/solution.png",
      },
      result: {
        headline: "24/7 availability, zero missed opportunities",
        stats: [
          { value: "24/7", label: "Customer Availability" },
          { value: "1", label: "Unified Inbox" },
          { value: "Zero", label: "Missed Leads" },
        ],
        quote:
          "Zinng AI transformed how small businesses approach customer communication by helping them stay connected, responsive, and better equipped to serve their customers.",
        authorName: "Zinng AI",
        authorTitle: "AI Customer Communication Platform",
        screenshot: "customers/zinng/result.png",
      },
    },
  },
];

// ── Run setup ─────────────────────────────────────────────────────────────────

let done = 0;
let skipped = 0;

for (const customer of CUSTOMERS) {
  const srcDir = resolve(SRC, customer.src, "Mockups");
  const destDir = resolve(DEST, customer.folder);

  const [challengeNum, solutionNum, resultNum] = customer.screenshots;
  const challengeSrc = resolve(srcDir, `${challengeNum}.png`);
  const solutionSrc = resolve(srcDir, `${solutionNum}.png`);
  const resultSrc = resolve(srcDir, `${resultNum}.png`);

  if (!existsSync(challengeSrc) || !existsSync(solutionSrc) || !existsSync(resultSrc)) {
    console.warn(`⚠  Skipping ${customer.folder} — screenshot(s) not found in ${srcDir}`);
    skipped++;
    continue;
  }

  mkdirSync(destDir, { recursive: true });

  copyFileSync(challengeSrc, resolve(destDir, "challenge.png"));
  copyFileSync(solutionSrc, resolve(destDir, "solution.png"));
  copyFileSync(resultSrc, resolve(destDir, "result.png"));

  writeFileSync(
    resolve(destDir, "story.json"),
    JSON.stringify(customer.story, null, 2) + "\n"
  );

  console.log(`✅ ${customer.folder}`);
  done++;
}

console.log(`\nSetup complete: ${done} customers ready${skipped ? `, ${skipped} skipped` : ""}`);
console.log(`Run 'npm run render:all' to render all videos.`);
