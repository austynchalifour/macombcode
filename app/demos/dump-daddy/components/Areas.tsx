import { company } from "@/lib/demos/dump-daddy/data";
import Reveal from "./Reveal";

const areas = [
  "St. Clair Shores",
  "Warren",
  "Roseville",
  "Eastpointe",
  "Clinton Township",
  "Harrison Township",
  "Sterling Heights",
  "Macomb Township",
  "Shelby Township",
  "Metro Detroit",
];

export default function Areas() {
  return (
    <section id="areas" className="bg-[var(--dd-cream)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--dd-muted)]">
            Service area
          </p>
          <h2 className="dd-display mt-3 text-5xl text-[var(--dd-ink)] md:text-6xl">
            Based in {company.area.split("&")[0].trim()}.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--dd-muted)]">
            Serving {company.counties}. If you&apos;re nearby and need junk gone,
            call — we&apos;ll tell you straight if we can get there same day.
          </p>
        </Reveal>

        <Reveal>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
            {areas.map((area) => (
              <li
                key={area}
                className="dd-display text-xl text-[var(--dd-ink)] md:text-2xl"
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
