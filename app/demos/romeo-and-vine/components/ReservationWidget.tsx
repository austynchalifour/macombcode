"use client";

import { useState, type FormEvent } from "react";

const TIMES = [
  { value: "17:00", label: "5:00 pm" },
  { value: "17:30", label: "5:30 pm" },
  { value: "18:00", label: "6:00 pm" },
  { value: "18:30", label: "6:30 pm" },
  { value: "19:00", label: "7:00 pm" },
  { value: "19:30", label: "7:30 pm" },
  { value: "20:00", label: "8:00 pm" },
  { value: "20:30", label: "8:30 pm" },
  { value: "21:00", label: "9:00 pm" },
];

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "success"; confirmationId: string; date: string; time: string; partySize: number };

function tomorrowIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function ReservationWidget() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/demos/romeo-and-vine/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          date: data.get("date"),
          time: data.get("time"),
          partySize: data.get("partySize"),
          notes: data.get("notes"),
        }),
      });

      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        confirmationId?: string;
        reservation?: { date: string; time: string; partySize: number };
      };

      if (!res.ok || !json.ok || !json.confirmationId || !json.reservation) {
        setStatus({
          type: "error",
          message: json.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        confirmationId: json.confirmationId,
        date: json.reservation.date,
        time: json.reservation.time,
        partySize: json.reservation.partySize,
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Unable to reach the reservation system. Please try again.",
      });
    }
  }

  const timeLabel =
    status.type === "success"
      ? (TIMES.find((t) => t.value === status.time)?.label ?? status.time)
      : "";

  return (
    <div className="border border-[color-mix(in_srgb,var(--rv-ink)_12%,transparent)] bg-[var(--rv-linen-soft)] p-6 md:p-8">
      {status.type === "success" ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rv-terracotta)]">
            Confirmed
          </p>
          <h3 className="rv-display mt-3 text-3xl tracking-tight text-[var(--rv-ink)]">
            We saved you a table.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[var(--rv-muted)]">
            Confirmation <span className="font-semibold text-[var(--rv-ink)]">{status.confirmationId}</span>
            {" · "}
            {status.partySize} {status.partySize === 1 ? "guest" : "guests"} on{" "}
            {new Date(`${status.date}T12:00:00`).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            at {timeLabel}.
          </p>
          <p className="mt-3 text-sm text-[var(--rv-muted)]">
            In production, this would sync to your booking calendar and send a confirmation email.
          </p>
          <button
            type="button"
            className="rv-cta mt-6"
            onClick={() => setStatus({ type: "idle" })}
          >
            Make another reservation
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rv-terracotta)]">
            Reservations
          </p>
          <h3 className="rv-display mt-3 text-3xl tracking-tight text-[var(--rv-ink)]">
            Book your table
          </h3>
          <p className="mt-3 text-base leading-relaxed text-[var(--rv-muted)]">
            A working reservation widget — not a mailto link. Parties larger than 12,
            please call.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                Name
              </span>
              <input
                name="name"
                required
                autoComplete="name"
                className="rv-field mt-1"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="rv-field mt-1"
                placeholder="you@email.com"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                Phone
              </span>
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className="rv-field mt-1"
                placeholder="(586) 555-0100"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                Date
              </span>
              <input
                name="date"
                type="date"
                required
                min={tomorrowIso()}
                className="rv-field mt-1"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                Time
              </span>
              <select name="time" required defaultValue="" className="rv-field mt-1">
                <option value="" disabled>
                  Select a time
                </option>
                {TIMES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                Party size
              </span>
              <select name="partySize" required defaultValue="2" className="rv-field mt-1">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                Notes <span className="normal-case tracking-normal">(optional)</span>
              </span>
              <input
                name="notes"
                className="rv-field mt-1"
                placeholder="Anniversary, high chair, allergies…"
              />
            </label>
          </div>

          {status.type === "error" ? (
            <p className="mt-4 text-sm text-[var(--rv-terracotta)]" role="alert">
              {status.message}
            </p>
          ) : null}

          <button
            type="submit"
            className="rv-cta mt-8 w-full sm:w-auto"
            disabled={status.type === "loading"}
          >
            {status.type === "loading" ? "Checking availability…" : "Request reservation"}
          </button>
        </form>
      )}
    </div>
  );
}
