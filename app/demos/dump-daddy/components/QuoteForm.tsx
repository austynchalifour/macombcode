"use client";

import { useState, type FormEvent } from "react";
import { company, services } from "@/lib/demos/dump-daddy/data";

type Status = "idle" | "sending" | "success";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Demo-only: no backend — show confirmation for walkthroughs
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    e.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="border-2 border-[var(--dd-yellow)] bg-white p-8 md:p-10">
        <p className="dd-display text-3xl text-[var(--dd-ink)] md:text-4xl">
          Got it — we&apos;ll be in touch.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[var(--dd-muted)]">
          Prefer to talk now? Call or text{" "}
          <a
            href={company.phoneHref}
            className="font-bold text-[var(--dd-ink)] underline decoration-[var(--dd-yellow)] underline-offset-4"
          >
            {company.phone}
          </a>
          .
        </p>
        <button
          type="button"
          className="dd-cta mt-8"
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
        <span className="dd-label">Name</span>
        <input name="name" required className="dd-input" autoComplete="name" />
      </label>
      <label className="block">
        <span className="dd-label">Phone</span>
        <input
          name="phone"
          type="tel"
          required
          className="dd-input"
          autoComplete="tel"
        />
      </label>
      <label className="block">
        <span className="dd-label">City / ZIP</span>
        <input name="location" required className="dd-input" />
      </label>
      <label className="block">
        <span className="dd-label">What needs to go</span>
        <select name="service" required className="dd-input" defaultValue="">
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
        <span className="dd-label">Details</span>
        <textarea
          name="details"
          rows={4}
          className="dd-input resize-y"
          placeholder="Stairs? How much junk? Same-day needed?"
        />
      </label>
      <button type="submit" className="dd-cta w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request free quote"}
      </button>
      <p className="text-center text-sm text-[var(--dd-muted)]">
        Or call / text{" "}
        <a href={company.phoneHref} className="font-semibold text-[var(--dd-ink)]">
          {company.phone}
        </a>
      </p>
    </form>
  );
}
