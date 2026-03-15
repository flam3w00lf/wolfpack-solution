import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Star,
  Check,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(slug);

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

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Product icon hero */}
            <div
              className={`inline-flex rounded-2xl bg-gradient-to-br ${product.gradient} p-5 mb-6`}
            >
              <Package className="text-white" size={36} />
            </div>

            <div className="flex items-center gap-3 mb-3 flex-wrap">
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

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {product.title}
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              {product.longDescription}
            </p>

            <Separator className="bg-white/5 my-8" />

            {/* Features */}
            <h2 className="text-xl font-semibold text-white mb-4">
              What&apos;s included
            </h2>
            <ul className="space-y-3 mb-8">
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

            <Separator className="bg-white/5 my-8" />

            {/* Reviews placeholder */}
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
                        className={
                          i < 4
                            ? "fill-amber-400 text-amber-400"
                            : "fill-amber-400 text-amber-400"
                        }
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
                No reviews yet. Be the first when this product launches!
              </p>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-white/5 bg-wolf-card p-6">
              <div className="text-3xl font-bold text-white mb-1">
                {product.priceLabel}
              </div>
              {product.price && (
                <p className="text-sm text-zinc-500 mb-6">One-time purchase</p>
              )}
              {!product.price && !product.comingSoon && (
                <p className="text-sm text-zinc-500 mb-6">
                  Free &amp; open source
                </p>
              )}
              {product.comingSoon && (
                <p className="text-sm text-zinc-500 mb-6">
                  Available soon — join the waitlist
                </p>
              )}

              {product.comingSoon ? (
                <Button
                  disabled
                  className="w-full h-12 bg-white/10 text-zinc-400"
                >
                  Coming Soon
                </Button>
              ) : (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full h-12 bg-wolf-orange hover:bg-wolf-orange-dark text-white font-semibold">
                    {product.price ? "Buy Now" : "Get It Free"}
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                </a>
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
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">
              More from the pack
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
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
