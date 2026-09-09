import type { MetadataRoute } from "next";
import { SITE } from "@/constants";

// Next.js 16: sitemap.ts auto-generates /sitemap.xml at build time.
// Add new routes here as pages are created.

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
