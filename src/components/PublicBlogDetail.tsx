"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getPublishedBlog, PublicBlog } from "@/lib/publicBlogApi";

function renderInlineFormatting(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

function renderContent(content: string) {
  return content.split(/\n+/).map((paragraph, index) => {
    if (paragraph.startsWith("<!--")) {
      return null;
    }

    if (paragraph.startsWith("# ")) {
      return (
        <h1 className="font-display text-5xl leading-tight text-charcoal-950" key={index}>
          {renderInlineFormatting(paragraph.slice(2))}
        </h1>
      );
    }

    if (paragraph.startsWith("## ")) {
      return (
        <h2 className="font-display text-4xl leading-tight text-charcoal-950" key={index}>
          {renderInlineFormatting(paragraph.slice(3))}
        </h2>
      );
    }

    if (paragraph.startsWith("> ")) {
      return (
        <blockquote
          className="border-l-2 border-gold-300 pl-5 font-display text-2xl leading-9 text-charcoal-800"
          key={index}
        >
          {renderInlineFormatting(paragraph.slice(2))}
        </blockquote>
      );
    }

    if (paragraph.startsWith("- ")) {
      return (
        <ul className="list-disc pl-6" key={index}>
          <li>{renderInlineFormatting(paragraph.slice(2))}</li>
        </ul>
      );
    }

    return <p key={index}>{renderInlineFormatting(paragraph)}</p>;
  });
}

export function PublicBlogDetail({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<PublicBlog | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPublishedBlog(slug)
      .then(setBlog)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load blog."))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return <p className="py-24 text-center text-charcoal-500">Loading blog...</p>;
  }

  if (error || !blog) {
    return (
      <div className="container-shell py-24">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-bold text-forest-800"
        >
          <ArrowLeft size={17} />
          Back to blogs
        </Link>
        <div className="mt-8 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error || "Blog not found."}
        </div>
      </div>
    );
  }

  return (
    <article className="py-24">
      <div className="container-shell max-w-3xl">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-bold text-forest-800"
        >
          <ArrowLeft size={17} />
          Back to blogs
        </Link>
        <h1 className="mt-8 font-display text-5xl leading-tight text-charcoal-950 md:text-6xl">
          {blog.title}
        </h1>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-charcoal-400">
          {blog.category || "Article"} /{" "}
          {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
        </p>
        {blog.featured_image ? (
          <img
            alt={blog.title}
            className="mt-10 aspect-[16/9] w-full object-cover"
            src={blog.featured_image}
          />
        ) : null}
        <div className="mt-10 space-y-7 text-lg leading-9 text-charcoal-700">
          {renderContent(blog.content)}
        </div>
      </div>
    </article>
  );
}
