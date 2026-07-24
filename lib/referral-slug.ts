const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "analyze",
  "cities",
  "contact",
  "demos",
  "industries",
  "referral",
  "referrals",
  "r",
  "services",
  "support",
  "websites",
  "web-design",
  "software",
  "software-development",
  "ai-solutions",
  "work",
  "macomb",
  "macombcode",
]);

export function normalizeSlug(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function validateSlug(slug: string): string | null {
  if (slug.length < 3 || slug.length > 24) {
    return "Use 3–24 characters.";
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return "Use lowercase letters, numbers, and hyphens only.";
  }
  if (RESERVED_SLUGS.has(slug)) {
    return "That link is reserved. Try another.";
  }
  return null;
}
