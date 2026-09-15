import {
  courseLabels,
  upcomingClasses,
} from "@/lib/demos/lakeside-cpl/data";
import Reveal from "./Reveal";

export default function Schedule() {
  return (
    <section id="schedule" className="bg-[var(--lcpl-bone)]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lcpl-brass)]">
            Upcoming classes
          </p>
          <h2 className="lcpl-display mt-3 text-4xl text-[var(--lcpl-ink)] md:text-5xl">
            Open seats this spring
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--lcpl-muted)]">
            Demo schedule — in production these dates sync from your calendar
            and lock when a class fills.
          </p>
        </Reveal>

        <ul className="mt-8">
          {upcomingClasses.map((cls) => (
            <li key={cls.id}>
              <Reveal>
                <div className="lcpl-service-row grid gap-2 py-5 md:grid-cols-[1.1fr_1fr_auto_auto] md:items-baseline md:gap-6">
                  <div>
                    <p className="lcpl-display text-2xl text-[var(--lcpl-ink)] md:text-3xl">
                      {cls.date}
                    </p>
                    <p className="mt-1 text-base text-[var(--lcpl-muted)]">
                      {cls.time}
                    </p>
                  </div>
                  <p className="text-base font-semibold text-[var(--lcpl-ink)] md:text-lg">
                    {courseLabels[cls.course]}
                  </p>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--lcpl-moss)]">
                    {cls.seats} seats
                  </p>
                  <a
                    href="#enroll"
                    className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--lcpl-ink)] transition hover:text-[var(--lcpl-brass)]"
                  >
                    Hold a seat →
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
