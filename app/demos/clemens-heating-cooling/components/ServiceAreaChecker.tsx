"use client";

import { useState, type FormEvent } from "react";

type Result =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; message: string }
  | {
      type: "result";
      covered: boolean;
      zip: string;
      city?: string;
      response?: string;
      message: string;
    };

export default function ServiceAreaChecker() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<Result>({ type: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/demos/clemens-heating-cooling/service-area", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        covered?: boolean;
        zip?: string;
        city?: string;
        response?: string;
        message?: string;
      };

      if (!res.ok || !json.ok) {
        setStatus({
          type: "error",
          message: json.error ?? "Something went wrong. Try again.",
        });
        return;
      }

      setStatus({
        type: "result",
        covered: Boolean(json.covered),
        zip: json.zip ?? zip,
        city: json.city,
        response: json.response,
        message: json.message ?? "",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Unable to check coverage right now.",
      });
    }
  }

  return (
    <div className="chc-zip-panel p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--chc-orange)]">
        Service area checker
      </p>
      <h3 className="chc-display mt-3 text-3xl text-[var(--chc-navy)] md:text-4xl">
        Do we cover your ZIP?
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[var(--chc-muted)]">
        Type your ZIP — we&apos;ll tell you if Clemens rolls trucks there, and how fast
        we typically dispatch. Built for local service businesses, not generic contact forms.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="chc-zip">
          ZIP code
        </label>
        <input
          id="chc-zip"
          name="zip"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="e.g. 48043"
          maxLength={10}
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="chc-field sm:max-w-[200px]"
        />
        <button
          type="submit"
          className="chc-cta"
          disabled={status.type === "loading"}
        >
          {status.type === "loading" ? "Checking…" : "Check coverage"}
        </button>
      </form>

      <p className="mt-3 text-xs text-[var(--chc-muted)]">
        Try 48043 (Mount Clemens) or 48310 (Sterling Heights).
      </p>

      {status.type === "error" ? (
        <p className="mt-5 text-sm text-[var(--chc-orange)]" role="alert">
          {status.message}
        </p>
      ) : null}

      {status.type === "result" ? (
        <div
          className={`mt-6 p-4 ${status.covered ? "chc-status-ok" : "chc-status-no"}`}
          role="status"
        >
          <p className="chc-display text-xl text-[var(--chc-navy)]">
            {status.covered ? "You're in our area" : "Outside our map — for now"}
          </p>
          <p className="mt-2 text-base leading-relaxed text-[var(--chc-muted)]">
            {status.message}
          </p>
          {status.covered && status.response ? (
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--chc-navy)]">
              Dispatch: {status.response}
            </p>
          ) : null}
          <a
            href="#quote"
            className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.12em] text-[var(--chc-orange)]"
          >
            {status.covered ? "Request a quote →" : "Still want a callback →"}
          </a>
        </div>
      ) : null}
    </div>
  );
}
