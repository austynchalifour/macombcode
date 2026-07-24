import { business } from "@/data/business";
import { cities } from "@/data/cities";

export function sitewideJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${business.url}/#business`,
        name: business.name,
        legalName: business.legalName,
        url: business.url,
        email: business.email,
        telephone: business.phoneTel.replace("tel:", ""),
        description: business.description,
        image: `${business.url}${business.ogImage}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: business.addressLocality,
          addressRegion: business.addressRegion,
          addressCountry: business.addressCountry,
        },
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Macomb County",
            containedInPlace: {
              "@type": "State",
              name: "Michigan",
            },
          },
          {
            "@type": "AdministrativeArea",
            name: "Metro Detroit",
          },
          ...cities.map((city) => ({
            "@type": "City",
            name: city.name,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: "Macomb County",
            },
          })),
        ],
        sameAs: business.sameAs,
        priceRange: "$$",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Macomb Code services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Design",
                description:
                  "Marketing websites and storefronts for Macomb County businesses.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Software Development",
                description:
                  "Custom tools for scheduling, intake, dashboards, and workflows.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Development",
                description:
                  "Practical AI assistants and automation for local business operations.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${business.url}/#website`,
        url: business.url,
        name: business.name,
        description: business.description,
        publisher: { "@id": `${business.url}/#business` },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${business.url}/#organization`,
        name: business.name,
        url: business.url,
        email: business.email,
        telephone: business.phoneTel.replace("tel:", ""),
        logo: `${business.url}${business.ogImage}`,
        sameAs: business.sameAs,
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${business.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd(options: {
  name: string;
  description: string;
  path: string;
  areaServedName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    url: `${business.url}${options.path}`,
    provider: { "@id": `${business.url}/#business` },
    areaServed: options.areaServedName
      ? {
          "@type": "City",
          name: options.areaServedName,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Macomb County",
          },
        }
      : {
          "@type": "AdministrativeArea",
          name: "Macomb County",
        },
    serviceType: options.name,
  };
}

/** Core services advertised sitewide for LocalBusiness rich results */
export const coreServiceNames = [
  "Website Design",
  "Software Development",
  "AI Development",
] as const;
