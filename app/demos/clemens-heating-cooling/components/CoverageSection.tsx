import Image from "next/image";
import Reveal from "./Reveal";
import ServiceAreaChecker from "./ServiceAreaChecker";

export default function CoverageSection() {
  return (
    <section id="coverage" className="bg-[var(--chc-navy)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:gap-12 md:px-8 md:py-28">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--chc-orange)]">
              Local utility
            </p>
            <h2 className="chc-display mt-3 text-4xl md:text-5xl">
              Know if we
              <br />
              cover you — instantly
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--chc-mist)]">
              Homeowners hate calling just to hear &ldquo;sorry, we don&apos;t go there.&rdquo;
              This checker answers before they waste a minute — and captures intent when they
              are in-area.
            </p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden">
              <Image
                src="/demos/clemens-heating-cooling/furnace.png"
                alt="Residential furnace and ductwork"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="chc-grain absolute inset-0" />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ServiceAreaChecker />
        </Reveal>
      </div>
    </section>
  );
}
