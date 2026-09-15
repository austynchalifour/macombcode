import { areas, company } from "@/lib/demos/van-dyke-electric/data";
import Reveal from "./Reveal";

export default function Areas() {
  return (
    <section id="areas" className="bg-[var(--vde-bone)]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vde-copper)]">
            Service area
          </p>
          <h2 className="vde-display mt-3 text-4xl text-[var(--vde-ink)] md:text-5xl">
            Based on Van Dyke in Warren.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--vde-muted)]">
            {company.tagline} If you&apos;re nearby and it&apos;s unsafe to wait,
            call — we&apos;ll tell you straight if we can be there tonight.
          </p>
        </Reveal>

        <Reveal>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {areas.map((area) => (
              <li
                key={area}
                className="vde-display text-xl text-[var(--vde-ink)] md:text-2xl"
              >
                {area}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
