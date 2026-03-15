import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, building, and the future of entrepreneurship. No fluff.",
};

export default function BlogPage() {
  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-wolf-orange/30 bg-wolf-orange/5 text-wolf-orange"
          >
            Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            From the den
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Thoughts on AI, building products, and the things nobody talks about.
            No SEO-optimized garbage.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="rounded-2xl border border-white/5 bg-wolf-card p-6 sm:p-8 transition-all hover:border-wolf-orange/20 hover:bg-wolf-card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <Badge
                    variant="outline"
                    className="text-xs border-white/10 text-zinc-500"
                  >
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-zinc-600">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span className="text-xs text-zinc-600">{post.date}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-wolf-orange transition-colors">
                  {post.title}
                </h2>

                <p className="text-zinc-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center text-sm text-wolf-orange group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight
                    size={14}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
