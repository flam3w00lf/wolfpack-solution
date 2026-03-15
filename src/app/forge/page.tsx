"use client";

import {
  Flame,
  BookOpen,
  Bot,
  Rocket,
  Trophy,
  Lock,
  Zap,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, GlowOrb } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { NewsletterForm } from "@/components/newsletter-form";

const journey = [
  {
    icon: BookOpen,
    phase: "Phase 1",
    title: "Learn Prompting",
    levels: "Levels 1-10",
    description:
      "Master prompt engineering, chains, and structured outputs. Every level produces a real, reusable prompt artifact.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Bot,
    phase: "Phase 2",
    title: "Build Agents",
    levels: "Levels 11-25",
    description:
      "Design and deploy AI agents. Multi-model orchestration, tool use, memory systems. Real agents, real deployments.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Rocket,
    phase: "Phase 3",
    title: "Ship Apps",
    levels: "Levels 26-40",
    description:
      "Build full AI-powered products. Deploy to production. List on the marketplace. Start earning revenue.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

const levelPreviews = [
  { level: 1, title: "Your First Prompt Chain", xp: 100, rank: "Pup" },
  { level: 5, title: "Structured Output Engine", xp: 500, rank: "Pup" },
  { level: 10, title: "Multi-Model Router", xp: 1200, rank: "Scout" },
  { level: 15, title: "Agent Memory System", xp: 2000, rank: "Scout" },
  { level: 20, title: "Tool-Using Agent", xp: 3500, rank: "Hunter" },
  { level: 25, title: "Workflow Orchestrator", xp: 5000, rank: "Hunter" },
  { level: 30, title: "Full-Stack AI App", xp: 7500, rank: "Alpha" },
  { level: 35, title: "Marketplace Product", xp: 10000, rank: "Alpha" },
  { level: 40, title: "Pack Leader Project", xp: 15000, rank: "Pack Leader" },
];

export default function ForgePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-20">
        <GlowOrb className="w-[500px] h-[500px] bg-orange-600 top-10 left-1/3" />
        <GlowOrb className="w-[300px] h-[300px] bg-violet-600 bottom-20 right-1/4" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-6 border-wolf-orange/30 bg-wolf-orange/5 text-wolf-orange px-4 py-1.5"
            >
              <Flame size={14} className="mr-1" />
              Coming Soon
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wolf-orange via-amber-400 to-orange-600">
                Forge
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl sm:text-2xl text-zinc-400 mb-4 max-w-2xl mx-auto">
              40 levels. Real infrastructure. No simulations.
            </p>
            <p className="text-lg text-zinc-500 max-w-xl mx-auto">
              A gamified building game where every level produces real, deployable,
              ownable AI infrastructure. The game IS the work. The work IS the product.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 max-w-md mx-auto">
              <p className="text-sm text-zinc-500 mb-3">
                Get early access when we launch
              </p>
              <NewsletterForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Journey Visual */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
              The journey
            </h2>
            <p className="text-center text-zinc-400 mb-16 text-lg">
              Learn prompting → Build agents → Ship apps. Every level produces
              something real.
            </p>
          </FadeIn>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-orange-500/30" />

            <StaggerContainer className="grid gap-8 md:grid-cols-3">
              {journey.map((phase, i) => (
                <StaggerItem key={phase.phase}>
                  <div
                    className={`relative rounded-2xl border ${phase.border} ${phase.bg} p-8 h-full`}
                  >
                    <div className={`inline-flex rounded-xl ${phase.bg} p-3 mb-4`}>
                      <phase.icon className={phase.color} size={28} />
                    </div>
                    <Badge
                      variant="outline"
                      className={`mb-3 ${phase.border} ${phase.color} bg-transparent text-xs`}
                    >
                      {phase.phase} · {phase.levels}
                    </Badge>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {phase.description}
                    </p>
                    {i < 2 && (
                      <ChevronRight
                        size={20}
                        className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-zinc-600"
                      />
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Level Preview */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-wolf-card/50 to-transparent">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Level progression preview
            </h2>
            <p className="text-center text-zinc-400 mb-12">
              Each level unlocks new capabilities and produces real output.
            </p>
          </FadeIn>

          <div className="space-y-3">
            {levelPreviews.map((level, i) => (
              <FadeIn key={level.level} delay={i * 0.05}>
                <motion.div
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-wolf-card p-4 transition-all hover:border-wolf-orange/20 hover:bg-wolf-card-hover"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-wolf-orange/10 text-wolf-orange font-bold text-sm">
                    {level.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">
                        {level.title}
                      </span>
                      {level.level > 10 && (
                        <Lock size={12} className="text-zinc-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-zinc-500">
                        +{level.xp} XP
                      </span>
                      <span className="text-xs text-wolf-orange">
                        {level.rank}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-zinc-700 group-hover:text-wolf-orange transition-colors"
                  />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Rank System */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Rank up. Unlock more.
            </h2>
          </FadeIn>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { rank: "Pup", emoji: "🐾", levels: "1-10", color: "border-zinc-600" },
              { rank: "Scout", emoji: "🔍", levels: "11-20", color: "border-blue-500/40" },
              { rank: "Hunter", emoji: "🎯", levels: "21-30", color: "border-violet-500/40" },
              {
                rank: "Alpha",
                emoji: "🐺",
                levels: "31-40",
                color: "border-wolf-orange/40",
              },
            ].map((r) => (
              <StaggerItem key={r.rank}>
                <div
                  className={`rounded-2xl border ${r.color} bg-wolf-card p-6 text-center h-full`}
                >
                  <span className="text-3xl block mb-2">{r.emoji}</span>
                  <h3 className="text-lg font-bold text-white">{r.rank}</h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    Levels {r.levels}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Trophy className="mx-auto mb-4 text-wolf-orange" size={40} />
            <h2 className="text-3xl font-bold text-white mb-4">
              Be first in the forge
            </h2>
            <p className="text-zinc-400 mb-8 text-lg">
              We&apos;re building something that&apos;s never existed before. Drop your email
              and we&apos;ll let you know the moment the gates open.
            </p>
            <NewsletterForm className="max-w-md mx-auto" />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
