# WolfPack Solution — Unified Ecosystem Build Spec
### The AI Entrepreneur Ecosystem

**Version:** 1.0
**Date:** 2026-03-14
**Author:** Wolf (Pack Leader) — Roundtable Synthesis
**Sources:** Scout (Marketplace Research), Atlas (Platform Architecture), Scout (Gamification Research)
**Status:** MASTER DOCUMENT — Awaiting Flame's Approval

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Platform Pillars & Product-Market Fit](#2-platform-pillars--product-market-fit)
3. [Revenue Model & Unit Economics](#3-revenue-model--unit-economics)
4. [Gamification System Design](#4-gamification-system-design)
5. [Marketplace Mechanics](#5-marketplace-mechanics)
6. [The Forge — Game Design Document](#6-the-forge--game-design-document)
7. [Tech Stack & Build Phases](#7-tech-stack--build-phases)
8. [What Makes This Different](#8-what-makes-this-different)
9. [Key Metrics to Track](#9-key-metrics-to-track)
10. [Decisions Needing Flame's Approval](#10-decisions-needing-flames-approval)

---

## 1. Executive Summary

**WolfPack Solution** is an AI entrepreneur ecosystem where learning, building, and selling form a single continuous loop. It is not a course platform. It is not a marketplace. It is not a gamified app. It is all three fused into one thing that has never existed before: **a platform where the game IS the work and the work IS the product.**

The platform rests on four pillars — **Guides** (knowledge), **Frameworks** (plug-and-play AI configs), **Apps** (tools like VibeSniffer), and **The Forge** (a gamified learning game where every level produces real, ownable, deployable infrastructure). Users don't simulate building AI businesses. They build them, level by level, with training wheels that disappear as they level up.

Revenue flows from six streams: first-party product sales, marketplace commissions, Forge subscriptions (three tiers from free to $29.99/mo), premium memberships, SaaS tools, and promoted listings. Based on cross-platform analysis of Gumroad, Replit, Shopify, HuggingFace, Duolingo, and Habitica — this model captures value at every stage of the user journey while maintaining zero-barrier entry.

The gamification layer draws from Duolingo's streak psychology (streaks increase commitment by 60%, 7-day streaks make users 3.6x more likely to stay) and Habitica's RPG accountability mechanics (party-based consequences for inaction), while avoiding their documented failures: Habitica's overwhelming complexity and honor-system weakness, Duolingo's engagement-vs-learning misalignment and XP grinding exploits.

**The thesis:** Every other AI education platform teaches you about building. WolfPack makes you build. The Forge turns the learning curve into a game, and the game output is real infrastructure you own and can sell on the marketplace. The flywheel is: Learn → Build → Ship → Sell → Earn → Level Up → Learn More.

**Target:** MVP live in 2 weeks. Marketplace by week 10. The Forge beta by week 14.

---

## 2. Platform Pillars & Product-Market Fit

### Pillar 1: Guides — Free + Paid Knowledge Products

**What:** Educational content from free blog posts to paid PDFs, courses, and prompt packs.

| Product Type | Price Range | Delivery | PMF Signal |
|---|---|---|---|
| Blog posts | Free | Web (ISR) | SEO traffic, email capture, trust building |
| PDF guides (DeFi Toolkit, etc.) | $9.99–$47 | Downloadable PDF | Existing Gumroad sales validate demand |
| Multi-module courses | $47–$197 | Modules + templates | Creator economy education is $16B+ market |
| Prompt packs | $9.99–$29 | JSON + PDF | Prompt engineering is the new literacy |

**Product-Market Fit Analysis:**
- Digital knowledge products are a proven market (Gumroad: 1.6M+ products, creators collectively earn millions/month)
- AI-specific education is in a demand supercycle — every business needs AI literacy
- WolfPack's existing Gumroad products (DeFi Toolkit $27, Vibe Coder Kit $47) already validate willingness to pay
- Free blog content (21 existing posts) provides SEO foundation and trust funnel
- **Differentiator:** Guides aren't standalone — they connect to Frameworks (the implementation) and The Forge (the practice)

### Pillar 2: Frameworks — Plug-and-Play AI Agent Configs

**What:** Pre-built agent configurations, workflow templates, and project scaffolds that work out of the box.

| Product Type | Format | Example |
|---|---|---|
| Agent configs | YAML/JSON + AGENTS.md | Content Engine Agent Config |
| Workflow templates | Howl-compatible YAML | SEO Pipeline, Social Media Engine |
| Project scaffolds | Next.js/Node.js starter repos (zip) | Landing Page Template, Discord Bot |
| Prompt libraries | Structured JSON collections | Industry-specific prompt sets |

**Product-Market Fit Analysis:**
- CrewAI's explosive growth (150+ enterprise customers, 60% of Fortune 500) proves demand for pre-built AI agent workflows
- Replit's template ecosystem drives majority of new projects — templates reduce time-to-value from days to minutes
- Shopify's app store (12,320+ apps, 87% of merchants use at least one) proves the "extend the platform" model
- **Differentiator:** Frameworks aren't just configs — they're Howl-compatible, meaning they plug directly into WolfPack's own orchestration layer. This is the "own the framework, own the deployment target" play (Vercel model)

### Pillar 3: Apps — Tools Like VibeSniffer

**What:** Standalone SaaS tools built by WolfPack and third-party creators.

| App | Status | Model |
|---|---|---|
| VibeSniffer | Live (vibesniffer.com) | Free tier + Pro ($19/mo) |
| AgentAudit | In development | Free tier + Pro ($19/mo) |
| Third-party tools | Marketplace | Varies |

**Product-Market Fit Analysis:**
- Developer tools market growing 25%+ annually
- VibeSniffer already has traction as a standalone product
- The GPT Store model (800M weekly ChatGPT users discovering custom GPTs) proves that app discovery within an ecosystem drives adoption
- **Differentiator:** Apps built in The Forge by users can be listed here — the game creates the marketplace supply

### Pillar 4: The Forge — Where Building IS the Gameplay

**What:** A gamified, 40-level learning game where every level produces real, deployable, ownable infrastructure. Not a simulation. Not a sandbox. Real output.

**Product-Market Fit Analysis:**
- Duolingo proved gamified learning scales to 50M+ DAU and $14B valuation
- Replit proved AI-assisted building is exploding (1,556% YoY revenue growth)
- No platform combines gamified learning with real infrastructure output
- The Forge solves the #1 problem in AI education: the gap between knowing and doing
- **Differentiator:** This is the moat. Every other platform teaches OR sells. The Forge teaches BY making you build things you can sell. The game output IS real infrastructure.

*See Section 6 for full Forge game design document.*

---

## 3. Revenue Model & Unit Economics

### Revenue Streams Overview

```
┌──────────────────────────────────────────────────────────────┐
│                   WOLFPACK REVENUE ENGINE                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. FIRST-PARTY PRODUCTS         $9.99–$197/product         │
│     Guides, courses, prompt packs sold directly              │
│                                                              │
│  2. MARKETPLACE COMMISSIONS      15–30% per sale            │
│     Third-party guides, frameworks, apps                     │
│                                                              │
│  3. THE FORGE SUBSCRIPTIONS      $0 / $9.99 / $29.99/mo    │
│     Tiered access to AI models + deployment                  │
│                                                              │
│  4. SAAS TOOLS                   $19/mo per tool            │
│     VibeSniffer Pro, AgentAudit Pro                          │
│                                                              │
│  5. PROMOTED LISTINGS            $49–$299/week              │
│     Featured placement + AI recommendations                  │
│                                                              │
│  6. PREMIUM MEMBERSHIP (Phase 2) $19/mo or $149/yr          │
│     Advanced analytics, priority support, exclusive content  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Marketplace Commission Structure

Based on analysis of 10 platforms (Gumroad 10-30%, Shopify 0-15%, GPT Store ~3%, Bubble varies, Udemy 37%):

| Sale Source | Platform Cut | Creator Cut | Rationale |
|---|---|---|---|
| Creator's own traffic | **15%** (includes processing) | 85% | Gumroad-style: reward creators who bring buyers |
| Platform-discovered | **25%** (includes processing + tax) | 75% | Fair value for discovery, matches Gumroad Discover |
| Featured/promoted | **30%** (includes premium placement) | 70% | Creators opt in for visibility boost |
| First $500 lifetime revenue | **0%** | 100% | Shopify-inspired: attract early builders, build trust |

**Why these numbers:**
- Gumroad charges 10% for direct, 30% for Discover — our 15/25 split is more competitive
- Shopify's $1M free threshold is too generous for our stage — $500 demonstrates the same philosophy at startup scale
- The 0% introductory threshold eliminates risk for new creators (Shopify proved this attracts builders)
- 15% on self-traffic is lower than Gumroad's 10% + processing, making us competitive on net
- 25% platform-discovered is 5 points lower than Gumroad Discover, incentivizing creators to list with us

### The Forge Subscription Tiers

| Tier | Price | AI Models | Features | Target User |
|---|---|---|---|---|
| **Free (Pup)** | $0/mo | Gemini Flash, open-source models | Sandbox mode, Levels 1-10, community access | Curious beginners |
| **Pro (Hunter)** | $9.99/mo | + Claude Sonnet, GPT-4o-mini | Levels 1-30, prompt library, workflow builder | Active learners |
| **Alpha** | $29.99/mo | + Claude Opus, GPT-4o | All 40 levels, marketplace deployment, enterprise models, priority support | Serious builders |

**Unit Economics (per subscriber):**

| Metric | Free | Pro ($9.99) | Alpha ($29.99) |
|---|---|---|---|
| Monthly revenue | $0 | $9.99 | $29.99 |
| Est. AI model costs | $0 | ~$2.50 | ~$8.00 |
| Infrastructure | ~$0.50 | ~$1.00 | ~$2.00 |
| Gross margin | N/A | ~$6.49 (65%) | ~$19.99 (67%) |
| LTV (12-mo, 70% retention) | $0 | ~$84 | ~$252 |
| Target CAC | $0 (organic) | <$25 | <$75 |

**Projected Revenue (Year 1, Conservative):**

| Stream | Assumptions | Monthly Revenue | Annual |
|---|---|---|---|
| First-party products | 100 sales/mo @ $30 avg | $3,000 | $36,000 |
| Marketplace commission | 200 sales/mo @ $25 avg, 20% cut | $1,000 | $12,000 |
| Forge Free | 2,000 users | $0 | $0 |
| Forge Pro | 300 subscribers | $2,997 | $35,964 |
| Forge Alpha | 100 subscribers | $2,999 | $35,988 |
| SaaS tools | 150 subscribers @ $19 | $2,850 | $34,200 |
| Promoted listings | 10 listings/mo @ $99 avg | $990 | $11,880 |
| **Total** | | **$13,836** | **$166,032** |

### Stripe Connect Payout Flow

```
Customer pays $47 for a creator's guide
├── Stripe processes payment ($1.66 fee: 2.9% + $0.30)
├── Platform receives $45.34
├── If platform-discovered (25% commission):
│   ├── Creator: $33.26 (75% of $45.34 - adjusted)
│   └── Platform: $12.08
├── If creator's traffic (15% commission):
│   ├── Creator: $38.54
│   └── Platform: $6.80
└── Creator receives payout on Stripe's 2-day rolling schedule
```

---

## 4. Gamification System Design

### Design Philosophy

Drawn from research on Duolingo (50M+ DAU, $14B valuation) and Habitica (RPG task management), our gamification system follows three principles:

1. **The game reinforces real work** — Unlike Duolingo (where engagement and learning can diverge), every XP-earning action in WolfPack produces real value. No XP grinding on trivial tasks.
2. **Verified progress over honor system** — Habitica's biggest weakness is self-reported task completion. WolfPack verifies: purchases are real, repos are scanned, products are listed, Forge levels produce real output.
3. **Gradual complexity** — Habitica overwhelms new users with 20+ systems at once. WolfPack introduces mechanics progressively: XP and levels first, then coins, then badges, then seasonal events.

### Wolf Rank Progression

| Level | Cumulative XP | Wolf Rank | Unlock |
|---|---|---|---|
| 1 | 0 | Pup | Basic profile, community access |
| 5 | 1,100 | Scout Wolf | Showcase access, referral link |
| 10 | 5,600 | Pack Runner | Leaderboard visibility, Forge Level 10 badge |
| 15 | 13,100 | Howler | Custom profile flair, advanced community features |
| 20 | 23,100 | Shadow Wolf | Creator application eligible |
| 25 | 35,600 | Alpha Hunter | Marketplace priority review |
| 30 | 50,600 | Pack Elder | Community moderator eligibility |
| 40 | 85,600 | Dire Wolf | Beta access to new features |
| 50 | 130,600 | Fenrir | Legendary status, governance participation |

**Leveling formula:** XP per level = `100 + (level - 1) * 100`, capped at `5,000` per level.

### XP Earning Actions

| Action | XP | Cooldown | Verified By |
|---|---|---|---|
| Daily login | 5 × streak_days (max 50) | 1/day | Auth session |
| Purchase a product | 50 | Per product | Stripe webhook |
| Leave a review | 25 | Per product | Content submission |
| Scan repo (VibeSniffer) | 15 | 5/day | API call log |
| Community post | 10 | 5/day | Content submission |
| Community comment | 5 | 20/day | Content submission |
| Showcase a project | 75 | 1/week | Admin review |
| List a product (creator) | 100 | Per product | Product approval |
| First sale (creator) | 200 | Once | Stripe webhook |
| Refer a user | 150 | Unlimited | Referral tracking |
| Complete a course | 100 | Per course | Module completion |
| Forge level completion | 50–200 (scales) | Per level | Forge output validation |
| Buy from marketplace | 30 | Per product | Stripe webhook |
| Sell on marketplace | 75 per sale | Per sale | Stripe webhook |

### Streak System (Stolen from Duolingo)

Duolingo's data: streaks increase commitment by 60%, 7-day streaks make users 3.6x more likely to stay long-term, Streak Freeze reduced churn by 21%.

**WolfPack Streaks:**
- **Daily requirement:** Complete any XP-earning action (login + one action)
- **Streak display:** Flame icon in navbar with day count (Duolingo pattern)
- **Streak milestones:** 7 days (+25 Wolf Coins), 30 days (+100 Coins + badge), 100 days (+500 Coins + rare badge), 365 days (+2,000 Coins + legendary badge + "Streak Society" access)
- **Streak Freeze:** 50 Wolf Coins preserves streak for 1 missed day (max 2 stacked)
- **The Den (safety valve):** "Rest in the Den" pauses streak tracking during breaks — stolen from Habitica's Inn mechanic, which prevents the punishing spiral of returning to a dead streak

### Wolf Coins (Free Currency)

**Dual-currency economy** inspired by Duolingo (gems) and Habitica (gold + gems), but unified into one free currency to avoid Habitica's two-tier resentment problem.

**Earning:**

| Action | Coins |
|---|---|
| Purchase a product | 10 |
| Leave a review | 5 |
| Refer a user who purchases | 25 |
| Daily login streak (7+ days) | 1/day |
| Level up | 20 |
| Forge level completion | 10–50 (scales) |
| Sell a product on marketplace | 15 per sale |
| Seasonal event participation | Varies |

**Spending:**

| Use | Cost | Notes |
|---|---|---|
| 5% discount on any product | 50 coins | Max 1 per order |
| 10% discount | 100 coins | Max 1 per order |
| Streak Freeze | 50 coins | Max 2 stacked |
| Exclusive badge skin | 200 coins | Cosmetic |
| Early access to new products | 150 coins | 48-hour head start |
| Forge power-ups (hint, skip) | 25–75 coins | Convenience, not advantage |
| Promoted showcase (1 week) | 300 coins | Community visibility |

**Exchange rate:** ~50 Wolf Coins ≈ $1 discount value. This keeps the economy sustainable and prevents inflation.

**Gold sinks** (critical — Habitica's Enchanted Armoire lesson): Streak Freezes, cosmetics, and seasonal exclusives ensure coins don't accumulate meaninglessly at endgame.

### Badge System

**Rarity tiers** (HuggingFace + Product Hunt pattern):

| Rarity | Color | Drop Rate | Examples |
|---|---|---|---|
| Common | Gray | Easy to earn | Pack Member, First Blood, Vibe Checked |
| Uncommon | Green | Moderate effort | Critic (5 reviews), Builder (3 showcases), Merchant (first listing) |
| Rare | Blue | Significant effort | Connector (5 referrals), Completionist, Forge Level 20 |
| Epic | Purple | Major achievement | Top Dog (#1 leaderboard), Forge Level 30, Season Champion |
| Legendary | Gold/Amber | Exceptional | Fenrir (level 50), Forge Master (level 40), 365-day streak |

**Seasonal badges** (Duolingo monthly badge pattern): Time-limited badges that disappear forever after the season ends. Creates FOMO-driven urgency without being punitive.

### Leaderboards

**Anti-toxicity design** (stolen from Duolingo's cohort matching):

- **Weekly cohorts:** 30 users of similar activity levels compete, not global ranking
- **Weekly reset:** Every Monday, fresh start (prevents runaway leaders)
- **Timeframes:** Weekly (competitive), Monthly (prestige), All-Time (legacy)
- **Filters:** By pillar (guide buyers, framework creators, app builders, Forge players)
- **Top 3:** Animated wolf icons, bonus Wolf Coins
- **No global rank anxiety:** Deliberate choice per Habitica's research — public global leaderboards discourage more than they motivate

### Seasonal Events (Quarterly)

| Event | Theme | Timing | Multiplier | Special |
|---|---|---|---|---|
| The Spring Hunt | New beginnings, discovery | April | 2x XP, 1.5x coins | Spring Hunter badge |
| Summer Solstice | Peak performance | July | 1.5x XP, 2x coins | Solstice Wolf badge |
| The Howling | Halloween, community | October | 2x XP, 2x coins | Midnight Howl badge |
| Winter Pack | Year-end celebration | December | 2x everything | Winter Alpha badge (legendary) |

**Pack Quests** (Habitica boss fight adaptation): During seasonal events, the entire community collectively works toward a goal (e.g., "The Pack must complete 10,000 Forge levels this month"). If achieved, everyone gets the seasonal reward. This creates collaborative pressure without individual punishment.

---

## 5. Marketplace Mechanics

### Architecture

The marketplace is where the ecosystem becomes self-sustaining. Third-party creators list guides, frameworks, and apps. WolfPack handles billing, tax, delivery, and discovery.

### Commission Structure

| Sale Source | Platform Cut | Creator Cut | Processing |
|---|---|---|---|
| First $500 lifetime | **0%** | 100% | Creator pays Stripe fees only |
| Creator's own traffic | **15%** | 85% | Included in commission |
| Platform-discovered | **25%** | 75% | Included in commission |
| Featured/promoted | **30%** | 70% | Includes premium placement |

**Rationale:** The $500 free threshold (inspired by Shopify's $1M model, scaled for startup stage) eliminates risk for new creators and demonstrates confidence. The tiered commission (inspired by Gumroad's direct/Discover split) fairly compensates WolfPack for discovery while rewarding creators who bring their own audience.

### Payout Mechanics

- **Payment processor:** Stripe Connect (Express accounts)
- **Creator onboarding:** Stripe's hosted onboarding flow (KYC, bank details)
- **Payout schedule:** Stripe's 2-day rolling payouts (creators see money fast)
- **Merchant of Record:** WolfPack handles all tax compliance (VAT, GST, sales tax) — this is a massive pain point for creators (Gumroad made this move in Jan 2025 and it was a huge differentiator)
- **Currency:** USD primary, Stripe handles conversion for international creators
- **Minimum payout:** $10 (prevents micro-transaction overhead)

### Quality Gates

**Product submission flow** (Shopify "Built for Shopify" certification model):

```
1. Creator drafts product
   ├── Title, description, pricing
   ├── Files uploaded to R2
   ├── Preview/demo provided
   └── Tags and difficulty level set

2. Submit for review → status = 'in_review'

3. Admin review checklist:
   ├── Content quality (not AI-generated slop)
   ├── Accurate description matches content
   ├── Working files (PDFs render, configs valid, code runs)
   ├── No malicious content or code
   ├── Appropriate pricing for value delivered
   ├── No copyright violations
   └── Follows WolfPack content guidelines

4. Decision:
   ├── APPROVE → Published, "Verified by WolfPack" badge
   ├── REQUEST CHANGES → Feedback to creator, resubmit
   └── REJECT → Reason provided, creator can appeal
```

**Certification tiers** (Shopify + HuggingFace pattern):

| Badge | Criteria | Benefit |
|---|---|---|
| Verified | Passed quality review | Listed on marketplace |
| WolfPack Pick | Editor's choice, exceptional quality | Featured placement, newsletter inclusion |
| Built for WolfPack | Meets advanced technical standards, Howl-compatible | Premium badge, priority in AI recommendations |

### Discovery Engine

**AI-native discovery** (GPT Store pattern): WolfPack's platform AI recommends relevant frameworks, guides, and tools during user workflows. If a user is building a content pipeline in The Forge, the AI suggests relevant templates from the marketplace.

**Algorithmic surfacing:**
- Trending (upvotes × recency × purchase velocity)
- Staff picks / WolfPack Picks (editorial curation)
- "Creators like you also built with..." (collaborative filtering)
- Tag-based related products
- Seasonal / event-related promotions

### Affiliate Program

**Gumroad-inspired:** Community members can apply to promote creators' products. Custom referral links, tracked commissions, transparent reporting. Affiliate commission: 10% of sale (paid by platform from its commission, not by creator).

---

## 6. The Forge — Game Design Document

### Vision

The Forge is a 40-level gamified learning experience where **the game output IS real infrastructure the user owns.** Every prompt you write is saved to your library. Every agent you configure is a real agent. Every workflow you build is a real Howl-compatible YAML. Every app you ship deploys to the marketplace.

This is not a tutorial. This is not a course. This is a game where building is the gameplay.

### Level Structure

#### Act I: The Spark (Levels 1-10) — Learn Prompting
**Theme:** Igniting the first flame. User discovers they can make AI do real work.

| Level | Challenge | Real Output | XP |
|---|---|---|---|
| 1 | Write your first prompt | Saved to prompt library | 50 |
| 2 | Refine a prompt with constraints | Improved prompt saved | 50 |
| 3 | Create a system prompt for a persona | Persona config saved | 75 |
| 4 | Chain two prompts together | Prompt chain saved | 75 |
| 5 | Build a prompt template with variables | Template saved | 100 |
| 6 | Write prompts for 3 different use cases | Use case library | 100 |
| 7 | Create a prompt that generates structured output (JSON) | Structured prompt saved | 125 |
| 8 | Build a multi-turn conversation flow | Conversation template saved | 125 |
| 9 | Optimize a prompt for cost vs. quality | Optimization report | 150 |
| 10 | **BOSS LEVEL:** Create a complete prompt pack | Publishable prompt pack | 200 |

**Level 10 output:** A real, tested prompt pack that could be listed on the marketplace.

#### Act II: The Pack (Levels 11-20) — Build Agent Teams
**Theme:** One wolf is strong. A pack is unstoppable. User learns to orchestrate AI agents.

| Level | Challenge | Real Output | XP |
|---|---|---|---|
| 11 | Configure a single AI agent with a role | Agent config YAML | 75 |
| 12 | Give an agent tools (web search, file read) | Enhanced agent config | 100 |
| 13 | Create a two-agent team with handoff | Multi-agent config | 100 |
| 14 | Build an agent with memory/context | Stateful agent config | 125 |
| 15 | Design agent team roles and responsibilities | Team architecture doc | 125 |
| 16 | Configure agent error handling and fallbacks | Resilient agent config | 150 |
| 17 | Build a 3+ agent team for a real task | Full team config | 150 |
| 18 | Optimize agent team for cost and speed | Performance-tuned config | 175 |
| 19 | Add monitoring and logging to agent team | Observable agent config | 175 |
| 20 | **BOSS LEVEL:** Build a complete agent team that solves a real problem | Deployable agent team | 200 |

**Level 20 output:** A real, tested agent team configuration that could be listed on the marketplace.

#### Act III: The Hunt (Levels 21-30) — Create Workflows
**Theme:** The pack hunts together. User learns to build automated workflows.

| Level | Challenge | Real Output | XP |
|---|---|---|---|
| 21 | Create a simple linear workflow | Howl YAML | 100 |
| 22 | Add conditional branching to a workflow | Branching workflow YAML | 125 |
| 23 | Build a workflow with external API calls | API-integrated YAML | 125 |
| 24 | Create a scheduled/cron workflow | Scheduled workflow YAML | 150 |
| 25 | Build a workflow with human-in-the-loop approval | HITL workflow YAML | 150 |
| 26 | Chain multiple workflows together | Multi-workflow pipeline YAML | 175 |
| 27 | Add error recovery and retry logic | Resilient workflow YAML | 175 |
| 28 | Build a workflow that processes data at scale | Batch workflow YAML | 200 |
| 29 | Create a workflow with real-time triggers | Event-driven YAML | 200 |
| 30 | **BOSS LEVEL:** Build a complete production workflow pipeline | Deployable pipeline | 250 |

**Level 30 output:** A real Howl-compatible workflow pipeline ready for production use or marketplace listing.

#### Act IV: The Alpha (Levels 31-40) — Ship an App
**Theme:** The alpha leads. User ships a real product to the world.

| Level | Challenge | Real Output | XP |
|---|---|---|---|
| 31 | Design an app concept and user stories | Product spec | 125 |
| 32 | Build the core data model | Database schema | 150 |
| 33 | Create the API layer | API routes | 150 |
| 34 | Build the frontend UI | Working UI | 175 |
| 35 | Integrate AI agents into the app | AI-powered app | 175 |
| 36 | Add authentication and user management | Secure app | 200 |
| 37 | Build payment/billing integration | Monetizable app | 200 |
| 38 | Add monitoring, logging, analytics | Production-ready app | 225 |
| 39 | Write docs and create a marketplace listing | Listed app | 225 |
| 40 | **BOSS LEVEL:** Deploy to production and get first user | Live, deployed app | 300 |

**Level 40 output:** A real, live, deployed application listed on the WolfPack marketplace.

### Forge Mechanics

**Sandbox vs. Production:**
- Levels 1-10: All work happens in a sandboxed environment with free models
- Levels 11-20: Sandbox with option to test against real APIs (Pro tier)
- Levels 21-30: Sandbox with deployment previews (Pro tier), production deploys (Alpha tier)
- Levels 31-40: Production deployment (Alpha tier only)

**Validation System** (addresses Habitica's honor system weakness):
- Every Forge level has automated validation criteria
- Prompts are tested against expected outputs
- Agent configs are validated against schema
- Workflows are dry-run tested
- Apps must pass automated checks before level completion
- No self-reporting — the system verifies your work

**Hint System** (Wolf Coins, not paywall):
- Stuck on a level? Spend 25 Wolf Coins for a contextual hint
- Spend 75 Wolf Coins to see a reference solution (after 3 failed attempts)
- Hints don't skip the work — you still have to build the thing

**Boss Levels** (Habitica's party quest adaptation):
- Levels 10, 20, 30, 40 are "Boss Levels" with higher requirements
- Optional: invite Pack members to collaborate on Boss Levels
- Pack collaboration creates accountability (Habitica's "missing your Dailies hurts your party" mechanic, adapted)
- Boss Level completion awards special badges and bonus XP

### Forge Subscription Tiers (Detailed)

| Feature | Free (Pup) | Pro ($9.99/mo) | Alpha ($29.99/mo) |
|---|---|---|---|
| AI Models | Gemini Flash, open-source | + Claude Sonnet, GPT-4o-mini | + Claude Opus, GPT-4o |
| Forge Levels | 1-10 | 1-30 | 1-40 |
| Prompt Library | 10 saved prompts | Unlimited | Unlimited |
| Agent Configs | View only | Build + save | Build + deploy |
| Workflow Builder | View only | Build + test | Build + deploy to production |
| App Deployment | N/A | N/A | Full deployment + marketplace listing |
| API Calls/day | 50 | 500 | Unlimited |
| Support | Community | Priority community | Direct support |
| Marketplace Selling | N/A | Guides + frameworks only | All product types |

### Progression Rewards

| Milestone | Reward |
|---|---|
| Complete Level 1 | "First Spark" badge (common) |
| Complete Act I (Level 10) | "Prompt Smith" badge (uncommon) + 100 Wolf Coins |
| Complete Act II (Level 20) | "Pack Builder" badge (rare) + 250 Wolf Coins |
| Complete Act III (Level 30) | "Workflow Hunter" badge (epic) + 500 Wolf Coins |
| Complete Act IV (Level 40) | "Forge Master" badge (legendary) + 1,000 Wolf Coins + "Alpha" profile frame |
| Complete all Boss Levels with Pack | "Pack Alpha" badge (legendary) |

---

## 7. Tech Stack & Build Phases

### Core Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | **Next.js 16** (App Router) | RSC, server actions, ISR, streaming |
| Database | **Supabase** (PostgreSQL + Realtime) | Existing project, auth built-in, Realtime for leaderboards |
| Auth | **Supabase Auth** | GitHub OAuth + email/password |
| Payments | **Stripe Connect** (Express) | Marketplace payouts, managed onboarding |
| Hosting | **Vercel** | Native Next.js, edge functions, OG image generation |
| File Storage | **Cloudflare R2** | PDF/file storage, zero egress fees |
| Email | **Buttondown** + **Resend** | Newsletter (existing) + transactional |
| Analytics | **PostHog** | Product analytics, feature flags, session replay |
| Search | **Supabase Full-Text Search** (pg_trgm) | No extra service, good enough for MVP |
| AI (Forge) | **Anthropic API** + **OpenAI API** + **Google AI** | Multi-provider for Forge tiers |

### Dev Tooling

| Tool | Purpose |
|---|---|
| TypeScript | Type safety everywhere |
| Tailwind CSS v4 | Dark theme native, wolf-themed design system |
| shadcn/ui | Component primitives |
| Zustand | Client state (cart, UI, Forge state) |
| Zod | Schema validation (forms, API, Forge configs) |
| next-safe-action | Type-safe server actions |
| Drizzle ORM | Type-safe DB queries |
| Vitest + Playwright | Unit + E2E testing |

### Build Phases

#### Phase 1 — Foundation MVP (Weeks 1-2)
**Goal:** Core platform live with products, auth, purchases, basic gamification.

| Day | Task | Priority |
|---|---|---|
| 1 | Next.js 16 setup + Tailwind + shadcn/ui + Supabase schema | P0 |
| 2 | Auth flow (GitHub + email), profile creation | P0 |
| 3-4 | Homepage + 3 pillar hub pages (Guides, Frameworks, Apps) | P0 |
| 4-5 | Product detail pages (ISR), product grid with filters | P0 |
| 5-6 | Gumroad link-out checkout (bridge), Gumroad webhook for XP | P0 |
| 6-7 | Blog migration (21 posts to /blog/[slug]) | P1 |
| 7-8 | Dashboard (purchases, profile, RPG stats) | P1 |
| 9 | XP system, Wolf rank display in navbar, streak tracking | P1 |
| 10 | Basic badge system (5 auto-award badges), deploy to Vercel | P0 |

**Deliverable:** Live platform at wolfpacksolution.com with all existing products, auth, XP, streaks, and badges.

#### Phase 2 — Commerce + Community (Weeks 3-5)
**Goal:** Native payments replace Gumroad, community features go live.

| Task | Priority |
|---|---|
| Stripe native checkout (replace Gumroad) | P0 |
| Cart + checkout flow with Wolf Coin discounts | P0 |
| Product reviews with star ratings | P1 |
| Community feed (posts, comments, upvotes) | P1 |
| Show the Pack (project showcases) | P1 |
| Wolf Coins earn + spend system | P1 |
| Leaderboard (weekly cohorts) | P2 |
| Referral system with tracking | P2 |
| Newsletter integration (Buttondown embed) | P2 |

**Deliverable:** Full e-commerce, active community, Wolf Coins economy.

#### Phase 3 — Marketplace (Weeks 6-10)
**Goal:** Third-party creators can sell on the platform.

| Task | Priority |
|---|---|
| Stripe Connect integration | P0 |
| Creator application + approval flow | P0 |
| Product submission + quality gate review queue | P0 |
| Creator dashboard (sales, analytics, payouts) | P0 |
| Admin panel (product review, user management, RPG config) | P1 |
| Seasonal events system | P1 |
| Full-text search across products + posts | P2 |
| Discord role sync (wolf rank → Discord role) | P2 |

**Deliverable:** Live marketplace with creator payouts, quality gates, admin tools.

#### Phase 4 — The Forge Beta (Weeks 11-14)
**Goal:** The Forge launches with Act I (Levels 1-10).

| Task | Priority |
|---|---|
| Forge UI: level select, challenge view, editor, validation | P0 |
| AI model integration (Gemini Flash for free tier) | P0 |
| Level 1-10 content creation (prompting challenges) | P0 |
| Prompt library (save/manage/export) | P0 |
| Forge XP integration with main RPG system | P1 |
| Boss Level mechanics (Level 10) | P1 |
| Pro tier: Claude Sonnet + GPT-4o-mini integration | P1 |
| Forge progress tracking and analytics | P2 |

**Deliverable:** The Forge Act I live with 10 playable levels, free tier + Pro tier.

#### Phase 5 — The Forge Full + Scale (Weeks 15-22)
**Goal:** Complete Forge experience, Alpha tier, marketplace deployment.

| Task | Priority |
|---|---|
| Forge Levels 11-20 (agent teams) | P0 |
| Forge Levels 21-30 (workflows, Howl-compatible output) | P0 |
| Forge Levels 31-40 (ship an app) | P0 |
| Alpha tier: Claude Opus + deployment infrastructure | P0 |
| Marketplace deployment from Forge (Level 40 → listed product) | P1 |
| Premium membership tier ($19/mo) | P1 |
| AI-powered product recommendations | P2 |
| Partner program tiers | P2 |
| Mobile-responsive PWA | P2 |

**Deliverable:** Complete Forge with all 40 levels, three subscription tiers, full ecosystem loop.

---

## 8. What Makes This Different

### The Competitive Landscape Is Fragmented

| Platform | What It Does | What It Doesn't Do |
|---|---|---|
| **Udemy/Coursera** | Teaches AI concepts | Doesn't help you build or sell |
| **Replit** | Lets you build | Doesn't teach or create marketplace for AI tools |
| **Gumroad** | Lets you sell digital products | No community, no gamification, no AI-specific tooling |
| **CrewAI/LangChain** | Provides AI agent frameworks | Developer-only, no education, no marketplace |
| **Product Hunt** | Launches products | One-time event, no ongoing ecosystem |
| **HuggingFace** | Shares ML models | Developer-only, no monetization layer |
| **OpenAI GPT Store** | Distributes GPTs | Creator earnings are negligible ($100-500/mo avg), opaque |

### WolfPack's Moat: The Forge Loop

No platform combines all four:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   LEARN (Guides + Forge)                                     │
│      ↓                                                       │
│   BUILD (Frameworks + Forge levels produce real output)      │
│      ↓                                                       │
│   SHIP (Apps + Forge Level 40 deploys to production)         │
│      ↓                                                       │
│   SELL (Marketplace — sell what you built in The Forge)      │
│      ↓                                                       │
│   EARN (Revenue → reinvest in more learning/building)        │
│      ↓                                                       │
│   LEVEL UP (XP, ranks, badges, community status)            │
│      ↓                                                       │
│   LEARN MORE (unlock higher Forge levels, better models)     │
│                                                              │
│   ← This loop doesn't exist anywhere else →                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Nine Differentiators

1. **The game IS the work.** Forge levels don't simulate building — they produce real, deployable, ownable infrastructure. No other gamified learning platform does this.

2. **Verified progress.** Unlike Habitica's honor system, every Forge level is machine-validated. Your prompt runs. Your agent config deploys. Your workflow executes. No self-reporting.

3. **You own your output.** Everything you build in The Forge belongs to you. Your prompts, agent configs, workflows, and apps. Export anytime. No lock-in on the content — only on the ecosystem value.

4. **The learning curve is a game.** Duolingo proved gamified learning scales to 50M+ DAU. But Duolingo's output is language skill (intangible). WolfPack's output is deployable software (tangible, sellable).

5. **Marketplace-as-graduation.** Level 40 of The Forge doesn't give you a certificate. It deploys your app to the marketplace where real users can buy it. The diploma is revenue.

6. **Zero-barrier entry with real money potential.** Free tier gets you 10 Forge levels and marketplace browsing. $9.99/mo gets you 30 levels. $29.99/mo gets you deployment + marketplace selling. The path from $0 to earning is clear and gamified.

7. **Wolf-pack accountability.** Habitica's boss fight mechanic (your inaction hurts your party) adapted for builders. Pack Quests during seasonal events create collaborative pressure without individual punishment.

8. **Revenue transparency culture.** IndieHackers proved that sharing revenue publicly drives 7x better conversion than launch platforms (23.1% vs 3.1%). WolfPack bakes this into the DNA.

9. **AI-native everything.** The platform AI recommends products during your workflow. The Forge uses AI to teach AI. Agent configs plug into Howl. This isn't AI-adjacent — it's AI-native from the foundation.

---

## 9. Key Metrics to Track

### North Star Metrics

| Metric | Definition | Target (Month 6) | Source |
|---|---|---|---|
| **Weekly Active Builders** | Users who complete at least 1 Forge level or marketplace action per week | 500 | Internal |
| **Creator-to-Revenue Time** | Days from first Forge level to first marketplace sale | <60 days | Internal |
| **Forge Completion Rate** | % of users who complete Level 10 (Act I) | >40% | Duolingo benchmark: ~35% course completion |

### Engagement Metrics

| Metric | Target | Benchmark Source |
|---|---|---|
| DAU/MAU ratio | >25% | Duolingo: 37% |
| 7-day streak retention | 3x baseline retention | Duolingo: 3.6x |
| Streak Freeze usage rate | 15-25% of active users | Duolingo: reduced churn 21% |
| Community post conversion | >20% engaged user action | IndieHackers: 23.1% |
| Comment-to-upvote ratio | 1:5 to 1:10 on featured content | Product Hunt: 54% Top 5 rate at this ratio |

### Revenue Metrics

| Metric | Target (Month 6) | Target (Month 12) |
|---|---|---|
| MRR | $5,000 | $15,000 |
| Forge subscribers (paid) | 200 | 500 |
| Marketplace GMV | $2,000/mo | $10,000/mo |
| Average marketplace take rate | 20% blended | 20% blended |
| Creator payout total | $1,600/mo | $8,000/mo |
| First-party product sales | $3,000/mo | $5,000/mo |

### Marketplace Health Metrics

| Metric | Target | Anti-Pattern to Avoid |
|---|---|---|
| Active creators (listed 1+ products) | 50 by month 6 | Bubble: Zeroqode dominates 60% — avoid single-player dominance |
| Creator earnings distribution | Top creator <20% of total | Power-law concentration kills motivation |
| Time to first sale (new creator) | <30 days | Gumroad benchmark |
| Product approval rate | 70-80% | Too low = friction, too high = quality erosion |
| Refund rate | <5% | Quality gate should prevent bad products |

### Forge-Specific Metrics

| Metric | Target | Notes |
|---|---|---|
| Level 1 completion rate | >80% | If <80%, onboarding is too complex |
| Level 10 (Act I) completion | >40% | Graduation from prompting to agents |
| Level 20 (Act II) completion | >25% | Strong builders |
| Level 30 (Act III) completion | >15% | Power users |
| Level 40 (Act IV) completion | >5% | Alpha creators |
| Forge → Marketplace conversion | >20% of Level 30+ completers | The flywheel metric |
| Free → Pro conversion | >8% | Standard freemium benchmark |
| Pro → Alpha conversion | >15% of Pro users | High-intent segment |

---

## 10. Decisions Needing Flame's Approval

### Critical Decisions (Block Phase 1)

| # | Decision | Recommendation | Alternatives | Impact |
|---|---|---|---|---|
| 1 | **Marketplace commission rates** | 0% first $500, then 15/25/30% tiered | Flat 20% (simpler), Gumroad mirror (10/30%) | Defines creator economics and platform revenue |
| 2 | **Forge subscription pricing** | Free / $9.99 / $29.99 | Free / $14.99 / $39.99 (higher margin), Free / $7.99 / $19.99 (lower barrier) | Core recurring revenue stream |
| 3 | **Forge free tier scope** | Levels 1-10 with Gemini Flash | Levels 1-5 (more restrictive), Levels 1-15 (more generous) | Conversion funnel vs. user acquisition |
| 4 | **Wolf Coin exchange rate** | 50 coins ≈ $1 discount | 100 coins ≈ $1 (more conservative), 25 coins ≈ $1 (more generous) | Economy sustainability |

### Important Decisions (Block Phase 2-3)

| # | Decision | Recommendation | Impact |
|---|---|---|---|
| 5 | **Max discount from Wolf Coins** | 10% per order | Prevents economy abuse while providing real value |
| 6 | **Creator approval model** | Manual review (not auto-approve) | Quality vs. speed — manual review is slower but prevents marketplace pollution |
| 7 | **Gumroad migration timing** | Phase 1 = bridge, Phase 2 = native Stripe | Risk: existing customers need seamless transition |
| 8 | **Merchant of Record status** | WolfPack handles tax compliance | Legal/financial complexity but massive creator value |
| 9 | **Premium membership pricing** | $19/mo or $149/yr (Phase 2) | Separate from Forge — advanced analytics, priority support |

### Strategic Decisions (Inform Roadmap)

| # | Decision | Question | Notes |
|---|---|---|---|
| 10 | **Forge content creation** | Who builds the 40 levels of Forge content? In-house vs. community vs. hybrid? | Level quality is make-or-break for The Forge |
| 11 | **Howl compatibility requirement** | Should all marketplace workflows require Howl compatibility? | Creates lock-in but may limit initial creator supply |
| 12 | **Partner program tiers** | When to formalize: Contributor → Creator → Partner → Agency? | Shopify model, but premature if marketplace is small |
| 13 | **Enterprise tier** | When to pursue B2B/enterprise deals? | GPT Store data: real money is in enterprise ($5K-20K), not per-transaction |
| 14 | **Open-source components** | Should Howl or any WolfPack framework be open-sourced? | CrewAI/LangChain model: open-source drives adoption → paid cloud |

---

## Appendix A: Database Extensions for The Forge

```sql
-- Forge levels definition
CREATE TABLE forge_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level_number INTEGER UNIQUE NOT NULL,
  act INTEGER NOT NULL CHECK (act BETWEEN 1 AND 4),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_prompt TEXT NOT NULL,       -- What the user must build
  validation_criteria JSONB NOT NULL,   -- Machine-checkable criteria
  hint_1 TEXT,                          -- First hint (25 coins)
  hint_2 TEXT,                          -- Second hint (50 coins)
  reference_solution TEXT,              -- Reference solution (75 coins, after 3 fails)
  xp_reward INTEGER NOT NULL,
  coin_reward INTEGER DEFAULT 0,
  is_boss_level BOOLEAN DEFAULT FALSE,
  required_tier TEXT DEFAULT 'free' CHECK (required_tier IN ('free', 'pro', 'alpha')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User forge progress
CREATE TABLE forge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  level_id UUID NOT NULL REFERENCES forge_levels(id),

  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
  attempts INTEGER DEFAULT 0,
  hints_used INTEGER DEFAULT 0,

  -- User's submitted work
  submission JSONB,                     -- The actual output (prompt, config, YAML, etc.)
  validation_result JSONB,              -- Pass/fail details

  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  UNIQUE(user_id, level_id)
);

CREATE INDEX idx_forge_progress_user ON forge_progress(user_id);

-- User's prompt library (Forge output)
CREATE TABLE prompt_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  forge_level_id UUID REFERENCES forge_levels(id),  -- NULL if manually created

  title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  system_prompt TEXT,
  variables JSONB DEFAULT '[]',         -- Template variables
  tags TEXT[] DEFAULT '{}',

  is_public BOOLEAN DEFAULT FALSE,      -- Share with community

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User's agent configs (Forge output)
CREATE TABLE agent_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  forge_level_id UUID REFERENCES forge_levels(id),

  name TEXT NOT NULL,
  config_yaml TEXT NOT NULL,            -- The agent configuration
  config_schema_version TEXT DEFAULT '1.0',

  is_public BOOLEAN DEFAULT FALSE,
  is_listed BOOLEAN DEFAULT FALSE,      -- Listed on marketplace
  product_id UUID REFERENCES products(id),  -- Link to marketplace listing

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User's workflow configs (Forge output)
CREATE TABLE workflow_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  forge_level_id UUID REFERENCES forge_levels(id),

  name TEXT NOT NULL,
  workflow_yaml TEXT NOT NULL,          -- Howl-compatible YAML
  howl_compatible BOOLEAN DEFAULT FALSE,

  is_public BOOLEAN DEFAULT FALSE,
  is_listed BOOLEAN DEFAULT FALSE,
  product_id UUID REFERENCES products(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forge subscription tracking
CREATE TABLE forge_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  tier TEXT NOT NULL CHECK (tier IN ('free', 'pro', 'alpha')),
  stripe_subscription_id TEXT,

  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),

  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);
```

### Forge API Routes

```
app/api/forge/
├── levels/route.ts                    -- GET: list all levels with user progress
├── levels/[number]/route.ts           -- GET: level detail + challenge
├── levels/[number]/submit/route.ts    -- POST: submit level attempt
├── levels/[number]/hint/route.ts      -- POST: purchase hint (Wolf Coins)
├── levels/[number]/validate/route.ts  -- POST: validate submission
├── library/
│   ├── prompts/route.ts               -- GET/POST: user's prompt library
│   ├── agents/route.ts                -- GET/POST: user's agent configs
│   └── workflows/route.ts             -- GET/POST: user's workflow configs
├── subscription/route.ts              -- GET: current tier, POST: upgrade
└── ai/
    ├── chat/route.ts                  -- POST: AI interaction for Forge challenges
    └── validate/route.ts              -- POST: AI-powered output validation
```

---

## Appendix B: The WolfPack Flywheel (Complete)

```
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │   New user discovers WolfPack (SEO, referral, social)   │
    │                        ↓                                │
    │   Signs up (free) → Pup rank → 0 XP                    │
    │                        ↓                                │
    │   Enters The Forge → Levels 1-10 (free)                 │
    │   Every level produces REAL output they own             │
    │                        ↓                                │
    │   Earns XP → Levels up → Unlocks features              │
    │   Earns Wolf Coins → Spends on discounts/cosmetics     │
    │   Earns Badges → Social proof on profile                │
    │                        ↓                                │
    │   Streaks keep them coming back daily (Duolingo: +60%)  │
    │   Leaderboards create healthy competition               │
    │   Pack Quests create collaborative accountability       │
    │                        ↓                                │
    │   Hits Level 10 → Prompt Pack ready                     │
    │   Upgrades to Pro ($9.99) to keep building              │
    │                        ↓                                │
    │   Levels 11-30 → Builds agent teams + workflows         │
    │   All Howl-compatible, all production-ready              │
    │                        ↓                                │
    │   Upgrades to Alpha ($29.99) to deploy + sell           │
    │                        ↓                                │
    │   Level 40 → App deploys to marketplace                 │
    │   First sale → 200 XP + Wolf Coins + revenue            │
    │                        ↓                                │
    │   Shares success publicly (IndieHackers: 7x conversion) │
    │   Revenue transparency inspires new users               │
    │                        ↓                                │
    │   New users discover WolfPack...                        │
    │                                                         │
    │   ← THE LOOP COMPOUNDS →                                │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
```

---

*This is the master document. Every subsequent spec, ticket, and sprint references this.*

*The Pack runs together. — Wolf*
