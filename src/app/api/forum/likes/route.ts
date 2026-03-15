import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reply_id } = await request.json();

  if (!reply_id) {
    return NextResponse.json({ error: "reply_id is required" }, { status: 400 });
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from("forum_likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("reply_id", reply_id)
    .single();

  if (existing) {
    // Unlike
    await supabase
      .from("forum_likes")
      .delete()
      .eq("user_id", user.id)
      .eq("reply_id", reply_id);

    // Decrement likes_count
    const { data: reply } = await supabase
      .from("forum_replies")
      .select("likes_count")
      .eq("id", reply_id)
      .single();

    await supabase
      .from("forum_replies")
      .update({ likes_count: Math.max(0, (reply?.likes_count || 1) - 1) })
      .eq("id", reply_id);

    return NextResponse.json({ liked: false });
  } else {
    // Like
    await supabase
      .from("forum_likes")
      .insert({ user_id: user.id, reply_id });

    // Increment likes_count
    const { data: reply } = await supabase
      .from("forum_replies")
      .select("likes_count")
      .eq("id", reply_id)
      .single();

    await supabase
      .from("forum_replies")
      .update({ likes_count: (reply?.likes_count || 0) + 1 })
      .eq("id", reply_id);

    return NextResponse.json({ liked: true });
  }
}
