import Reveal from "./Reveal";

export default function Approach() {
  return (
    <section id="approach" className="bg-navy text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Approach
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Local partners. Practical builds. No fluff.
          </h2>
        </Reveal>

        <Reveal>
          <div className="mt-12 max-w-3xl border-l-2 border-orange pl-6 md:mt-16 md:pl-10">
            <p className="text-xl leading-relaxed text-paper/80 md:text-2xl">
              We work with owners and teams across Macomb County who need more
              than a template — a site or system that matches how they actually
              operate. Straight talk, clear timelines, and craft that holds up
              after launch day.
            </p>
            <p className="mt-6 text-xl leading-relaxed text-paper/80 md:text-2xl">
              Every decision answers one question: will this help your customers
              say yes?
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
