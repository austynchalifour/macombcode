import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import WebDesignCityPage from "@/components/WebDesignCityPage";
import { business } from "@/data/business";
import { cities, getCityBySlug } from "@/data/cities";
import {
  getWebDesignCityPage,
  webDesignCityPages,
} from "@/data/web-design-cities";
import {
  webDesignCityDescription,
  webDesignCityTitle,
} from "@/lib/seo-content";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return webDesignCityPages.map((page) => ({ slug: page.citySlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getWebDesignCityPage(slug);
  const city = getCityBySlug(slug);
  if (!page || !city) return {};

  const title = webDesignCityTitle(city);
  const description = webDesignCityDescription(city, page);

  return {
    title,
    description,
    alternates: {
      canonical: `/web-design/${city.slug}`,
    },
    openGraph: {
      title: `${title} | Macomb Code`,
      description,
      type: "website",
      images: [{ url: business.ogImage, alt: business.name }],
    },
  };
}

export default async function WebDesignCityRoutePage({ params }: Props) {
  const { slug } = await params;
  const page = getWebDesignCityPage(slug);
  const city = getCityBySlug(slug);
  if (!page || !city) notFound();

  const isCity = cities.some((c) => c.slug === slug);
  if (!isCity) notFound();

  const jsonLd = [
    serviceJsonLd({
      name: `Website Design in ${city.name}`,
      description: page.intro,
      path: `/web-design/${city.slug}`,
      areaServedName: city.name,
    }),
    faqJsonLd(page.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Web Design", path: "/services/web-design" },
      { name: city.name, path: `/web-design/${city.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <WebDesignCityPage city={city} page={page} />
    </>
  );
}
