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
