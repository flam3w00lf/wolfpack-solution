import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const { data: purchase, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("download_token", token)
    .single();

  if (error || !purchase) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  const now = new Date();
  const expiresAt = new Date(purchase.expires_at);

  if (now > expiresAt) {
    return NextResponse.json({ error: "Token expired" }, { status: 410 });
  }

  if (purchase.download_count >= 5) {
    return NextResponse.json({ error: "Download limit reached" }, { status: 429 });
  }

  await supabase
    .from("purchases")
    .update({ download_count: purchase.download_count + 1 })
    .eq("id", purchase.id);

  return NextResponse.json({ ok: true });
}
