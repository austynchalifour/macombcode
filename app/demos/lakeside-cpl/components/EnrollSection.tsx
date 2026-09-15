import { company } from "@/lib/demos/lakeside-cpl/data";
import EnrollForm from "./EnrollForm";
import Reveal from "./Reveal";

export default function EnrollSection() {
  return (
    <section id="enroll" className="bg-[var(--lcpl-paper)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:items-start md:gap-12 md:px-8 md:py-16">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lcpl-brass)]">
              Book the class
            </p>
            <h2 className="lcpl-display mt-3 text-4xl text-[var(--lcpl-ink)] md:text-5xl">
              Enrollment that
              <br />
              hits the right desk
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--lcpl-muted)]">
              A first-time CPL student doesn&apos;t belong in the same inbox as
              a private lesson. This form tags and routes by course so the right
              person confirms your seat.
            </p>
            <dl className="mt-10 space-y-5 text-[var(--lcpl-ink)]">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
                  Call / text
                </dt>
                <dd className="mt-1">
                  <a
                    href={company.phoneHref}
                    className="lcpl-display text-2xl text-[var(--lcpl-brass)]"
                  >
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
                  Facility
                </dt>
                <dd className="mt-1 text-base">{company.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
                  Hours
                </dt>
                <dd className="mt-1 text-base">{company.hours}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal>
          <EnrollForm />
        </Reveal>
      </div>
    </section>
  );
}
