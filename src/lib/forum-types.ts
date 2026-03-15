export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  emoji: string;
  sort_order: number;
  thread_count?: number;
  latest_thread?: {
    title: string;
    created_at: string;
    user_name: string;
  } | null;
}

export type PostType = "discussion" | "question" | "tutorial" | "showcase" | "launch";

export interface ForumThread {
  id: string;
  category_id: string;
  user_id: string;
  title: string;
  body: string;
  post_type: PostType;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  reply_count: number;
  view_count: number;
  last_reply_at: string | null;
  // Joined fields
  user_name?: string;
  user_avatar?: string;
  category_name?: string;
  category_slug?: string;
  category_emoji?: string;
}

export interface ForumReply {
  id: string;
  thread_id: string;
  user_id: string;
  body: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  // Joined fields
  user_name?: string;
  user_avatar?: string;
  user_created_at?: string;
  user_post_count?: number;
  liked_by_current_user?: boolean;
}

export interface ForumLike {
  id: string;
  user_id: string;
  reply_id: string;
  created_at: string;
}

export const POST_TYPE_CONFIG: Record<PostType, { label: string; color: string; bg: string }> = {
  discussion: { label: "Discussion", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  question: { label: "Question", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  tutorial: { label: "Tutorial", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  showcase: { label: "Showcase", color: "text-wolf-orange", bg: "bg-wolf-orange/10 border-wolf-orange/20" },
  launch: { label: "Launch", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

export const WOLF_RANKS = [
  { name: "Pup", minXp: 0, color: "text-zinc-400", bg: "bg-zinc-500/10" },
  { name: "Scout", minXp: 50, color: "text-green-400", bg: "bg-green-500/10" },
  { name: "Hunter", minXp: 200, color: "text-blue-400", bg: "bg-blue-500/10" },
  { name: "Beta", minXp: 500, color: "text-purple-400", bg: "bg-purple-500/10" },
  { name: "Alpha", minXp: 1000, color: "text-wolf-orange", bg: "bg-wolf-orange/10" },
  { name: "Lone Wolf", minXp: 2500, color: "text-red-400", bg: "bg-red-500/10" },
  { name: "Pack Leader", minXp: 5000, color: "text-yellow-400", bg: "bg-yellow-500/10" },
] as const;

export function getWolfRank(xp: number) {
  for (let i = WOLF_RANKS.length - 1; i >= 0; i--) {
    if (xp >= WOLF_RANKS[i].minXp) {
      const current = WOLF_RANKS[i];
      const next = WOLF_RANKS[i + 1];
      return {
        ...current,
        currentXp: xp,
        nextRankXp: next?.minXp ?? current.minXp,
        progress: next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1,
      };
    }
  }
  return { ...WOLF_RANKS[0], currentXp: 0, nextRankXp: 50, progress: 0 };
}

export const FORUM_CATEGORIES: Omit<ForumCategory, "thread_count" | "latest_thread">[] = [
  { id: "den", name: "The Den", slug: "the-den", description: "General chat, introductions, and pack vibes", emoji: "🐺", sort_order: 0 },
  { id: "guides", name: "Guides & Resources", slug: "guides-resources", description: "Tutorials, walkthroughs, and curated resources", emoji: "📚", sort_order: 1 },
  { id: "frameworks", name: "Frameworks", slug: "frameworks", description: "AI frameworks, prompt chains, and architecture patterns", emoji: "⚡", sort_order: 2 },
  { id: "apps", name: "Apps & Tools", slug: "apps-tools", description: "Software, extensions, APIs, and developer tools", emoji: "🛠️", sort_order: 3 },
  { id: "forge", name: "The Forge", slug: "the-forge", description: "Build challenges, quests, and collaborative projects", emoji: "🔥", sort_order: 4 },
  { id: "showcase", name: "Show the Pack", slug: "show-the-pack", description: "Ship something? Show it off. Get feedback.", emoji: "🎯", sort_order: 5 },
  { id: "help", name: "Help & Support", slug: "help-support", description: "Stuck? Ask the pack. No question is too basic.", emoji: "🆘", sort_order: 6 },
];
