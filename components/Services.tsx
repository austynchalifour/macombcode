import Link from "next/link";
import Reveal from "./Reveal";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="border-t border-mist bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Services
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-navy md:text-5xl">
            What we build for local businesses.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-10 md:mt-12 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              className={i === 1 ? "md:mt-8" : i === 2 ? "md:mt-4" : ""}
            >
              <article>
                <span className="font-display text-4xl font-extrabold tracking-tight text-orange/35 md:text-5xl">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-navy md:text-3xl">
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-orange"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-ink-muted">
                  {service.shortCopy}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="cta-secondary mt-4 inline-flex text-sm"
                >
                  View retainers
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
