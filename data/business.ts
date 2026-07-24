export const business = {
  name: "Macomb Code",
  legalName: "Macomb Code",
  url: "https://macombcode.com",
  email: "info@macombcode.com",
  phone: "586-368-2259",
  phoneTel: "tel:+15863682259",
  description:
    "Macomb Code builds modern websites and custom software for local businesses across Macomb County and Metro Detroit.",
  areaServed: ["Macomb County", "Metro Detroit"] as const,
  addressLocality: "Macomb County",
  addressRegion: "MI",
  addressCountry: "US",
  /** Google Business Profile and social profile URLs for LocalBusiness sameAs */
  sameAs: ["https://share.google/K09sPqY84lnRy7x2e"] as string[],
  ogImage: "/logo.png",
} as const;

/** High-traffic cities for internal linking from service pages */
export const featuredCitySlugs = [
  "sterling-heights",
  "warren",
  "clinton-township",
  "macomb-township",
  "shelby-township",
  "st-clair-shores",
  "roseville",
  "mount-clemens",
] as const;
