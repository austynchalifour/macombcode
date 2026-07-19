import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { cities, getCityBySlug, typeLabel } from "@/data/cities";

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

  const title = `Web Design in ${city.name}, MI | Macomb Code`;
  const description = `Websites and custom software for businesses in ${city.name}, Michigan. Macomb Code helps ${typeLabel(city.type)} companies get found online and win more work.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/cities/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function CityRoutePage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Macomb Code",
    description: `Web design and custom software for businesses in ${city.name}, Michigan.`,
    url: `https://macombcode.com/cities/${city.slug}`,
    email: "info@macombcode.com",
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Macomb County",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "MI",
      addressCountry: "US",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityPage city={city} />
    </>
  );
}
