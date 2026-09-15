"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  COURSE_PRESET_EVENT,
  COURSE_PRESET_KEY,
  courseLabels,
  courses,
  upcomingClasses,
  type CourseType,
} from "@/lib/demos/lakeside-cpl/data";

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; message: string }
  | {
      type: "success";
      ticketId: string;
      queue: string;
      course: string;
      message: string;
    };

const VALID_COURSES = new Set(courses.map((c) => c.id));

function readPreset(): CourseType | "" {
  try {
    const stored = sessionStorage.getItem(COURSE_PRESET_KEY);
    if (stored && VALID_COURSES.has(stored as CourseType)) {
      return stored as CourseType;
    }
  } catch {
    /* ignore */
  }
  return "";
}

export default function EnrollForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [preset, setPreset] = useState<CourseType | "">("");

  useEffect(() => {
    setPreset(readPreset());

    function onPreset(event: Event) {
      const detail = (event as CustomEvent<CourseType>).detail;
      if (detail && VALID_COURSES.has(detail)) {
        setPreset(detail);
      }
    }

    window.addEventListener(COURSE_PRESET_EVENT, onPreset);
    return () => window.removeEventListener(COURSE_PRESET_EVENT, onPreset);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/demos/lakeside-cpl/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          zip: data.get("zip"),
          course: data.get("course"),
          classDate: data.get("classDate"),
          notes: data.get("notes"),
        }),
      });

      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        ticketId?: string;
        queue?: string;
        course?: string;
        message?: string;
      };

      if (!res.ok || !json.ok || !json.ticketId || !json.queue || !json.course) {
        setStatus({
          type: "error",
          message: json.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        ticketId: json.ticketId,
        queue: json.queue,
        course: json.course,
        message: json.message ?? "",
      });
      setPreset("");
      try {
        sessionStorage.removeItem(COURSE_PRESET_KEY);
      } catch {
        /* ignore */
      }
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Unable to submit right now. Please try again.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <div className="lcpl-panel p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--lcpl-brass)]">
          Enrollment requested
        </p>
        <h3 className="lcpl-display mt-3 text-3xl text-[var(--lcpl-ink)]">
          Got it — you&apos;re on the list
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[var(--lcpl-muted)]">
          Ticket{" "}
          <span className="font-semibold text-[var(--lcpl-ink)]">
            {status.ticketId}
          </span>
          {" · "}
          {status.course}
        </p>
        <p className="mt-2 text-base text-[var(--lcpl-muted)]">{status.message}</p>
        <p className="mt-3 text-sm text-[var(--lcpl-muted)]">
          Routed to <code className="text-[var(--lcpl-ink)]">{status.queue}</code>{" "}
          — in production this hits the right roster or instructor calendar by
          course type.
        </p>
        <button
          type="button"
          className="lcpl-cta mt-6"
          onClick={() => setStatus({ type: "idle" })}
        >
          Submit another
        </button>
      </div>
    );
  }

  const dateOptions = preset
    ? upcomingClasses.filter((c) => c.course === preset)
    : upcomingClasses;

  return (
    <form onSubmit={onSubmit} className="lcpl-panel p-6 md:p-8" noValidate>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--lcpl-brass)]">
        Class enrollment
      </p>
      <h3 className="lcpl-display mt-3 text-3xl text-[var(--lcpl-ink)] md:text-4xl">
        Hold a seat
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[var(--lcpl-muted)]">
        Pick a course and we route the request — first-time intake, renewal
        desk, private lessons, or fundamentals board.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
            Course
          </span>
          <select
            name="course"
            required
            value={preset}
            onChange={(e) => setPreset(e.target.value as CourseType | "")}
            className="lcpl-field mt-1.5"
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
            Preferred date
          </span>
          <select name="classDate" className="lcpl-field mt-1.5" defaultValue="">
            <option value="">No preference / private — call me</option>
            {dateOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.date} · {c.time} · {courseLabels[c.course]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
            Name
          </span>
          <input name="name" required autoComplete="name" className="lcpl-field mt-1.5" />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="lcpl-field mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="lcpl-field mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
            ZIP
          </span>
          <input
            name="zip"
            inputMode="numeric"
            required
            autoComplete="postal-code"
            className="lcpl-field mt-1.5"
            placeholder="48045"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--lcpl-muted)]">
            Notes
          </span>
          <textarea
            name="notes"
            rows={3}
            className="lcpl-field mt-1.5 resize-y"
            placeholder="First-time shooter, need loaner gear, prefer morning…"
          />
        </label>
      </div>

      {status.type === "error" ? (
        <p className="mt-4 text-sm text-[var(--lcpl-brass)]" role="alert">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="lcpl-cta mt-8 w-full sm:w-auto"
        disabled={status.type === "loading"}
      >
        {status.type === "loading" ? "Sending…" : "Request enrollment"}
      </button>
    </form>
  );
}
