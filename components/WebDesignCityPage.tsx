import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IndustriesServed from "@/components/seo/IndustriesServed";
import ProcessSteps from "@/components/seo/ProcessSteps";
import RelatedPages from "@/components/seo/RelatedPages";
import SeoBreadcrumbs from "@/components/seo/SeoBreadcrumbs";
import SeoCtaBand from "@/components/seo/SeoCtaBand";
import SeoFaq from "@/components/seo/SeoFaq";
import { business } from "@/data/business";
import { cities, type City } from "@/data/cities";
import { projects } from "@/data/projects";
import { defaultSeoCtaList, seoCtas } from "@/data/seo-ctas";
import type { WebDesignCityContent } from "@/data/web-design-cities";
import { webDesignCityH1 } from "@/lib/seo-content";

const serviceHighlights = [
  {
    title: "Marketing websites that convert",
    copy: (name: string) =>
      `Clear offers, strong calls to action, and mobile-first layouts built for how ${name} customers search and decide.`,
  },
  {
    title: "Local SEO structure",
    copy: (name: string) =>
      `Titles, pages, and internal links shaped so people looking for services in ${name} can find you — not a competitor two towns over.`,
  },
  {
    title: "Ongoing care after launch",
    copy: () =>
      "Optional retainers for updates, speed checks, and monthly improvements so your site keeps winning leads.",
  },
];

type Props = {
  city: City;
  page: WebDesignCityContent;
};

export default function WebDesignCityPage({ city, page }: Props) {
  const nearby = cities
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 6);

  const demoProjects = projects.slice(0, 4);

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
              { name: city.name },
            ]}
          />
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            {city.name}, MI · Macomb County
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            {webDesignCityH1(city)}
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
            Why businesses in {city.name} need better websites
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {page.localNotes}
          </p>
          <ul className="mt-10 max-w-3xl space-y-5">
            {page.whyBetterWebsites.map((item) => (
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
            Website design services in {city.name}
          </h2>
          <ul className="mt-12 space-y-10">
            {serviceHighlights.map((service, i) => (
              <li
                key={service.title}
                className="border-t border-mist pt-8 md:grid md:grid-cols-[160px_1fr] md:gap-12"
              >
                <span className="font-display text-sm font-bold tracking-[0.18em] text-orange">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-navy md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
                    {service.copy(city.name)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-muted">
            Prefer a monthly partnership? See{" "}
            <Link
              href="/services/web-design"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              web design retainers
            </Link>{" "}
            with ongoing care after launch. Also explore{" "}
            <Link
              href="/services/software-development"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              software development
            </Link>{" "}
            and{" "}
            <Link
              href="/services/ai-solutions"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              AI solutions
            </Link>
            .
          </p>
        </div>
      </section>

      <IndustriesServed citySlug={city.slug} cityName={city.name} />

      <ProcessSteps title={`Our website process for ${city.name}`} />

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
            Portfolio examples
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/75">
            Preview how we present local industries — then request a demo tailored
            to your {city.name} business.
          </p>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {demoProjects.map((project) => (
              <li key={project.name} className="border-t border-white/15 pt-6">
                <h3 className="font-display text-xl font-bold">
                  {project.url ? (
                    <Link
                      href={project.url}
                      className="transition-colors hover:text-orange"
                    >
                      {project.name}
                    </Link>
                  ) : (
                    project.name
                  )}
                </h3>
                <p className="mt-2 text-sm text-orange/90">{project.type}</p>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  {project.result}
                </p>
                {project.url && (
                  <Link
                    href={project.url}
                    className="mt-4 inline-block font-display text-sm font-semibold text-orange transition-colors hover:text-paper"
                  >
                    View demo →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SeoFaq title={`Frequently asked questions — ${city.name}`} faqs={page.faqs} />

      <SeoCtaBand
        title={`Ready for a better website in ${city.name}?`}
        description={
          <>
            Get a free website review, book a call, or request a demo. Call{" "}
            <a
              href={business.phoneTel}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {business.phone}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${business.email}`}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {business.email}
            </a>
            .
          </>
        }
        ctas={defaultSeoCtaList}
      >
        <RelatedPages
          groups={[
            {
              title: "Nearby web design pages",
              links: nearby.map((item) => ({
                href: `/web-design/${item.slug}`,
                label: item.name,
              })),
            },
            {
              title: "City overview",
              links: [
                {
                  href: `/cities/${city.slug}`,
                  label: `${city.name} overview`,
                },
                { href: "/cities", label: "All Macomb County cities" },
                { href: "/industries", label: "Industries we serve" },
                { href: "/book", label: "Book a call" },
              ],
            },
          ]}
        />
      </SeoCtaBand>

      <Footer />
    </>
  );
}
