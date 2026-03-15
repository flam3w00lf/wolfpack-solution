import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("forum_replies")
    .select("*")
    .eq("thread_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Check if current user liked any replies
  const { data: { user } } = await supabase.auth.getUser();
  if (user && data) {
    const { data: likes } = await supabase
      .from("forum_likes")
      .select("reply_id")
      .eq("user_id", user.id);

    const likedIds = new Set(likes?.map((l) => l.reply_id));
    for (const reply of data) {
      (reply as Record<string, unknown>).liked_by_current_user = likedIds.has(reply.id);
    }
  }

  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { body: replyBody } = body;

  if (!replyBody) {
    return NextResponse.json({ error: "Reply body is required" }, { status: 400 });
  }

  const userName =
    user.user_metadata?.full_name ||
    user.user_metadata?.user_name ||
    user.email?.split("@")[0] ||
    "Wolf";

  const { data, error } = await supabase
    .from("forum_replies")
    .insert({
      thread_id: id,
      user_id: user.id,
      body: replyBody,
      user_name: userName,
      user_avatar: user.user_metadata?.avatar_url || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update thread reply_count and last_reply_at
  const { data: thread } = await supabase
    .from("forum_threads")
    .select("reply_count")
    .eq("id", id)
    .single();

  await supabase
    .from("forum_threads")
    .update({
      reply_count: (thread?.reply_count || 0) + 1,
      last_reply_at: new Date().toISOString(),
    })
    .eq("id", id);

  return NextResponse.json(data, { status: 201 });
}
