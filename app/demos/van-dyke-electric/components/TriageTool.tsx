"use client";

import { useState } from "react";
import {
  SERVICE_PRESET_EVENT,
  SERVICE_PRESET_KEY,
  company,
  symptoms,
  type ServiceType,
  type Symptom,
} from "@/lib/demos/van-dyke-electric/data";

function statusClass(urgency: Symptom["urgency"]) {
  if (urgency === "emergency") return "vde-status-emergency";
  if (urgency === "urgent") return "vde-status-urgent";
  return "vde-status-schedule";
}

function urgencyLabel(urgency: Symptom["urgency"]) {
  if (urgency === "emergency") return "Emergency";
  if (urgency === "urgent") return "Urgent — today";
  return "Schedule";
}

function presetService(service: ServiceType) {
  try {
    sessionStorage.setItem(SERVICE_PRESET_KEY, service);
  } catch {
    /* ignore private-mode write failures */
  }
  window.dispatchEvent(
    new CustomEvent(SERVICE_PRESET_EVENT, { detail: service }),
  );
}

export default function TriageTool() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = symptoms.find((s) => s.id === activeId) ?? null;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vde-amp)]">
        Emergency triage
      </p>
      <h3 className="vde-display mt-3 text-3xl text-white md:text-4xl">
        What&apos;s going on?
      </h3>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--vde-mist)]">
        Tap the closest match. We&apos;ll tell you whether to call now or get on
        the board — the same routing a dispatcher would do on the phone.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {symptoms.map((symptom) => (
          <li key={symptom.id}>
            <button
              type="button"
              className={`vde-symptom ${activeId === symptom.id ? "is-active" : ""}`}
              aria-pressed={activeId === symptom.id}
              onClick={() => setActiveId(symptom.id)}
            >
              <span className="vde-display block text-lg">{symptom.label}</span>
              <span className="mt-1 block text-sm text-[var(--vde-mist)]">
                {symptom.hint}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div className={`mt-8 p-5 ${statusClass(active.urgency)}`} role="status">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--vde-ink)]">
            {urgencyLabel(active.urgency)}
          </p>
          <p className="vde-display mt-2 text-2xl text-[var(--vde-ink)] md:text-3xl">
            {active.headline}
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--vde-muted)]">
            {active.body}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {active.urgency === "emergency" ? (
              <a href={company.phoneHref} className="vde-cta-danger">
                Call {company.phone}
              </a>
            ) : null}
            <a
              href="#quote"
              className={
                active.urgency === "emergency" ? "vde-cta-line" : "vde-cta"
              }
              onClick={() => presetService(active.service)}
            >
              {active.urgency === "emergency"
                ? "Request a callback →"
                : "Request a quote →"}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
