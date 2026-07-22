import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage, { cityFaqs } from "@/components/CityPage";
import JsonLd from "@/components/JsonLd";
import { business } from "@/data/business";
import { cities, getCityBySlug, typeLabel } from "@/data/cities";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Web Design in ${city.name}, MI`;
  const description = `Websites and custom software for businesses in ${city.name}, Michigan. Macomb Code helps ${typeLabel(city.type)} companies get found online and win more work.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/cities/${city.slug}`,
    },
    openGraph: {
      title: `${title} | Macomb Code`,
      description,
      type: "website",
      images: [{ url: business.ogImage, alt: business.name }],
    },
  };
}

export default async function CityRoutePage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const related = cities
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 6);
  const faqs = cityFaqs(
    city,
    related.map((item) => item.name),
  );

  const businessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: business.name,
    description: `Web design and custom software for businesses in ${city.name}, Michigan.`,
    url: `${business.url}/cities/${city.slug}`,
    email: business.email,
    telephone: business.phoneTel.replace("tel:", ""),
    areaServed: [
      {
        "@type": "City",
        name: city.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Macomb County",
        },
      },
      {
        "@type": "AdministrativeArea",
        name: "Macomb County",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      addressCountry: business.addressCountry,
    },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cities", path: "/cities" },
    { name: city.name, path: `/cities/${city.slug}` },
  ]);

  return (
    <>
      <JsonLd data={businessLd} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqJsonLd(faqs)} />
      <CityPage city={city} />
    </>
  );
}
