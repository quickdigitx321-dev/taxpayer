import { apiFetch } from "./api";

export type PublicBlog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: "published";
  published_at: string | null;
  created_at: string;
};

export async function getPublishedBlogs() {
  const response = await apiFetch("/blogs");
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Could not load blogs.");
  }

  return data.records as PublicBlog[];
}

export async function getPublishedBlog(slug: string) {
  const response = await apiFetch(`/blogs/${slug}`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Could not load blog.");
  }

  return data.record as PublicBlog;
}
