import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProcessSteps from "@/components/seo/ProcessSteps";
import RelatedPages from "@/components/seo/RelatedPages";
import SeoBreadcrumbs from "@/components/seo/SeoBreadcrumbs";
import SeoCtaBand from "@/components/seo/SeoCtaBand";
import SeoFaq from "@/components/seo/SeoFaq";
import { business } from "@/data/business";
import { getCityBySlug } from "@/data/cities";
import type { Industry } from "@/data/industries";
import { getIndustryCitiesForIndustry } from "@/data/industry-cities";
import { defaultSeoCtaList, demoCta, seoCtas } from "@/data/seo-ctas";
import { industryH1 } from "@/lib/seo-content";

const demoPaths: Record<string, string> = {
  "romeo-and-vine": "/demos/romeo-and-vine",
  "clemens-heating-cooling": "/demos/clemens-heating-cooling",
  "harbor-point-dental": "/demos/harbor-point-dental",
  "northside-supply": "/demos/northside-supply",
  "precision-paving": "/demos/precision-paving",
};

export default function IndustryPage({ industry }: { industry: Industry }) {
  const cityCombos = getIndustryCitiesForIndustry(industry.slug)
    .map((page) => {
      const city = getCityBySlug(page.citySlug);
      return city
        ? {
            href: `/web-design/${industry.slug}/${city.slug}`,
            label: city.name,
          }
        : null;
    })
    .filter((item): item is { href: string; label: string } => Boolean(item));

  const relatedDemos = industry.relatedDemoSlugs
    .map((slug) => demoPaths[slug])
    .filter(Boolean)
    .map((path) => ({
      href: path,
      label: path.replace("/demos/", "").replaceAll("-", " "),
    }));

  const ctas = [
    seoCtas.freeReview,
    seoCtas.bookCall,
    ...(industry.relatedDemoSlugs[0] && demoPaths[industry.relatedDemoSlugs[0]]
      ? [demoCta(demoPaths[industry.relatedDemoSlugs[0]], "Request Website Demo")]
      : [seoCtas.requestDemo]),
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
              { name: "Industries", href: "/industries" },
              { name: industry.name },
            ]}
          />
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Macomb County · Michigan
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            {industryH1(industry)}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            {industry.intro}
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
            Challenges {industry.name.toLowerCase()} face online
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
            What you get with a {industry.singular} website
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
            Pair industry design with our{" "}
            <Link
              href="/services/web-design"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              web design retainers
            </Link>{" "}
            or explore{" "}
            <Link
              href="/services/ai-solutions"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              AI solutions
            </Link>{" "}
            for intake and follow-up.
          </p>
        </div>
      </section>

      <ProcessSteps title={`How we build ${industry.singular} websites`} />

      <SeoFaq
        title={`FAQ for ${industry.name.toLowerCase()}`}
        faqs={industry.faqs}
      />

      <SeoCtaBand
        title={`Ready for a better ${industry.singular} website?`}
        description={
          <>
            Macomb Code helps Michigan {industry.name.toLowerCase()} get found
            and convert local search. Call{" "}
            <a
              href={business.phoneTel}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {business.phone}
            </a>
            .
          </>
        }
        ctas={ctas.length ? ctas : defaultSeoCtaList}
      >
        <RelatedPages
          groups={[
            {
              title: `${industry.name} web design by city`,
              links: cityCombos,
            },
            {
              title: "Related",
              links: [
                { href: "/services/web-design", label: "Web design services" },
                { href: "/industries", label: "All industries" },
                { href: "/cities", label: "Cities we serve" },
                ...relatedDemos.map((demo) => ({
                  href: demo.href,
                  label: `Demo: ${demo.label}`,
                })),
              ],
            },
          ]}
        />
      </SeoCtaBand>

      <Footer />
    </>
  );
}
