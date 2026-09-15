"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  SERVICE_PRESET_EVENT,
  SERVICE_PRESET_KEY,
  services,
  type ServiceType,
} from "@/lib/demos/van-dyke-electric/data";

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; message: string }
  | {
      type: "success";
      ticketId: string;
      queue: string;
      service: string;
      message: string;
    };

const VALID_SERVICES = new Set(services.map((s) => s.id));

function readPreset(): ServiceType | "" {
  try {
    const stored = sessionStorage.getItem(SERVICE_PRESET_KEY);
    if (stored && VALID_SERVICES.has(stored as ServiceType)) {
      return stored as ServiceType;
    }
  } catch {
    /* ignore */
  }
  return "";
}

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [preset, setPreset] = useState<ServiceType | "">("");

  useEffect(() => {
    setPreset(readPreset());

    function onPreset(event: Event) {
      const detail = (event as CustomEvent<ServiceType>).detail;
      if (detail && VALID_SERVICES.has(detail)) {
        setPreset(detail);
      }
    }

    window.addEventListener(SERVICE_PRESET_EVENT, onPreset);
    return () => window.removeEventListener(SERVICE_PRESET_EVENT, onPreset);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/demos/van-dyke-electric/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          zip: data.get("zip"),
          service: data.get("service"),
          details: data.get("details"),
        }),
      });

      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        ticketId?: string;
        queue?: string;
        service?: string;
        message?: string;
      };

      if (!res.ok || !json.ok || !json.ticketId || !json.queue || !json.service) {
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
        service: json.service,
        message: json.message ?? "",
      });
      setPreset("");
      try {
        sessionStorage.removeItem(SERVICE_PRESET_KEY);
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
      <div className="vde-panel p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vde-copper)]">
          Quote requested
        </p>
        <h3 className="vde-display mt-3 text-3xl text-[var(--vde-ink)]">
          Got it — you&apos;re in the queue
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[var(--vde-muted)]">
          Ticket{" "}
          <span className="font-semibold text-[var(--vde-ink)]">
            {status.ticketId}
          </span>
          {" · "}
          {status.service}
        </p>
        <p className="mt-2 text-base text-[var(--vde-muted)]">{status.message}</p>
        <p className="mt-3 text-sm text-[var(--vde-muted)]">
          Routed to <code className="text-[var(--vde-ink)]">{status.queue}</code>{" "}
          — in production this hits the right CRM list or dispatch board by job
          type.
        </p>
        <button
          type="button"
          className="vde-cta mt-6"
          onClick={() => setStatus({ type: "idle" })}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="vde-panel p-6 md:p-8" noValidate>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vde-copper)]">
        Quote request
      </p>
      <h3 className="vde-display mt-3 text-3xl text-[var(--vde-ink)] md:text-4xl">
        Tell us what you need
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[var(--vde-muted)]">
        Pick a job type and we route the lead — priority dispatch, EV install,
        panel estimate, or the residential board.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
            Service type
          </span>
          <select
            name="service"
            required
            value={preset}
            onChange={(e) => setPreset(e.target.value as ServiceType | "")}
            className="vde-field mt-1.5"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
            Name
          </span>
          <input name="name" required autoComplete="name" className="vde-field mt-1.5" />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="vde-field mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="vde-field mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
            ZIP
          </span>
          <input
            name="zip"
            inputMode="numeric"
            required
            autoComplete="postal-code"
            className="vde-field mt-1.5"
            placeholder="48093"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
            What&apos;s going on?
          </span>
          <textarea
            name="details"
            rows={3}
            className="vde-field mt-1.5 resize-y"
            placeholder="Breaker in the kitchen trips when the microwave runs…"
          />
        </label>
      </div>

      {status.type === "error" ? (
        <p className="mt-4 text-sm text-[var(--vde-copper)]" role="alert">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="vde-cta mt-8 w-full sm:w-auto"
        disabled={status.type === "loading"}
      >
        {status.type === "loading" ? "Sending…" : "Request quote"}
      </button>
    </form>
  );
}
