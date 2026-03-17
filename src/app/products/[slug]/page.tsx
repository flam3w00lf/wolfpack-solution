import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Star,
  Check,
  Package,
  Mail,
  HelpCircle,
  Users,
} from "lucide-react";
import { BuyButton } from "@/components/buy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description,
  };
}

function PurchaseButton({
  product,
  size = "default",
}: {
  product: (typeof products)[number];
  size?: "default" | "large";
}) {
  const heightClass = size === "large" ? "h-16" : "h-14";
  const textClass = size === "large" ? "text-xl" : "text-lg";

  if (product.comingSoon) {
    return (
      <Button
        disabled
        className={`w-full ${heightClass} bg-white/10 text-zinc-400 ${textClass} rounded-xl`}
      >
        Coming Soon
      </Button>
    );
  }

  if (product.buyRoute === "stripe") {
    return (
      <BuyButton
        productSlug={product.slug}
        priceInCents={Math.round((product.price ?? 0) * 100)}
        priceLabel={product.priceLabel}
        className={heightClass}
      />
    );
  }

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Button
        className={`w-full ${heightClass} bg-wolf-orange hover:bg-wolf-orange-dark text-white font-black ${textClass} tracking-wide shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-[1.03] rounded-xl`}
      >
        {product.price ? "BUY NOW" : "GET IT FREE"}
        <ExternalLink size={20} className="ml-2" />
      </Button>
    </a>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const isFree = product.price === 0;
  const hasExtendedContent =
    product.whoIsItFor.length > 0 || product.faq.length > 0;

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          All Products
        </Link>

        {/* Hero section */}
        <div className="rounded-2xl border border-white/5 bg-wolf-card p-8 sm:p-12 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${product.gradient} p-3`}
                >
                  <Package className="text-white" size={24} />
                </div>
                <Badge
                  variant="outline"
                  className="capitalize border-white/10 text-zinc-400"
                >
                  {product.category}
                </Badge>
                {product.comingSoon && (
                  <Badge className="bg-wolf-orange/20 text-wolf-orange border-wolf-orange/30">
                    Coming Soon
                  </Badge>
                )}
                {product.rating > 0 && (
                  <span className="flex items-center gap-1 text-sm text-zinc-400">
                    <Star
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                {product.title}
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl">
                {product.description}
              </p>
            </div>

            <div className="sm:text-right shrink-0 sm:min-w-[200px]">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-1">
                {product.priceLabel}
              </div>
              {product.price != null && product.price > 0 && (
                <p className="text-sm text-zinc-500 mb-4">One-time purchase</p>
              )}
              {isFree && (
                <p className="text-sm text-zinc-500 mb-4">
                  Free — no credit card needed
                </p>
              )}
              {product.price == null && !product.comingSoon && (
                <p className="text-sm text-zinc-500 mb-4">
                  Free &amp; open source
                </p>
              )}
              {product.comingSoon && (
                <p className="text-sm text-zinc-500 mb-4">
                  Available soon — join the waitlist
                </p>
              )}
              <PurchaseButton product={product} size="large" />
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Long description */}
            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              {product.longDescription}
            </p>

            <Separator className="bg-white/5 my-10" />

            {/* What you get */}
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Check size={24} className="text-wolf-orange" />
              What you get
            </h2>
            <ul className="space-y-4 mb-10">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="text-wolf-orange shrink-0 mt-0.5"
                  />
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Who this is for */}
            {product.whoIsItFor.length > 0 && (
              <>
                <Separator className="bg-white/5 my-10" />
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Users size={24} className="text-wolf-orange" />
                  Who this is for
                </h2>
                <ul className="space-y-4 mb-10">
                  {product.whoIsItFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ArrowRight
                        size={18}
                        className="text-wolf-orange shrink-0 mt-0.5"
                      />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* FAQ */}
            {product.faq.length > 0 && (
              <>
                <Separator className="bg-white/5 my-10" />
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <HelpCircle size={24} className="text-wolf-orange" />
                  Frequently asked questions
                </h2>
                <div className="space-y-6 mb-10">
                  {product.faq.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-xl border border-white/5 bg-wolf-card p-6"
                    >
                      <h3 className="text-base font-semibold text-white mb-2">
                        {item.question}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Bottom CTA */}
            {hasExtendedContent && (
              <>
                <Separator className="bg-white/5 my-10" />
                <div className="rounded-2xl border border-white/5 bg-wolf-card p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {isFree
                      ? "Ready to level up your prompts?"
                      : `Get the ${product.title}`}
                  </h2>
                  <p className="text-zinc-400 mb-6">
                    {isFree
                      ? "Download instantly — no signup, no credit card."
                      : `One-time purchase. Instant download. ${product.priceLabel}.`}
                  </p>
                  <div className="max-w-sm mx-auto">
                    <PurchaseButton product={product} size="large" />
                  </div>
                </div>
              </>
            )}

            <Separator className="bg-white/5 my-10" />

            {/* Reviews */}
            <h2 className="text-xl font-semibold text-white mb-4">Reviews</h2>
            {product.reviewCount > 0 ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-white/5 bg-wolf-card p-5">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 mb-2">
                    &ldquo;Exactly what I needed to get started. Clear, actionable, no fluff.&rdquo;
                  </p>
                  <span className="text-xs text-zinc-500">
                    Verified Buyer
                  </span>
                </div>
                <div className="rounded-xl border border-white/5 bg-wolf-card p-5">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 mb-2">
                    &ldquo;Worth every penny. The templates alone saved me hours.&rdquo;
                  </p>
                  <span className="text-xs text-zinc-500">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                No reviews yet. Be the first!
              </p>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Purchase card */}
              <div className="rounded-2xl border border-white/5 bg-wolf-card p-6">
                <div className="text-3xl font-bold text-white mb-1">
                  {product.priceLabel}
                </div>
                {product.price != null && product.price > 0 && (
                  <p className="text-sm text-zinc-500 mb-6">
                    One-time purchase
                  </p>
                )}
                {isFree && (
                  <p className="text-sm text-zinc-500 mb-6">
                    Free — instant download
                  </p>
                )}
                {product.price == null && !product.comingSoon && (
                  <p className="text-sm text-zinc-500 mb-6">
                    Free &amp; open source
                  </p>
                )}
                {product.comingSoon && (
                  <p className="text-sm text-zinc-500 mb-6">
                    Available soon — join the waitlist
                  </p>
                )}

                {product.comingSoon && product.emailCapture ? (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Mail size={16} className="text-wolf-orange" />
                      <span className="text-sm font-medium text-white">
                        Get notified when it launches
                      </span>
                    </div>
                    <NewsletterForm />
                  </div>
                ) : (
                  <PurchaseButton product={product} />
                )}

                <Separator className="bg-white/5 my-6" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Category</span>
                    <span className="text-zinc-300 capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Rating</span>
                    <span className="text-zinc-300">
                      {product.rating > 0
                        ? `${product.rating}/5 (${product.reviewCount})`
                        : "No reviews yet"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Delivery</span>
                    <span className="text-zinc-300">Instant download</span>
                  </div>
                </div>
              </div>

              {/* Related products */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-white/5 bg-wolf-card p-6">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                    More from the pack
                  </h3>
                  <div className="space-y-4">
                    {related.map((p) => (
                      <Link
                        key={p.slug}
                        href={
                          p.buyRoute === "external"
                            ? p.link
                            : `/products/${p.slug}`
                        }
                        className="group flex items-center gap-3"
                      >
                        <div
                          className={`shrink-0 inline-flex rounded-lg bg-gradient-to-br ${p.gradient} p-2`}
                        >
                          <Package className="text-white" size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white group-hover:text-wolf-orange transition-colors truncate">
                            {p.title}
                          </h4>
                          <span className="text-xs text-wolf-orange font-semibold">
                            {p.priceLabel}
                          </span>
                        </div>
                        <ArrowRight
                          size={12}
                          className="text-zinc-600 group-hover:text-wolf-orange transition-colors shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width related products at bottom */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">
              More from the pack
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={
                    p.buyRoute === "external"
                      ? p.link
                      : `/products/${p.slug}`
                  }
                  className="group block"
                >
                  <div className="rounded-2xl border border-white/5 bg-wolf-card p-6 transition-all hover:border-wolf-orange/20 hover:bg-wolf-card-hover">
                    <div
                      className={`inline-flex rounded-xl bg-gradient-to-br ${p.gradient} p-3 mb-4`}
                    >
                      <Package className="text-white" size={18} />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1 group-hover:text-wolf-orange transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-wolf-orange font-semibold text-sm">
                        {p.priceLabel}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-zinc-600 group-hover:text-wolf-orange transition-colors"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
