"use client";

import { useEffect, useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { business } from "@/data/business";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (!plan) return;
    setMessage(
      `I'm interested in ${plan}. Here's a bit about what I need:\n\n`,
    );
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setError(
          payload.error ||
            "Could not send your message. Please email us instead.",
        );
        return;
      }

      setStatus("success");
      setMessage("");
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not send your message. Please email us instead.");
    }
  }

  return (
    <section id="contact" className="border-t border-mist bg-paper-warm">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-2 md:gap-14 md:px-10 md:py-16">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-navy md:text-5xl">
            Tell us what you need built.
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted italic md:text-xl">
            Share a few details and we&apos;ll follow up on scope, timeline, and
            next steps.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={business.phoneTel}
              className="inline-block font-display text-lg font-bold text-navy transition-colors hover:text-orange"
            >
              {business.phone}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="inline-block font-display text-lg font-bold text-navy transition-colors hover:text-orange"
            >
              {business.email}
            </a>
            <p className="text-sm text-ink-muted">Serving Macomb County, MI</p>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                Name
              </span>
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                className="field mt-2"
                placeholder="Your name"
                disabled={status === "sending"}
              />
            </label>

            <label className="block">
              <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="field mt-2"
                placeholder="you@business.com"
                disabled={status === "sending"}
              />
            </label>

            <label className="block">
              <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="field mt-2 resize-y"
                placeholder="What are you looking to build?"
                disabled={status === "sending"}
              />
            </label>

            <button
              type="submit"
              className="cta-primary text-base disabled:opacity-60"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            {status === "success" && (
              <p className="text-sm font-medium text-navy">
                Message sent — we&apos;ll be in touch shortly.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-orange">
                {error}{" "}
                <a
                  href="mailto:info@macombcode.com"
                  className="font-bold underline underline-offset-2"
                >
                  info@macombcode.com
                </a>
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
