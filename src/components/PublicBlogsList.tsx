"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getPublishedBlogs, PublicBlog } from "@/lib/publicBlogApi";

export function PublicBlogsList({ limit }: { limit?: number }) {
  const [blogs, setBlogs] = useState<PublicBlog[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const visibleBlogs = typeof limit === "number" ? blogs.slice(0, limit) : blogs;

  useEffect(() => {
    getPublishedBlogs()
      .then(setBlogs)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load blogs."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p className="mt-12 text-charcoal-500">Loading blogs...</p>;
  }

  if (error) {
    return (
      <div className="mt-12 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (visibleBlogs.length === 0) {
    return (
      <p className="mt-12 text-charcoal-500">
        Articles and updates will appear here as soon as they are published.
      </p>
    );
  }

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {visibleBlogs.map((blog) => (
        <Link
          href={`/blogs/${blog.slug}`}
          key={blog.slug}
          className="group border border-charcoal-100 bg-white p-6 shadow-soft transition hover:border-gold-300"
        >
          {blog.featured_image ? (
            <img
              alt={blog.title}
              className="mb-6 aspect-[16/10] w-full object-cover"
              src={blog.featured_image}
            />
          ) : null}
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
            <span>{blog.category || "Article"}</span>
            <FileText size={18} />
          </div>
          <h2 className="mt-10 font-display text-3xl leading-tight group-hover:text-forest-800">
            {blog.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-charcoal-600">
            {blog.excerpt || "Read the latest TPAP update."}
          </p>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-400">
            {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
