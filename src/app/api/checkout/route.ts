import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";

export async function POST(req: NextRequest) {
  try {
    const { productSlug, priceInCents } = await req.json();

    const product = getProductBySlug(productSlug);
    if (!product || product.price == null || product.comingSoon || product.buyRoute !== "stripe") {
      return NextResponse.json(
        { error: "Product not found or not purchasable" },
        { status: 400 }
      );
    }

    const expectedCents = Math.round(product.price * 100);
    if (priceInCents !== expectedCents) {
      return NextResponse.json(
        { error: "Price mismatch" },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || "https://wolfpacksolution.com";

    // Free products: create a purchase record and redirect to download directly
    if (product.price === 0) {
      const { getSupabaseAdmin } = await import("@/lib/supabase-admin");
      const supabase = getSupabaseAdmin();
      const downloadToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      await supabase.from("purchases").insert({
        product_slug: product.slug,
        download_token: downloadToken,
        stripe_session_id: `free_${downloadToken}`,
        customer_email: null,
        amount_paid: 0,
        currency: "usd",
        download_count: 0,
        expires_at: expiresAt.toISOString(),
      });

      return NextResponse.json({ checkoutUrl: `${origin}/download/${downloadToken}` });
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description: product.description,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        productSlug: product.slug,
      },
      success_url: `${origin}/download/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${product.slug}`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
