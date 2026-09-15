import Image from "next/image";
import { services } from "@/lib/demos/van-dyke-electric/data";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-[var(--vde-bone)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vde-copper)]">
                What we wire
              </p>
              <h2 className="vde-display mt-3 text-4xl text-[var(--vde-ink)] md:text-5xl">
                Panels. Chargers.
                <br />
                The call at 2am.
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--vde-muted)]">
                From a sparking outlet to a 200-amp upgrade — one Warren crew
                that shows up with the right tools and a straight answer.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/demos/van-dyke-electric/panel.png"
                alt="Open residential electrical panel with copper lugs"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="vde-grain absolute inset-0" />
            </div>
          </Reveal>
        </div>

        <ul className="mt-14">
          {services.map((service, i) => (
            <li key={service.id}>
              <Reveal>
                <div className="vde-service-row grid gap-2 py-6 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-8">
                  <span className="vde-display text-sm text-[var(--vde-copper)]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="vde-display text-2xl text-[var(--vde-ink)] md:text-3xl">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-base text-[var(--vde-muted)] md:text-lg">
                      {service.summary}
                    </p>
                  </div>
                  <a
                    href="#quote"
                    className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--vde-ink)] transition hover:text-[var(--vde-copper)]"
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
