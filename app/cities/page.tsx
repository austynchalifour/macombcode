import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { cities, type CityRegion } from "@/data/cities";

export const metadata: Metadata = {
  title: "Service Areas Across Macomb County",
  description:
    "Macomb Code builds websites and software for businesses in every city, village, and township across Macomb County, Michigan.",
  alternates: {
    canonical: "/cities",
  },
  openGraph: {
    title: "Service Areas Across Macomb County | Macomb Code",
    description:
      "Websites and software for every Macomb County city, village, and township.",
    type: "website",
    images: [{ url: "/logo.png", alt: "Macomb Code" }],
  },
};

const regionLabels: Record<CityRegion, string> = {
  south: "South Macomb",
  central: "Central Macomb",
  north: "North Macomb",
};

const regionOrder: CityRegion[] = ["south", "central", "north"];

export default function CitiesIndexPage() {
  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Macomb County
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Websites &amp; software in every Macomb community
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            Pick your city, village, or township — we help local businesses get
            found and get work online.
          </p>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl space-y-16 px-5 py-16 md:px-10 md:py-24">
          {regionOrder.map((region) => {
            const group = cities.filter((city) => city.region === region);
            return (
              <div key={region}>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy md:text-3xl">
                  {regionLabels[region]}
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {group.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/cities/${city.slug}`}
                        className="block border-b border-mist py-3 font-display text-lg font-semibold text-navy transition-colors hover:border-orange hover:text-orange"
                      >
                        {city.name}
                      </Link>
                      <Link
                        href={`/web-design/${city.slug}`}
                        className="mt-1 inline-block text-sm text-ink-muted transition-colors hover:text-orange"
                      >
                        Web design in {city.name} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
            Looking for industry-specific sites? Browse{" "}
            <Link
              href="/industries"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              industries we serve
            </Link>{" "}
            or{" "}
            <Link
              href="/book"
              className="font-semibold text-navy underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              book a call
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
