import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/admin"],
    },
    sitemap: [
      "https://macombcode.com/sitemap.xml",
      "https://macombcode.com/sitemap-cities.xml",
    ],
  };
}
