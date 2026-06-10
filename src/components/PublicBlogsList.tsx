import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServerBlogs } from "@/lib/serverContent";

export async function PublicBlogsList({ limit }: { limit?: number }) {
  const blogs = await getServerBlogs();
  const visibleBlogs = typeof limit === "number" ? blogs.slice(0, limit) : blogs;

  if (visibleBlogs.length === 0) {
    return (
      <p className="mt-8 text-sm text-charcoal-500">
        Articles and updates will appear here as soon as they are published.
      </p>
    );
  }

  const [featured, ...rest] = visibleBlogs;

  return (
    <div className="grid gap-4">
      {/* Featured article — full width */}
      <Link
        href={`/blogs/${featured.slug}`}
        className="group relative flex flex-col gap-6 border border-charcoal-200 bg-white p-7 transition-all duration-200 hover:-translate-y-px hover:border-forest-300 hover:shadow-[0_10px_36px_rgba(0,38,66,0.10)] md:flex-row md:items-stretch"
      >
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gold-400 transition-colors duration-200 group-hover:bg-forest-500" />

        {/* Left meta column */}
        <div className="flex shrink-0 flex-col justify-between md:w-52">
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-forest-600">
              {featured.category || "Article"}
            </span>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-charcoal-400">
              Featured
            </p>
          </div>
          <p className="mt-6 text-xs text-charcoal-400 md:mt-0">
            {new Date(featured.published_at || featured.created_at).toLocaleDateString("en-PK", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
            {featured.readTime ? ` · ${featured.readTime}` : ""}
          </p>
        </div>

        {/* Divider */}
        <span className="hidden w-px self-stretch bg-charcoal-100 md:block" />

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl leading-tight text-charcoal-950 transition-colors duration-200 group-hover:text-forest-800 md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-charcoal-600">
              {featured.excerpt || "Read the latest TPAP update."}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-600 transition-transform duration-200 group-hover:translate-x-0.5">
            Read article <ArrowRight size={13} />
          </div>
        </div>
      </Link>

      {/* Remaining articles */}
      {rest.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog.slug}
              className="group relative flex flex-col border border-charcoal-100 bg-white p-6 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_8px_28px_rgba(0,38,66,0.08)]"
            >
              <span className="absolute inset-x-0 top-0 h-[2px] bg-transparent transition-colors duration-200 group-hover:bg-forest-400" />

              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-600">
                  {blog.category || "Article"}
                </span>
                <span className="text-[10px] text-charcoal-400">
                  {blog.readTime || ""}
                </span>
              </div>

              <h2 className="flex-1 font-display text-xl leading-snug text-charcoal-950 transition-colors duration-200 group-hover:text-forest-800">
                {blog.title}
              </h2>
              <p className="mt-3 text-sm leading-[1.75] text-charcoal-500">
                {blog.excerpt || "Read the latest TPAP update."}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-charcoal-100 pt-4">
                <p className="text-xs text-charcoal-400">
                  {new Date(blog.published_at || blog.created_at).toLocaleDateString("en-PK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-forest-600 transition-transform duration-200 group-hover:translate-x-0.5">
                  Read <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
