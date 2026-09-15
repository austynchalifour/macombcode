import Image from "next/image";
import Reveal from "./Reveal";
import TriageTool from "./TriageTool";

export default function TriageSection() {
  return (
    <section id="triage" className="bg-[var(--vde-ink)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:items-start md:gap-12 md:px-8 md:py-16">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vde-amp)]">
              Built-in dispatcher
            </p>
            <h2 className="vde-display mt-3 text-4xl md:text-5xl">
              Sparks don&apos;t
              <br />
              belong in the
              <br />
              same inbox
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--vde-mist)]">
              Homeowners don&apos;t know if a tripped breaker is a fire or a
              nuisance. This tool answers before they waste a call — and tags
              the lead so emergency never sits behind an EV-charger quote.
            </p>
            <div className="relative mt-6 hidden aspect-[16/10] overflow-hidden md:block">
              <Image
                src="/demos/van-dyke-electric/charger.png"
                alt="Electrician installing a Level 2 EV charger in a garage"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="vde-grain absolute inset-0" />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <TriageTool />
        </Reveal>
      </div>
    </section>
  );
}
