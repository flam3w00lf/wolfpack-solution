"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Star,
  Search,
  Package,
  ArrowRight,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products, type ProductCategory } from "@/data/products";

const categories: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Guides", value: "guide" },
  { label: "Frameworks", value: "framework" },
  { label: "Apps", value: "app" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 border-wolf-orange/30 bg-wolf-orange/5 text-wolf-orange"
            >
              Products
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Tools for wolves who ship
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Guides, frameworks, and apps built to help you go from idea to revenue.
              No fluff, no filler.
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-11 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-wolf-orange"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    category === cat.value
                      ? "bg-wolf-orange text-white"
                      : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Products Grid */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <StaggerItem key={product.slug}>
              <Link
                href={`/products/${product.slug}`}
                className="group block h-full"
              >
                <div className="relative rounded-2xl border border-white/5 bg-wolf-card p-6 h-full transition-all hover:border-wolf-orange/20 hover:bg-wolf-card-hover hover:shadow-xl hover:shadow-orange-500/5">
                  {product.comingSoon && (
                    <Badge className="absolute top-4 right-4 bg-wolf-orange/20 text-wolf-orange border-wolf-orange/30 text-xs">
                      Coming Soon
                    </Badge>
                  )}

                  <div
                    className={`inline-flex rounded-xl bg-gradient-to-br ${product.gradient} p-3 mb-4`}
                  >
                    <Package className="text-white" size={22} />
                  </div>

                  <div className="mb-1">
                    <Badge
                      variant="outline"
                      className="text-xs border-white/10 text-zinc-500 capitalize"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold text-white mt-2 mb-2 group-hover:text-wolf-orange transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-wolf-orange font-bold text-lg">
                      {product.priceLabel}
                    </span>
                    <div className="flex items-center gap-3">
                      {product.rating > 0 && (
                        <span className="flex items-center gap-1 text-sm text-zinc-500">
                          <Star
                            size={14}
                            className="fill-amber-400 text-amber-400"
                          />
                          {product.rating}
                          <span className="text-xs">({product.reviewCount})</span>
                        </span>
                      )}
                      <ArrowRight
                        size={16}
                        className="text-zinc-600 group-hover:text-wolf-orange transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <FadeIn>
            <div className="text-center py-20">
              <span className="text-4xl block mb-4">🐺</span>
              <p className="text-zinc-400 text-lg">
                No products match your search. Try a different query.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
