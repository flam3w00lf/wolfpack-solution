import { createClient } from "@/lib/supabase";

// Initialize forum tables via Supabase RPC or direct queries
// This runs once to set up the schema if tables don't exist
export async function ensureForumTables() {
  const supabase = createClient();

  // Check if tables exist by trying a simple query
  const { error } = await supabase.from("forum_categories").select("id").limit(1);

  if (error?.code === "42P01") {
    // Table doesn't exist — tables need to be created via Supabase dashboard or migration
    console.warn("Forum tables not found. Please run the SQL migration in Supabase dashboard.");
    return false;
  }

  return true;
}

// SQL to run in Supabase SQL Editor to create forum tables:
/*
-- Forum Categories
CREATE TABLE IF NOT EXISTS forum_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  emoji TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Forum Threads
CREATE TABLE IF NOT EXISTS forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL REFERENCES forum_categories(id),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'discussion',
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reply_count INTEGER NOT NULL DEFAULT 0,
  view_count INTEGER NOT NULL DEFAULT 0,
  last_reply_at TIMESTAMPTZ,
  user_name TEXT,
  user_avatar TEXT
);

-- Forum Replies
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  likes_count INTEGER NOT NULL DEFAULT 0,
  user_name TEXT,
  user_avatar TEXT
);

-- Forum Likes
CREATE TABLE IF NOT EXISTS forum_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  reply_id UUID NOT NULL REFERENCES forum_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, reply_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_threads_category ON forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_threads_created ON forum_threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_threads_pinned ON forum_threads(is_pinned DESC, last_reply_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_replies_thread ON forum_replies(thread_id, created_at);
CREATE INDEX IF NOT EXISTS idx_likes_reply ON forum_likes(reply_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON forum_likes(user_id);

-- Enable RLS
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Read access for everyone
CREATE POLICY "Anyone can read categories" ON forum_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can read threads" ON forum_threads FOR SELECT USING (true);
CREATE POLICY "Anyone can read replies" ON forum_replies FOR SELECT USING (true);
CREATE POLICY "Anyone can read likes" ON forum_likes FOR SELECT USING (true);

-- RLS Policies: Write access for authenticated users
CREATE POLICY "Auth users can create threads" ON forum_threads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Auth users can update own threads" ON forum_threads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Auth users can create replies" ON forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Auth users can update own replies" ON forum_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Auth users can like" ON forum_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Auth users can unlike" ON forum_likes FOR DELETE USING (auth.uid() = user_id);

-- Allow service role to update reply_count and view_count
CREATE POLICY "Anyone can update thread counts" ON forum_threads FOR UPDATE USING (true);

-- Seed categories
INSERT INTO forum_categories (id, name, slug, description, emoji, sort_order) VALUES
  ('den', 'The Den', 'the-den', 'General chat, introductions, and pack vibes', '🐺', 0),
  ('guides', 'Guides & Resources', 'guides-resources', 'Tutorials, walkthroughs, and curated resources', '📚', 1),
  ('frameworks', 'Frameworks', 'frameworks', 'AI frameworks, prompt chains, and architecture patterns', '⚡', 2),
  ('apps', 'Apps & Tools', 'apps-tools', 'Software, extensions, APIs, and developer tools', '🛠️', 3),
  ('forge', 'The Forge', 'the-forge', 'Build challenges, quests, and collaborative projects', '🔥', 4),
  ('showcase', 'Show the Pack', 'show-the-pack', 'Ship something? Show it off. Get feedback.', '🎯', 5),
  ('help', 'Help & Support', 'help-support', 'Stuck? Ask the pack. No question is too basic.', '🆘', 6)
ON CONFLICT (id) DO NOTHING;

-- Seed example threads
INSERT INTO forum_threads (id, category_id, user_id, title, body, post_type, is_pinned, reply_count, view_count, user_name, user_avatar, created_at, last_reply_at) VALUES
  ('00000000-0000-0000-0000-000000000001', 'den', '00000000-0000-0000-0000-000000000000', 'Welcome to The Den — Introduce yourself!', E'Hey wolves! 🐺\n\nThis is the place to say hi. Drop a quick intro:\n\n- What are you building?\n- What tools do you use?\n- What''s your superpower?\n\nNo lurking allowed. Even a one-liner counts. Let''s go!', 'discussion', true, 3, 42, 'WolfPack', null, now() - interval '3 days', now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000002', 'guides', '00000000-0000-0000-0000-000000000000', 'How I built a SaaS MVP in 48 hours with AI', E'Let me walk you through my process for going from zero to deployed SaaS in a weekend.\n\n## The Stack\n- Next.js 16 + Supabase\n- Claude for code generation\n- Vercel for deployment\n\n## Step 1: Define the core loop\nBefore writing any code, I spent 2 hours defining the ONE thing the product does. Not two things. One.\n\n## Step 2: Schema first\nI designed the database schema before touching the UI. This saved me hours of refactoring.\n\n## Step 3: AI-assisted implementation\nUsed Claude to scaffold the API routes and basic components. Spent my time on the business logic and UX polish.\n\n## Step 4: Ship it\nDeployed to Vercel, shared on Twitter, got 50 signups day one.\n\nThe secret? Don''t overthink it. Ship ugly, iterate fast.', 'tutorial', true, 5, 128, 'BuilderWolf', null, now() - interval '2 days', now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000003', 'showcase', '00000000-0000-0000-0000-000000000000', '🚀 Just launched: AI Invoice Generator', E'After 3 weeks of building, I finally shipped my AI invoice generator!\n\n**What it does:** Generate professional invoices from a text description. Just describe the work you did and it creates a formatted PDF.\n\n**Tech stack:** Next.js, OpenAI API, PDF generation with jsPDF\n\n**What I learned:**\n- PDF generation is surprisingly painful\n- AI is great at extracting structured data from natural language\n- Users care about design more than features\n\nWould love feedback from the pack! What features should I add next?', 'showcase', false, 2, 67, 'ShipItWolf', null, now() - interval '1 day', now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000004', 'help', '00000000-0000-0000-0000-000000000000', 'How do you handle auth in Next.js 16?', E'I''m building my first Next.js app and struggling with authentication.\n\nQuestions:\n1. Should I use Supabase Auth or NextAuth?\n2. How do you protect API routes?\n3. What''s the best way to handle sessions with the App Router?\n\nAny guidance appreciated! 🙏', 'question', false, 4, 89, 'NewPup', null, now() - interval '12 hours', now() - interval '2 hours')
ON CONFLICT (id) DO NOTHING;

-- Seed example replies
INSERT INTO forum_replies (id, thread_id, user_id, body, likes_count, user_name, user_avatar, created_at) VALUES
  ('00000000-0000-0000-0000-100000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', E'Hey everyone! I''m a full-stack dev building AI tools for small businesses. My superpower: turning coffee into code at 2am. 🐺', 3, 'NightWolf', null, now() - interval '2 days'),
  ('00000000-0000-0000-0000-100000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', E'Just joined! I''m a designer who''s learning to code with AI assistance. Building a personal brand toolkit. Excited to be here!', 2, 'DesignWolf', null, now() - interval '1 day'),
  ('00000000-0000-0000-0000-100000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', E'Solo founder here. Building in public and loving the accountability. Let''s ship! 🚀', 1, 'SoloAlpha', null, now() - interval '1 hour'),
  ('00000000-0000-0000-0000-100000000004', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', E'Supabase Auth is the way to go with Next.js 16. It handles sessions via cookies with the @supabase/ssr package.\n\nFor protecting API routes, check the session in your route handler:\n\n```ts\nconst supabase = createServerSupabaseClient();\nconst { data: { user } } = await supabase.auth.getUser();\nif (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });\n```\n\nWorks great with the App Router!', 5, 'AuthWolf', null, now() - interval '10 hours'),
  ('00000000-0000-0000-0000-100000000005', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', E'+1 for Supabase. The magic link flow is super smooth and your users don''t need to remember passwords.', 2, 'BuilderWolf', null, now() - interval '6 hours')
ON CONFLICT (id) DO NOTHING;
*/
