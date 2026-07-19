import Reveal from "./Reveal";

export default function Approach() {
  return (
    <section id="approach" className="bg-navy text-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Approach
          </p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Local partners. Practical builds. No fluff.
          </h2>
        </Reveal>

        <Reveal>
          <div className="mt-8 max-w-3xl border-l-2 border-orange pl-6 md:mt-10 md:pl-8">
            <p className="text-lg leading-relaxed text-paper/80 md:text-xl">
              We work with owners and teams across Macomb County who need more
              than a template — a site or system that matches how they actually
              operate. Straight talk, clear timelines, and craft that holds up
              after launch day.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-paper/80 md:text-xl">
              Every decision answers one question: will this help your customers
              say yes?
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
