"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { bookingConfig, type BookingPreference } from "@/data/booking-config";

function formatDateLabel(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 16, 0, 0));
  return new Intl.DateTimeFormat("en-US", {
    timeZone: bookingConfig.timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatSlotLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: bookingConfig.timezone,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function BookPage() {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preference, setPreference] = useState<BookingPreference>("phone");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successWhen, setSuccessWhen] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      setLoadingDates(true);
      try {
        const response = await fetch("/api/book/slots");
        const data = (await response.json()) as {
          ok?: boolean;
          dates?: string[];
        };
        const nextDates = data.dates ?? [];
        setDates(nextDates);
        if (nextDates[0]) setSelectedDate(nextDates[0]);
      } catch {
        setError("Could not load available dates.");
      } finally {
        setLoadingDates(false);
      }
    })();
  }, []);

  const loadSlots = useCallback(async (date: string) => {
    if (!date) return;
    setLoadingSlots(true);
    setSelectedSlot("");
    setError("");
    try {
      const response = await fetch(
        `/api/book/slots?date=${encodeURIComponent(date)}`,
      );
      const data = (await response.json()) as {
        ok?: boolean;
        slots?: string[];
        error?: string;
      };
      if (!response.ok || !data.ok) {
        setError(data.error || "Could not load times.");
        setSlots([]);
        return;
      }
      setSlots(data.slots ?? []);
    } catch {
      setError("Could not load times.");
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) void loadSlots(selectedDate);
  }, [selectedDate, loadSlots]);

  const selectedSlotLabel = useMemo(
    () => (selectedSlot ? formatSlotLabel(selectedSlot) : ""),
    [selectedSlot],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSlot) {
      setError("Pick a time first.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          preference,
          note,
          startsAt: selectedSlot,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        whenLabel?: string;
      };

      if (!response.ok || !data.ok) {
        setError(data.error || "Could not book that time.");
        if (selectedDate) void loadSlots(selectedDate);
        return;
      }

      setSuccessWhen(data.whenLabel || selectedSlotLabel);
    } catch {
      setError("Could not book that time. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Macomb Code
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Book a free 15-minute walkthrough
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            {bookingConfig.description}
          </p>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-10 md:py-20">
          {successWhen ? (
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                Confirmed
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
                You&apos;re on the calendar
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                <span className="font-medium text-navy">{successWhen}</span>
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-muted italic">
                We&apos;ll follow up by email with a phone dial-in or video link
                before the call. Looking forward to walking you through the live
                site.
              </p>
              <Link href="/" className="cta-primary mt-8 inline-flex text-base">
                Back to site
              </Link>
            </div>
          ) : (
            <>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                Pick a time
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
                {bookingConfig.durationMinutes} minutes ·{" "}
                {bookingConfig.timezoneLabel}
              </h2>
              <p className="mt-3 text-base text-ink-muted italic">
                Weekdays 9 AM – 5 PM. Earliest tomorrow.
              </p>

              {loadingDates ? (
                <p className="mt-8 text-ink-muted">Loading dates…</p>
              ) : (
                <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
                  {dates.map((ymd) => {
                    const active = ymd === selectedDate;
                    return (
                      <button
                        key={ymd}
                        type="button"
                        onClick={() => setSelectedDate(ymd)}
                        className={`min-h-14 shrink-0 border px-4 py-3 text-left font-display text-sm font-semibold transition-colors ${
                          active
                            ? "border-orange bg-orange text-paper"
                            : "border-mist bg-paper text-navy hover:border-orange/50"
                        }`}
                      >
                        {formatDateLabel(ymd)}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-8">
                <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                  Available times
                </p>
                {loadingSlots ? (
                  <p className="mt-4 text-ink-muted">Loading times…</p>
                ) : slots.length === 0 ? (
                  <p className="mt-4 text-ink-muted italic">
                    No open times this day — try another date.
                  </p>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {slots.map((iso) => {
                      const active = iso === selectedSlot;
                      return (
                        <button
                          key={iso}
                          type="button"
                          onClick={() => setSelectedSlot(iso)}
                          className={`min-h-12 border px-3 py-3 font-display text-sm font-semibold transition-colors ${
                            active
                              ? "border-orange bg-orange text-paper"
                              : "border-mist text-navy hover:border-orange/50"
                          }`}
                        >
                          {formatSlotLabel(iso)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-12 space-y-6 border-t border-mist pt-10"
              >
                <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                  Your details
                  {selectedSlotLabel
                    ? ` · ${formatDateLabel(selectedDate)} ${selectedSlotLabel}`
                    : ""}
                </p>

                <label className="block">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="field mt-2"
                    placeholder="Your name"
                    disabled={submitting}
                  />
                </label>

                <label className="block">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field mt-2"
                    placeholder="you@business.com"
                    disabled={submitting}
                  />
                </label>

                <label className="block">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                    Phone
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field mt-2"
                    placeholder="(586) 555-0123"
                    disabled={submitting}
                  />
                </label>

                <fieldset>
                  <legend className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                    Prefer
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      [
                        ["phone", "Phone call"],
                        ["video", "Video call"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setPreference(value)}
                        className={`min-h-11 border px-4 py-2 font-display text-sm font-semibold transition-colors ${
                          preference === value
                            ? "border-orange bg-orange text-paper"
                            : "border-mist text-navy hover:border-orange/50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                    Note (optional)
                  </span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="field mt-2 resize-y"
                    placeholder="Anything you want us to cover?"
                    disabled={submitting}
                  />
                </label>

                <button
                  type="submit"
                  className="cta-primary text-base disabled:opacity-60"
                  disabled={submitting || !selectedSlot}
                >
                  {submitting ? "Booking…" : "Confirm walkthrough"}
                </button>

                {error ? <p className="text-sm text-orange">{error}</p> : null}
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
