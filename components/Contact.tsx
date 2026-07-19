"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Project inquiry from ${name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    setStatus("ready");
    window.location.href = `mailto:info@macombcode.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="border-t border-mist bg-paper-warm">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Contact
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-navy md:text-5xl">
            Tell us what you need built.
          </h2>
          <p className="mt-5 max-w-md text-xl leading-relaxed text-ink-muted italic">
            Share a few details and we&apos;ll follow up on scope, timeline, and
            next steps.
          </p>
          <a
            href="mailto:info@macombcode.com"
            className="mt-8 inline-block font-display text-lg font-bold text-navy transition-colors hover:text-orange"
          >
            info@macombcode.com
          </a>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-8">
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
                className="field mt-2 resize-y"
                placeholder="What are you looking to build?"
              />
            </label>

            <button type="submit" className="cta-primary text-base">
              Send message
            </button>

            {status === "ready" && (
              <p className="text-sm text-ink-muted">Opening your email client…</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
