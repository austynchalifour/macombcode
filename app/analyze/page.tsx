"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import AnalyzeReportView from "@/components/AnalyzeReportView";
import type { AnalyzeResult } from "@/lib/analyze/metrics";

function scoreBand(score: number): "good" | "ok" | "poor" {
  if (score >= 75) return "good";
  if (score >= 50) return "ok";
  return "poor";
}

const bandText = {
  good: "text-emerald-800",
  ok: "text-amber-800",
  poor: "text-orange",
};

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState("");
  const [softFail, setSoftFail] = useState(false);
  const [softFailMessage, setSoftFailMessage] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [softFailThanks, setSoftFailThanks] = useState(false);

  async function handleAnalyze(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSoftFail(false);
    setSoftFailMessage("");
    setSoftFailThanks(false);
    setResult(null);
    setUnlocked(false);
    setShareUrl(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, topic }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        softFail?: boolean;
        error?: string;
        message?: string;
        result?: AnalyzeResult;
      };

      if (payload.ok && payload.result) {
        setResult(payload.result);
        return;
      }

      if (payload.softFail) {
        setSoftFail(true);
        setSoftFailMessage(
          payload.message ||
            "We couldn't auto-scan this one, but we'll take a personal look.",
        );
        return;
      }

      setError(payload.error || "Could not analyze that website.");
    } catch {
      setSoftFail(true);
      setSoftFailMessage(
        "We couldn't auto-scan this one, but we'll take a personal look if you leave your email.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUnlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUnlocking(true);
    setError("");

    try {
      const response = await fetch("/api/analyze/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          url: result?.url || url,
          focusTopic: result?.focusTopic || topic || null,
          scanStatus: softFail ? "failed" : "ok",
          result: softFail ? null : result,
        }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        reportUrl?: string | null;
      };

      if (!response.ok || !payload.ok) {
        setError(payload.error || "Could not unlock the report.");
        return;
      }

      if (softFail) {
        setSoftFailThanks(true);
        return;
      }

      setShareUrl(payload.reportUrl || null);
      setUnlocked(true);
    } catch {
      setError("Could not unlock the report. Please try again.");
    } finally {
      setUnlocking(false);
    }
  }

  const teaserCategories = result
    ? [
        { label: "Reach you", data: result.reachability },
        { label: "Conversion", data: result.conversion },
        { label: "Relevance", data: result.relevance },
        { label: "SEO", data: result.seo },
        { label: "Readability", data: result.readability },
        { label: "Design", data: result.design },
      ]
    : [];
  const teaserFreshness = result?.freshness;

  return (
    <main className="min-h-svh bg-paper">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-10 md:py-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              Free tool
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-navy md:text-5xl">
              Website analyzer
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted italic">
              See if customers can find you, reach you, and take action — then
              unlock a full fix list built for local businesses.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 font-display text-sm font-semibold text-navy/60 transition-colors hover:text-orange"
          >
            ← Site
          </Link>
        </div>

        <form onSubmit={handleAnalyze} className="mt-10 max-w-2xl space-y-6">
          <label className="block">
            <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
              Website URL
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="field mt-2"
              placeholder="https://yourbusiness.com"
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
              Focus topic (optional)
            </span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="field mt-2"
              placeholder="e.g. Macomb County HVAC"
              disabled={loading}
            />
          </label>

          <button
            type="submit"
            className="cta-primary text-base disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Analyzing…" : "Analyze website"}
          </button>

          {error && !softFail ? (
            <p className="text-sm text-orange">{error}</p>
          ) : null}
        </form>

        {softFail ? (
          <section className="mt-14 max-w-2xl border-t border-mist pt-10">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              Manual review
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy">
              We couldn&apos;t auto-scan this one
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-muted italic">
              {softFailMessage}
            </p>

            {softFailThanks ? (
              <p className="mt-6 text-base font-medium text-navy">
                Got it — we&apos;ll take a personal look and follow up at{" "}
                {email}.
              </p>
            ) : (
              <form onSubmit={handleUnlock} className="mt-8 space-y-5">
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
                    disabled={unlocking}
                  />
                </label>
                <button
                  type="submit"
                  className="cta-primary text-base disabled:opacity-60"
                  disabled={unlocking}
                >
                  {unlocking ? "Sending…" : "Request a personal look"}
                </button>
                {error ? <p className="text-sm text-orange">{error}</p> : null}
              </form>
            )}
          </section>
        ) : null}

        {result && !unlocked ? (
          <section className="mt-14 border-t border-mist pt-10">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              Snapshot
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
              {result.title || result.finalUrl}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{result.finalUrl}</p>

            <div className="mt-8 space-y-8">
              <div className="border-t-2 border-orange pt-4">
                <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
                  Overall
                </p>
                <p
                  className={`mt-2 font-display text-5xl font-extrabold ${bandText[scoreBand(result.overallScore)]}`}
                >
                  {result.overallScore}
                </p>
                <p className="mt-2 text-sm text-ink-muted italic">
                  Weighted toward whether customers can reach you and take
                  action.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {teaserCategories.map((item) => (
                  <div key={item.label} className="border-t border-mist pt-4">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
                      {item.label}
                    </p>
                    <p
                      className={`mt-2 font-display text-4xl font-extrabold ${bandText[scoreBand(item.data.score)]}`}
                    >
                      {item.data.score}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted italic">
                      {item.data.summary}
                    </p>
                  </div>
                ))}
              </div>
              {teaserFreshness ? (
                <div className="max-w-2xl border-t border-mist pt-4">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
                    Freshness
                  </p>
                  <p
                    className={`mt-2 font-display text-4xl font-extrabold ${bandText[scoreBand(teaserFreshness.score)]}`}
                  >
                    {teaserFreshness.score}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted italic">
                    {teaserFreshness.summary}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-12 max-w-lg border-t border-mist pt-10">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                Unlock full report
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-navy">
                Enter your email to see the full breakdown
              </h3>
              <p className="mt-2 text-base text-ink-muted italic">
                Findings, prioritized fixes, a shareable link, and a branded PDF
                — free.
              </p>
              <form onSubmit={handleUnlock} className="mt-6 space-y-5">
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
                    disabled={unlocking}
                  />
                </label>
                <button
                  type="submit"
                  className="cta-primary text-base disabled:opacity-60"
                  disabled={unlocking}
                >
                  {unlocking ? "Unlocking…" : "Unlock full report"}
                </button>
                {error ? <p className="text-sm text-orange">{error}</p> : null}
              </form>
            </div>
          </section>
        ) : null}

        {result && unlocked ? (
          <section className="mt-14 border-t border-mist pt-10">
            <AnalyzeReportView result={result} shareUrl={shareUrl} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
