import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import IndustryCityPage from "@/components/IndustryCityPage";
import { business } from "@/data/business";
import { getCityBySlug } from "@/data/cities";
import { getIndustryBySlug } from "@/data/industries";
import {
  getIndustryCityPage,
  industryCityPages,
} from "@/data/industry-cities";
import {
  industryCityDescription,
  industryCityTitle,
} from "@/lib/seo-content";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string; city: string }>;
};

export function generateStaticParams() {
  return industryCityPages.map((page) => ({
    slug: page.industrySlug,
    city: page.citySlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: industrySlug, city: citySlug } = await params;
  const page = getIndustryCityPage(industrySlug, citySlug);
  const industry = getIndustryBySlug(industrySlug);
  const city = getCityBySlug(citySlug);
  if (!page || !industry || !city) return {};

  const title = industryCityTitle(industry, city);
  const description = industryCityDescription(industry, city, page.intro);

  return {
    title,
    description,
    alternates: {
      canonical: `/web-design/${industry.slug}/${city.slug}`,
    },
    openGraph: {
      title: `${title} | Macomb Code`,
      description,
      type: "website",
      images: [{ url: business.ogImage, alt: business.name }],
    },
  };
}

export default async function IndustryCityRoutePage({ params }: Props) {
  const { slug: industrySlug, city: citySlug } = await params;
  const page = getIndustryCityPage(industrySlug, citySlug);
  const industry = getIndustryBySlug(industrySlug);
  const city = getCityBySlug(citySlug);
  if (!page || !industry || !city) notFound();

  const faqs = [
    {
      question: `Do you design ${industry.singular} websites in ${city.name}?`,
      answer: `Yes. Macomb Code builds ${industry.name.toLowerCase()} websites for businesses in ${city.name} and across Macomb County.`,
    },
    ...industry.faqs.slice(0, 2),
  ];

  const jsonLd = [
    serviceJsonLd({
      name: `${industry.name} Website Design in ${city.name}`,
      description: page.intro,
      path: `/web-design/${industry.slug}/${city.slug}`,
      areaServedName: city.name,
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Web Design", path: "/services/web-design" },
      { name: industry.name, path: `/industries/${industry.slug}` },
      {
        name: city.name,
        path: `/web-design/${industry.slug}/${city.slug}`,
      },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <IndustryCityPage industry={industry} city={city} page={page} />
    </>
  );
}
