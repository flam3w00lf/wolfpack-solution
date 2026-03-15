"use client";

import { useEffect, useState, useCallback } from "react";
import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Eye,
  Heart,
  Share2,
  Bookmark,
  User,
  Shield,
  Pin,
  Send,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  POST_TYPE_CONFIG,
  FORUM_CATEGORIES,
  getWolfRank,
  type ForumThread,
  type ForumReply,
  type PostType,
} from "@/lib/forum-types";

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [thread, setThread] = useState<ForumThread | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadThread = useCallback(async () => {
    const res = await fetch(`/api/forum/threads/${id}`);
    if (res.ok) {
      setThread(await res.json());
    }
  }, [id]);

  const loadReplies = useCallback(async () => {
    const res = await fetch(`/api/forum/threads/${id}/replies`);
    if (res.ok) {
      setReplies(await res.json());
    }
  }, [id]);

  useEffect(() => {
    async function load() {
      await Promise.all([loadThread(), loadReplies()]);
      setLoading(false);
    }
    load();
  }, [loadThread, loadReplies]);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyBody.trim() || submitting) return;
    setSubmitting(true);

    const res = await fetch(`/api/forum/threads/${id}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: replyBody }),
    });

    if (res.ok) {
      setReplyBody("");
      await loadReplies();
      await loadThread();
    }
    setSubmitting(false);
  }

  async function handleLike(replyId: string) {
    if (!user) return;
    const res = await fetch("/api/forum/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply_id: replyId }),
    });

    if (res.ok) {
      const { liked } = await res.json();
      setReplies((prev) =>
        prev.map((r) =>
          r.id === replyId
            ? {
                ...r,
                likes_count: liked ? r.likes_count + 1 : Math.max(0, r.likes_count - 1),
                liked_by_current_user: liked,
              }
            : r
        )
      );
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function timeAgo(dateStr: string) {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-wolf-orange border-t-transparent" />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Thread not found</h1>
        <Link href="/community" className="text-wolf-orange mt-4 inline-block hover:underline">
          Back to forum
        </Link>
      </div>
    );
  }

  const category = FORUM_CATEGORIES.find((c) => c.id === thread.category_id);
  const typeConfig = POST_TYPE_CONFIG[thread.post_type as PostType];

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:py-24">
      {/* Breadcrumbs */}
      <FadeIn>
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 flex-wrap">
          <Link href="/community" className="hover:text-wolf-orange transition-colors">
            Forum
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/community/${category.slug}`}
                className="hover:text-wolf-orange transition-colors"
              >
                {category.emoji} {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-zinc-400 truncate">{thread.title}</span>
        </div>
      </FadeIn>

      {/* Thread header */}
      <FadeIn delay={0.1}>
        <div className="rounded-xl border border-white/5 bg-wolf-card p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {thread.is_pinned && (
              <span className="inline-flex items-center gap-1 rounded border border-wolf-orange/20 bg-wolf-orange/5 px-2 py-0.5 text-xs text-wolf-orange">
                <Pin size={10} />
                Pinned
              </span>
            )}
            {typeConfig && (
              <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${typeConfig.bg} ${typeConfig.color}`}>
                {typeConfig.label}
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">{thread.title}</h1>

          {/* Author card + body */}
          <div className="flex gap-4">
            <div className="shrink-0 hidden sm:block">
              {thread.user_avatar ? (
                <img
                  src={thread.user_avatar}
                  alt=""
                  className="h-12 w-12 rounded-full border-2 border-wolf-orange/30"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wolf-orange/10 border-2 border-wolf-orange/30">
                  <User size={20} className="text-wolf-orange" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-sm font-semibold text-white">
                  {thread.user_name || "Wolf"}
                </span>
                <WolfRankBadge postCount={0} />
                <span className="text-xs text-zinc-600">
                  {timeAgo(thread.created_at)}
                </span>
              </div>

              <div className="prose prose-invert prose-sm max-w-none text-zinc-300 whitespace-pre-wrap break-words">
                {thread.body}
              </div>
            </div>
          </div>

          {/* Thread actions */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <MessageCircle size={12} />
                {thread.reply_count} replies
              </span>
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {thread.view_count} views
              </span>
            </div>
            <div className="flex-1" />
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
            >
              <Share2 size={12} />
              {copied ? "Copied!" : "Share"}
            </button>
            <button className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300">
              <Bookmark size={12} />
              Bookmark
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Replies */}
      {replies.length > 0 && (
        <FadeIn delay={0.2}>
          <h2 className="text-sm font-semibold text-zinc-400 mb-4">
            {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
          </h2>
        </FadeIn>
      )}

      <StaggerContainer className="space-y-3 mb-8">
        {replies.map((reply) => (
          <StaggerItem key={reply.id}>
            <div className="rounded-xl border border-white/5 bg-wolf-card p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="shrink-0 hidden sm:block">
                  {reply.user_avatar ? (
                    <img
                      src={reply.user_avatar}
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
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">
                      {reply.user_name || "Wolf"}
                    </span>
                    <WolfRankBadge postCount={reply.likes_count || 0} />
                    <span className="text-xs text-zinc-600">
                      {timeAgo(reply.created_at)}
                    </span>
                  </div>

                  <div className="text-sm text-zinc-300 whitespace-pre-wrap break-words">
                    {reply.body}
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => handleLike(reply.id)}
                      disabled={!user}
                      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-all ${
                        reply.liked_by_current_user
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "text-zinc-600 hover:bg-white/5 hover:text-zinc-400"
                      } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <Heart
                        size={12}
                        className={reply.liked_by_current_user ? "fill-current" : ""}
                      />
                      {reply.likes_count > 0 && reply.likes_count}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Reply form */}
      <FadeIn delay={0.3}>
        {user ? (
          <div className="rounded-xl border border-white/5 bg-wolf-card p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <MessageCircle size={14} className="text-wolf-orange" />
              Reply to this thread
            </h3>
            <form onSubmit={handleReply}>
              <textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder="Share your thoughts with the pack..."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-wolf-orange/30 focus:outline-none focus:ring-1 focus:ring-wolf-orange/20 resize-none"
                rows={4}
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={!replyBody.trim() || submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-wolf-orange px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-wolf-orange-dark disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <Send size={14} />
                  {submitting ? "Posting..." : "Post Reply"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="rounded-xl border border-wolf-orange/20 bg-gradient-to-b from-wolf-orange/5 to-transparent p-6 text-center">
            <p className="text-sm text-zinc-400 mb-3">
              Log in to reply to this thread
            </p>
            <Link
              href="/login"
              className="inline-flex items-center rounded-lg bg-wolf-orange px-4 py-2 text-sm font-semibold text-white hover:bg-wolf-orange-dark"
            >
              Log in
            </Link>
          </div>
        )}
      </FadeIn>
    </div>
  );
}

function WolfRankBadge({ postCount }: { postCount: number }) {
  const xp = postCount * 10;
  const rank = getWolfRank(xp);
  return (
    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${rank.bg} ${rank.color}`}>
      <Shield size={8} />
      {rank.name}
    </span>
  );
}
