import Reveal from "./Reveal";
import BookingIntake from "./BookingIntake";

export default function BookSection() {
  return (
    <section id="book" className="bg-[var(--hp-sky)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:px-8 md:py-28">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--hp-blue)]">
              The feature offices want
            </p>
            <h2 className="hp-display mt-3 text-4xl text-[var(--hp-ink)] md:text-5xl">
              Book + intake,
              <br />
              one calm flow
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--hp-muted)]">
              Dental teams lose hours to phone tag and lobby clipboards. This demo
              pairs scheduling with patient intake so the chart is ready before the
              appointment starts.
            </p>
            <ul className="mt-8 space-y-3 text-base text-[var(--hp-muted)]">
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--hp-blue)]" />
                Visit type, date, and time in step one
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--hp-blue)]" />
                Insurance, allergies, meds, and reason in step two
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--hp-blue)]" />
                One confirmation ID for the front desk queue
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <BookingIntake />
        </Reveal>
      </div>
    </section>
  );
}
