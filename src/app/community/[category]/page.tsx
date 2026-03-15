"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Eye,
  Pin,
  Plus,
  Clock,
  TrendingUp,
  HelpCircle,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { FORUM_CATEGORIES, POST_TYPE_CONFIG, type ForumThread, type PostType } from "@/lib/forum-types";

type SortMode = "latest" | "popular" | "unanswered";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = use(params);
  const { user } = useAuth();
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [sort, setSort] = useState<SortMode>("latest");
  const [loading, setLoading] = useState(true);

  const category = FORUM_CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    if (!category) return;
    const supabase = createClient();

    async function loadThreads() {
      setLoading(true);
      let query = supabase
        .from("forum_threads")
        .select("*")
        .eq("category_id", category!.id)
        .order("is_pinned", { ascending: false });

      switch (sort) {
        case "popular":
          query = query.order("view_count", { ascending: false });
          break;
        case "unanswered":
          query = query.eq("reply_count", 0).order("created_at", { ascending: false });
          break;
        default:
          query = query
            .order("last_reply_at", { ascending: false, nullsFirst: false })
            .order("created_at", { ascending: false });
      }

      const { data } = await query;
      setThreads((data as ForumThread[]) || []);
      setLoading(false);
    }

    loadThreads();
  }, [category, sort]);

  function timeAgo(dateStr: string) {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  if (!category) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Category not found</h1>
        <Link href="/community" className="text-wolf-orange mt-4 inline-block hover:underline">
          Back to forum
        </Link>
      </div>
    );
  }

  const sortOptions: { value: SortMode; label: string; icon: typeof Clock }[] = [
    { value: "latest", label: "Latest", icon: Clock },
    { value: "popular", label: "Popular", icon: TrendingUp },
    { value: "unanswered", label: "Unanswered", icon: HelpCircle },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:py-24">
      {/* Breadcrumb + Header */}
      <FadeIn>
        <Link
          href="/community"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-wolf-orange transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Forum
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{category.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.name}</h1>
              <p className="text-sm text-zinc-500">{category.description}</p>
            </div>
          </div>
          {user && (
            <Link
              href={`/community/new?category=${category.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-wolf-orange px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-wolf-orange-dark hover:shadow-lg hover:shadow-orange-500/20 shrink-0"
            >
              <Plus size={16} />
              New Post
            </Link>
          )}
        </div>
      </FadeIn>

      {/* Sort tabs */}
      <FadeIn delay={0.1}>
        <div className="flex items-center gap-1 mb-6 rounded-lg bg-wolf-card p-1 w-fit border border-white/5">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-all ${
                sort === opt.value
                  ? "bg-white/10 text-white font-medium"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <opt.icon size={13} />
              {opt.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Thread list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-wolf-card p-5 animate-pulse">
              <div className="h-5 bg-white/5 rounded w-2/3 mb-3" />
              <div className="h-3 bg-white/5 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : threads.length === 0 ? (
        <FadeIn>
          <div className="rounded-xl border border-white/5 bg-wolf-card p-12 text-center">
            <span className="text-4xl block mb-3">🌙</span>
            <h3 className="text-lg font-semibold text-white mb-2">No threads yet</h3>
            <p className="text-sm text-zinc-500 mb-4">
              Be the first wolf to start a conversation here.
            </p>
            {user && (
              <Link
                href={`/community/new?category=${category.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-wolf-orange px-4 py-2 text-sm font-semibold text-white hover:bg-wolf-orange-dark"
              >
                <Plus size={16} />
                Start a Thread
              </Link>
            )}
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="space-y-2">
          {threads.map((thread) => {
            const typeConfig = POST_TYPE_CONFIG[thread.post_type as PostType];
            return (
              <StaggerItem key={thread.id}>
                <Link
                  href={`/community/thread/${thread.id}`}
                  className="flex items-start gap-4 rounded-xl border border-white/5 bg-wolf-card p-5 transition-all hover:border-wolf-orange/15 hover:bg-wolf-card-hover group"
                >
                  {/* Avatar */}
                  <div className="shrink-0 hidden sm:block">
                    {thread.user_avatar ? (
                      <img
                        src={thread.user_avatar}
                        alt=""
                        className="h-10 w-10 rounded-full border border-white/10"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-wolf-orange/10 border border-wolf-orange/20">
                        <User size={16} className="text-wolf-orange" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {thread.is_pinned && (
                        <Pin size={12} className="text-wolf-orange shrink-0" />
                      )}
                      {typeConfig && (
                        <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium ${typeConfig.bg} ${typeConfig.color}`}>
                          {typeConfig.label}
                        </span>
                      )}
                      <h3 className="text-sm font-semibold text-white group-hover:text-wolf-orange transition-colors truncate">
                        {thread.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-xs text-zinc-600">
                      <span className="text-zinc-500">{thread.user_name || "Wolf"}</span>
                      <span>·</span>
                      <span>{timeAgo(thread.created_at)}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={10} />
                        {thread.reply_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={10} />
                        {thread.view_count}
                      </span>
                    </div>
                  </div>

                  {/* Last activity */}
                  {thread.last_reply_at && (
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="text-xs text-zinc-600">
                        {timeAgo(thread.last_reply_at)}
                      </p>
                    </div>
                  )}
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
