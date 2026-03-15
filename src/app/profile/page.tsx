"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Shield,
  Swords,
  Flame,
  Star,
  LogOut,
  Settings,
  User,
  MessageCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { getWolfRank, POST_TYPE_CONFIG, type PostType, type ForumThread } from "@/lib/forum-types";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [threadCount, setThreadCount] = useState(0);
  const [replyCount, setReplyCount] = useState(0);
  const [recentThreads, setRecentThreads] = useState<ForumThread[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();

    async function loadForumStats() {
      const [threadsRes, repliesRes] = await Promise.all([
        supabase
          .from("forum_threads")
          .select("id, title, post_type, created_at, reply_count, view_count, category_id")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("forum_replies")
          .select("id")
          .eq("user_id", user!.id),
      ]);

      setThreadCount(threadsRes.data?.length || 0);
      setReplyCount(repliesRes.data?.length || 0);
      setRecentThreads((threadsRes.data as ForumThread[]) || []);
      setStatsLoading(false);
    }

    loadForumStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-wolf-orange border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.user_name ||
    user.email?.split("@")[0] ||
    "Wolf";

  const totalPosts = threadCount + replyCount;
  const xp = totalPosts * 10;
  const rank = getWolfRank(xp);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const rpgStats = [
    { label: "Build Streak", value: "—", icon: Flame, color: "text-orange-400" },
    { label: "Pack Rank", value: rank.name, icon: Shield, color: rank.color },
    { label: "Posts", value: String(totalPosts), icon: Swords, color: "text-green-400" },
    { label: "XP", value: String(xp), icon: Star, color: "text-yellow-400" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Profile header */}
      <div className="rounded-xl border border-wolf-border bg-wolf-card p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-20 w-20 rounded-full border-2 border-wolf-orange"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-wolf-orange bg-wolf-orange/10">
              <User size={32} className="text-wolf-orange" />
            </div>
          )}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-bold text-white">{displayName}</h1>
              <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${rank.bg} ${rank.color}`}>
                <Shield size={10} />
                {rank.name}
              </span>
            </div>
            <p className="text-zinc-400">{user.email}</p>
            <p className="mt-1 text-xs text-zinc-600">
              Joined{" "}
              {new Date(user.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Wolf Stats with XP bar */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
          <Swords size={20} className="text-wolf-orange" />
          Wolf Stats
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {rpgStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-wolf-border bg-wolf-card p-5 text-center"
            >
              <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* XP Progress Bar */}
        <div className="mt-4 rounded-xl border border-wolf-border bg-wolf-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${rank.color}`}>{rank.name}</span>
            {rank.progress < 1 && (
              <span className="text-xs text-zinc-500">
                {xp} / {rank.nextRankXp} XP
              </span>
            )}
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-wolf-orange to-amber-400 transition-all duration-500"
              style={{ width: `${Math.min(rank.progress * 100, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-zinc-600">
            Earn XP by posting threads and replies. 10 XP per post.
          </p>
        </div>
      </div>

      {/* Forum Activity */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
          <MessageCircle size={20} className="text-wolf-orange" />
          Forum Activity
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl border border-wolf-border bg-wolf-card p-4 text-center">
            <FileText size={18} className="mx-auto mb-1.5 text-blue-400" />
            <p className="text-xl font-bold text-white">{threadCount}</p>
            <p className="text-xs text-zinc-500">Threads</p>
          </div>
          <div className="rounded-xl border border-wolf-border bg-wolf-card p-4 text-center">
            <MessageCircle size={18} className="mx-auto mb-1.5 text-purple-400" />
            <p className="text-xl font-bold text-white">{replyCount}</p>
            <p className="text-xs text-zinc-500">Replies</p>
          </div>
        </div>

        {statsLoading ? (
          <div className="rounded-xl border border-wolf-border bg-wolf-card p-6 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-1/2 mb-3" />
            <div className="h-3 bg-white/5 rounded w-1/3" />
          </div>
        ) : recentThreads.length > 0 ? (
          <div className="space-y-2">
            {recentThreads.map((thread) => {
              const typeConfig = POST_TYPE_CONFIG[thread.post_type as PostType];
              return (
                <Link
                  key={thread.id}
                  href={`/community/thread/${thread.id}`}
                  className="flex items-center gap-3 rounded-xl border border-wolf-border bg-wolf-card p-4 transition-all hover:border-wolf-orange/15 hover:bg-wolf-card-hover group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {typeConfig && (
                        <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium ${typeConfig.bg} ${typeConfig.color}`}>
                          {typeConfig.label}
                        </span>
                      )}
                      <p className="text-sm text-white group-hover:text-wolf-orange transition-colors truncate">
                        {thread.title}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-600 mt-1">
                      {thread.reply_count} replies · {thread.view_count} views
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-zinc-700 shrink-0" />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-wolf-border bg-wolf-card p-6 text-center">
            <p className="text-sm text-zinc-500 mb-3">No forum posts yet</p>
            <Link
              href="/community/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-wolf-orange px-4 py-2 text-sm font-semibold text-white hover:bg-wolf-orange-dark"
            >
              Start Your First Thread
            </Link>
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
          <Settings size={20} className="text-wolf-orange" />
          Account Settings
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-wolf-border bg-wolf-card p-5">
            <div>
              <p className="text-sm font-medium text-white">Email</p>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-wolf-border bg-wolf-card p-5">
            <div>
              <p className="text-sm font-medium text-white">Auth Provider</p>
              <p className="text-sm text-zinc-400">
                {user.app_metadata?.provider || "email"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <div className="mt-8">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
}
