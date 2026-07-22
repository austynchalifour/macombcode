import { services } from "@/lib/demos/precision-paving/data";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-[var(--pp-paper)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--pp-amber)]">
            What we do
          </p>
          <h2 className="pp-display mt-3 text-5xl text-[var(--pp-ink)] md:text-6xl">
            From driveways
            <br />
            to parking lots.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--pp-muted)]">
            Asphalt, sealcoating, concrete, gravel, excavation, and line striping
            — residential and commercial.
          </p>
        </Reveal>

        <ul className="mt-14">
          {services.map((service, i) => (
            <li key={service.id}>
              <Reveal>
                <div className="pp-service-row grid gap-2 py-7 md:grid-cols-[100px_1fr_auto] md:items-baseline md:gap-8">
                  <span className="pp-display text-sm text-[var(--pp-amber)]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="pp-display text-3xl text-[var(--pp-ink)] md:text-4xl">
                      {service.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-[var(--pp-muted)] md:text-lg">
                      {service.summary}
                    </p>
                  </div>
                  <a
                    href="#quote"
                    className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--pp-ink)] transition hover:text-[var(--pp-amber)]"
                  >
                    Get estimate →
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
