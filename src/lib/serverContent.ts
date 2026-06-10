import "server-only";
import { blogs as fallbackBlogs, leaders as fallbackLeaders } from "@/data/site";

const { pool } = require("../../server/config/db");

export type ServerBlog = {
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
  updated_at: string;
  author: string;
  readTime?: string | null;
};

export type ServerLeadershipProfile = {
  id: number;
  name: string;
  designation: string;
  bio: string | null;
  image_url: string | null;
  profile_type: "current" | "former";
  sort_order: number;
  created_at: string;
};

function fallbackServerBlogs(): ServerBlog[] {
  return fallbackBlogs.map((blog, index) => ({
    id: -(index + 1),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.body.join("\n\n"),
    category: blog.category,
    featured_image: null,
    seo_title: blog.title,
    seo_description: blog.excerpt,
    status: "published",
    published_at: new Date(blog.date).toISOString(),
    created_at: new Date(blog.date).toISOString(),
    updated_at: new Date(blog.date).toISOString(),
    author: "TPAP Research Team"
  }));
}

export async function getServerBlogs(): Promise<ServerBlog[]> {
  try {
    const [rows] = await pool.execute(
      `SELECT id, title, slug, excerpt, content, category, featured_image, seo_title,
        seo_description, status, published_at, created_at, updated_at
       FROM blogs
       WHERE status = 'published'
       ORDER BY COALESCE(published_at, created_at) DESC`
    );

    return rows.map((blog: Omit<ServerBlog, "author">) => ({
      ...blog,
      author: "TPAP Research Team"
    }));
  } catch {
    return fallbackServerBlogs();
  }
}

export async function getServerBlog(slug: string): Promise<ServerBlog | null> {
  try {
    const [rows] = await pool.execute(
      `SELECT id, title, slug, excerpt, content, category, featured_image, seo_title,
        seo_description, status, published_at, created_at, updated_at
       FROM blogs
       WHERE slug = ? AND status = 'published'
       LIMIT 1`,
      [slug]
    );

    if (!rows[0]) {
      return fallbackServerBlogs().find((blog) => blog.slug === slug) || null;
    }

    return { ...rows[0], author: "TPAP Research Team" };
  } catch {
    return fallbackServerBlogs().find((blog) => blog.slug === slug) || null;
  }
}

export async function getServerLeadershipProfiles(): Promise<ServerLeadershipProfile[]> {
  try {
    const [rows] = await pool.execute(
      `SELECT id, name, designation, bio, image_url, profile_type, sort_order, created_at
       FROM leadership_profiles
       ORDER BY profile_type ASC, sort_order ASC, created_at DESC`
    );

    if (rows.length > 0) {
      return rows;
    }
  } catch {
    // Use the bundled profiles when the database is unavailable.
  }

  return fallbackLeaders.map((leader, index) => ({
    id: -(index + 1),
    name: leader.name,
    designation: leader.role,
    bio: leader.bio,
    image_url: null,
    profile_type: "current",
    sort_order: index,
    created_at: new Date().toISOString()
  }));
}
