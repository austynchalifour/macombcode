"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { normalizeSlug } from "@/lib/referral-slug";

export default function ReferralPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const previewSlug = useMemo(() => normalizeSlug(slug) || "your-name", [slug]);
  const previewPath = `/r/${previewSlug}`;

  async function handleClaim(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/referral/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, slug }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        link?: string;
      };

      if (!response.ok || !payload.ok || !payload.link) {
        setError(payload.error || "Could not claim that link.");
        return;
      }

      setLink(payload.link);
    } catch {
      setError("Could not claim that link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Referral program
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            Earn 35% for every client you send.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted italic">
            Claim a custom link, share it with local businesses, and get paid
            when they become a Macomb Code client.
          </p>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            Three steps. No login required.
          </h2>
          <ol className="mt-10 max-w-3xl space-y-8">
            <li className="border-t border-mist pt-6">
              <p className="font-display text-sm font-bold text-orange">01</p>
              <h3 className="mt-2 font-display text-xl font-extrabold text-navy">
                Claim your link
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">
                Pick a short custom URL like macombcode.com/r/jake — first come,
                first served.
              </p>
            </li>
            <li className="border-t border-mist pt-6">
              <p className="font-display text-sm font-bold text-orange">02</p>
              <h3 className="mt-2 font-display text-xl font-extrabold text-navy">
                Share it with businesses
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">
                Send it to owners who need a website, software, or support. We
                remember the referral for 90 days.
              </p>
            </li>
            <li className="border-t border-mist pt-6">
              <p className="font-display text-sm font-bold text-orange">03</p>
              <h3 className="mt-2 font-display text-xl font-extrabold text-navy">
                Get paid when they buy
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">
                You earn <strong className="font-semibold text-navy">35%</strong>{" "}
                of their first paid invoice (first month of a retainer or first
                project invoice). We confirm the purchase and pay you manually.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t border-mist bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          {link ? (
            <div className="max-w-xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                Your link is ready
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
                Start sharing.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted italic">
                Commission applies to the first paid invoice only. We&apos;ll
                follow up at {email} when a referred client purchases.
              </p>
              <div className="mt-8 border-t border-mist pt-6">
                <p className="break-all font-display text-lg font-bold text-navy">
                  {link}
                </p>
                <button
                  type="button"
                  onClick={() => void copyLink()}
                  className="cta-primary mt-6 text-base"
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                Claim your link
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
                Customize your referral URL
              </h2>
              <p className="mt-3 text-base text-ink-muted italic">
                Preview:{" "}
                <span className="font-medium text-navy">
                  macombcode.com{previewPath}
                </span>
              </p>

              <form onSubmit={handleClaim} className="mt-8 space-y-6">
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
                    disabled={loading}
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
                    placeholder="you@email.com"
                    disabled={loading}
                  />
                </label>

                <label className="block">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                    Custom link
                  </span>
                  <div className="mt-2 flex items-stretch overflow-hidden rounded-none border border-mist bg-paper focus-within:border-orange">
                    <span className="flex items-center bg-paper-warm px-3 font-display text-sm text-ink-muted">
                      /r/
                    </span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="field !mt-0 flex-1 !rounded-none !border-0"
                      placeholder="your-name"
                      disabled={loading}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  className="cta-primary text-base disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Claiming…" : "Claim my link"}
                </button>

                {error ? <p className="text-sm text-orange">{error}</p> : null}
              </form>
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
            Built for friends who know local businesses.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/75 italic">
            Questions? Email{" "}
            <a
              href="mailto:info@macombcode.com"
              className="font-semibold text-paper underline decoration-orange/50 underline-offset-4 hover:text-orange"
            >
              info@macombcode.com
            </a>
            .
          </p>
          <Link href="/services" className="cta-primary mt-8 inline-flex text-base">
            See what we sell
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
