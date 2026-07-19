import Image from "next/image";
import Reveal from "./Reveal";

export default function Founder() {
  return (
    <section id="founder" className="border-t border-mist bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:px-10 md:py-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-paper-warm md:aspect-[5/6]">
            <Image
              src="/austyn.jpg"
              alt="Austyn Chalifour, founder of Macomb Code"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover object-[center_20%]"
              priority={false}
            />
          </div>
        </Reveal>

        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Founder
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-navy md:text-5xl">
            Meet Austyn.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted italic md:text-xl">
            Building since he was 10 — for government agencies, eight-figure
            CEOs, and the local businesses that keep Macomb running.
          </p>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              Austyn has shipped over 100 software systems and 50+ websites.
              The craft was never the question — the lightbulb was deciding to
              put it to work for Macomb County owners who need a partner, not a
              template.
            </p>
            <p>
              That&apos;s Macomb Code: practical websites and tools from someone
              who has been building for years, and finally turned the focus
              toward helping local businesses win.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
