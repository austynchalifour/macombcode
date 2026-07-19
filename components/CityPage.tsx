import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { cities, typeLabel, type City } from "@/data/cities";

const services = [
  {
    title: "Websites",
    copy: (name: string) =>
      `Marketing sites built for ${name} customers — clear offers, fast load times, and mobile-first design that converts.`,
  },
  {
    title: "Software",
    copy: (name: string) =>
      `Custom tools for ${name} teams: scheduling, intake, dashboards, and workflows that cut busywork.`,
  },
  {
    title: "Ongoing support",
    copy: () =>
      "Updates, improvements, and a local partner who can fix issues before they cost you leads.",
  },
];

export default function CityPage({ city }: { city: City }) {
  const related = cities
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 6);

  const label = typeLabel(city.type);

  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            {city.name}, Michigan · Macomb County
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Web design &amp; software for businesses in {city.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            Macomb Code builds websites and custom software for local businesses
            in this {label}. {city.highlight}
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link href="/#contact" className="cta-primary text-base">
              Start a project
            </Link>
            <Link href="/cities" className="cta-secondary text-base">
              All Macomb areas
            </Link>
          </div>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            Why {city.name} businesses choose Macomb Code
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <article>
              <h3 className="font-display text-xl font-bold text-navy">
                Local search focus
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                Pages, structure, and copy shaped so customers searching for
                services in {city.name} can find you — not a competitor two
                towns over.
              </p>
            </article>
            <article>
              <h3 className="font-display text-xl font-bold text-navy">
                Built for leads
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                Clear calls to action, fast pages, and mobile experiences that
                turn browsers into booked appointments and quote requests.
              </p>
            </article>
            <article>
              <h3 className="font-display text-xl font-bold text-navy">
                Practical partnership
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                Straight talk, clear timelines, and ongoing support from a team
                that understands Macomb County markets.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
            Services for {city.name}
          </h2>
          <ul className="mt-12 space-y-10">
            {services.map((service, i) => (
              <li
                key={service.title}
                className="border-t border-white/15 pt-8 md:grid md:grid-cols-[160px_1fr] md:gap-12"
              >
                <span className="font-display text-sm font-bold tracking-[0.18em] text-orange">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-paper/75">
                    {service.copy(city.name)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            Ready to grow in {city.name}?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted italic">
            Tell us what you need — a new website, custom software, or a refresh
            that actually brings in work. Email{" "}
            <a
              href="mailto:info@macombcode.com"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              info@macombcode.com
            </a>
            .
          </p>
          <Link href="/#contact" className="cta-primary mt-8 inline-flex text-base">
            Contact Macomb Code
          </Link>

          {related.length > 0 && (
            <div className="mt-16 border-t border-mist pt-10">
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
                Nearby areas we serve
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {related.map((item) => (
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
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
