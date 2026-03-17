export type ProductCategory = "guide" | "framework" | "app";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  price: number | null;
  priceLabel: string;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  features: string[];
  whoIsItFor: string[];
  faq: FaqItem[];
  icon: string;
  comingSoon: boolean;
  emailCapture: boolean;
  link: string;
  buyRoute: "stripe" | "external" | "none";
  gradient: string;
}

export const products: Product[] = [
  {
    slug: "vibesniffer",
    title: "VibeSniffer",
    description:
      "AI-powered vibe analysis tool. Scan any website, repo, or brand and get an instant vibe report with actionable insights.",
    longDescription:
      "VibeSniffer is a first-of-its-kind AI analysis tool that scans websites, GitHub repos, and brand presences to generate comprehensive vibe reports. Get instant insights into design quality, messaging clarity, technical health, and overall brand coherence. Perfect for founders doing competitive research, designers evaluating their work, or anyone who wants to understand the 'vibe' of a digital presence.",
    price: 4.99,
    priceLabel: "$4.99",
    category: "app",
    rating: 4.8,
    reviewCount: 42,
    features: [
      "Instant website vibe analysis",
      "GitHub repo health scoring",
      "Brand coherence reports",
      "Competitive comparison mode",
      "Export reports as PDF",
      "API access for automation",
    ],
    whoIsItFor: [],
    faq: [],
    icon: "Scan",
    comingSoon: false,
    emailCapture: false,
    link: "https://vibesniffer.com/pricing",
    buyRoute: "external",
    gradient: "from-orange-500 to-red-600",
  },
  {
    slug: "defi-yield-farming-toolkit",
    title: "DeFi Yield Farming Toolkit",
    description:
      "Step-by-step yield farming guide with risk frameworks, protocol comparisons, and real strategies. No jargon, no hype.",
    longDescription:
      "Most DeFi guides are either too basic or assume you already know everything. This one meets you where you are. The DeFi Yield Farming Toolkit walks you through real yield farming strategies — from single-sided staking to multi-protocol loops — with honest risk assessments for each one. You get protocol comparison matrices so you can evaluate opportunities yourself, yield calculators that account for gas and impermanent loss, and a risk framework that tells you exactly what can go wrong before you commit capital. Written by builders who farm their own strategies.",
    price: 27,
    priceLabel: "$27",
    category: "guide",
    rating: 4.6,
    reviewCount: 89,
    features: [
      "12 yield farming strategies ranked by risk and return — no theoretical fluff, only setups we actually use",
      "Risk assessment framework that scores every strategy on 5 dimensions so you never get blindsided",
      "Protocol comparison matrix covering Aave, Compound, Curve, Convex, Pendle, and 8 more",
      "Yield calculator spreadsheet that factors in gas costs, IL, and real APY vs advertised APY",
      "Step-by-step walkthroughs with screenshots for each major platform",
      "Free updates when new protocols or strategies are added",
    ],
    whoIsItFor: [
      "Crypto holders tired of letting assets sit idle in a wallet",
      "DeFi-curious developers who want to understand the protocols they're building on",
      "Yield farmers who want a structured framework instead of chasing APY tweets",
      "Anyone who's been burned by impermanent loss and wants to avoid it next time",
    ],
    faq: [
      {
        question: "Do I need to already understand DeFi?",
        answer:
          "No. The guide starts with fundamentals and builds up. If you can use MetaMask, you can follow along.",
      },
      {
        question: "How current are the strategies?",
        answer:
          "The toolkit is updated regularly as protocols evolve. Your purchase includes all future updates at no extra cost.",
      },
      {
        question: "Is this financial advice?",
        answer:
          "No. This is an educational toolkit with frameworks and analysis. All strategies include explicit risk disclosures. You make your own decisions.",
      },
    ],
    icon: "TrendingUp",
    comingSoon: false,
    emailCapture: false,
    link: "/products/defi-yield-farming-toolkit",
    buyRoute: "stripe",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    slug: "vibe-coder-starter-kit",
    title: "Vibe Coder Starter Kit",
    description:
      "Everything you need to ship real apps with AI. Security checklist, 50 prompt templates, deployment playbook. From idea to production.",
    longDescription:
      "You don't need another tutorial. You need a system. The Vibe Coder Starter Kit is the complete playbook for building and shipping real applications with AI coding assistants. It includes 50+ battle-tested prompt templates that actually produce working code, a security checklist so you don't ship vulnerabilities, pre-configured project scaffolds for Next.js and Python, and a weekend launch guide that takes you from blank repo to deployed product. This is the kit we built for ourselves — then realized everyone else needed it too.",
    price: 47,
    priceLabel: "$47",
    category: "guide",
    rating: 4.9,
    reviewCount: 156,
    features: [
      "50+ prompt templates for Claude, GPT-4, and Gemini — tested to produce working code, not hallucinated garbage",
      "Security checklist covering auth, input validation, API keys, and the 10 mistakes AI-generated code makes most often",
      "Next.js and Python project scaffolds with CI/CD already configured — clone and start building",
      "Weekend launch guide: a step-by-step plan to go from idea to deployed product in 48 hours",
      "AI workflow automation templates for code review, testing, and deployment",
      "Access to private community of builders shipping with AI",
    ],
    whoIsItFor: [
      "Developers who want to 10x their output with AI but don't know where to start",
      "Solo founders building MVPs who can't afford to waste time on bad prompts",
      "Engineers moving from traditional development to AI-assisted workflows",
      "Anyone who's tried vibe coding and got frustrated by inconsistent results",
    ],
    faq: [
      {
        question: "Which AI tools does this work with?",
        answer:
          "The templates are tested with Claude, GPT-4, Gemini, Cursor, and GitHub Copilot. The prompt engineering principles apply to any model.",
      },
      {
        question: "I'm a senior dev. Is this too basic?",
        answer:
          "The prompt templates and security checklist are useful at any level. The scaffolds and launch guide are especially valuable if you're new to shipping solo or working with AI assistants.",
      },
      {
        question: "What format is the kit?",
        answer:
          "PDF guide + downloadable template files. Everything is organized by topic so you can jump to what you need.",
      },
    ],
    icon: "Code",
    comingSoon: false,
    emailCapture: false,
    link: "/products/vibe-coder-starter-kit",
    buyRoute: "stripe",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    slug: "ai-code-prompt-pack",
    title: "AI Code Prompt Pack",
    description:
      "200 battle-tested AI coding prompts. Copy-paste into Cursor, Copilot, or Claude. Covers debugging, security, architecture, deployment. Free, no catch.",
    longDescription:
      "Stop writing vague prompts and wondering why the AI gives you broken code. The AI Code Prompt Pack is a library of 200 prompts engineered specifically for software development — each one tested across Claude, GPT-4, and Gemini to produce consistent, working output. Copy-paste them into Cursor, Copilot, or any AI tool. Categories cover everything from debugging and refactoring to architecture design, security audits, and deployment. Includes a prompt composition framework for chaining prompts into complex, multi-step workflows. It's free because we want every developer using AI to have a better starting point.",
    price: 9.99,
    priceLabel: "$9.99",
    category: "guide",
    rating: 0,
    reviewCount: 0,
    features: [
      "200 prompts organized by category: debugging, refactoring, architecture, security, testing, deployment",
      "Every prompt tested across Claude, GPT-4, and Gemini — so you know it works before you paste it",
      "Copy-paste ready for Cursor, GitHub Copilot, Claude, ChatGPT, and any AI coding tool",
      "Prompt composition framework for building multi-step workflows that handle complex tasks",
      "Architecture and design pattern prompts that produce production-quality code, not toy examples",
      "Free updates as we add new prompts — no catch, no upsell wall",
    ],
    whoIsItFor: [
      "Developers getting started with AI coding tools who want better results immediately",
      "Engineers who are tired of re-writing the same prompt patterns from scratch",
      "Teams standardizing their AI-assisted development workflow",
      "Anyone who wants to see what good AI prompts actually look like",
    ],
    faq: [
      {
        question: "Why is this free?",
        answer:
          "Because better prompts make better developers, and better developers build cooler things. Also, if you like this, you'll probably love the Vibe Coder Starter Kit.",
      },
      {
        question: "What format are the prompts in?",
        answer:
          "PDF with a table of contents. Each prompt includes the template, an explanation of why it works, and an example output.",
      },
      {
        question: "Do I need to know prompt engineering?",
        answer:
          "No. The prompts are ready to use as-is. But each one includes notes on why it's structured the way it is, so you'll learn the principles as you go.",
      },
    ],
    icon: "MessageSquareCode",
    comingSoon: false,
    emailCapture: false,
    link: "/products/ai-code-prompt-pack",
    buyRoute: "stripe",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    slug: "howl-workflow-engine",
    title: "Howl Workflow Engine",
    description:
      "Open-source AI agent orchestration framework. Define workflows in YAML, run them anywhere. The backbone of WolfPack automation.",
    longDescription:
      "Howl is WolfPack's open-source workflow orchestration engine for AI agents. Define complex multi-agent workflows in simple YAML, chain AI models together, handle branching logic, and deploy anywhere. Built for developers who want production-grade agent orchestration without vendor lock-in. Powers the automation behind VibeSniffer and the WolfPack platform itself.",
    price: null,
    priceLabel: "Free & Open Source",
    category: "framework",
    rating: 4.7,
    reviewCount: 23,
    features: [
      "YAML-based workflow definitions",
      "Multi-agent orchestration",
      "Model-agnostic (any LLM provider)",
      "Built-in error handling & retries",
      "CLI + programmatic API",
      "Extensive plugin system",
    ],
    whoIsItFor: [],
    faq: [],
    icon: "Workflow",
    comingSoon: false,
    emailCapture: false,
    link: "https://github.com/flam3w00lf/howl",
    buyRoute: "external",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    slug: "mission-control-dashboard",
    title: "Mission Control Dashboard",
    description:
      "Real-time monitoring dashboard for your AI agents, workflows, and business metrics. See everything in one place.",
    longDescription:
      "Mission Control is a unified monitoring dashboard for AI entrepreneurs. Track your agent performance, workflow execution, revenue metrics, and user analytics all in one beautiful interface. Integrates with Howl workflows, Stripe, Google Analytics, and major AI providers. Get alerts when things break, celebrate when things ship.",
    price: null,
    priceLabel: "Coming Soon",
    category: "app",
    rating: 0,
    reviewCount: 0,
    features: [
      "Real-time agent monitoring",
      "Workflow execution tracking",
      "Revenue & analytics dashboard",
      "Multi-provider AI usage stats",
      "Custom alert configurations",
      "Team collaboration features",
    ],
    whoIsItFor: [],
    faq: [],
    icon: "LayoutDashboard",
    comingSoon: true,
    emailCapture: false,
    link: "#",
    buyRoute: "none",
    gradient: "from-pink-500 to-rose-600",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) return -1;
      if (b.category === product.category && a.category !== product.category) return 1;
      return 0;
    })
    .slice(0, limit);
}
