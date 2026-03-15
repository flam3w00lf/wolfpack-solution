"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  TrendingUp,
  Users,
  Plus,
  Clock,
  Eye,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase";
import { FadeIn, StaggerContainer, StaggerItem, GlowOrb } from "@/components/motion";
import { FORUM_CATEGORIES, type ForumThread } from "@/lib/forum-types";

const ONLINE_WOLVES = [
  "BuilderWolf", "NightWolf", "DesignWolf", "SoloAlpha", "ShipItWolf",
  "CodePup", "PromptHunter",
];

export default function CommunityPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState(FORUM_CATEGORIES.map((c) => ({
    ...c,
    thread_count: 0,
    latest_thread: null as { title: string; created_at: string; user_name: string } | null,
  })));
  const [trendingThreads, setTrendingThreads] = useState<ForumThread[]>([]);
  const [totalThreads, setTotalThreads] = useState(0);

  useEffect(() => {
    const supabase = createClient();

    async function loadData() {
      // Load thread counts per category
      const { data: threads } = await supabase
        .from("forum_threads")
        .select("id, category_id, title, created_at, user_name, view_count")
        .order("created_at", { ascending: false });

      if (threads) {
        setTotalThreads(threads.length);

        const catMap = new Map<string, { count: number; latest: { title: string; created_at: string; user_name: string } | null }>();
        for (const t of threads) {
          const entry = catMap.get(t.category_id) || { count: 0, latest: null };
          entry.count++;
          if (!entry.latest) {
            entry.latest = { title: t.title, created_at: t.created_at, user_name: t.user_name || "Wolf" };
          }
          catMap.set(t.category_id, entry);
        }

        setCategories((prev) =>
          prev.map((c) => ({
            ...c,
            thread_count: catMap.get(c.id)?.count || 0,
            latest_thread: catMap.get(c.id)?.latest || null,
          }))
        );

        // Trending = most viewed
        const sorted = [...threads].sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        setTrendingThreads(sorted.slice(0, 5) as ForumThread[]);
      }
    }

    loadData();
  }, []);

  function timeAgo(dateStr: string) {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative px-4 py-16 sm:py-20">
        <GlowOrb className="w-[500px] h-[500px] bg-violet-600 top-10 right-1/4" />
        <GlowOrb className="w-[400px] h-[400px] bg-wolf-orange top-40 left-1/4" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-4">
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wolf-orange to-amber-400">
                  Pack Forum
                </span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Where wolves share, build, and ship together. No gatekeeping.
              </p>
            </div>
          </FadeIn>

          {/* Stats bar */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm">
              <div className="flex items-center gap-2 text-zinc-400">
                <MessageCircle size={16} className="text-wolf-orange" />
                <span className="text-white font-medium">{totalThreads}</span> threads
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Users size={16} className="text-green-400" />
                <span className="text-white font-medium">{ONLINE_WOLVES.length}</span> wolves online
              </div>
              {user && (
                <Link
                  href="/community/new"
                  className="inline-flex items-center gap-2 rounded-lg bg-wolf-orange px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-wolf-orange-dark hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <Plus size={16} />
                  New Post
                </Link>
              )}
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Categories */}
            <div>
              <StaggerContainer className="space-y-3">
                {categories.map((cat) => (
                  <StaggerItem key={cat.id}>
                    <Link
                      href={`/community/${cat.slug}`}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-wolf-card p-5 transition-all hover:border-wolf-orange/15 hover:bg-wolf-card-hover group"
                    >
                      <span className="text-3xl shrink-0">{cat.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-white group-hover:text-wolf-orange transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-0.5">{cat.description}</p>
                        {cat.latest_thread && (
                          <p className="text-xs text-zinc-600 mt-2 truncate">
                            <span className="text-zinc-500">{cat.latest_thread.user_name}</span>
                            {" · "}
                            {cat.latest_thread.title}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-center gap-1 shrink-0 text-center">
                        <span className="text-lg font-bold text-white">{cat.thread_count}</span>
                        <span className="text-xs text-zinc-600">threads</span>
                      </div>
                      <ChevronRight size={16} className="text-zinc-700 group-hover:text-wolf-orange transition-colors shrink-0" />
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* New Post CTA (not logged in) */}
              {!user && (
                <FadeIn delay={0.2}>
                  <div className="rounded-xl border border-wolf-orange/20 bg-gradient-to-b from-wolf-orange/5 to-transparent p-5 text-center">
                    <span className="text-2xl block mb-2">🐺</span>
                    <p className="text-sm text-zinc-300 mb-3">
                      Join the pack to post and reply
                    </p>
                    <Link
                      href="/signup"
                      className="inline-flex items-center rounded-lg bg-wolf-orange px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-wolf-orange-dark"
                    >
                      Join the Pack
                    </Link>
                  </div>
                </FadeIn>
              )}

              {/* Trending Threads */}
              <FadeIn delay={0.3}>
                <div className="rounded-xl border border-white/5 bg-wolf-card p-5">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-wolf-orange" />
                    Trending Threads
                  </h3>
                  <div className="space-y-3">
                    {trendingThreads.length > 0 ? (
                      trendingThreads.map((thread) => (
                        <Link
                          key={thread.id}
                          href={`/community/thread/${thread.id}`}
                          className="block group"
                        >
                          <p className="text-sm text-zinc-300 group-hover:text-wolf-orange transition-colors line-clamp-1">
                            {thread.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-zinc-600">
                            <Eye size={10} />
                            <span>{thread.view_count} views</span>
                            <span>·</span>
                            <span>{thread.user_name}</span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-600">No threads yet. Be the first!</p>
                    )}
                  </div>
                </div>
              </FadeIn>

              {/* Who's Online */}
              <FadeIn delay={0.4}>
                <div className="rounded-xl border border-white/5 bg-wolf-card p-5">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Who&apos;s Online
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ONLINE_WOLVES.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-xs text-zinc-400"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {name}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-600 mt-3">
                    {ONLINE_WOLVES.length} wolves prowling
                  </p>
                </div>
              </FadeIn>

              {/* Pack Rules */}
              <FadeIn delay={0.5}>
                <div className="rounded-xl border border-white/5 bg-wolf-card p-5">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                    <Clock size={14} className="text-zinc-500" />
                    Quick Rules
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-500">
                    <li>1. Ship something every week</li>
                    <li>2. Help other wolves. No gatekeeping.</li>
                    <li>3. Share wins AND failures</li>
                    <li>4. Build in public</li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
