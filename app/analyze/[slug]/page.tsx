import Link from "next/link";
import { notFound } from "next/navigation";
import AnalyzeReportView from "@/components/AnalyzeReportView";
import { getReport } from "@/lib/analyze/reports";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) {
    return { title: "Report not found | Macomb Code" };
  }
  return {
    title: `${report.result.title || "Website report"} | Macomb Code`,
    description: `Website analysis report for ${report.result.finalUrl}`,
    robots: { index: false, follow: false },
  };
}

export default async function SharedAnalyzeReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) notFound();

  return (
    <main className="min-h-svh bg-paper">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-10 md:py-14">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              Macomb Code report
            </p>
            <p className="mt-2 text-sm text-ink-muted italic">
              Shared website analysis ·{" "}
              {new Date(report.createdAt).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}
            </p>
          </div>
          <Link
            href="/analyze"
            className="shrink-0 font-display text-sm font-semibold text-navy/60 transition-colors hover:text-orange"
          >
            Run your own →
          </Link>
        </div>

        <AnalyzeReportView
          result={report.result}
          shareUrl={`/analyze/${report.slug}`}
        />
      </div>
    </main>
  );
}
