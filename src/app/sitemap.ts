import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://taxpayersalliancepakistan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/policy-advocacy", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.7 },
    { path: "/membership", changeFrequency: "monthly", priority: 0.9 },
    { path: "/complaints", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
    { path: "/press-releases", changeFrequency: "weekly", priority: 0.9 },
    { path: "/leadership", changeFrequency: "monthly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-of-use", changeFrequency: "yearly", priority: 0.3 },
    { path: "/media-press", changeFrequency: "monthly", priority: 0.6 },
    { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
    { path: "/partner-with-us", changeFrequency: "monthly", priority: 0.7 }
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }));
}
