import Image from "next/image";
import { practice } from "@/lib/demos/harbor-point-dental/data";
import Reveal from "./Reveal";

export default function VisitSection() {
  return (
    <section id="visit" className="bg-[var(--hp-white)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-28">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--hp-blue)]">
              Find us
            </p>
            <h2 className="hp-display mt-3 text-4xl text-[var(--hp-ink)] md:text-5xl">
              By the shoreline,
              <br />
              easy to reach
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--hp-muted)]">
              St. Clair Shores parking is simple, the waiting room is quiet, and
              we&apos;ll text a reminder the day before — after you book online.
            </p>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                  Address
                </dt>
                <dd className="mt-1 text-base text-[var(--hp-ink)]">{practice.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                  Hours
                </dt>
                <dd className="mt-1 text-base text-[var(--hp-ink)]">{practice.hours}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={practice.phoneHref}
                    className="text-lg font-semibold text-[var(--hp-blue-deep)]"
                  >
                    {practice.phone}
                  </a>
                </dd>
              </div>
            </dl>

            <a href="#book" className="hp-cta mt-8 inline-flex">
              Book online instead
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--hp-radius)]">
            <Image
              src="/demos/harbor-point-dental/shore.png"
              alt="Calm shoreline near St. Clair Shores"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="hp-grain absolute inset-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
