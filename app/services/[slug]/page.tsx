import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServicePage from "@/components/ServicePage";
import { business } from "@/data/business";
import { getServiceBySlug, services } from "@/data/services";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.name} Retainers`;
  const description = `${service.intro} Monthly plans from ${service.plans[0]?.priceLabel}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${title} | Macomb Code`,
      description,
      type: "website",
      images: [{ url: business.ogImage, alt: business.name }],
    },
  };
}

export default async function ServiceRoutePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.intro,
    provider: {
      "@type": "ProfessionalService",
      name: business.name,
      telephone: business.phoneTel.replace("tel:", ""),
      email: business.email,
      url: business.url,
    },
    areaServed: business.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    url: `${business.url}/services/${service.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} retainers`,
      itemListElement: service.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.blurb,
        priceCurrency: "USD",
      })),
    },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbs} />
      <ServicePage service={service} />
    </>
  );
}
