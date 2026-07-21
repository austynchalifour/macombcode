import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Macomb Code",
  description:
    "Website, software, and support retainers for local businesses across Macomb County. Month-to-month plans with clear pricing.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Macomb Code
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Services
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            Websites, software, and ongoing support — sold as clear monthly
            retainers for Macomb County businesses.
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link href="/#contact" className="cta-primary text-base">
              Start a retainer
            </Link>
            <Link href="/#work" className="cta-secondary text-base">
              See our work
            </Link>
          </div>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <ul className="space-y-0">
            {services.map((service, index) => (
              <li
                key={service.slug}
                className="border-t border-mist py-10 md:grid md:grid-cols-[120px_1fr_auto] md:items-start md:gap-12"
              >
                <span className="font-display text-sm font-bold tracking-[0.18em] text-orange">
                  0{index + 1}
                </span>
                <div>
                  <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-navy">
                    <Link
                      href={`/services/${service.slug}`}
                      className="transition-colors hover:text-orange"
                    >
                      {service.name}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
                    {service.shortCopy}
                  </p>
                  <p className="mt-3 text-sm text-ink-muted italic">
                    Retainers from {service.plans[0]?.priceLabel}
                  </p>
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="cta-secondary mt-6 self-start text-sm md:mt-1"
                >
                  View plans
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
