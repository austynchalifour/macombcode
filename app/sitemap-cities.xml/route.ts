import { buildCitiesSitemap, sitemapToXml } from "@/lib/sitemaps";

/** Separate XML sitemap for all Macomb County city pages. */
export function GET() {
  const xml = sitemapToXml(buildCitiesSitemap());
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
