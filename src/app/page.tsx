"use client";

import Link from "next/link";
import {
  BookOpen,
  Cpu,
  Layers,
  Flame,
  Star,
  Users,
  Package,
  Scan,
  ArrowRight,
  Zap,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, GlowOrb } from "@/components/motion";
import { NewsletterForm } from "@/components/newsletter-form";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";

const pillars = [
  {
    icon: BookOpen,
    title: "Guides",
    description:
      "From prompt engineering to full AI pipelines. Real knowledge, not regurgitated GPT slop.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Layers,
    title: "Frameworks",
    description:
      "Plug-and-play agent configs, workflow templates, and project scaffolds. Skip the boilerplate.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Cpu,
    title: "Apps",
    description:
      "Tools like VibeSniffer that actually do things. Built by the pack, for the pack.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Flame,
    title: "The Forge",
    description:
      "A gamified building game where every level produces real, deployable infrastructure. Coming soon.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    comingSoon: true,
  },
];

const stats = [
  { label: "Pack Members", value: "2,847", icon: Users },
  { label: "Products Shipped", value: "6", icon: Package },
  { label: "Vibe Scans", value: "12,400+", icon: Scan },
  { label: "Lines Shipped", value: "50k+", icon: Zap },
];

const testimonials = [
  {
    quote:
      "VibeSniffer gave me more actionable feedback in 30 seconds than my design review meetings give me in an hour.",
    author: "Sarah K.",
    role: "Indie Founder",
    rating: 5,
  },
  {
    quote:
      "The Vibe Coder Kit saved me an entire weekend of setup. I went from idea to deployed MVP in 48 hours.",
    author: "Marcus T.",
    role: "AI Developer",
    rating: 5,
  },
  {
    quote:
      "Finally, AI tools that aren't trying to sell me a $997 course. WolfPack just gives you the tools and gets out of the way.",
    author: "Priya M.",
    role: "Solo Developer",
    rating: 5,
  },
];

export default function Home() {
  const featuredProducts = products.filter((p) => !p.comingSoon).slice(0, 4);
  const topPaidProducts = products.filter((p) => p.price && !p.comingSoon).slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <GlowOrb className="w-[600px] h-[600px] bg-wolf-orange top-0 left-1/4" />
        <GlowOrb className="w-[400px] h-[400px] bg-violet-600 bottom-20 right-1/4" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <FadeIn delay={0.1}>
            <Badge
              variant="outline"
              className="mb-6 border-wolf-orange/30 bg-wolf-orange/5 text-wolf-orange px-4 py-1.5 text-sm"
            >
              🐺 The AI Entrepreneur Ecosystem
            </Badge>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              AI tools for
              <br />
              entrepreneurs who{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wolf-orange to-amber-400">
                build
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed">
              Stop watching tutorials. Start shipping products. WolfPack gives you the
              guides, frameworks, and tools to go from idea to revenue — no hand-holding,
              no buzzwords.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex h-12 items-center rounded-xl bg-wolf-orange px-8 text-base font-semibold text-white transition-all hover:bg-wolf-orange-dark hover:shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02]"
              >
                Explore Products
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                href="/forge"
                className="inline-flex h-12 items-center rounded-xl border border-white/10 bg-white/5 px-8 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20"
              >
                Enter The Forge
                <Flame size={18} className="ml-2 text-wolf-orange" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-wolf-bg to-transparent" />
      </section>

      {/* Featured Products Banner */}
      <section className="relative py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="rounded-2xl border border-wolf-orange/20 bg-gradient-to-r from-wolf-orange/10 via-wolf-card to-wolf-orange/10 p-8">
              <div className="text-center mb-6">
                <Badge className="bg-wolf-orange/20 text-wolf-orange border-wolf-orange/30 mb-3">
                  Featured Products
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Ready to ship? Grab the tools.
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {topPaidProducts.map((product) => (
                  <a
                    key={product.slug}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="rounded-xl border border-white/10 bg-wolf-bg/50 p-5 transition-all hover:border-wolf-orange/30 hover:bg-wolf-card">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`inline-flex rounded-lg bg-gradient-to-br ${product.gradient} p-2`}
                        >
                          <Package className="text-white" size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white group-hover:text-wolf-orange transition-colors">
                            {product.title}
                          </h3>
                          <span className="text-xs text-wolf-orange font-semibold">
                            {product.priceLabel}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-wolf-orange hover:bg-wolf-orange-dark text-white text-xs font-bold px-4 py-2 w-full justify-center transition-all group-hover:shadow-lg group-hover:shadow-orange-500/25">
                        BUY NOW
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="relative py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Four pillars. One ecosystem.
              </h2>
              <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
                Everything connects. Guides teach you the concepts. Frameworks give you the
                tools. Apps let you ship. The Forge makes it a game.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div
                  className={`group relative rounded-2xl border ${pillar.border} ${pillar.bg} p-6 h-full transition-all hover:scale-[1.02] hover:shadow-lg`}
                >
                  {pillar.comingSoon && (
                    <Badge className="absolute top-4 right-4 bg-wolf-orange/20 text-wolf-orange border-wolf-orange/30 text-xs">
                      Soon
                    </Badge>
                  )}
                  <div
                    className={`inline-flex rounded-xl ${pillar.bg} p-3 mb-4`}
                  >
                    <pillar.icon className={`${pillar.color}`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-wolf-card/50 to-transparent">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  From the pack
                </h2>
                <p className="mt-2 text-zinc-400">
                  Tools and guides built by wolves, for wolves.
                </p>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center text-sm text-wolf-orange hover:text-wolf-orange-light transition-colors"
              >
                View all
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.slug}>
                <Link href={`/products/${product.slug}`} className="group block h-full">
                  <div className="relative rounded-2xl border border-white/5 bg-wolf-card p-6 h-full transition-all hover:border-wolf-orange/20 hover:bg-wolf-card-hover hover:shadow-xl hover:shadow-orange-500/5">
                    <div
                      className={`inline-flex rounded-xl bg-gradient-to-br ${product.gradient} p-3 mb-4`}
                    >
                      <Package className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-wolf-orange transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-wolf-orange font-semibold">
                        {product.priceLabel}
                      </span>
                      {product.rating > 0 && (
                        <span className="flex items-center gap-1 text-sm text-zinc-500">
                          <Star
                            size={14}
                            className="fill-amber-400 text-amber-400"
                          />
                          {product.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-wolf-orange hover:text-wolf-orange-light transition-colors"
            >
              View all products
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <StaggerContainer className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <stat.icon
                    className="mx-auto mb-3 text-wolf-orange"
                    size={28}
                  />
                  <div className="text-3xl sm:text-4xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-wolf-card/30 to-transparent">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
              The pack speaks
            </h2>
            <p className="text-center text-zinc-400 mb-12">
              Real feedback from real builders.
            </p>
          </FadeIn>

          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="rounded-2xl border border-white/5 bg-wolf-card p-6 h-full">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {t.author}
                    </div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-4xl mb-4 block">🐺</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join the pack
            </h2>
            <p className="text-zinc-400 mb-8 text-lg">
              Weekly drops: new tools, AI building tips, and pack-only deals.
              No spam. Unsubscribe anytime.
            </p>
            <NewsletterForm className="max-w-md mx-auto" />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
