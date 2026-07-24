import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SeoBreadcrumbs from "@/components/seo/SeoBreadcrumbs";
import SeoCtaBand from "@/components/seo/SeoCtaBand";
import { business } from "@/data/business";
import { industries } from "@/data/industries";
import { defaultSeoCtaList } from "@/data/seo-ctas";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Website design for restaurants, roofing, HVAC, dentists, and contractors across Macomb County and Michigan. Industry-focused sites that convert local search into leads.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries We Serve | Macomb Code",
    description:
      "Website design for restaurants, roofing, HVAC, dentists, and contractors across Macomb County and Michigan.",
    type: "website",
    images: [{ url: business.ogImage, alt: business.name }],
  },
};

export default function IndustriesIndexPage() {
  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <SeoBreadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Industries" }]}
          />
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Macomb Code · Industry expertise
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Website design for Macomb County industries
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            High-intent sites for the businesses we know best — restaurants,
            roofing, HVAC, dentists, and contractors across Michigan.
          </p>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <ul className="space-y-10">
            {industries.map((industry, i) => (
              <li
                key={industry.slug}
                className="border-t border-mist pt-8 md:grid md:grid-cols-[160px_1fr] md:gap-12"
              >
                <span className="font-display text-sm font-bold tracking-[0.18em] text-orange">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="transition-colors hover:text-orange"
                    >
                      {industry.name}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
                    {industry.intro}
                  </p>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="mt-4 inline-block font-display text-sm font-semibold text-orange transition-colors hover:text-navy"
                  >
                    View industry page →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SeoCtaBand
        title="Need a site for your industry?"
        description="Get a free website review or book a call — we’ll map the right pages for your Macomb County market."
        ctas={defaultSeoCtaList}
      />

      <Footer />
    </>
  );
}
