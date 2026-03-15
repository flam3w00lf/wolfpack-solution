import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "latest";
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  let query = supabase
    .from("forum_threads")
    .select("*")
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq("category_id", category);
  }

  // Pinned threads always first
  query = query.order("is_pinned", { ascending: false });

  switch (sort) {
    case "popular":
      query = query.order("view_count", { ascending: false });
      break;
    case "unanswered":
      query = query.eq("reply_count", 0).order("created_at", { ascending: false });
      break;
    default: // latest
      query = query.order("last_reply_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, body: threadBody, category_id, post_type } = body;

  if (!title || !threadBody || !category_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const userName =
    user.user_metadata?.full_name ||
    user.user_metadata?.user_name ||
    user.email?.split("@")[0] ||
    "Wolf";

  const { data, error } = await supabase
    .from("forum_threads")
    .insert({
      title,
      body: threadBody,
      category_id,
      post_type: post_type || "discussion",
      user_id: user.id,
      user_name: userName,
      user_avatar: user.user_metadata?.avatar_url || null,
      last_reply_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
