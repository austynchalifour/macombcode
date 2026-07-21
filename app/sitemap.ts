import type { MetadataRoute } from "next";
import { buildMainSitemap } from "@/lib/sitemaps";

/** Main sitemap — all pages except individual city routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildMainSitemap();
}
