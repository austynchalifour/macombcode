import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { serviceCityPages } from "@/data/service-cities";
import { services } from "@/data/services";

export const SITE_URL = "https://macombcode.com";

function entry(
  path: string,
  options?: {
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: path.startsWith("http") ? path : `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: options?.changeFrequency ?? "monthly",
    priority: options?.priority ?? 0.7,
  };
}

/** Main site pages — excludes individual city routes. */
export function buildMainSitemap(): MetadataRoute.Sitemap {
  const serviceEntries = services.map((service) =>
    entry(`/services/${service.slug}`, {
      changeFrequency: "monthly",
      priority: 0.85,
    }),
  );

  const serviceCityEntries = serviceCityPages.map((page) =>
    entry(`/services/${page.serviceSlug}/${page.citySlug}`, {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    entry("/", { changeFrequency: "weekly", priority: 1 }),
    entry("/cities", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/services", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/guides/web-design-macomb-county", {
      changeFrequency: "monthly",
      priority: 0.85,
    }),
    entry("/analyze", { changeFrequency: "weekly", priority: 0.8 }),
    entry("/book", { changeFrequency: "weekly", priority: 0.85 }),
    entry("/offer", { changeFrequency: "weekly", priority: 0.85 }),
    entry("/referral", { changeFrequency: "monthly", priority: 0.7 }),
    entry("/site-map", { changeFrequency: "monthly", priority: 0.4 }),
    entry("/site-map/cities", { changeFrequency: "monthly", priority: 0.4 }),
    entry("/demos/romeo-and-vine", { priority: 0.6 }),
    entry("/demos/clemens-heating-cooling", { priority: 0.6 }),
    entry("/demos/harbor-point-dental", { priority: 0.6 }),
    entry("/demos/northside-supply", { priority: 0.6 }),
    ...serviceEntries,
    ...serviceCityEntries,
  ];
}

/** Individual Macomb County city / township pages. */
export function buildCitiesSitemap(): MetadataRoute.Sitemap {
  return cities.map((city) =>
    entry(`/cities/${city.slug}`, {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );
}

export function sitemapToXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((item) => {
      const lastmod =
        item.lastModified instanceof Date
          ? item.lastModified.toISOString()
          : item.lastModified
            ? new Date(item.lastModified).toISOString()
            : new Date().toISOString();

      const lines = [
        "  <url>",
        `    <loc>${escapeXml(item.url)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
      ];
      if (item.changeFrequency) {
        lines.push(`    <changefreq>${item.changeFrequency}</changefreq>`);
      }
      if (typeof item.priority === "number") {
        lines.push(`    <priority>${item.priority.toFixed(1)}</priority>`);
      }
      lines.push("  </url>");
      return lines.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Groups for the human-readable site map. */
export function getSiteMapGroups() {
  return [
    {
      title: "Main",
      links: [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/cities", label: "Service areas" },
        {
          href: "/guides/web-design-macomb-county",
          label: "Web design Macomb County guide",
        },
        { href: "/analyze", label: "Website analyzer" },
        { href: "/book", label: "Book a call" },
        { href: "/offer", label: "Website In A Day" },
        { href: "/referral", label: "Referral program" },
        { href: "/#work", label: "Work" },
        { href: "/#contact", label: "Contact" },
      ],
    },
    {
      title: "Services",
      links: services.map((service) => ({
        href: `/services/${service.slug}`,
        label: service.name,
      })),
    },
    {
      title: "Service areas (web design)",
      links: serviceCityPages.map((page) => {
        const city = cities.find((c) => c.slug === page.citySlug);
        return {
          href: `/services/${page.serviceSlug}/${page.citySlug}`,
          label: city
            ? `Web design in ${city.name}`
            : `Web design — ${page.citySlug}`,
        };
      }),
    },
    {
      title: "Demos",
      links: [
        { href: "/demos/romeo-and-vine", label: "Romeo & Vine" },
        {
          href: "/demos/clemens-heating-cooling",
          label: "Clemens Heating & Cooling",
        },
        { href: "/demos/harbor-point-dental", label: "Harbor Point Dental" },
        { href: "/demos/northside-supply", label: "Northside Supply" },
      ],
    },
  ] as const;
}
