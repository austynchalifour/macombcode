import { promises } from "@/lib/demos/van-dyke-electric/data";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <section id="why" className="bg-[var(--vde-paper)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vde-copper)]">
            Why Van Dyke
          </p>
          <h2 className="vde-display mt-3 max-w-2xl text-4xl text-[var(--vde-ink)] md:text-5xl">
            The truck already knows these streets.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2">
          {promises.map((item, i) => (
            <li key={item.title}>
              <Reveal>
                <p className="vde-display text-sm text-[var(--vde-copper)]">
                  0{i + 1}
                </p>
                <h3 className="vde-display mt-2 text-3xl text-[var(--vde-ink)] md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-[var(--vde-muted)] md:text-lg">
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
