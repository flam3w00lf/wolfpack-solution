import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: thread, error } = await supabase
    .from("forum_threads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !thread) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  // Also increment manually if RPC isn't set up
  await supabase
    .from("forum_threads")
    .update({ view_count: (thread.view_count || 0) + 1 })
    .eq("id", id);

  return NextResponse.json(thread);
}
