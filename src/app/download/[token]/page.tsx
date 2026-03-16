export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getStripe } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";
import { Package, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { DownloadButton } from "@/components/download-button";

const PRODUCT_FILES: Record<string, string> = {
  "defi-yield-farming-toolkit": "defi-toolkit.pdf",
  "vibe-coder-starter-kit": "vibe-coder-kit.pdf",
  "ai-code-prompt-pack": "ai-prompt-pack.pdf",
};

// NOTE: PDFs are served securely through /api/download (not from public/).
// The fileUrl prop on DownloadButton is unused; downloads go through the API.

async function getPurchase(token: string) {
  const supabase = getSupabaseAdmin();

  // First try as download token
  const { data: byToken } = await supabase
    .from("purchases")
    .select("*")
    .eq("download_token", token)
    .single();

  if (byToken) return byToken;

  // Try as Stripe session ID
  const { data: bySession } = await supabase
    .from("purchases")
    .select("*")
    .eq("stripe_session_id", token)
    .single();

  if (bySession) return bySession;

  // Race condition: webhook hasn't fired yet. Check if this is a valid
  // Stripe session and wait briefly for the webhook to process.
  if (token.startsWith("cs_")) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(token);
      if (session.payment_status === "paid") {
        // Webhook hasn't processed yet — wait and retry up to 3 times
        for (let i = 0; i < 3; i++) {
          await new Promise((r) => setTimeout(r, 2000));
          const { data: retryData } = await supabase
            .from("purchases")
            .select("*")
            .eq("stripe_session_id", token)
            .single();
          if (retryData) return retryData;
        }
      }
    } catch {
      // Invalid session ID — fall through to notFound
    }
  }

  return null;
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const purchase = await getPurchase(token);

  if (!purchase) {
    notFound();
  }

  const product = getProductBySlug(purchase.product_slug);
  if (!product) notFound();

  const now = new Date();
  const expiresAt = new Date(purchase.expires_at);
  const isExpired = now > expiresAt;
  const maxDownloads = 5;
  const downloadsExceeded = purchase.download_count >= maxDownloads;
  const canDownload = !isExpired && !downloadsExceeded;

  const fileName = PRODUCT_FILES[purchase.product_slug];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-lg w-full">
        <div className="rounded-2xl border border-white/5 bg-wolf-card p-8 text-center">
          <div
            className={`inline-flex rounded-2xl bg-gradient-to-br ${product.gradient} p-5 mb-6`}
          >
            <Package className="text-white" size={32} />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {product.title}
          </h1>

          <p className="text-zinc-400 mb-8">
            Thank you for your purchase!
          </p>

          {canDownload ? (
            <>
              <DownloadButton
                token={purchase.download_token}
                fileName={fileName}
                fileUrl={`/products/${fileName}`}
              />

              <div className="mt-6 space-y-2 text-sm text-zinc-500">
                <div className="flex items-center justify-center gap-2">
                  <Clock size={14} />
                  <span>
                    Expires {expiresAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p>
                  {purchase.download_count} of {maxDownloads} downloads used
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-amber-400">
                <AlertTriangle size={20} />
                <span className="font-medium">
                  {isExpired
                    ? "This download link has expired"
                    : "Download limit reached"}
                </span>
              </div>
              <p className="text-sm text-zinc-500">
                Contact support@wolfpacksolution.com for assistance.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5">
            <Link
              href="/products"
              className="text-sm text-wolf-orange hover:text-wolf-orange-light transition-colors"
            >
              Browse more products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
