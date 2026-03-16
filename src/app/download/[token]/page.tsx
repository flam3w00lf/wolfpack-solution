export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getProductBySlug } from "@/data/products";
import { Package, Download, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PRODUCT_FILES: Record<string, string> = {
  "defi-yield-farming-toolkit": "defi-toolkit.pdf",
  "vibe-coder-starter-kit": "vibe-coder-kit.pdf",
  "ai-code-prompt-pack": "ai-prompt-pack.pdf",
};

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Check if this is a Stripe session ID (from success_url redirect)
  // or a download token
  let purchase;

  // First try as download token
  const { data: byToken } = await supabase
    .from("purchases")
    .select("*")
    .eq("download_token", token)
    .single();

  if (byToken) {
    purchase = byToken;
  } else {
    // Try as Stripe session ID
    const { data: bySession } = await supabase
      .from("purchases")
      .select("*")
      .eq("stripe_session_id", token)
      .single();

    if (bySession) {
      purchase = bySession;
    }
  }

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
              <a
                href={`/products/${fileName}`}
                download
                onClick={async () => {
                  // Download count is incremented client-side via API
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-wolf-orange hover:bg-wolf-orange-dark text-white font-bold text-lg px-8 py-4 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-[1.03]"
              >
                <Download size={20} />
                Download {fileName}
              </a>

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
