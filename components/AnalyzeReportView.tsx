"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { downloadAnalyzePdf } from "@/lib/analyze/export-pdf";
import type { AnalyzeResult, Recommendation } from "@/lib/analyze/metrics";

function scoreBand(score: number): "good" | "ok" | "poor" {
  if (score >= 75) return "good";
  if (score >= 50) return "ok";
  return "poor";
}

const bandStyles = {
  good: "border-emerald-700/25 text-emerald-800",
  ok: "border-amber-600/30 text-amber-800",
  poor: "border-orange/40 text-orange",
};

const statusColor = {
  pass: "text-emerald-800",
  warn: "text-amber-800",
  fail: "text-orange",
  info: "text-ink-muted",
} as const;

const AREA_TO_CATEGORY: Record<Recommendation["area"], string> = {
  Reachability: "reachability",
  Conversion: "conversion",
  Relevance: "relevance",
  SEO: "seo",
  Readability: "readability",
  Design: "design",
  Freshness: "freshness",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categoryAnchorId(key: string) {
  return `category-${key}`;
}

function findingAnchorId(categoryKey: string, label: string) {
  return `finding-${categoryKey}-${slugify(label)}`;
}

function ScoreTile({
  label,
  score,
  summary,
  className = "",
}: {
  label: string;
  score: number;
  summary: string;
  className?: string;
}) {
  const band = scoreBand(score);
  return (
    <div className={`border-t-2 pt-4 ${bandStyles[band]} ${className}`}>
      <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
        {label}
      </p>
      <p className="mt-2 font-display text-5xl font-extrabold tracking-[-0.03em]">
        {score}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted italic">
        {summary}
      </p>
    </div>
  );
}

export function AnalyzeCta({ overallScore }: { overallScore: number }) {
  const strong = overallScore >= 75;
  return (
    <div className="mt-12 border-t border-mist pt-10">
      <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
        Next step
      </p>
      <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-navy md:text-3xl">
        {strong
          ? "Solid site — here’s what would push it further."
          : "Want these fixed?"}
      </h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
        {strong
          ? "You’re ahead of most local sites. A short call can turn the remaining gaps into more calls and bookings."
          : "These are the kinds of issues that quietly cost local businesses leads every week. We can walk through a fix plan in 15 minutes — free, no pressure."}
      </p>
      <Link href="/book" className="cta-primary mt-6 inline-flex text-base">
        Book a free 15-minute call
      </Link>
    </div>
  );
}

export default function AnalyzeReportView({
  result,
  shareUrl,
  showExport = true,
}: {
  result: AnalyzeResult;
  shareUrl?: string | null;
  showExport?: boolean;
}) {
  const [exporting, setExporting] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const categories = [
    {
      key: "reachability",
      label: "Can customers reach you",
      data: result.reachability,
    },
    {
      key: "conversion",
      label: "Conversion basics",
      data: result.conversion,
    },
    { key: "relevance", label: "Relevance", data: result.relevance },
    { key: "seo", label: "SEO", data: result.seo },
    { key: "readability", label: "Readability", data: result.readability },
    { key: "design", label: "Design", data: result.design },
    { key: "freshness", label: "Freshness", data: result.freshness },
  ] as const;

  const pairedCategories = categories.filter((item) => item.key !== "freshness");
  const freshness = categories.find((item) => item.key === "freshness")!;

  function toggleCategory(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function jumpToRecommendation(
    e: MouseEvent<HTMLAnchorElement>,
    item: Recommendation,
  ) {
    e.preventDefault();
    const categoryKey = AREA_TO_CATEGORY[item.area];
    if (!categoryKey) return;

    setExpanded((prev) => new Set(prev).add(categoryKey));

    const targetId = item.findingLabel
      ? findingAnchorId(categoryKey, item.findingLabel)
      : categoryAnchorId(categoryKey);

    window.setTimeout(() => {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function exportPdf() {
    if (exporting) return;
    setExporting(true);
    try {
      await downloadAnalyzePdf(result, result.focusTopic);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Full report
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
            {result.title || result.finalUrl}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            <a
              href={result.finalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-orange"
            >
              {result.finalUrl}
            </a>
          </p>
          {result.focusTopic ? (
            <p className="mt-2 text-sm text-ink-muted italic">
              Focus topic: {result.focusTopic}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          {showExport ? (
            <button
              type="button"
              onClick={() => void exportPdf()}
              className="cta-primary !px-4 !py-2.5 text-sm disabled:opacity-60"
              disabled={exporting}
            >
              {exporting ? "Preparing PDF…" : "Export branded PDF"}
            </button>
          ) : null}
          {shareUrl ? (
            <a
              href={shareUrl}
              className="cta-secondary text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open shareable link
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <ScoreTile
          label="Overall"
          score={result.overallScore}
          summary="Weighted toward reachability and conversion — the stuff that costs you customers."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pairedCategories.map((item) => (
            <ScoreTile
              key={item.key}
              label={item.label}
              score={item.data.score}
              summary={item.data.summary}
            />
          ))}
        </div>
        <ScoreTile
          label={freshness.label}
          score={freshness.data.score}
          summary={freshness.data.summary}
          className="max-w-2xl"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm text-ink-muted italic">
          Want help fixing these?
        </p>
        <Link href="/book" className="cta-secondary text-sm">
          Book a free call
        </Link>
      </div>

      <div className="mt-12 border-t border-mist pt-10">
        <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
          Recommended updates
        </p>
        <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-navy md:text-3xl">
          What to improve next
        </h3>
        <ol className="mt-8 space-y-6">
          {result.recommendations.map((item, index) => {
            const categoryKey = AREA_TO_CATEGORY[item.area];
            const href = item.findingLabel
              ? `#${findingAnchorId(categoryKey, item.findingLabel)}`
              : `#${categoryAnchorId(categoryKey)}`;

            return (
              <li
                key={`${item.area}-${item.title}`}
                className="border-t border-mist pt-5"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-sm font-bold text-orange">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/45">
                    {item.priority} · {item.area}
                  </span>
                </div>
                <h4 className="mt-2 font-display text-xl font-extrabold text-navy">
                  <a
                    href={href}
                    onClick={(e) => jumpToRecommendation(e, item)}
                    className="transition-colors hover:text-orange"
                  >
                    {item.title}
                  </a>
                </h4>
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink-muted">
                  {item.action}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-12 space-y-4">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Detailed findings
          </p>
          <p className="mt-2 text-sm text-ink-muted italic">
            Tap a category row for the full notes — collapsed by default to keep
            the page scannable.
          </p>
        </div>

        {categories.map((item) => {
          const isOpen = expanded.has(item.key);
          return (
            <div
              key={item.key}
              id={categoryAnchorId(item.key)}
              className="scroll-mt-24 border-t border-mist"
            >
              <button
                type="button"
                onClick={() => toggleCategory(item.key)}
                className="flex min-h-14 w-full items-start justify-between gap-4 py-5 text-left transition-colors active:bg-navy/[0.03]"
                aria-expanded={isOpen}
                aria-controls={`findings-${item.key}`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-extrabold text-navy">
                      {item.label}
                    </h3>
                    <span
                      className={`font-display text-2xl font-extrabold ${bandStyles[scoreBand(item.data.score)]}`}
                    >
                      {item.data.score}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted italic">
                    {item.data.summary}
                  </p>
                </div>
                <span
                  className="mt-1 shrink-0 font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/45"
                  aria-hidden="true"
                >
                  {isOpen ? "Collapse −" : "Expand +"}
                </span>
              </button>

              {isOpen ? (
                <ul
                  id={`findings-${item.key}`}
                  className="space-y-4 pb-5"
                >
                  {item.data.findings.map((finding) => (
                    <li
                      key={`${item.key}-${finding.label}-${finding.detail}`}
                      id={findingAnchorId(item.key, finding.label)}
                      className="scroll-mt-24"
                    >
                      <p
                        className={`font-display text-sm font-bold ${statusColor[finding.status]}`}
                      >
                        {finding.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {finding.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>

      <AnalyzeCta overallScore={result.overallScore} />
    </div>
  );
}
