import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { business } from "@/data/business";
import { cities, type City } from "@/data/cities";
import type { Service } from "@/data/services";
import type { ServiceCityPage } from "@/data/service-cities";

type Props = {
  service: Service;
  city: City;
  page: ServiceCityPage;
};

export default function ServiceCityPageView({ service, city, page }: Props) {
  const nearby = cities
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 6);

  const otherServiceCities = cities.filter(
    (c) =>
      c.slug !== city.slug &&
      [
        "sterling-heights",
        "warren",
        "clinton-township",
        "macomb-township",
        "shelby-township",
        "st-clair-shores",
      ].includes(c.slug),
  );

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
              <li>
                <Link
                  href={`/services/${service.slug}`}
                  className="transition-colors hover:text-navy"
                >
                  {service.name}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-navy">{city.name}</li>
            </ol>
          </nav>
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            {city.name}, MI · Macomb County
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            {service.name} in {city.name}, MI
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            {page.intro}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy/80">
            {city.highlight}
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <a href={business.phoneTel} className="cta-primary text-base">
              Call {business.phone}
            </a>
            <Link href="/book" className="cta-secondary text-base">
              Book a call
            </Link>
          </div>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            What {city.name} businesses get
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
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-muted">
            Prefer a monthly partnership? See{" "}
            <Link
              href={`/services/${service.slug}`}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {service.name.toLowerCase()} retainers
            </Link>{" "}
            with ongoing care after launch.
          </p>
        </div>
      </section>

      <section className="bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            Ready for a better site in {city.name}?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted italic">
            Call{" "}
            <a
              href={business.phoneTel}
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              {business.phone}
            </a>
            , book a walkthrough, or send a note — we&apos;ll talk scope and
            next steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
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

          {(nearby.length > 0 || otherServiceCities.length > 0) && (
            <div className="mt-16 border-t border-mist pt-10">
              {nearby.length > 0 && (
                <>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
                    Nearby areas
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {nearby.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/cities/${item.slug}`}
                          className="font-display text-sm font-semibold text-navy transition-colors hover:text-orange"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {otherServiceCities.length > 0 && (
                <div className={nearby.length > 0 ? "mt-10" : undefined}>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
                    Web design in other Macomb cities
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {otherServiceCities.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/services/websites/${item.slug}`}
                          className="font-display text-sm font-semibold text-navy transition-colors hover:text-orange"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
