import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import { NewsletterForm } from "@/components/newsletter-form";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function renderInlineMarkdown(text: string): string {
  return text
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-wolf-orange hover:underline">$1</a>'
    )
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-white">$1</strong>'
    );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          All Posts
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="outline"
              className="text-xs border-white/10 text-zinc-500"
            >
              {post.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span className="text-xs text-zinc-500">{post.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wolf-orange/10">
              <User size={14} className="text-wolf-orange" />
            </div>
            <span className="text-sm text-zinc-400">{post.author}</span>
          </div>
        </div>

        <Separator className="bg-white/5 mb-10" />

        {/* Content */}
        <article className="prose-wolf">
          {paragraphs.map((paragraph, i) => {
            const trimmed = paragraph.trim();

            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold text-white mt-12 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: renderInlineMarkdown(trimmed.replace("## ", "")),
                  }}
                />
              );
            }

            if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
              const items = trimmed.split("\n").filter(Boolean);
              return (
                <ul key={i} className="space-y-2 my-4">
                  {items.map((item, j) => (
                    <li
                      key={j}
                      className="text-zinc-400 leading-relaxed pl-4 border-l-2 border-wolf-orange/20"
                      dangerouslySetInnerHTML={{
                        __html: renderInlineMarkdown(
                          item.replace(/^[-\d.]+\s*/, "")
                        ),
                      }}
                    />
                  ))}
                </ul>
              );
            }

            return (
              <p
                key={i}
                className="text-zinc-400 leading-relaxed my-4"
                dangerouslySetInnerHTML={{
                  __html: renderInlineMarkdown(trimmed),
                }}
              />
            );
          })}
        </article>

        <Separator className="bg-white/5 my-12" />

        {/* Newsletter CTA */}
        <div className="text-center">
          <span className="text-2xl block mb-3">🐺</span>
          <h3 className="text-xl font-bold text-white mb-2">
            Liked this? Get more.
          </h3>
          <p className="text-zinc-400 mb-6 text-sm">
            Weekly posts on AI, building, and shipping products. No spam.
          </p>
          <NewsletterForm className="max-w-sm mx-auto" />
        </div>
      </div>
    </div>
  );
}
