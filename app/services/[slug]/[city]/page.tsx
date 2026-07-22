import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceCityPageView from "@/components/ServiceCityPage";
import { business } from "@/data/business";
import { getCityBySlug } from "@/data/cities";
import {
  getServiceCityPage,
  serviceCityPages,
} from "@/data/service-cities";
import { getServiceBySlug } from "@/data/services";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string; city: string }>;
};

export function generateStaticParams() {
  return serviceCityPages.map((page) => ({
    slug: page.serviceSlug,
    city: page.citySlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const page = getServiceCityPage(slug, citySlug);
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!page || !service || !city) return {};

  const title = `Web Design in ${city.name}, MI`;
  const description = `${page.intro} Macomb Code builds websites for businesses in ${city.name} and across Macomb County.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}/${city.slug}`,
    },
    openGraph: {
      title: `${title} | Macomb Code`,
      description,
      type: "website",
      images: [{ url: business.ogImage, alt: business.name }],
    },
  };
}

export default async function ServiceCityRoutePage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const page = getServiceCityPage(slug, citySlug);
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!page || !service || !city) notFound();

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}`,
    description: page.intro,
    provider: {
      "@type": "ProfessionalService",
      name: business.name,
      telephone: business.phoneTel.replace("tel:", ""),
      email: business.email,
      url: business.url,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Macomb County",
      },
    },
    url: `${business.url}/services/${service.slug}/${city.slug}`,
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
    {
      name: city.name,
      path: `/services/${service.slug}/${city.slug}`,
    },
  ]);

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbs} />
      <ServiceCityPageView service={service} city={city} page={page} />
    </>
  );
}
