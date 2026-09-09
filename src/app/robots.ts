import type { MetadataRoute } from "next";
import { SITE } from "@/constants";

// Next.js 16: robots.ts auto-generates /robots.txt at build time.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
