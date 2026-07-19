import Link from "next/link";
import { cities } from "@/data/cities";

export default function CitiesBanner() {
  const doubled = [...cities, ...cities];

  return (
    <section
      aria-label="Cities we serve across Macomb County"
      className="cities-banner relative overflow-hidden bg-navy py-7 md:py-9"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent md:w-28" />

      <p className="mb-4 px-5 text-center font-display text-[0.7rem] font-bold uppercase tracking-[0.28em] text-orange md:mb-5">
        Serving every corner of Macomb County
      </p>

      <div className="cities-marquee" aria-hidden="true">
        <div className="cities-marquee-track" style={{ animationDuration: "70s" }}>
          {doubled.map((city, i) => (
            <Link
              key={`${city.slug}-${i}`}
              href={`/cities/${city.slug}`}
              className="cities-marquee-item"
              tabIndex={-1}
            >
              <span>{city.name}</span>
              <span className="cities-marquee-dot">◆</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
