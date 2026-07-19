import Image from "next/image";
import { services } from "@/lib/demos/clemens-heating-cooling/data";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-[var(--chc-steel-soft)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--chc-orange)]">
                What we fix
              </p>
              <h2 className="chc-display mt-3 text-4xl text-[var(--chc-navy)] md:text-5xl">
                Heat. Cool. Pipes.
                <br />
                Done right.
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--chc-muted)]">
                From no-heat mornings to summer AC blowouts — one local crew that shows up
                with the right tools and a straight answer.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/demos/clemens-heating-cooling/tools.png"
                alt="HVAC tools and outdoor condenser unit"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="chc-grain absolute inset-0" />
            </div>
          </Reveal>
        </div>

        <ul className="mt-14">
          {services.map((service, i) => (
            <li key={service.id}>
              <Reveal>
                <div className="chc-service-row grid gap-2 py-6 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-8">
                  <span className="chc-display text-sm text-[var(--chc-orange)]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="chc-display text-2xl text-[var(--chc-navy)] md:text-3xl">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-base text-[var(--chc-muted)] md:text-lg">
                      {service.summary}
                    </p>
                  </div>
                  <a
                    href={`#quote`}
                    className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--chc-navy)] transition hover:text-[var(--chc-orange)]"
                  >
                    Get quote →
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
