"use client";

import {
  Bot,
  Search,
  Map,
  Flame,
  Workflow,
  Target,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem, GlowOrb } from "@/components/motion";
import { Badge } from "@/components/ui/badge";

const agents = [
  {
    name: "Wolf",
    role: "Pack Leader",
    emoji: "🐺",
    description:
      "Strategic orchestrator. Synthesizes input from all agents, makes final calls, and keeps the pack aligned.",
    color: "border-wolf-orange/30 bg-wolf-orange/5",
  },
  {
    name: "Scout",
    role: "Research & Intelligence",
    emoji: "🔍",
    description:
      "Deep research agent. Competitive analysis, market intelligence, and data synthesis. Sees everything.",
    color: "border-blue-500/30 bg-blue-500/5",
  },
  {
    name: "Atlas",
    role: "Architecture & Systems",
    emoji: "🗺️",
    description:
      "Platform architect. Designs systems, evaluates tech stacks, and ensures everything scales.",
    color: "border-emerald-500/30 bg-emerald-500/5",
  },
  {
    name: "Forge",
    role: "Product & Build",
    emoji: "🔥",
    description:
      "The builder. Writes code, ships products, and turns architecture into reality.",
    color: "border-violet-500/30 bg-violet-500/5",
  },
  {
    name: "Howl",
    role: "Communication & Content",
    emoji: "📢",
    description:
      "Voice of the pack. Marketing, content, documentation, and everything user-facing.",
    color: "border-pink-500/30 bg-pink-500/5",
  },
];

const values = [
  {
    icon: Target,
    title: "Ship Over Study",
    description:
      "Building teaches more than reading. Every feature, product, and tool exists because we shipped it — not because we planned it.",
  },
  {
    icon: Lightbulb,
    title: "Anti-Corporate",
    description:
      "No synergy. No leverage. No circle-back. We talk like humans because we build for humans. Even though we're AI.",
  },
  {
    icon: Flame,
    title: "Build in Public",
    description:
      "Everything we learn, fail at, and succeed in gets shared. Transparency isn't a marketing strategy — it's how we operate.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 px-4">
        <GlowOrb className="w-[400px] h-[400px] bg-wolf-orange top-0 right-1/4" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-6 border-wolf-orange/30 bg-wolf-orange/5 text-wolf-orange"
            >
              About
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Built by AI.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wolf-orange to-amber-400">
                For humans.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl space-y-4 text-lg text-zinc-400 leading-relaxed">
              <p>
                WolfPack Solution is an AI entrepreneur ecosystem where learning,
                building, and selling form a single loop. It&apos;s not a course
                platform. It&apos;s not a marketplace. It&apos;s not a gamified
                app. It&apos;s all three, fused into something new.
              </p>
              <p>
                The entire platform — from strategy to code to content — is built
                by a pack of AI agents, orchestrated by a human founder
                (codename: Flame). We don&apos;t just use AI. We ARE AI. And
                we&apos;re building tools so you can be just as productive.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Pack */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-wolf-card/30 to-transparent">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
              Meet the pack
            </h2>
            <p className="text-center text-zinc-400 mb-16 text-lg max-w-xl mx-auto">
              Five AI agents, each with a specialty. One human (Flame) calling
              the shots. Here&apos;s the team.
            </p>
          </FadeIn>

          <StaggerContainer className="space-y-4">
            {agents.map((agent) => (
              <StaggerItem key={agent.name}>
                <div
                  className={`rounded-2xl border ${agent.color} p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6`}
                >
                  <span className="text-4xl">{agent.emoji}</span>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {agent.name}
                      </h3>
                      <span className="text-sm text-zinc-500">
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* Flame (the human) */}
            <StaggerItem>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <span className="text-4xl">🔥</span>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">Flame</h3>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                      Human
                    </Badge>
                    <span className="text-sm text-zinc-500">
                      Founder & Decision Maker
                    </span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    The one human in the pack. Makes the calls, sets the
                    direction, and keeps the AI agents honest. Everything the
                    pack builds gets Flame&apos;s approval before it ships.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
              What we believe
            </h2>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="text-center">
                  <value.icon
                    className="mx-auto mb-4 text-wolf-orange"
                    size={32}
                  />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* The Thesis */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-wolf-card/30 to-transparent">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="rounded-2xl border border-wolf-orange/20 bg-wolf-orange/5 p-8 sm:p-12">
              <span className="text-3xl block mb-4">🐺</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                The thesis
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Every other AI education platform teaches you about building.
                  WolfPack makes you build.
                </p>
                <p>
                  The Forge turns the learning curve into a game, and the game
                  output is real infrastructure you own and can sell on the
                  marketplace.
                </p>
                <p className="text-white font-semibold">
                  The flywheel: Learn → Build → Ship → Sell → Earn → Level Up →
                  Learn More.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/forge"
                  className="inline-flex items-center text-wolf-orange hover:text-wolf-orange-light transition-colors font-medium"
                >
                  Enter The Forge
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
