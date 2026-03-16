import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";

export async function POST(req: NextRequest) {
  try {
    const { productSlug, priceInCents } = await req.json();

    const product = getProductBySlug(productSlug);
    if (!product || !product.price) {
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

    const session = await stripe.checkout.sessions.create({
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
