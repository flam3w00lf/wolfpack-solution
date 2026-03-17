"use client";

import { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";

interface BuyButtonProps {
  productSlug: string;
  priceInCents: number;
  priceLabel: string;
  className?: string;
}

export function BuyButton({
  productSlug,
  priceInCents,
  priceLabel,
  className = "",
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, priceInCents }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Checkout failed:", data.error);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 w-full rounded-xl bg-wolf-orange hover:bg-wolf-orange-dark text-white font-black text-xl tracking-wide shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-[1.03] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      >
        {loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <ShoppingCart size={20} />
        )}
        {loading
          ? "Redirecting..."
          : priceInCents === 0
            ? "GET IT FREE"
            : `BUY NOW — ${priceLabel}`}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-400 text-center">{error}</p>
      )}
    </div>
  );
}
