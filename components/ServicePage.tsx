import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { featuredCitySlugs } from "@/data/business";
import { getCityBySlug } from "@/data/cities";
import { services, type Service } from "@/data/services";

function contactHref(planName: string) {
  return `/?plan=${encodeURIComponent(planName)}#contact`;
}

export default function ServicePage({ service }: { service: Service }) {
  const others = services.filter((item) => item.slug !== service.slug);
  const featuredCities = featuredCitySlugs
    .map((slug) => getCityBySlug(slug))
    .filter((city): city is NonNullable<typeof city> => Boolean(city));

  return (
    <>
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
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-navy"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-navy">{service.name}</li>
            </ol>
          </nav>
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Macomb Code · {service.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            {service.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            {service.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link href="/#contact" className="cta-primary text-base">
              Start a retainer
            </Link>
            <Link href="/services" className="cta-secondary text-base">
              All services
            </Link>
          </div>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            What you get
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            {service.headline}
          </h2>
          <ul className="mt-10 max-w-3xl space-y-5">
            {service.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="border-t border-mist pt-5 text-lg leading-relaxed text-ink-muted"
              >
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-mist bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Monthly retainers
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            Pick a plan that matches how fast you need to move.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted italic">
            Month-to-month after the first 30 days. Custom scope available —
            ask.
          </p>

          <ul className="mt-12 space-y-0">
            {service.plans.map((plan) => (
              <li
                key={plan.name}
                className={`border-t border-mist py-10 ${
                  plan.featured ? "border-l-4 border-l-orange pl-5 md:pl-6" : ""
                }`}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-navy md:text-3xl">
                        {plan.name}
                      </h3>
                      {plan.featured ? (
                        <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-orange">
                          Most chosen
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 font-display text-3xl font-extrabold text-orange md:text-4xl">
                      {plan.priceLabel}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {plan.blurb}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {plan.includes.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed text-ink-muted"
                        >
                          — {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={contactHref(plan.name)}
                    className="cta-secondary shrink-0 self-start text-sm"
                  >
                    Start with {plan.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            Serving Macomb County
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted italic">
            We build for businesses across Macomb County and Metro Detroit —
            from Sterling Heights to St. Clair Shores and everywhere between.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
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
            <li>
              <Link
                href="/cities"
                className="font-display text-sm font-semibold text-orange transition-colors hover:text-navy"
              >
                All service areas →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
            Tell us which retainer fits.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/75 italic">
            Share a few details about your business and the plan you have in
            mind — we&apos;ll follow up on scope, timeline, and next steps.
          </p>
          <Link href="/#contact" className="cta-primary mt-8 inline-flex text-base">
            Contact Macomb Code
          </Link>

          {others.length > 0 ? (
            <div className="mt-16 border-t border-white/15 pt-10">
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
                Other services
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="font-display text-sm font-semibold text-paper transition-colors hover:text-orange"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </>
  );
}
