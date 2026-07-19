import Image from "next/image";
import Link from "next/link";
import { cities } from "@/data/cities";

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/logo.png"
              alt="Macomb Code"
              width={360}
              height={180}
              className="h-auto w-[160px] md:w-[200px]"
            />
            <p className="mt-3 max-w-sm text-ink-muted italic">
              Websites &amp; software for local businesses across Macomb County.
            </p>
            <a
              href="mailto:info@macombcode.com"
              className="mt-4 inline-block font-display text-sm font-bold text-navy transition-colors hover:text-orange"
            >
              info@macombcode.com
            </a>
          </div>

          <div className="flex flex-col gap-1 text-sm text-ink-muted md:items-end">
            <Link
              href="/cities"
              className="font-display font-bold text-navy transition-colors hover:text-orange"
            >
              All service areas
            </Link>
            <p>Macomb County, Michigan</p>
            <p>© {new Date().getFullYear()} Macomb Code</p>
          </div>
        </div>

        <div className="mt-12 border-t border-mist pt-8">
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Serving Macomb County
          </p>
          <ul className="mt-4 columns-2 gap-x-8 text-sm text-ink-muted sm:columns-3 md:columns-4">
            {cities.map((city) => (
              <li key={city.slug} className="mb-2 break-inside-avoid">
                <Link
                  href={`/cities/${city.slug}`}
                  className="transition-colors hover:text-orange"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
