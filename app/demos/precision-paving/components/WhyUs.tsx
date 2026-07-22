import { promises } from "@/lib/demos/precision-paving/data";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <section id="why" className="bg-[var(--pp-asphalt)] text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--pp-amber)]">
            Why Precision
          </p>
          <h2 className="pp-display mt-3 max-w-2xl text-5xl md:text-6xl">
            Get it done right.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2">
          {promises.map((item, i) => (
            <li key={item.title}>
              <Reveal>
                <p className="pp-display text-sm text-[var(--pp-amber)]">
                  0{i + 1}
                </p>
                <h3 className="pp-display mt-2 text-3xl md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-white/70 md:text-lg">
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
