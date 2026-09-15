import Image from "next/image";
import { courses } from "@/lib/demos/lakeside-cpl/data";
import Reveal from "./Reveal";

export default function Courses() {
  return (
    <section id="courses" className="bg-[var(--lcpl-bone)]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid items-stretch gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] md:gap-12">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lcpl-brass)]">
                What we teach
              </p>
              <h2 className="lcpl-display mt-3 text-4xl text-[var(--lcpl-ink)] md:text-5xl">
                First-time.
                <br />
                Renewal. Basics.
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--lcpl-muted)]">
                From your first Michigan CPL certificate to a quiet private
                lesson — one Harrison Township crew that keeps the line safe
                and the paperwork clear.
              </p>
            </Reveal>

            <ul className="mt-8">
              {courses.map((course, i) => (
                <li key={course.id}>
                  <Reveal>
                    <div className="lcpl-service-row grid gap-2 py-5 md:grid-cols-[88px_1fr_auto] md:items-baseline md:gap-6">
                      <span className="lcpl-display text-sm text-[var(--lcpl-brass)]">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="lcpl-display text-2xl text-[var(--lcpl-ink)] md:text-3xl">
                          {course.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--lcpl-moss)]">
                          {course.duration}
                        </p>
                        <p className="mt-1 text-base text-[var(--lcpl-muted)] md:text-lg">
                          {course.summary}
                        </p>
                      </div>
                      <a
                        href="#enroll"
                        className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--lcpl-ink)] transition hover:text-[var(--lcpl-brass)]"
                      >
                        Enroll →
                      </a>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="relative min-h-[16rem] md:min-h-full">
            <div className="relative aspect-[16/10] h-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
              <Image
                src="/demos/lakeside-cpl/classroom.png"
                alt="Lakeside CPL classroom ready for Michigan CPL instruction"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="lcpl-grain absolute inset-0" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
