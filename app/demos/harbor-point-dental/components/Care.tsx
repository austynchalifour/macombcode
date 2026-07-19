import Image from "next/image";
import { carePoints } from "@/lib/demos/harbor-point-dental/data";
import Reveal from "./Reveal";

export default function Care() {
  return (
    <section id="care" className="bg-[var(--hp-white)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-14">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--hp-radius)]">
              <Image
                src="/demos/harbor-point-dental/care.png"
                alt="Gentle dental care tools in soft light"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="hp-grain absolute inset-0" />
            </div>
          </Reveal>

          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--hp-blue)]">
                Approachable care
              </p>
              <h2 className="hp-display mt-3 text-4xl text-[var(--hp-ink)] md:text-5xl">
                Dentistry that feels
                <br />
                like a conversation
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--hp-muted)]">
                Soft lights, clear explanations, and a team that never rushes you
                through the hard questions — including what it costs.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {carePoints.map((point) => (
            <li key={point.title}>
              <Reveal>
                <div>
                  <h3 className="hp-display text-2xl text-[var(--hp-ink)]">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--hp-muted)]">
                    {point.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
