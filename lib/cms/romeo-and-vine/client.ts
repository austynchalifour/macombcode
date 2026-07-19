import { readFile } from "fs/promises";
import path from "path";
import type { DailySpecial, MenuDocument, MenuSection } from "./types";

/**
 * Lightweight CMS client for the Romeo & Vine demo.
 * Reads structured content from /content — swap this for Sanity,
 * Contentful, or any headless CMS without changing the UI.
 */
const CONTENT_PATH = path.join(
  process.cwd(),
  "content/romeo-and-vine/menu.json",
);

async function fetchMenuDocument(): Promise<MenuDocument> {
  const raw = await readFile(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as MenuDocument;
}

export async function getMenu(): Promise<MenuDocument> {
  return fetchMenuDocument();
}

export async function getDailySpecials(): Promise<{
  specials: DailySpecial[];
  updatedAt: string;
}> {
  const doc = await fetchMenuDocument();
  return {
    specials: doc.dailySpecials.filter((s) => s.available),
    updatedAt: doc.updatedAt,
  };
}

export async function getMenuSections(): Promise<MenuSection[]> {
  const doc = await fetchMenuDocument();
  return doc.sections;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatMenuUpdatedAt(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}
