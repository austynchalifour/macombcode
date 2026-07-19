"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  timeSlots,
  visitTypes,
  type VisitType,
} from "@/lib/demos/harbor-point-dental/data";

type Step = 1 | 2;

type BookingDraft = {
  visitType: VisitType | "";
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  isNewPatient: boolean;
  insuranceProvider: string;
  allergies: string;
  medications: string;
  reason: string;
};

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; message: string }
  | {
      type: "success";
      confirmationId: string;
      visitType: string;
      date: string;
      timeLabel: string;
      patientName: string;
      message: string;
    };

const emptyDraft: BookingDraft = {
  visitType: "",
  date: "",
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  isNewPatient: true,
  insuranceProvider: "",
  allergies: "",
  medications: "",
  reason: "",
};

function tomorrowIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function BookingIntake() {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const selectedVisit = useMemo(
    () => visitTypes.find((v) => v.id === draft.visitType),
    [draft.visitType],
  );

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    if (status.type === "error") setStatus({ type: "idle" });
  }

  function goToIntake(e: FormEvent) {
    e.preventDefault();
    if (!draft.visitType) {
      setStatus({ type: "error", message: "Please choose a visit type." });
      return;
    }
    if (!draft.date) {
      setStatus({ type: "error", message: "Please choose a date." });
      return;
    }
    if (!draft.time) {
      setStatus({ type: "error", message: "Please choose a time." });
      return;
    }
    setStatus({ type: "idle" });
    setStep(2);
  }

  async function submitBooking(e: FormEvent) {
    e.preventDefault();
    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/demos/harbor-point-dental/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        confirmationId?: string;
        message?: string;
        appointment?: {
          visitType: string;
          date: string;
          timeLabel: string;
          patientName: string;
        };
      };

      if (!res.ok || !json.ok || !json.confirmationId || !json.appointment) {
        setStatus({
          type: "error",
          message: json.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        confirmationId: json.confirmationId,
        visitType: json.appointment.visitType,
        date: json.appointment.date,
        timeLabel: json.appointment.timeLabel,
        patientName: json.appointment.patientName,
        message: json.message ?? "",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Unable to reach the booking system. Please try again.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <div className="hp-panel p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--hp-blue)]">
          You&apos;re on the schedule
        </p>
        <h3 className="hp-display mt-3 text-3xl text-[var(--hp-ink)]">
          Appointment requested
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[var(--hp-muted)]">
          Confirmation{" "}
          <span className="font-semibold text-[var(--hp-ink)]">
            {status.confirmationId}
          </span>
          {" · "}
          {status.patientName}
        </p>
        <p className="mt-2 text-base text-[var(--hp-muted)]">
          {status.visitType} on{" "}
          {new Date(`${status.date}T12:00:00`).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          at {status.timeLabel}.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--hp-muted)]">
          {status.message} Intake answers (insurance, allergies, reason for visit)
          travel with the booking — no clipboard in the lobby.
        </p>
        <button
          type="button"
          className="hp-cta mt-6"
          onClick={() => {
            setDraft(emptyDraft);
            setStep(1);
            setStatus({ type: "idle" });
          }}
        >
          Book another visit
        </button>
      </div>
    );
  }

  return (
    <div className="hp-panel p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`hp-step-dot ${step === 1 ? "is-active" : "is-done"}`}>1</span>
        <span className="text-sm font-semibold text-[var(--hp-ink)]">Appointment</span>
        <span className="text-[var(--hp-mist)]">→</span>
        <span className={`hp-step-dot ${step === 2 ? "is-active" : ""}`}>2</span>
        <span className="text-sm font-semibold text-[var(--hp-ink)]">Patient intake</span>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--hp-blue)]">
        Online booking
      </p>
      <h3 className="hp-display mt-2 text-3xl text-[var(--hp-ink)] md:text-4xl">
        {step === 1 ? "Pick your visit" : "Finish intake online"}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[var(--hp-muted)]">
        {step === 1
          ? "Choose what you need and when — then we'll capture intake so the front desk isn't stuck on the phone."
          : "Same flow as the appointment. One submit, chart-ready details for the office."}
      </p>

      {step === 1 ? (
        <form onSubmit={goToIntake} className="mt-7" noValidate>
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
              Visit type
            </legend>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {visitTypes.map((visit) => (
                <button
                  key={visit.id}
                  type="button"
                  className={`hp-visit-option ${draft.visitType === visit.id ? "is-selected" : ""}`}
                  onClick={() => update("visitType", visit.id)}
                >
                  <span className="block font-semibold text-[var(--hp-ink)]">
                    {visit.name}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--hp-muted)]">
                    {visit.duration} · {visit.summary}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Preferred date
              </span>
              <input
                type="date"
                required
                min={tomorrowIso()}
                value={draft.date}
                onChange={(e) => update("date", e.target.value)}
                className="hp-field mt-1.5"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Preferred time
              </span>
              <select
                required
                value={draft.time}
                onChange={(e) => update("time", e.target.value)}
                className="hp-field mt-1.5"
              >
                <option value="" disabled>
                  Select a time
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {status.type === "error" ? (
            <p className="mt-4 text-sm text-[var(--hp-blue-deep)]" role="alert">
              {status.message}
            </p>
          ) : null}

          <button type="submit" className="hp-cta mt-7 w-full sm:w-auto">
            Continue to intake
          </button>
        </form>
      ) : (
        <form onSubmit={submitBooking} className="mt-7" noValidate>
          {selectedVisit ? (
            <p className="mb-5 rounded-[var(--hp-radius-sm)] bg-[var(--hp-sky)] px-4 py-3 text-sm text-[var(--hp-muted)]">
              Booking{" "}
              <span className="font-semibold text-[var(--hp-ink)]">
                {selectedVisit.name}
              </span>{" "}
              on{" "}
              <span className="font-semibold text-[var(--hp-ink)]">
                {new Date(`${draft.date}T12:00:00`).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-[var(--hp-ink)]">
                {timeSlots.find((t) => t.value === draft.time)?.label}
              </span>
              .
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                First name
              </span>
              <input
                required
                autoComplete="given-name"
                value={draft.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="hp-field mt-1.5"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Last name
              </span>
              <input
                required
                autoComplete="family-name"
                value={draft.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="hp-field mt-1.5"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Email
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                value={draft.email}
                onChange={(e) => update("email", e.target.value)}
                className="hp-field mt-1.5"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Phone
              </span>
              <input
                type="tel"
                required
                autoComplete="tel"
                value={draft.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="hp-field mt-1.5"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Date of birth
              </span>
              <input
                type="date"
                required
                value={draft.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
                className="hp-field mt-1.5"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Insurance (optional)
              </span>
              <input
                value={draft.insuranceProvider}
                onChange={(e) => update("insuranceProvider", e.target.value)}
                className="hp-field mt-1.5"
                placeholder="Delta Dental, BCBS…"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Allergies
              </span>
              <input
                value={draft.allergies}
                onChange={(e) => update("allergies", e.target.value)}
                className="hp-field mt-1.5"
                placeholder="Medications, latex, none…"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Current medications
              </span>
              <input
                value={draft.medications}
                onChange={(e) => update("medications", e.target.value)}
                className="hp-field mt-1.5"
                placeholder="List any medications, or none"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--hp-muted)]">
                Reason for visit
              </span>
              <textarea
                required
                rows={3}
                value={draft.reason}
                onChange={(e) => update("reason", e.target.value)}
                className="hp-field mt-1.5 resize-y"
                placeholder="Cleaning, tooth pain on the upper left, kids checkup…"
              />
            </label>
            <label className="flex items-center gap-2.5 sm:col-span-2">
              <input
                type="checkbox"
                className="hp-check"
                checked={draft.isNewPatient}
                onChange={(e) => update("isNewPatient", e.target.checked)}
              />
              <span className="text-sm text-[var(--hp-muted)]">
                This is a new patient to Harbor Point
              </span>
            </label>
          </div>

          {status.type === "error" ? (
            <p className="mt-4 text-sm text-[var(--hp-blue-deep)]" role="alert">
              {status.message}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              className="hp-cta-ghost"
              onClick={() => {
                setStep(1);
                setStatus({ type: "idle" });
              }}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="hp-cta"
              disabled={status.type === "loading"}
            >
              {status.type === "loading"
                ? "Submitting…"
                : "Confirm appointment & intake"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
