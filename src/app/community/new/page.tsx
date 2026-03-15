"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { FadeIn } from "@/components/motion";
import { FORUM_CATEGORIES, POST_TYPE_CONFIG, type PostType } from "@/lib/forum-types";

function NewThreadForm() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCategory = searchParams.get("category") || "";

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState(preselectedCategory);
  const [postType, setPostType] = useState<PostType>("discussion");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (authLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-wolf-orange border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <span className="text-4xl block mb-4">🔒</span>
        <h1 className="text-2xl font-bold text-white mb-2">Login Required</h1>
        <p className="text-zinc-400 mb-6">You need to be logged in to create a new thread.</p>
        <Link
          href="/login"
          className="inline-flex items-center rounded-lg bg-wolf-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-wolf-orange-dark"
        >
          Log in
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !categoryId) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    setError("");

    const res = await fetch("/api/forum/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        body: body.trim(),
        category_id: categoryId,
        post_type: postType,
      }),
    });

    if (res.ok) {
      const thread = await res.json();
      router.push(`/community/thread/${thread.id}`);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create thread");
      setSubmitting(false);
    }
  }

  const postTypes = Object.entries(POST_TYPE_CONFIG) as [PostType, typeof POST_TYPE_CONFIG[PostType]][];

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
      <FadeIn>
        <Link
          href="/community"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-wolf-orange transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Forum
        </Link>

        <h1 className="text-2xl font-bold text-white mb-8">Start a New Thread</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-wolf-card px-4 py-3 text-sm text-white focus:border-wolf-orange/30 focus:outline-none focus:ring-1 focus:ring-wolf-orange/20 appearance-none"
            >
              <option value="" className="bg-wolf-card">Select a category...</option>
              {FORUM_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-wolf-card">
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Post type */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Post Type
            </label>
            <div className="flex flex-wrap gap-2">
              {postTypes.map(([type, config]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPostType(type)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-all ${
                    postType === type
                      ? `${config.bg} ${config.color} border-current`
                      : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind, wolf?"
              maxLength={200}
              className="w-full rounded-lg border border-white/10 bg-wolf-card px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-wolf-orange/30 focus:outline-none focus:ring-1 focus:ring-wolf-orange/20"
            />
            <p className="text-xs text-zinc-600 mt-1">{title.length}/200</p>
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts, code, questions, or project details..."
              rows={10}
              className="w-full rounded-lg border border-white/10 bg-wolf-card px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-wolf-orange/30 focus:outline-none focus:ring-1 focus:ring-wolf-orange/20 resize-none"
            />
            <p className="text-xs text-zinc-600 mt-1">
              Plain text for now. Markdown support coming soon.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/community"
              className="px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting || !title.trim() || !body.trim() || !categoryId}
              className="inline-flex items-center gap-2 rounded-lg bg-wolf-orange px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-wolf-orange-dark disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/20"
            >
              <Send size={14} />
              {submitting ? "Posting..." : "Post Thread"}
            </button>
          </div>
        </form>
      </FadeIn>
    </div>
  );
}

export default function NewThreadPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-wolf-orange border-t-transparent" />
        </div>
      }
    >
      <NewThreadForm />
    </Suspense>
  );
}
