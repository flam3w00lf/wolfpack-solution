# WolfPack Solution — Phase 1 Build Sprint

## Read BUILD-SPEC.md first for full context.

## PHASE 1 SCOPE: Ecosystem Landing + Product Catalog + Community Signup

Build a production-ready marketing site + product platform for wolfpacksolution.com.

### Pages to Build

1. **Homepage** (`/`)
   - Hero: "AI tools for entrepreneurs who build" — bold, dark theme, orange accents (#f97316)
   - Four pillars section: Guides, Frameworks, Apps, The Forge (coming soon)
   - Featured products carousel/grid (pull from products data)
   - Community stats section (members, products, scans — can be placeholder numbers for now)
   - Newsletter signup (Buttondown integration)
   - Testimonials/social proof section

2. **Products** (`/products`)
   - Grid of all products with filters (Guides, Frameworks, Apps)
   - Each card: image/icon, title, description, price, rating, "View" button
   - Search bar

3. **Product Detail** (`/products/[slug]`)
   - Product info, screenshots, features list
   - Price + Buy button (links to Gumroad for now)
   - Reviews section (placeholder)
   - "More like this" related products

4. **The Forge** (`/forge`)
   - Coming soon page with waitlist signup
   - Animated preview showing the level progression concept
   - "Learn prompting → Build agents → Ship apps" visual journey
   - Email capture for early access

5. **Community** (`/community`)
   - Coming soon page with Discord invite link
   - Preview of what the community will look like
   - "Join the Pack" CTA

6. **Blog** (`/blog`)
   - List of blog posts (load from markdown files or hardcoded data)
   - Individual post pages (`/blog/[slug]`)

7. **About** (`/about`)
   - The WolfPack story, team (the AI agents!), mission
   - "Built by AI, for humans" messaging

8. **Pricing** (`/pricing`)
   - Free tier vs paid products comparison
   - The Forge pricing tiers (Free / $9.99 / $29.99)
   - One-time products listed

### Design System
- Dark background (#0a0a0f)
- Orange primary (#f97316)
- Wolf theme throughout — pack terminology, wolf icons
- Clean, modern, anti-corporate
- Framer Motion animations (subtle, not overdone)
- Mobile responsive
- shadcn/ui components

### Data Layer
- Products defined in a `src/data/products.ts` file (hardcoded for Phase 1)
- Blog posts from markdown files in `src/content/blog/`
- No database needed in Phase 1 — just static data + Buttondown API for emails

### Products to Include
- VibeSniffer ($4.99) — links to vibesniffer.com
- DeFi Yield Farming Toolkit ($27) — links to Gumroad
- Vibe Coder Starter Kit ($47) — links to Gumroad
- AI Code Prompt Pack ($9.99) — links to Gumroad (coming soon)
- Howl Workflow Engine (Open Source, Free) — links to GitHub
- Mission Control Dashboard (Coming Soon)

### Technical
- Next.js 16 App Router
- Tailwind CSS + shadcn/ui
- Framer Motion for animations
- No database (Phase 1 is static)
- Deploy to Vercel on wolfpacksolution.com

### Definition of Done
- All 8 pages render correctly
- Mobile responsive
- npm run build passes
- Committed and pushed to GitHub
- Ready for Vercel deployment
