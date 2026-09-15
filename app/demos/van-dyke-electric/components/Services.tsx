import Image from "next/image";
import { services } from "@/lib/demos/van-dyke-electric/data";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-[var(--vde-bone)]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid items-stretch gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] md:gap-12">
          <div>
            <Reveal>
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
            </Reveal>

            <ul className="mt-8">
              {services.map((service, i) => (
                <li key={service.id}>
                  <Reveal>
                    <div className="vde-service-row grid gap-2 py-5 md:grid-cols-[88px_1fr_auto] md:items-baseline md:gap-6">
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

          <Reveal className="relative min-h-[16rem] md:min-h-full">
            <div className="relative aspect-[16/10] h-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
              <Image
                src="/demos/van-dyke-electric/panel.png"
                alt="Open residential electrical panel with copper lugs"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="vde-grain absolute inset-0" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
