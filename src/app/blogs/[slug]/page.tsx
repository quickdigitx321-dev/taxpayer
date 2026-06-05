import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/BlogContent";
import { PageShell } from "@/components/PageShell";
import { getServerBlog, getServerBlogs } from "@/lib/serverContent";

const siteUrl = "https://taxpayersalliancepakistan.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getServerBlog(slug);
  if (!blog) return { title: "Article Not Found" };
  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt || blog.title,
    keywords: [blog.category || "tax policy", "TPAP", "tax reform Pakistan", "taxpayer rights", "fiscal policy"],
    alternates: { canonical: `/blogs/${blog.slug}` },
    openGraph: {
      type: "article",
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt || blog.title,
      url: `/blogs/${blog.slug}`,
      images: ["/brand/tpap-social-share.jpg"]
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [blog, blogs] = await Promise.all([getServerBlog(slug), getServerBlogs()]);
  if (!blog) notFound();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.seo_description || blog.excerpt || blog.title,
    datePublished: new Date(blog.published_at || blog.created_at).toISOString(),
    dateModified: new Date(blog.updated_at || blog.published_at || blog.created_at).toISOString(),
    author: { "@type": "Person", name: blog.author },
    publisher: {
      "@type": "Organization",
      name: "Tax Payers Alliance Pakistan",
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/tpap-logo-blue.png` }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blogs/${blog.slug}` },
    ...(blog.featured_image ? { image: new URL(blog.featured_image, siteUrl).toString() } : {})
  };
  return (
    <PageShell
      eyebrow="Article"
      title={blog.title}
      description={blog.excerpt || "Research, analysis, and commentary on taxation, public finance, taxpayer rights, and Pakistan's economic policy."}
    >
      <BlogContent blog={blog} relatedBlogs={blogs.filter((item) => item.slug !== blog.slug)} />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </PageShell>
  );
}
