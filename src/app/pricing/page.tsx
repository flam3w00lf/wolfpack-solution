"use client";

import Link from "next/link";
import {
  Check,
  Flame,
  ArrowRight,
  Star,
  Package,
  Zap,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, GlowOrb } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";

const forgeTiers = [
  {
    name: "Pup",
    emoji: "🐾",
    price: "Free",
    period: "",
    description: "Start building. Zero risk.",
    features: [
      "Levels 1-10 access",
      "Gemini Flash & open-source models",
      "Sandbox mode",
      "Community access",
      "Basic prompt library",
    ],
    cta: "Start Free",
    highlighted: false,
    border: "border-white/5",
  },
  {
    name: "Hunter",
    emoji: "🎯",
    price: "$9.99",
    period: "/month",
    description: "For wolves who are serious about shipping.",
    features: [
      "Levels 1-30 access",
      "Claude Sonnet + GPT-4o-mini",
      "Full prompt library",
      "Workflow builder",
      "Priority support",
      "Export to marketplace",
    ],
    cta: "Coming Soon",
    highlighted: true,
    border: "border-wolf-orange/30",
  },
  {
    name: "Alpha",
    emoji: "🐺",
    price: "$29.99",
    period: "/month",
    description: "Full power. No limits. Ship everything.",
    features: [
      "All 40 levels",
      "Claude Opus + GPT-4o",
      "Enterprise-grade models",
      "Marketplace deployment",
      "Priority support",
      "Custom agent configs",
      "Alpha-only community",
    ],
    cta: "Coming Soon",
    highlighted: false,
    border: "border-white/5",
  },
];

const availableProducts = products.filter((p) => !p.comingSoon && p.price);

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 px-4">
        <GlowOrb className="w-[400px] h-[400px] bg-wolf-orange top-0 left-1/3" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-6 border-wolf-orange/30 bg-wolf-orange/5 text-wolf-orange"
            >
              Pricing
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Simple pricing.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wolf-orange to-amber-400">
                No surprises.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              One-time products you own forever. Forge subscriptions that unlock
              as you level up. No hidden fees, no upsell traps.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Forge Tiers */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex items-center gap-2 mb-8">
              <Flame className="text-wolf-orange" size={24} />
              <h2 className="text-2xl font-bold text-white">
                The Forge
              </h2>
              <Badge className="bg-wolf-orange/20 text-wolf-orange border-wolf-orange/30 text-xs ml-2">
                Coming Soon
              </Badge>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {forgeTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <div
                  className={`relative rounded-2xl border ${tier.border} ${
                    tier.highlighted
                      ? "bg-gradient-to-b from-wolf-orange/5 to-wolf-card"
                      : "bg-wolf-card"
                  } p-6 sm:p-8 h-full flex flex-col`}
                >
                  {tier.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-wolf-orange text-white border-0 px-4">
                      Most Popular
                    </Badge>
                  )}

                  <div className="mb-6">
                    <span className="text-3xl block mb-3">{tier.emoji}</span>
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <p className="text-sm text-zinc-500 mt-1">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-zinc-500">{tier.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          size={16}
                          className="text-wolf-orange shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    disabled
                    className={`w-full h-11 ${
                      tier.highlighted
                        ? "bg-wolf-orange text-white opacity-60"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Separator className="bg-white/5 mx-auto max-w-6xl" />

      {/* One-Time Products */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex items-center gap-2 mb-8">
              <Package className="text-wolf-orange" size={24} />
              <h2 className="text-2xl font-bold text-white">
                One-time products
              </h2>
            </div>
            <p className="text-zinc-400 mb-10 max-w-xl">
              Buy once, own forever. No subscriptions needed for these. They&apos;re
              yours.
            </p>
          </FadeIn>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableProducts.map((product) => (
              <StaggerItem key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="rounded-xl border border-white/5 bg-wolf-card p-5 transition-all hover:border-wolf-orange/20 hover:bg-wolf-card-hover flex items-center gap-4">
                    <div
                      className={`shrink-0 inline-flex rounded-lg bg-gradient-to-br ${product.gradient} p-2.5`}
                    >
                      <Package className="text-white" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-wolf-orange transition-colors truncate">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-wolf-orange font-bold text-sm">
                          {product.priceLabel}
                        </span>
                        {product.rating > 0 && (
                          <span className="flex items-center gap-0.5 text-xs text-zinc-500">
                            <Star
                              size={10}
                              className="fill-amber-400 text-amber-400"
                            />
                            {product.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-zinc-600 group-hover:text-wolf-orange transition-colors shrink-0"
                    />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Free tier */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-wolf-card/30 to-transparent">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <Zap className="mx-auto mb-4 text-wolf-orange" size={36} />
            <h2 className="text-3xl font-bold text-white mb-4">
              Always free to start
            </h2>
            <p className="text-zinc-400 mb-8 text-lg max-w-xl mx-auto">
              Browse the blog. Read the free guides. Check out VibeSniffer. Try the
              Forge Pup tier. You don&apos;t pay until you&apos;re ready.
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center rounded-xl bg-wolf-orange px-8 text-base font-semibold text-white transition-all hover:bg-wolf-orange-dark hover:shadow-xl hover:shadow-orange-500/20"
            >
              Explore Products
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
