import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSiteMapGroups } from "@/lib/sitemaps";

export const metadata: Metadata = {
  title: "Site Map | Macomb Code",
  description:
    "Browse every main page on Macomb Code — services, demos, tools, and a separate map of Macomb County city pages.",
  alternates: {
    canonical: "/site-map",
  },
};

export default function SiteMapPage() {
  const groups = getSiteMapGroups();

  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Macomb Code
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Site map
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            Every main page in one place. City pages live on their own map.
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link href="/site-map/cities" className="cta-primary text-base">
              City pages map
            </Link>
            <a
              href="/sitemap.xml"
              className="cta-secondary text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              XML sitemap
            </a>
          </div>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-14 md:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                  {group.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-display text-lg font-semibold text-navy transition-colors hover:text-orange"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-mist pt-10">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              Cities
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-navy">
              Macomb County pages
            </h2>
            <p className="mt-3 max-w-xl text-base text-ink-muted italic">
              Individual city, village, and township pages are listed separately
              so they stay easy to crawl and browse.
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <Link href="/site-map/cities" className="cta-secondary text-sm">
                View city site map
              </Link>
              <a
                href="/sitemap-cities.xml"
                className="cta-secondary text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cities XML sitemap
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
