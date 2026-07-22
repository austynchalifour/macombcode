import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import { business, featuredCitySlugs } from "@/data/business";
import { getCityBySlug } from "@/data/cities";
import { serviceCityPages } from "@/data/service-cities";
import { breadcrumbJsonLd } from "@/lib/seo";

const GUIDE_PATH = "/guides/web-design-macomb-county";

export const metadata: Metadata = {
  title: "Web Design in Macomb County, MI",
  description:
    "Why local websites matter for Macomb County businesses — and how Macomb Code builds sites and software that get found and convert. Serving Metro Detroit.",
  alternates: {
    canonical: GUIDE_PATH,
  },
  openGraph: {
    title: "Web Design in Macomb County, MI | Macomb Code",
    description:
      "A practical guide to websites for Macomb County businesses — local search, conversion, and what Macomb Code builds.",
    url: GUIDE_PATH,
    type: "article",
    images: [{ url: business.ogImage, alt: business.name }],
  },
};

export default function MacombCountyGuidePage() {
  const featuredCities = featuredCitySlugs
    .map((slug) => getCityBySlug(slug))
    .filter((city): city is NonNullable<typeof city> => Boolean(city));

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Web Design in Macomb County, MI",
    description:
      "Why local websites matter for Macomb County businesses and how Macomb Code builds sites that get found and convert.",
    author: {
      "@type": "Organization",
      name: business.name,
    },
    publisher: {
      "@type": "Organization",
      name: business.name,
      logo: {
        "@type": "ImageObject",
        url: `${business.url}${business.ogImage}`,
      },
    },
    mainEntityOfPage: `${business.url}${GUIDE_PATH}`,
    about: {
      "@type": "AdministrativeArea",
      name: "Macomb County",
    },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Web design Macomb County", path: GUIDE_PATH },
  ]);

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbs} />
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-navy">
                Web design Macomb County
              </li>
            </ol>
          </nav>
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Guide · Macomb County
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Web design for Macomb County businesses
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            Local customers search before they call. A clear, fast website is
            how Macomb County shops, clinics, contractors, and professional
            services win that first impression.
          </p>
        </section>
      </div>

      <article className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
            Why a local website still matters
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Across Sterling Heights, Warren, Clinton Township, and the rest of
            Macomb County, buyers compare options on their phones. If your site
            is slow, vague, or hard to contact, they move on — often to a
            competitor two miles away with a clearer offer.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Strong local sites make the offer obvious, load quickly on mobile,
            and speak to the towns you actually serve. That is what Macomb Code
            builds for businesses across Macomb County and Metro Detroit.
          </p>

          <h2 className="mt-14 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
            What Macomb Code builds
          </h2>
          <ul className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <li>
              <Link
                href="/services/websites"
                className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
              >
                Websites
              </Link>{" "}
              — marketing sites and storefronts designed to convert, with
              optional monthly care after launch.
            </li>
            <li>
              <Link
                href="/services/software"
                className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
              >
                Software
              </Link>{" "}
              — custom tools for scheduling, intake, dashboards, and workflows
              that cut busywork.
            </li>
            <li>
              <Link
                href="/services/support"
                className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
              >
                Ongoing support
              </Link>{" "}
              — updates and a local partner who can fix issues before they cost
              you leads.
            </li>
          </ul>

          <h2 className="mt-14 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
            Where we work
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            We serve communities across{" "}
            <Link
              href="/cities"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              Macomb County
            </Link>
            , including:
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {featuredCities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/cities/${city.slug}`}
                  className="font-display text-sm font-semibold text-navy transition-colors hover:text-orange"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg leading-relaxed text-ink-muted">
            Looking for web design in a specific city? Start here:
          </p>
          <ul className="mt-4 space-y-2">
            {serviceCityPages.map((page) => {
              const city = getCityBySlug(page.citySlug);
              if (!city) return null;
              return (
                <li key={page.citySlug}>
                  <Link
                    href={`/services/websites/${page.citySlug}`}
                    className="font-display text-base font-semibold text-navy transition-colors hover:text-orange"
                  >
                    Web design in {city.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <h2 className="mt-14 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
            Next steps
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Not sure where your site stands? Run a free{" "}
            <Link
              href="/analyze"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              website analysis
            </Link>
            ,{" "}
            <Link
              href="/book"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              book a short call
            </Link>
            , or reach us at{" "}
            <a
              href={business.phoneTel}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {business.phone}
            </a>
            .
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={business.phoneTel} className="cta-primary text-base">
              Call {business.phone}
            </a>
            <Link href="/book" className="cta-secondary text-base">
              Book a call
            </Link>
            <Link href="/#contact" className="cta-secondary text-base">
              Contact us
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
