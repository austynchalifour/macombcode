"use client";

import { useState, type FormEvent } from "react";
import { company, services } from "@/lib/demos/precision-paving/data";

type Status = "idle" | "sending" | "success";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    e.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="border-2 border-[var(--pp-amber)] bg-white p-8 md:p-10">
        <p className="pp-display text-3xl text-[var(--pp-ink)] md:text-4xl">
          Estimate request received.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[var(--pp-muted)]">
          Prefer to talk now? Call{" "}
          <a
            href={company.phoneHref}
            className="font-bold text-[var(--pp-ink)] underline decoration-[var(--pp-amber)] underline-offset-4"
          >
            {company.phone}
          </a>
          .
        </p>
        <button
          type="button"
          className="pp-cta mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 md:p-8">
      <label className="block">
        <span className="pp-label">Name</span>
        <input name="name" required className="pp-input" autoComplete="name" />
      </label>
      <label className="block">
        <span className="pp-label">Phone</span>
        <input
          name="phone"
          type="tel"
          required
          className="pp-input"
          autoComplete="tel"
        />
      </label>
      <label className="block">
        <span className="pp-label">City / address</span>
        <input name="location" required className="pp-input" />
      </label>
      <label className="block">
        <span className="pp-label">Project type</span>
        <select name="service" required className="pp-input" defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other">Other / not sure</option>
        </select>
      </label>
      <label className="block">
        <span className="pp-label">Project details</span>
        <textarea
          name="details"
          rows={4}
          className="pp-input resize-y"
          placeholder="Driveway size, lot striping, sealcoat, timing…"
        />
      </label>
      <button
        type="submit"
        className="pp-cta w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Request free estimate"}
      </button>
      <p className="text-center text-sm text-[var(--pp-muted)]">
        Or call{" "}
        <a
          href={company.phoneHref}
          className="font-semibold text-[var(--pp-ink)]"
        >
          {company.phone}
        </a>
      </p>
    </form>
  );
}
