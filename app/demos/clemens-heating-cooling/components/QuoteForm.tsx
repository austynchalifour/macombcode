"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/demos/clemens-heating-cooling/data";

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

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/demos/clemens-heating-cooling/quote", {
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
      <div className="chc-zip-panel p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--chc-orange)]">
          Quote requested
        </p>
        <h3 className="chc-display mt-3 text-3xl text-[var(--chc-navy)]">
          Got it — you&apos;re in the queue
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[var(--chc-muted)]">
          Ticket <span className="font-semibold text-[var(--chc-navy)]">{status.ticketId}</span>
          {" · "}
          {status.service}
        </p>
        <p className="mt-2 text-base text-[var(--chc-muted)]">{status.message}</p>
        <p className="mt-3 text-sm text-[var(--chc-muted)]">
          Routed to <code className="text-[var(--chc-navy)]">{status.queue}</code> — in
          production this hits the right CRM list or dispatch board by service type.
        </p>
        <button
          type="button"
          className="chc-cta mt-6"
          onClick={() => setStatus({ type: "idle" })}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="chc-zip-panel p-6 md:p-8" noValidate>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--chc-orange)]">
        Quote request
      </p>
      <h3 className="chc-display mt-3 text-3xl text-[var(--chc-navy)] md:text-4xl">
        Tell us what you need
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[var(--chc-muted)]">
        Pick a service type and we route the lead to the right desk — HVAC, plumbing,
        membership, or priority dispatch.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
            Service type
          </span>
          <select name="service" required defaultValue="" className="chc-field mt-1.5">
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
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
            Name
          </span>
          <input name="name" required autoComplete="name" className="chc-field mt-1.5" />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="chc-field mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="chc-field mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
            ZIP
          </span>
          <input
            name="zip"
            inputMode="numeric"
            required
            autoComplete="postal-code"
            className="chc-field mt-1.5"
            placeholder="48043"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
            What&apos;s going on?
          </span>
          <textarea
            name="details"
            rows={3}
            className="chc-field mt-1.5 resize-y"
            placeholder="No heat since last night, AC not cooling upstairs…"
          />
        </label>
      </div>

      {status.type === "error" ? (
        <p className="mt-4 text-sm text-[var(--chc-orange)]" role="alert">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="chc-cta mt-8 w-full sm:w-auto"
        disabled={status.type === "loading"}
      >
        {status.type === "loading" ? "Sending…" : "Request quote"}
      </button>
    </form>
  );
}
