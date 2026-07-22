import { areas, company } from "@/lib/demos/precision-paving/data";
import Reveal from "./Reveal";

export default function Areas() {
  return (
    <section id="areas" className="bg-[var(--pp-paper)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--pp-amber)]">
            Service area
          </p>
          <h2 className="pp-display mt-3 text-5xl text-[var(--pp-ink)] md:text-6xl">
            Based in {company.city.replace(", MI", "")}.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--pp-muted)]">
            Locally owned paving and sealing for Oakland County and nearby Metro
            Detroit communities. Call to confirm we cover your address.
          </p>
        </Reveal>

        <Reveal>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
            {areas.map((area) => (
              <li
                key={area}
                className="pp-display text-xl text-[var(--pp-ink)] md:text-2xl"
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
