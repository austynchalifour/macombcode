import { services } from "@/lib/demos/dump-daddy/data";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-[var(--dd-cream)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--dd-muted)]">
            What we haul
          </p>
          <h2 className="dd-display mt-3 text-5xl text-[var(--dd-ink)] md:text-6xl">
            Your junk.
            <br />
            <span className="text-[var(--dd-steel)]">Our mission.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--dd-muted)]">
            Residential and commercial — if it needs to go, we load it, haul it,
            and leave the space clear.
          </p>
        </Reveal>

        <ul className="mt-14">
          {services.map((service, i) => (
            <li key={service.id}>
              <Reveal>
                <div className="dd-service-row grid gap-2 py-7 md:grid-cols-[100px_1fr_auto] md:items-baseline md:gap-8">
                  <span className="dd-display text-sm text-[var(--dd-steel)]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="dd-display text-3xl text-[var(--dd-ink)] md:text-4xl">
                      {service.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-[var(--dd-muted)] md:text-lg">
                      {service.summary}
                    </p>
                  </div>
                  <a
                    href="#quote"
                    className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--dd-ink)] transition hover:text-[var(--dd-steel)]"
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
