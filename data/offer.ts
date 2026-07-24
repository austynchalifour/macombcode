/** Website In A Day — Stripe product + price (Managed Payments). */
export const websiteInADayOffer = {
  slug: "website-in-a-day",
  name: "Website In A Day",
  priceLabel: "$500",
  /** Amount in cents — keep in sync with Stripe price. */
  unitAmount: 50_000,
  currency: "usd",
  /**
   * Live Stripe catalog IDs (Macomb Code account).
   * Product tax code: txcd_10701400 (Website Information Services — Business Use).
   */
  stripeProductId: "prod_UwcYzEp9beigKP",
  stripePriceId: "price_1TwjJiAwj68vtnyzOj5ZNRAJ",
} as const;
