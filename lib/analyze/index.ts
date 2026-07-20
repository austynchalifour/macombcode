import { parse } from "node-html-parser";
import {
  analyzeConversion,
  analyzeDesign,
  analyzeFreshness,
  analyzeReachability,
  analyzeReadability,
  analyzeRelevance,
  analyzeSeo,
  buildRecommendations,
  overallScore,
  type AnalyzeResult,
} from "./metrics";
import { assertSafePublicUrl } from "./safe-url";

const MAX_BYTES = 1_500_000;
const TIMEOUT_MS = 12_000;

export async function analyzeWebsite(
  rawUrl: string,
  topic?: string,
): Promise<AnalyzeResult> {
  const url = await assertSafePublicUrl(rawUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "MacombCodeAnalyzer/1.0 (+https://macombcode.com/analyze)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Timed out while fetching that site.");
    }
    throw new Error("Could not fetch that website.");
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Site responded with HTTP ${response.status}.`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (
    contentType &&
    !contentType.includes("text/html") &&
    !contentType.includes("application/xhtml")
  ) {
    throw new Error("That URL did not return an HTML page.");
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > MAX_BYTES) {
    throw new Error("Page HTML is too large to analyze.");
  }

  const html = buffer.toString("utf8");
  const doc = parse(html);
  const finalUrl = new URL(response.url || url.toString());

  const focusTopic = topic?.trim() || undefined;
  const seo = analyzeSeo(html, doc, finalUrl);
  const relevance = analyzeRelevance(doc, focusTopic);
  const freshness = analyzeFreshness(html, doc, response.headers);
  const readability = analyzeReadability(doc);
  const design = analyzeDesign(html, doc);
  const reachability = analyzeReachability(doc, html);
  const conversion = analyzeConversion(doc, html);
  const categories = {
    seo,
    relevance,
    freshness,
    readability,
    design,
    reachability,
    conversion,
  };
  const recommendations = buildRecommendations(categories);

  return {
    url: url.toString(),
    finalUrl: finalUrl.toString(),
    fetchedAt: new Date().toISOString(),
    title: doc.querySelector("title")?.text?.replace(/\s+/g, " ").trim() || "",
    focusTopic,
    ...categories,
    overallScore: overallScore(categories),
    recommendations,
  };
}
