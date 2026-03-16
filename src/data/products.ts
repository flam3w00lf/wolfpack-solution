export type ProductCategory = "guide" | "framework" | "app";

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
      "Complete guide to yield farming strategies, risk frameworks, and protocol analysis. Includes spreadsheets and templates.",
    longDescription:
      "The definitive guide to navigating DeFi yield farming. This toolkit covers everything from basic liquidity provision to advanced multi-protocol strategies. Includes risk assessment frameworks, yield calculation spreadsheets, protocol comparison matrices, and step-by-step tutorials for major platforms. Built for both beginners looking to understand DeFi and experienced farmers optimizing returns.",
    price: 9,
    priceLabel: "$9",
    category: "guide",
    rating: 4.6,
    reviewCount: 89,
    features: [
      "Comprehensive yield farming strategies",
      "Risk assessment framework",
      "Protocol comparison matrix",
      "Yield calculation spreadsheets",
      "Step-by-step platform tutorials",
      "Regular updates with new protocols",
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
      "Everything you need to start building with AI. Prompt templates, project scaffolds, workflow configs, and a step-by-step launch guide.",
    longDescription:
      "Stop watching tutorials and start shipping. The Vibe Coder Starter Kit is a complete launch package for AI-assisted development. Includes battle-tested prompt templates for Claude, GPT-4, and Gemini, pre-configured project scaffolds for Next.js and Python, workflow automation configs, and a step-by-step guide to going from idea to deployed product in a weekend. This is the kit we wish existed when we started.",
    price: 14,
    priceLabel: "$14",
    category: "guide",
    rating: 4.9,
    reviewCount: 156,
    features: [
      "50+ battle-tested prompt templates",
      "Next.js & Python project scaffolds",
      "CI/CD pipeline configs",
      "AI workflow automation templates",
      "Weekend launch guide",
      "Private community access",
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
      "200+ engineering-grade prompts for code generation, debugging, refactoring, and architecture. Works with any AI model.",
    longDescription:
      "A curated library of 200+ prompts specifically designed for software engineering workflows. Each prompt has been tested across Claude, GPT-4, and Gemini to ensure consistent, high-quality output. Categories include code generation, debugging, refactoring, architecture design, code review, documentation, and testing. Includes a prompt composition framework for building complex, multi-step workflows.",
    price: 0,
    priceLabel: "FREE",
    category: "guide",
    rating: 0,
    reviewCount: 0,
    features: [
      "200+ engineering-grade prompts",
      "Works with Claude, GPT-4, Gemini",
      "Code generation & debugging",
      "Architecture & design patterns",
      "Prompt composition framework",
      "Regular updates with new prompts",
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
