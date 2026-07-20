"use client";

import { pdf } from "@react-pdf/renderer";
import { AnalyzeReportDocument } from "./pdf-document";
import { reportFilename, type ReportResult } from "./report";

export async function downloadAnalyzePdf(
  result: ReportResult,
  topic?: string,
) {
  const instance = pdf(
    <AnalyzeReportDocument result={result} topic={topic} />,
  );
  const blob = await instance.toBlob();
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = reportFilename(result, "pdf");
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
}
