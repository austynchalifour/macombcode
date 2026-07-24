import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProcessSteps from "@/components/seo/ProcessSteps";
import RelatedPages from "@/components/seo/RelatedPages";
import SeoBreadcrumbs from "@/components/seo/SeoBreadcrumbs";
import SeoCtaBand from "@/components/seo/SeoCtaBand";
import SeoFaq from "@/components/seo/SeoFaq";
import { business } from "@/data/business";
import type { City } from "@/data/cities";
import type { Industry } from "@/data/industries";
import {
  getIndustryCitiesForIndustry,
  type IndustryCityPage,
} from "@/data/industry-cities";
import { getCityBySlug } from "@/data/cities";
import { demoCta, seoCtas } from "@/data/seo-ctas";
import { industryCityH1 } from "@/lib/seo-content";

const demoPaths: Record<string, string> = {
  "romeo-and-vine": "/demos/romeo-and-vine",
  "clemens-heating-cooling": "/demos/clemens-heating-cooling",
  "harbor-point-dental": "/demos/harbor-point-dental",
  "northside-supply": "/demos/northside-supply",
  "precision-paving": "/demos/precision-paving",
};

type Props = {
  industry: Industry;
  city: City;
  page: IndustryCityPage;
};

export default function IndustryCityPage({ industry, city, page }: Props) {
  const siblingCities = getIndustryCitiesForIndustry(industry.slug)
    .filter((item) => item.citySlug !== city.slug)
    .map((item) => {
      const sibling = getCityBySlug(item.citySlug);
      return sibling
        ? {
            href: `/web-design/${industry.slug}/${sibling.slug}`,
            label: sibling.name,
          }
        : null;
    })
    .filter((item): item is { href: string; label: string } => Boolean(item));

  const primaryDemo = industry.relatedDemoSlugs
    .map((slug) => demoPaths[slug])
    .find(Boolean);

  const ctas = [
    seoCtas.freeReview,
    seoCtas.bookCall,
    primaryDemo
      ? demoCta(primaryDemo, "Request Website Demo")
      : seoCtas.requestDemo,
  ];

  const faqs = [
    {
      question: `Do you design ${industry.singular} websites in ${city.name}?`,
      answer: `Yes. Macomb Code builds ${industry.name.toLowerCase()} websites for businesses in ${city.name} and across Macomb County — with local messaging, clear CTAs, and mobile-first performance.`,
    },
    {
      question: `What makes a strong ${industry.singular} website in ${city.name}?`,
      answer: industry.benefits.slice(0, 2).join(" "),
    },
    ...industry.faqs.slice(0, 2),
  ];

  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <SeoBreadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Web Design", href: "/services/web-design" },
              { name: industry.name, href: `/industries/${industry.slug}` },
              { name: city.name },
            ]}
          />
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            {city.name}, MI · {industry.name}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            {industryCityH1(industry, city)}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            {page.intro}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy/80">
            {city.highlight}
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link href={seoCtas.freeReview.href} className="cta-primary text-base">
              {seoCtas.freeReview.label}
            </Link>
            <Link href={seoCtas.bookCall.href} className="cta-secondary text-base">
              {seoCtas.bookCall.label}
            </Link>
          </div>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            Why {city.name} {industry.name.toLowerCase()} need a better site
          </h2>
          <ul className="mt-10 max-w-3xl space-y-5">
            {industry.painPoints.map((item) => (
              <li
                key={item}
                className="border-t border-mist pt-5 text-lg leading-relaxed text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            {industry.name} website design services
          </h2>
          <ul className="mt-10 max-w-3xl space-y-5">
            {industry.benefits.map((item) => (
              <li
                key={item}
                className="border-t border-mist pt-5 text-lg leading-relaxed text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-muted">
            Also see our{" "}
            <Link
              href={`/web-design/${city.slug}`}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {city.name} web design
            </Link>{" "}
            page and{" "}
            <Link
              href={`/industries/${industry.slug}`}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {industry.name.toLowerCase()} industry hub
            </Link>
            .
          </p>
        </div>
      </section>

      <ProcessSteps />

      <SeoFaq
        title={`FAQ — ${industry.name} in ${city.name}`}
        faqs={faqs}
      />

      <SeoCtaBand
        title={`Grow your ${city.name} ${industry.singular} online`}
        description={
          <>
            Book a call or get a free website review. Reach us at{" "}
            <a
              href={business.phoneTel}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {business.phone}
            </a>
            .
          </>
        }
        ctas={ctas}
      >
        <RelatedPages
          groups={[
            {
              title: `More ${industry.name.toLowerCase()} cities`,
              links: siblingCities,
            },
            {
              title: "Related pages",
              links: [
                {
                  href: `/web-design/${city.slug}`,
                  label: `${city.name} web design`,
                },
                {
                  href: `/industries/${industry.slug}`,
                  label: `${industry.name} industry`,
                },
                {
                  href: `/cities/${city.slug}`,
                  label: `${city.name} overview`,
                },
                { href: "/book", label: "Book a call" },
                ...(primaryDemo
                  ? [{ href: primaryDemo, label: "Related demo" }]
                  : []),
              ],
            },
          ]}
        />
      </SeoCtaBand>

      <Footer />
    </>
  );
}
