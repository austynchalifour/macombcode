import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { services } from "@/data/services";

const siteUrl = "https://macombcode.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const cityEntries = cities.map((city) => ({
    url: `${siteUrl}/cities/${city.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceEntries = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/cities`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/demos/romeo-and-vine`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/demos/clemens-heating-cooling`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/demos/harbor-point-dental`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/demos/northside-supply`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...serviceEntries,
    ...cityEntries,
  ];
}
