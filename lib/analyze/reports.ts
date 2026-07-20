import { randomBytes } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/json-store";
import type { AnalyzeResult } from "./metrics";

export type StoredReport = {
  slug: string;
  email: string;
  createdAt: string;
  result: AnalyzeResult;
};

function makeSlug() {
  return randomBytes(6).toString("hex");
}

export async function saveReport(input: {
  email: string;
  result: AnalyzeResult;
}): Promise<StoredReport> {
  const slug = makeSlug();
  const report: StoredReport = {
    slug,
    email: input.email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
    result: input.result,
  };
  await writeJsonFile(`data/reports/${slug}.json`, report);
  return report;
}

export async function getReport(slug: string): Promise<StoredReport | null> {
  if (!/^[a-f0-9]{8,32}$/i.test(slug)) return null;
  try {
    const report = await readJsonFile<StoredReport | null>(
      `data/reports/${slug}.json`,
      null,
    );
    if (!report || !report.result || report.slug !== slug) return null;
    return report;
  } catch {
    return null;
  }
}
