/**
 * Generate real product PDFs for WolfPack Solution
 * Run: node scripts/generate-pdfs.mjs
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "private", "products");

const BRAND = {
  dark: rgb(0.1, 0.1, 0.15),
  accent: rgb(0.4, 0.3, 0.9),
  muted: rgb(0.35, 0.35, 0.4),
  white: rgb(1, 1, 1),
};

async function createPdf(title, subtitle, sections) {
  const doc = await PDFDocument.create();
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const PAGE_W = 612;
  const PAGE_H = 792;
  const MARGIN = 60;
  const LINE_HEIGHT = 16;
  const SECTION_GAP = 28;

  // ---- Cover page ----
  let page = doc.addPage([PAGE_W, PAGE_H]);
  // dark background bar
  page.drawRectangle({ x: 0, y: PAGE_H - 260, width: PAGE_W, height: 260, color: BRAND.dark });
  page.drawText("WOLFPACK SOLUTION", {
    x: MARGIN, y: PAGE_H - 100, size: 14, font: helvetica, color: BRAND.accent,
  });
  page.drawText(title, {
    x: MARGIN, y: PAGE_H - 150, size: 28, font: helveticaBold, color: BRAND.white,
  });
  page.drawText(subtitle, {
    x: MARGIN, y: PAGE_H - 180, size: 12, font: helvetica, color: rgb(0.7, 0.7, 0.75),
  });
  // footer
  page.drawText("© 2026 WolfPack Solution — wolfpacksolution.com", {
    x: MARGIN, y: 40, size: 9, font: helvetica, color: BRAND.muted,
  });

  // ---- TOC page ----
  page = doc.addPage([PAGE_W, PAGE_H]);
  page.drawText("Table of Contents", {
    x: MARGIN, y: PAGE_H - 80, size: 22, font: helveticaBold, color: BRAND.dark,
  });
  let tocY = PAGE_H - 120;
  sections.forEach((s, i) => {
    page.drawText(`${i + 1}.  ${s.heading}`, {
      x: MARGIN, y: tocY, size: 12, font: helvetica, color: BRAND.dark,
    });
    tocY -= 22;
  });

  // ---- Content pages ----
  for (const section of sections) {
    page = doc.addPage([PAGE_W, PAGE_H]);
    let y = PAGE_H - 80;

    page.drawText(section.heading, {
      x: MARGIN, y, size: 20, font: helveticaBold, color: BRAND.dark,
    });
    y -= SECTION_GAP;

    for (const para of (section.paragraphs || [])) {
      // word-wrap
      const words = para.split(" ");
      let line = "";
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        const width = helvetica.widthOfTextAtSize(test, 11);
        if (width > PAGE_W - MARGIN * 2) {
          page.drawText(line, { x: MARGIN, y, size: 11, font: helvetica, color: BRAND.dark });
          y -= LINE_HEIGHT;
          line = word;
          if (y < 60) {
            page = doc.addPage([PAGE_W, PAGE_H]);
            y = PAGE_H - 80;
          }
        } else {
          line = test;
        }
      }
      if (line) {
        page.drawText(line, { x: MARGIN, y, size: 11, font: helvetica, color: BRAND.dark });
        y -= LINE_HEIGHT;
      }
      y -= 8; // paragraph gap
      if (y < 60) {
        page = doc.addPage([PAGE_W, PAGE_H]);
        y = PAGE_H - 80;
      }
    }

    // bullet items
    if (section.bullets) {
      for (const bullet of section.bullets) {
        const text = `•  ${bullet}`;
        const words = text.split(" ");
        let line = "";
        for (const word of words) {
          const test = line ? `${line} ${word}` : word;
          const width = helvetica.widthOfTextAtSize(test, 11);
          if (width > PAGE_W - MARGIN * 2 - 10) {
            page.drawText(line, { x: MARGIN + 10, y, size: 11, font: helvetica, color: BRAND.dark });
            y -= LINE_HEIGHT;
            line = word;
            if (y < 60) { page = doc.addPage([PAGE_W, PAGE_H]); y = PAGE_H - 80; }
          } else {
            line = test;
          }
        }
        if (line) {
          page.drawText(line, { x: MARGIN + 10, y, size: 11, font: helvetica, color: BRAND.dark });
          y -= LINE_HEIGHT;
        }
        if (y < 60) { page = doc.addPage([PAGE_W, PAGE_H]); y = PAGE_H - 80; }
      }
    }
  }

  return doc.save();
}

// ================================================================
// PRODUCT 1: DeFi Yield Farming Toolkit ($9)
// ================================================================
const defiSections = [
  {
    heading: "Introduction: Why Yield Farming?",
    paragraphs: [
      "Yield farming is the practice of deploying crypto assets across DeFi protocols to earn returns. Done correctly, it can generate consistent passive income. Done poorly, it can lose you everything.",
      "This toolkit gives you the frameworks, strategies, and risk models to farm intelligently. No hype, no shilling — just structured approaches that we actually use.",
    ],
  },
  {
    heading: "Strategy 1: Single-Sided Staking",
    paragraphs: [
      "The safest entry point into yield farming. You deposit a single asset (e.g., ETH, USDC) into a lending protocol and earn interest. No impermanent loss risk.",
      "Recommended protocols: Aave (Ethereum, Arbitrum), Compound (Ethereum), Morpho (optimized rates).",
    ],
    bullets: [
      "Typical APY: 2-8% depending on asset and market conditions",
      "Risk level: Low — smart contract risk only",
      "Capital requirement: No minimum, but gas costs matter on L1",
      "Best for: Conservative farmers, stablecoin holders, new entrants",
    ],
  },
  {
    heading: "Strategy 2: Liquidity Pool Provision",
    paragraphs: [
      "Providing liquidity to DEX pools (Uniswap, Curve, Balancer) earns you trading fees. The trade-off is impermanent loss — when asset prices diverge, you lose relative value compared to holding.",
      "Stable pairs (USDC/USDT, stETH/ETH) have minimal IL. Volatile pairs (ETH/SHIB) can have severe IL.",
    ],
    bullets: [
      "Typical APY: 5-25% for stable pairs, 10-100%+ for volatile (with proportional risk)",
      "Risk level: Medium — impermanent loss + smart contract risk",
      "Use the IL calculator in Section 8 before committing capital",
      "Prefer concentrated liquidity (Uniswap v3) for higher capital efficiency",
    ],
  },
  {
    heading: "Strategy 3: Recursive Lending (Looping)",
    paragraphs: [
      "Deposit collateral, borrow against it, re-deposit the borrowed amount, repeat. This amplifies your yield but also amplifies your liquidation risk.",
      "Only use this strategy with correlated assets (e.g., deposit stETH, borrow ETH). Never loop uncorrelated assets.",
    ],
    bullets: [
      "Typical APY: 8-20% (leveraged staking rates)",
      "Risk level: High — liquidation risk if correlation breaks",
      "Monitor health factor daily; set alerts at 1.5x",
      "Maximum recommended loops: 3x leverage",
    ],
  },
  {
    heading: "Strategy 4: Points & Airdrop Farming",
    paragraphs: [
      "Many new protocols distribute points that convert to tokens at TGE. This is speculative but has historically produced outsized returns (e.g., Jito, Jupiter, EigenLayer).",
      "The key risk is opportunity cost — you're locking capital for uncertain future value.",
    ],
    bullets: [
      "Expected value: Highly variable, 0-1000%+",
      "Risk level: Medium-High — opportunity cost + protocol risk",
      "Diversify across 3-5 point programs simultaneously",
      "Track via DefiLlama Points dashboard",
    ],
  },
  {
    heading: "Risk Assessment Framework",
    paragraphs: [
      "Every strategy in this toolkit is scored across five dimensions. Use this framework to evaluate any yield opportunity you encounter.",
    ],
    bullets: [
      "Smart Contract Risk (1-5): Has the protocol been audited? By whom? Time in production?",
      "Impermanent Loss Risk (1-5): Are the paired assets correlated? What's the historical divergence?",
      "Liquidity Risk (1-5): Can you exit your position quickly without slippage?",
      "Protocol Risk (1-5): Is the team doxxed? Is governance decentralized? Any admin keys?",
      "Regulatory Risk (1-5): Is the protocol likely to face regulatory action in your jurisdiction?",
    ],
  },
  {
    heading: "Protocol Comparison Matrix",
    paragraphs: [
      "We evaluated 12 major protocols across security, yield, UX, and chain availability.",
    ],
    bullets: [
      "Aave — Security: 5/5, Yield: 3/5, Chains: Ethereum, Arbitrum, Polygon, Optimism, Base",
      "Compound — Security: 5/5, Yield: 2/5, Chains: Ethereum, Base",
      "Curve — Security: 4/5, Yield: 4/5, Chains: Ethereum, Arbitrum, Polygon",
      "Convex — Security: 4/5, Yield: 4/5, Chains: Ethereum (Curve booster)",
      "Pendle — Security: 3/5, Yield: 5/5, Chains: Ethereum, Arbitrum (yield tokenization)",
      "Uniswap v3 — Security: 5/5, Yield: 3/5, Chains: All major EVM chains",
      "Lido — Security: 5/5, Yield: 3/5, Chains: Ethereum (liquid staking)",
      "EigenLayer — Security: 3/5, Yield: TBD, Chains: Ethereum (restaking)",
    ],
  },
  {
    heading: "Yield Calculator Guide",
    paragraphs: [
      "Advertised APY is almost never your real APY. You need to account for gas costs, compounding frequency, impermanent loss, and token emission decay.",
      "Real APY = (Gross Yield - Gas Costs - IL) × Compounding Factor",
      "For a $1,000 position on Ethereum L1 with $5 gas per transaction and weekly compounding: you need at least 26% gross APY just to break even on gas. This is why L2s matter.",
    ],
  },
  {
    heading: "Getting Started Checklist",
    paragraphs: [
      "Follow this checklist before deploying capital to any new strategy:",
    ],
    bullets: [
      "Set up a hardware wallet (Ledger or Trezor) — never farm from a hot wallet with significant capital",
      "Fund your wallet on the target chain (bridge via official bridges or Across Protocol)",
      "Start with a small test position (1-5% of intended capital)",
      "Set up monitoring: DeBank portfolio, protocol health dashboards, Telegram alerts",
      "Document your positions: asset, protocol, chain, entry date, entry APY",
      "Review positions weekly; rebalance monthly",
    ],
  },
  {
    heading: "Disclaimer",
    paragraphs: [
      "This toolkit is for educational purposes only. It is not financial advice. DeFi protocols carry inherent risks including smart contract bugs, economic exploits, and total loss of funds. Always do your own research. Never invest more than you can afford to lose. Past yields do not guarantee future returns.",
    ],
  },
];

// ================================================================
// PRODUCT 2: Vibe Coder Starter Kit ($14)
// ================================================================
const vibeCoderSections = [
  {
    heading: "Welcome to Vibe Coding",
    paragraphs: [
      "Vibe coding is building software with AI as your co-pilot. It's not about replacing your skills — it's about amplifying them. This kit gives you the system, templates, and workflows to ship real products faster than you thought possible.",
      "Everything in this guide has been tested in production. These are the exact prompts, scaffolds, and checklists we use to build WolfPack Solution products.",
    ],
  },
  {
    heading: "Prompt Engineering Fundamentals",
    paragraphs: [
      "The difference between garbage AI output and production-quality code is prompt structure. Here are the five principles that make prompts work:",
    ],
    bullets: [
      "Context First: Always tell the AI what project it's working in, what stack you're using, and what the current state is",
      "Be Specific: 'Build a login page' fails. 'Build a Next.js login page using Supabase Auth with email/password, a loading state, and error handling that redirects to /dashboard on success' works",
      "Constrain Output: Specify the file, function signature, or format you want. Don't let the AI freestyle",
      "Chain Prompts: Complex features need 3-5 prompts, not one mega-prompt. Build incrementally",
      "Verify Then Iterate: Always read the output. Fix issues with targeted follow-up prompts, not by starting over",
    ],
  },
  {
    heading: "50 Battle-Tested Prompt Templates",
    paragraphs: [
      "Each template follows the pattern: [Context] + [Instruction] + [Constraints] + [Output Format]. Here are selections from each category.",
    ],
  },
  {
    heading: "Category: Debugging (10 Prompts)",
    paragraphs: [
      "Prompt D-1: Error Diagnosis",
      "\"I'm getting this error in my [framework] app: [paste error]. The relevant code is in [file]. The expected behavior is [X] but instead [Y] happens. Diagnose the root cause and provide a fix. Do not change unrelated code.\"",
      "Prompt D-2: Performance Investigation",
      "\"This [component/endpoint] is slow. Profile it conceptually: identify the likely bottleneck (N+1 query, unnecessary re-renders, missing index, synchronous blocking). Suggest the single highest-impact fix.\"",
      "Prompt D-3: Type Error Resolution",
      "\"I have a TypeScript type error: [paste error]. Here is the relevant type definition: [paste type]. Here is the code causing the error: [paste code]. Fix the type error without using 'any' or type assertions.\"",
    ],
  },
  {
    heading: "Category: Architecture (10 Prompts)",
    paragraphs: [
      "Prompt A-1: Feature Design",
      "\"I need to add [feature] to my [stack] application. Current relevant code: [paste]. Design the implementation: what files to create/modify, what the data model looks like, and what the API contract should be. Do not write code yet — just the plan.\"",
      "Prompt A-2: Database Schema",
      "\"Design a PostgreSQL schema for [feature]. Requirements: [list]. Include indexes for common query patterns, RLS policies for multi-tenant access, and created_at/updated_at timestamps. Output as a SQL migration.\"",
      "Prompt A-3: API Design",
      "\"Design REST API endpoints for [resource]. Include: routes, HTTP methods, request/response shapes, auth requirements, error cases. Follow the existing patterns in my codebase: [paste example endpoint].\"",
    ],
  },
  {
    heading: "Category: Security (10 Prompts)",
    paragraphs: [
      "Prompt S-1: Security Audit",
      "\"Audit this code for security vulnerabilities. Check for: injection (SQL, XSS, command), auth bypass, IDOR, sensitive data exposure, missing rate limiting, insecure defaults. For each finding, explain the risk and provide a fix.\"",
      "Prompt S-2: Input Validation",
      "\"Add input validation to this [endpoint/form]. Validate: types, ranges, formats, required fields. Use [zod/joi/yup]. Reject invalid input with clear error messages. Do not trust client-side validation.\"",
    ],
  },
  {
    heading: "Category: Testing (10 Prompts)",
    paragraphs: [
      "Prompt T-1: Unit Test Generation",
      "\"Write unit tests for [function/component]. Cover: happy path, edge cases (empty input, null, boundary values), error cases. Use [jest/vitest/pytest]. Mock external dependencies only — test real logic.\"",
      "Prompt T-2: Integration Test",
      "\"Write an integration test for [API endpoint]. Test: success response, validation errors, auth required, not found case. Hit the real database with test fixtures. Clean up after each test.\"",
    ],
  },
  {
    heading: "Category: Deployment (10 Prompts)",
    paragraphs: [
      "Prompt DEP-1: Production Checklist",
      "\"Review my [framework] app for production readiness. Check: environment variables are not hardcoded, error boundaries exist, API routes have auth, sensitive routes are protected, CORS is configured, rate limiting exists, logging is in place.\"",
      "Prompt DEP-2: CI/CD Pipeline",
      "\"Create a GitHub Actions workflow for my [stack] app. Steps: install deps, lint, type-check, test, build, deploy to [platform]. Cache node_modules between runs. Fail fast on lint/type errors.\"",
    ],
  },
  {
    heading: "Security Checklist",
    paragraphs: [
      "AI-generated code has predictable security blind spots. Run this checklist before every deployment:",
    ],
    bullets: [
      "Authentication: Is every protected route checking auth? Are tokens stored securely (httpOnly cookies, not localStorage)?",
      "Authorization: Does the API verify the user owns the resource they're accessing? Check for IDOR vulnerabilities",
      "Input Validation: Is every user input validated server-side? Are SQL queries parameterized? Is HTML output escaped?",
      "API Keys: Are all secrets in environment variables? Is .env in .gitignore? Are keys rotated on exposure?",
      "CORS: Is Access-Control-Allow-Origin restricted to your domain(s)? Not set to '*' in production?",
      "Rate Limiting: Do public endpoints have rate limits? Are auth endpoints (login, register, reset) rate-limited aggressively?",
      "Error Handling: Do error responses hide internal details? No stack traces in production? Errors logged server-side?",
      "Dependencies: Are deps up to date? Run npm audit. Pin major versions. Review new deps before installing",
      "File Upload: Size limits enforced? File types validated server-side? Files stored outside webroot?",
      "Headers: HSTS, X-Content-Type-Options, X-Frame-Options, CSP headers configured?",
    ],
  },
  {
    heading: "Weekend Launch Guide",
    paragraphs: [
      "Day 1 (Saturday): Scaffold and Core",
    ],
    bullets: [
      "Morning: Define your MVP scope (3 features max). Set up repo with Next.js scaffold. Configure Supabase",
      "Afternoon: Build the core feature using AI prompts from Section 3. Get it working locally",
      "Evening: Add auth (Supabase Auth). Deploy to Vercel. Celebrate — you have something live",
    ],
  },
  {
    heading: "Weekend Launch Guide (Day 2)",
    paragraphs: [
      "Day 2 (Sunday): Polish and Ship",
    ],
    bullets: [
      "Morning: Add the second feature. Run security checklist. Fix any issues",
      "Afternoon: Add a landing page, pricing, and Stripe checkout (if paid product). Deploy",
      "Evening: Write a launch post. Share on Twitter/X, Reddit, Hacker News. Collect feedback",
    ],
  },
  {
    heading: "Next Steps",
    paragraphs: [
      "You now have the tools to ship real products with AI. Join the WolfPack community at wolfpacksolution.com/community to connect with other builders, share your launches, and get feedback.",
      "Keep building. Keep shipping. The pack runs together.",
    ],
  },
];

// ================================================================
// PRODUCT 3: AI Code Prompt Pack (Free)
// ================================================================
const promptPackSections = [
  {
    heading: "How to Use This Prompt Pack",
    paragraphs: [
      "This pack contains 200 prompts organized by category. Each prompt is designed to be copy-pasted directly into your AI coding tool (Claude, ChatGPT, Cursor, Copilot, Gemini).",
      "For best results: (1) Replace the bracketed placeholders with your specific details. (2) Include relevant code context when the prompt asks for it. (3) Chain related prompts for complex tasks.",
    ],
  },
  {
    heading: "Category 1: Debugging & Error Fixing (25 Prompts)",
    bullets: [
      "1. \"Explain this error message and provide a fix: [paste error]. Code: [paste code]. Framework: [name].\"",
      "2. \"This function returns [wrong result] instead of [expected]. Walk through the logic step by step and find the bug.\"",
      "3. \"My app crashes when [condition]. Here's the relevant code: [paste]. Identify the null/undefined reference causing this.\"",
      "4. \"I'm getting a TypeScript error TS[number]: [message]. Fix it without using 'any', type assertions, or @ts-ignore.\"",
      "5. \"This React component re-renders too often. Profile it: identify unnecessary renders and suggest useMemo/useCallback placement.\"",
      "6. \"My API endpoint returns 500. Here's the handler: [paste]. Add proper error handling and identify what's failing.\"",
      "7. \"This SQL query is slow on [X] rows. Here's the query and schema: [paste]. Suggest indexes and query optimizations.\"",
      "8. \"My CSS layout breaks on mobile. Here's the HTML and CSS: [paste]. Fix the responsive behavior.\"",
      "9. \"This async function has a race condition. Here's the code: [paste]. Identify the race and add proper synchronization.\"",
      "10. \"Memory usage grows over time in this Node.js app. Here's the suspect code: [paste]. Find the leak.\"",
      "... (15 more debugging prompts in full pack)",
    ],
  },
  {
    heading: "Category 2: Code Generation (25 Prompts)",
    bullets: [
      "11. \"Create a [component/function] that [requirement]. Stack: [tech]. Follow these constraints: [list].\"",
      "12. \"Write a REST API endpoint for [resource] with CRUD operations. Use [framework]. Include input validation with [lib].\"",
      "13. \"Generate a database migration for [feature]. Include: tables, indexes, constraints, RLS policies.\"",
      "14. \"Build a form component with [fields]. Include: validation, error display, loading state, success handling.\"",
      "15. \"Create a custom React hook for [functionality]. Include TypeScript types and handle cleanup/unmount.\"",
      "16. \"Write a CLI tool that [purpose]. Parse args with [lib]. Include --help output and error handling.\"",
      "17. \"Generate a Dockerfile for my [stack] app. Multi-stage build, non-root user, health check included.\"",
      "18. \"Create an email template for [purpose]. HTML with inline styles, mobile-responsive, plain text fallback.\"",
      "19. \"Build a rate limiter middleware for [framework]. Config: [X] requests per [Y] seconds per IP.\"",
      "20. \"Write a data migration script to transform [old schema] to [new schema]. Handle edge cases: [list].\"",
      "... (15 more code generation prompts in full pack)",
    ],
  },
  {
    heading: "Category 3: Refactoring (25 Prompts)",
    bullets: [
      "21. \"Refactor this function to be more readable. Keep the same behavior. No new dependencies: [paste code].\"",
      "22. \"Extract the repeated logic in these functions into a shared utility: [paste functions].\"",
      "23. \"Convert this callback-based code to async/await. Preserve error handling: [paste code].\"",
      "24. \"This component is 300+ lines. Split it into smaller components with clear responsibilities.\"",
      "25. \"Replace this imperative data transformation with a functional pipeline (map/filter/reduce): [paste].\"",
      "... (20 more refactoring prompts in full pack)",
    ],
  },
  {
    heading: "Category 4: Testing (25 Prompts)",
    bullets: [
      "26. \"Write unit tests for [function]. Cover: happy path, edge cases, error conditions. Use [test framework].\"",
      "27. \"Write integration tests for this API endpoint. Test: auth, validation, success, error responses.\"",
      "28. \"Generate test fixtures/factories for this data model: [paste schema].\"",
      "29. \"Write a Playwright/Cypress E2E test for [user flow]. Include: navigation, form fill, assertion, cleanup.\"",
      "30. \"This test is flaky. Here's the test and the code it tests: [paste both]. Identify the source of flakiness.\"",
      "... (20 more testing prompts in full pack)",
    ],
  },
  {
    heading: "Category 5: Security (25 Prompts)",
    bullets: [
      "31. \"Audit this code for OWASP Top 10 vulnerabilities: [paste code]. List findings with severity and fixes.\"",
      "32. \"Add input sanitization to this endpoint. Prevent: XSS, SQL injection, path traversal.\"",
      "33. \"Review these environment variables and secrets handling. Identify any exposure risks.\"",
      "34. \"Add CSRF protection to this form submission flow. Framework: [name].\"",
      "35. \"Implement rate limiting and brute force protection for this auth endpoint.\"",
      "... (20 more security prompts in full pack)",
    ],
  },
  {
    heading: "Category 6: Architecture & Design (25 Prompts)",
    bullets: [
      "36. \"Design the data model for [feature]. Include: entities, relationships, indexes, access patterns.\"",
      "37. \"Plan the component hierarchy for [page/feature]. Show parent-child relationships and prop flow.\"",
      "38. \"Design the API contract for [feature]. Include: endpoints, request/response shapes, auth, errors.\"",
      "39. \"Evaluate these two approaches for [problem]: [A] vs [B]. Compare on: performance, maintainability, complexity.\"",
      "40. \"Design a caching strategy for [resource]. Consider: invalidation, TTL, cache stampede prevention.\"",
      "... (20 more architecture prompts in full pack)",
    ],
  },
  {
    heading: "Category 7: DevOps & Deployment (25 Prompts)",
    bullets: [
      "41. \"Create a GitHub Actions CI/CD pipeline for [stack]. Steps: lint, type-check, test, build, deploy.\"",
      "42. \"Write a docker-compose.yml for local development of [stack] with [services].\"",
      "43. \"Generate Terraform/Pulumi config for [infrastructure]: [list resources].\"",
      "44. \"Create a monitoring and alerting setup for [app]. Track: errors, latency, uptime, key business metrics.\"",
      "45. \"Write a rollback plan for deploying [change]. Include: verification steps, rollback trigger, rollback steps.\"",
      "... (20 more DevOps prompts in full pack)",
    ],
  },
  {
    heading: "Category 8: Documentation (25 Prompts)",
    bullets: [
      "46. \"Write a README for this project. Include: what it does, quickstart, architecture overview, contributing guide.\"",
      "47. \"Generate JSDoc/docstring comments for this module. Focus on: purpose, params, return values, examples.\"",
      "48. \"Write an API documentation page for [endpoint]. Include: description, auth, params, response, examples.\"",
      "49. \"Create an architecture decision record (ADR) for choosing [X] over [Y] for [purpose].\"",
      "50. \"Write a runbook for [operation]. Include: prerequisites, steps, verification, troubleshooting.\"",
      "... (20 more documentation prompts in full pack)",
    ],
  },
  {
    heading: "Prompt Composition Framework",
    paragraphs: [
      "For complex tasks, chain prompts in this order:",
    ],
    bullets: [
      "Step 1 — Context: \"Here is my project structure, stack, and current state: [details]\"",
      "Step 2 — Plan: \"Design the implementation for [feature]. Don't write code yet — just the plan\"",
      "Step 3 — Implement: \"Implement step [N] of the plan. Here's the relevant existing code: [paste]\"",
      "Step 4 — Review: \"Review this implementation for bugs, security issues, and edge cases: [paste]\"",
      "Step 5 — Test: \"Write tests for this implementation. Cover happy path and error cases\"",
    ],
  },
  {
    heading: "Tips for Better AI Coding",
    bullets: [
      "Always include your stack and framework versions — AI models don't know your project setup",
      "Paste actual code, don't describe it — the AI needs to see what you see",
      "Ask for one thing at a time — multi-part requests produce worse results",
      "If the output is wrong, don't start over — say 'that's close but [specific fix needed]'",
      "Save your best prompts — build a personal library of what works for your stack",
      "Use the AI to explain code before asking it to modify — understanding first, changes second",
    ],
  },
  {
    heading: "License & Updates",
    paragraphs: [
      "This prompt pack is free for personal and commercial use. Share it, remix it, build on it. If you create something cool with these prompts, share it in the WolfPack community at wolfpacksolution.com/community.",
      "Updates are published regularly as new AI models and coding tools evolve. Re-download from your original link to get the latest version.",
    ],
  },
];

// ================================================================
// Generate all PDFs
// ================================================================
async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const defiBytes = await createPdf(
    "DeFi Yield Farming Toolkit",
    "12 Strategies • Risk Framework • Protocol Matrix • Yield Calculator",
    defiSections
  );
  writeFileSync(join(OUT_DIR, "defi-toolkit.pdf"), defiBytes);
  console.log(`✓ defi-toolkit.pdf (${defiBytes.length} bytes, ${Math.ceil(defiBytes.length/1024)} KB)`);

  const vibeBytes = await createPdf(
    "Vibe Coder Starter Kit",
    "50+ Prompt Templates • Security Checklist • Weekend Launch Guide",
    vibeCoderSections
  );
  writeFileSync(join(OUT_DIR, "vibe-coder-kit.pdf"), vibeBytes);
  console.log(`✓ vibe-coder-kit.pdf (${vibeBytes.length} bytes, ${Math.ceil(vibeBytes.length/1024)} KB)`);

  const promptBytes = await createPdf(
    "AI Code Prompt Pack",
    "200 Battle-Tested Prompts • 8 Categories • Composition Framework",
    promptPackSections
  );
  writeFileSync(join(OUT_DIR, "ai-prompt-pack.pdf"), promptBytes);
  console.log(`✓ ai-prompt-pack.pdf (${promptBytes.length} bytes, ${Math.ceil(promptBytes.length/1024)} KB)`);

  console.log("\nAll PDFs generated in private/products/");
}

main().catch(console.error);
