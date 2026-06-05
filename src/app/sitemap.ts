import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://taxpayersalliancepakistan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/policy-advocacy",
    "/services",
    "/membership",
    "/complaints",
    "/contact",
    "/blogs",
    "/leadership",
    "/faq",
    "/privacy-policy",
    "/terms-of-use",
    "/media-press",
    "/careers",
    "/partner-with-us"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8
  }));
}
