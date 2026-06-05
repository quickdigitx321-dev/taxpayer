import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ServerBlog } from "@/lib/serverContent";

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
    if (!paragraph || paragraph.startsWith("<!--")) return null;
    if (paragraph.startsWith("# ")) return <h2 className="font-display text-4xl" key={index}>{renderInlineFormatting(paragraph.slice(2))}</h2>;
    if (paragraph.startsWith("## ")) return <h2 className="font-display text-3xl" key={index}>{renderInlineFormatting(paragraph.slice(3))}</h2>;
    if (paragraph.startsWith("> ")) return <blockquote className="border-l-2 border-gold-300 pl-5 font-display text-2xl leading-9" key={index}>{renderInlineFormatting(paragraph.slice(2))}</blockquote>;
    if (paragraph.startsWith("- ")) return <ul className="list-disc pl-6" key={index}><li>{renderInlineFormatting(paragraph.slice(2))}</li></ul>;
    return <p key={index}>{renderInlineFormatting(paragraph)}</p>;
  });
}

export function BlogContent({ blog, relatedBlogs }: { blog: ServerBlog; relatedBlogs: ServerBlog[] }) {
  return (
    <article className="py-24">
      <div className="container-shell max-w-3xl">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-forest-800">
          <ArrowLeft size={17} /> Back to blogs
        </Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-charcoal-400">
          {blog.category || "Article"} / {new Date(blog.published_at || blog.created_at).toLocaleDateString("en-PK")} / {blog.author}
        </p>
        {blog.featured_image ? <img alt={`${blog.title} featured image`} className="mt-10 aspect-[16/9] w-full object-cover" src={blog.featured_image} /> : null}
        <div className="mt-10 space-y-7 text-lg leading-9 text-charcoal-700">{renderContent(blog.content)}</div>
        <aside className="mt-16 border-t border-charcoal-200 pt-10">
          <h2 className="font-display text-3xl">Related reading</h2>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-forest-800">
            {relatedBlogs.slice(0, 2).map((related) => <Link href={`/blogs/${related.slug}`} key={related.slug}>{related.title}</Link>)}
            <Link href="/policy-advocacy">Explore TPAP policy advocacy</Link>
            <Link href="/membership">Become a TPAP member</Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
