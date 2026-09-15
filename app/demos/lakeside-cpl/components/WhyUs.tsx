import { promises } from "@/lib/demos/lakeside-cpl/data";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <section id="why" className="bg-[var(--lcpl-paper)]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lcpl-brass)]">
            Why Lakeside
          </p>
          <h2 className="lcpl-display mt-3 max-w-2xl text-4xl text-[var(--lcpl-ink)] md:text-5xl">
            Train here. File with the clerk.
          </h2>
        </Reveal>

        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {promises.map((item, i) => (
            <li key={item.title}>
              <Reveal>
                <p className="lcpl-display text-sm text-[var(--lcpl-brass)]">
                  0{i + 1}
                </p>
                <h3 className="lcpl-display mt-2 text-3xl text-[var(--lcpl-ink)] md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-[var(--lcpl-muted)] md:text-lg">
                  {item.copy}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
