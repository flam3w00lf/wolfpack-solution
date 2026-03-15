"use client";

import {
  Users,
  MessageCircle,
  Trophy,
  Zap,
  Heart,
  Code,
  ArrowRight,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, GlowOrb } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { NewsletterForm } from "@/components/newsletter-form";

const features = [
  {
    icon: MessageCircle,
    title: "Pack Channels",
    description:
      "Dedicated channels for builders, designers, prompt engineers, and AI tinkerers. Get help fast.",
  },
  {
    icon: Code,
    title: "Build in Public",
    description:
      "Share what you're shipping, get feedback from other wolves, and find collaborators for your projects.",
  },
  {
    icon: Trophy,
    title: "Weekly Challenges",
    description:
      "Build challenges with real prizes. Ship something in a week, get recognized by the pack.",
  },
  {
    icon: Zap,
    title: "Live Sessions",
    description:
      "Weekly live building sessions where we go from idea to deployed product in real-time. No slides.",
  },
  {
    icon: Heart,
    title: "No Gatekeeping",
    description:
      "Every question is valid. Every skill level is welcome. The only rule: don't be a jerk.",
  },
  {
    icon: Users,
    title: "Pack Hunts",
    description:
      "Team up for group projects. Build something together, ship it, and split the revenue.",
  },
];

export default function CommunityPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-20">
        <GlowOrb className="w-[500px] h-[500px] bg-violet-600 top-10 right-1/4" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-6 border-wolf-orange/30 bg-wolf-orange/5 text-wolf-orange px-4 py-1.5"
            >
              Coming Soon
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wolf-orange to-amber-400">
                pack
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-zinc-400 mb-4 max-w-2xl mx-auto">
              A community of AI builders who ship. No lurkers-only energy.
              No guru worship. Just wolves who build things.
            </p>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Discord community launching soon. Get notified.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                disabled
                className="inline-flex h-12 items-center rounded-xl bg-[#5865F2] px-8 text-base font-semibold text-white opacity-60 cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                Join Discord (Coming Soon)
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
              What the pack looks like
            </h2>
            <p className="text-center text-zinc-400 mb-16 text-lg">
              Here&apos;s what we&apos;re building for the community.
            </p>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="rounded-2xl border border-white/5 bg-wolf-card p-6 h-full transition-all hover:border-wolf-orange/10 hover:bg-wolf-card-hover">
                  <feature.icon
                    className="text-wolf-orange mb-4"
                    size={24}
                  />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pack rules */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-wolf-card/30 to-transparent">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-4xl block mb-4">🐺</span>
            <h2 className="text-3xl font-bold text-white mb-6">
              Pack rules
            </h2>
            <div className="space-y-4 text-left">
              {[
                "Ship something every week, even if it's small.",
                "Help other wolves. Gatekeeping is for sheep.",
                "Share your wins AND your failures. Both teach.",
                "No guru worship. We're all learning.",
                "Build in public. Silence is the enemy of progress.",
              ].map((rule, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-wolf-card p-4"
                >
                  <span className="text-wolf-orange font-bold shrink-0">
                    {i + 1}.
                  </span>
                  <span className="text-zinc-300">{rule}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-4">
              Get notified when we open the gates
            </h2>
            <p className="text-zinc-400 mb-8">
              Drop your email. We&apos;ll howl when it&apos;s time.
            </p>
            <NewsletterForm className="max-w-md mx-auto" />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
