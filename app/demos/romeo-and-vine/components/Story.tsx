import Image from "next/image";
import Reveal from "./Reveal";

export default function Story() {
  return (
    <section id="story" className="bg-[var(--rv-forest)] text-[var(--rv-linen)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-28">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/3]">
            <Image
              src="/demos/romeo-and-vine/pasta.png"
              alt="Handmade pasta with tomato and basil"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="rv-grain absolute inset-0" />
          </div>
        </Reveal>

        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rv-terracotta)]">
              Our story
            </p>
            <h2 className="rv-display mt-4 text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
              Three generations.
              <br />
              One kitchen.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--rv-stone)]">
              What started as Sunday gravy on Main Street is now Romeo&apos;s neighborhood
              Italian wine bar — still family-run, still cooking like someone you love is
              at the table.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--rv-stone)]/85">
              Come for the pappardelle. Stay for the Barbera and the conversation that
              runs long after the plates are cleared.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
