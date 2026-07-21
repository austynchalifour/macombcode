import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/json-store";
import { normalizeSlug, validateSlug } from "@/lib/referral-slug";

export { normalizeSlug, validateSlug } from "@/lib/referral-slug";

export const REFERRAL_COOKIE = "mc_ref";
export const REFERRAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days
export const REFERRAL_COMMISSION_RATE = 0.35;

export type Referrer = {
  id: string;
  name: string;
  email: string;
  slug: string;
  createdAt: string;
  active: boolean;
};

export type ReferralConversion = {
  id: string;
  inquiryId: string | null;
  leadId: string | null;
  referralSlug: string;
  invoiceAmount: number;
  commissionAmount: number;
  status: "owed" | "paid";
  createdAt: string;
  paidAt: string | null;
};

const REFERRERS_PATH = "data/referrers.json";
const CONVERSIONS_PATH = "data/referral-conversions.json";

export async function readReferrers(): Promise<Referrer[]> {
  const referrers = await readJsonFile<Referrer[]>(REFERRERS_PATH, []);
  if (!Array.isArray(referrers)) return [];
  return referrers.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getReferrerBySlug(
  slug: string,
): Promise<Referrer | null> {
  const normalized = normalizeSlug(slug);
  const referrers = await readReferrers();
  return (
    referrers.find(
      (item) => item.slug === normalized && item.active !== false,
    ) ?? null
  );
}

export async function claimReferrer(input: {
  name: string;
  email: string;
  slug: string;
}): Promise<{ ok: true; referrer: Referrer } | { ok: false; error: string }> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const slug = normalizeSlug(input.slug);

  if (name.length < 2) {
    return { ok: false, error: "Enter your name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email." };
  }

  const slugError = validateSlug(slug);
  if (slugError) return { ok: false, error: slugError };

  const referrers = await readReferrers();
  if (referrers.some((item) => item.slug === slug)) {
    return { ok: false, error: "That link is already taken." };
  }

  const referrer: Referrer = {
    id: randomUUID(),
    name,
    email,
    slug,
    createdAt: new Date().toISOString(),
    active: true,
  };

  referrers.unshift(referrer);
  await writeJsonFile(REFERRERS_PATH, referrers);
  return { ok: true, referrer };
}

export async function readConversions(): Promise<ReferralConversion[]> {
  const conversions = await readJsonFile<ReferralConversion[]>(
    CONVERSIONS_PATH,
    [],
  );
  if (!Array.isArray(conversions)) return [];
  return conversions.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addConversion(input: {
  inquiryId?: string | null;
  leadId?: string | null;
  referralSlug: string;
  invoiceAmount: number;
}): Promise<ReferralConversion | { error: string }> {
  const amount = Number(input.invoiceAmount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Enter a valid invoice amount." };
  }

  const slug = normalizeSlug(input.referralSlug);
  const referrer = await getReferrerBySlug(slug);
  if (!referrer) {
    return { error: "Unknown referral link." };
  }

  if (!input.inquiryId && !input.leadId) {
    return { error: "Missing inquiry or lead id." };
  }

  const conversions = await readConversions();
  const already = conversions.find(
    (item) =>
      (input.inquiryId && item.inquiryId === input.inquiryId) ||
      (input.leadId && item.leadId === input.leadId),
  );
  if (already) {
    return { error: "This lead is already marked purchased." };
  }

  const conversion: ReferralConversion = {
    id: randomUUID(),
    inquiryId: input.inquiryId ?? null,
    leadId: input.leadId ?? null,
    referralSlug: slug,
    invoiceAmount: Math.round(amount * 100) / 100,
    commissionAmount:
      Math.round(amount * REFERRAL_COMMISSION_RATE * 100) / 100,
    status: "owed",
    createdAt: new Date().toISOString(),
    paidAt: null,
  };

  conversions.unshift(conversion);
  await writeJsonFile(CONVERSIONS_PATH, conversions);
  return conversion;
}

export async function setConversionPaid(
  id: string,
  paid: boolean,
): Promise<ReferralConversion | null> {
  const conversions = await readConversions();
  const index = conversions.findIndex((item) => item.id === id);
  if (index === -1) return null;

  conversions[index] = {
    ...conversions[index],
    status: paid ? "paid" : "owed",
    paidAt: paid ? new Date().toISOString() : null,
  };
  await writeJsonFile(CONVERSIONS_PATH, conversions);
  return conversions[index];
}

export function referralLink(slug: string, origin = "https://macombcode.com") {
  return `${origin}/r/${normalizeSlug(slug)}`;
}
