import { buildMainSitemap, sitemapToXml } from "@/lib/sitemaps";

export const revalidate = 86400;

/** Main XML sitemap — marketing, services, web-design, industries, demos. */
export function GET() {
  const xml = sitemapToXml(buildMainSitemap());
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
