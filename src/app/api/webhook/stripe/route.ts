import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const productSlug = session.metadata?.productSlug;

    if (!productSlug) {
      console.error("No productSlug in session metadata");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const downloadToken = crypto.randomUUID();

    const { error } = await supabaseAdmin.from("purchases").insert({
      stripe_session_id: session.id,
      product_slug: productSlug,
      customer_email: session.customer_details?.email || null,
      amount_cents: session.amount_total,
      download_token: downloadToken,
      download_count: 0,
      expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    });

    if (error) {
      console.error("Failed to record purchase:", error);
      return NextResponse.json(
        { error: "Failed to record purchase" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
