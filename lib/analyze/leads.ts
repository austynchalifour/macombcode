import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/json-store";
import type { AnalyzeResult } from "./metrics";

export type AnalyzerLead = {
  id: string;
  email: string;
  url: string;
  focusTopic: string | null;
  overallScore: number | null;
  categoryScores: Record<string, number> | null;
  createdAt: string;
  contacted: boolean;
  scanStatus: "ok" | "failed";
  reportSlug: string | null;
  referralSlug?: string | null;
};

const LEADS_PATH = "data/leads.json";

export async function readLeads(): Promise<AnalyzerLead[]> {
  const leads = await readJsonFile<AnalyzerLead[]>(LEADS_PATH, []);
  if (!Array.isArray(leads)) return [];
  return leads.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addLead(input: {
  email: string;
  url: string;
  focusTopic?: string | null;
  result?: AnalyzeResult | null;
  scanStatus: "ok" | "failed";
  reportSlug?: string | null;
  referralSlug?: string | null;
}): Promise<AnalyzerLead> {
  const leads = await readLeads();
  const lead: AnalyzerLead = {
    id: randomUUID(),
    email: input.email.trim().toLowerCase(),
    url: input.url,
    focusTopic: input.focusTopic?.trim() || null,
    overallScore: input.result?.overallScore ?? null,
    categoryScores: input.result
      ? {
          seo: input.result.seo.score,
          relevance: input.result.relevance.score,
          freshness: input.result.freshness.score,
          readability: input.result.readability.score,
          design: input.result.design.score,
          reachability: input.result.reachability.score,
          conversion: input.result.conversion.score,
        }
      : null,
    createdAt: new Date().toISOString(),
    contacted: false,
    scanStatus: input.scanStatus,
    reportSlug: input.reportSlug ?? null,
    referralSlug: input.referralSlug?.trim() || null,
  };

  leads.unshift(lead);
  await writeJsonFile(LEADS_PATH, leads);
  return lead;
}

export async function setLeadContacted(
  id: string,
  contacted: boolean,
): Promise<AnalyzerLead | null> {
  const leads = await readLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], contacted };
  await writeJsonFile(LEADS_PATH, leads);
  return leads[index];
}
