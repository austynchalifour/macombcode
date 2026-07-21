import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { cities, type CityRegion } from "@/data/cities";

export const metadata: Metadata = {
  title: "City Pages Site Map | Macomb Code",
  description:
    "Full list of Macomb County city, village, and township pages for Macomb Code websites and software.",
  alternates: {
    canonical: "/site-map/cities",
  },
};

const regionLabels: Record<CityRegion, string> = {
  south: "South Macomb",
  central: "Central Macomb",
  north: "North Macomb",
};

const regionOrder: CityRegion[] = ["south", "central", "north"];

export default function CitiesSiteMapPage() {
  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Site map · Cities
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Every Macomb County page
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            Separate from the main site map — one link per city, village, and
            township we serve.
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link href="/site-map" className="cta-secondary text-base">
              ← Main site map
            </Link>
            <a
              href="/sitemap-cities.xml"
              className="cta-secondary text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cities XML
            </a>
          </div>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          {regionOrder.map((region) => {
            const group = cities.filter((city) => city.region === region);
            if (group.length === 0) return null;
            return (
              <div key={region} className="mb-14 last:mb-0">
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                  {regionLabels[region]}
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {group.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/cities/${city.slug}`}
                        className="font-display text-lg font-semibold text-navy transition-colors hover:text-orange"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
