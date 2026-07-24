import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import IndustryPage from "@/components/IndustryPage";
import { business } from "@/data/business";
import { getIndustryBySlug, industries } from "@/data/industries";
import { industryDescription, industryTitle } from "@/lib/seo-content";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ industry: string }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: industrySlug } = await params;
  const industry = getIndustryBySlug(industrySlug);
  if (!industry) return {};

  const title = industryTitle(industry);
  const description = industryDescription(industry);

  return {
    title,
    description,
    alternates: {
      canonical: `/industries/${industry.slug}`,
    },
    openGraph: {
      title: `${title} | Macomb Code`,
      description,
      type: "website",
      images: [{ url: business.ogImage, alt: business.name }],
    },
  };
}

export default async function IndustryRoutePage({ params }: Props) {
  const { industry: industrySlug } = await params;
  const industry = getIndustryBySlug(industrySlug);
  if (!industry) notFound();

  const jsonLd = [
    serviceJsonLd({
      name: industry.keywordPhrase,
      description: industry.intro,
      path: `/industries/${industry.slug}`,
    }),
    faqJsonLd(industry.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Industries", path: "/industries" },
      { name: industry.name, path: `/industries/${industry.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <IndustryPage industry={industry} />
    </>
  );
}
