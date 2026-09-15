"use client";

import { useState } from "react";
import {
  COURSE_PRESET_EVENT,
  COURSE_PRESET_KEY,
  pathOptions,
  type CourseType,
} from "@/lib/demos/lakeside-cpl/data";

function presetCourse(course: CourseType) {
  try {
    sessionStorage.setItem(COURSE_PRESET_KEY, course);
  } catch {
    /* ignore private-mode write failures */
  }
  window.dispatchEvent(
    new CustomEvent(COURSE_PRESET_EVENT, { detail: course }),
  );
}

export default function PathfinderTool() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = pathOptions.find((o) => o.id === activeId) ?? null;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--lcpl-brass)]">
        Course pathfinder
      </p>
      <h3 className="lcpl-display mt-3 text-3xl text-white md:text-4xl">
        Which class do I need?
      </h3>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--lcpl-mist)]">
        Tap the closest match. We&apos;ll tell you what the day covers, what to
        bring, and which enrollment queue to use — the same triage a front desk
        would do on the phone.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {pathOptions.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              className={`lcpl-path ${activeId === option.id ? "is-active" : ""}`}
              aria-pressed={activeId === option.id}
              onClick={() => setActiveId(option.id)}
            >
              <span className="lcpl-display block text-lg">{option.label}</span>
              <span className="mt-1 block text-sm text-[var(--lcpl-mist)]">
                {option.hint}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div className="lcpl-status mt-8 p-5" role="status">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--lcpl-ink)]">
            Recommended
          </p>
          <p className="lcpl-display mt-2 text-2xl text-[var(--lcpl-ink)] md:text-3xl">
            {active.headline}
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--lcpl-muted)]">
            {active.body}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--lcpl-muted)]">
            <span className="font-semibold text-[var(--lcpl-ink)]">Bring:</span>{" "}
            {active.bring}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--lcpl-muted)]">
            <span className="font-semibold text-[var(--lcpl-ink)]">
              After class:
            </span>{" "}
            {active.nextStep}
          </p>
          <p className="mt-3 text-xs text-[var(--lcpl-muted)]">
            Educational overview only — not legal advice. Licensing is handled
            by the county clerk.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#enroll"
              className="lcpl-cta"
              onClick={() => presetCourse(active.course)}
            >
              Enroll in this course →
            </a>
            <a href="#schedule" className="lcpl-cta-line">
              See dates →
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
