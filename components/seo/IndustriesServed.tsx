import Link from "next/link";
import { industries } from "@/data/industries";
import { getIndustryCitiesForCity } from "@/data/industry-cities";

export default function IndustriesServed({
  citySlug,
  cityName,
}: {
  citySlug?: string;
  cityName?: string;
}) {
  const title = cityName
    ? `Industries we serve in ${cityName}`
    : "Industries we serve";

  return (
    <section className="bg-navy text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/75">
          From restaurants to contractors, we build websites tuned to how your
          customers search and buy in Macomb County.
        </p>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const combo =
              citySlug &&
              getIndustryCitiesForCity(citySlug).find(
                (page) => page.industrySlug === industry.slug,
              );
            const href = combo
              ? `/web-design/${industry.slug}/${citySlug}`
              : `/industries/${industry.slug}`;

            return (
              <li key={industry.slug} className="border-t border-white/15 pt-6">
                <h3 className="font-display text-xl font-bold">
                  <Link
                    href={href}
                    className="transition-colors hover:text-orange"
                  >
                    {industry.name}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  {industry.benefits[0]}
                </p>
                <Link
                  href={href}
                  className="mt-4 inline-block font-display text-sm font-semibold text-orange transition-colors hover:text-paper"
                >
                  Learn more →
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
