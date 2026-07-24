import { NextResponse } from "next/server";
import { websiteInADayOffer } from "@/data/offer";
import { getAppUrl, getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const priceId =
    process.env.STRIPE_WEBSITE_IN_A_DAY_PRICE_ID?.trim() ||
    websiteInADayOffer.stripePriceId;

  if (!priceId) {
    return NextResponse.json(
      { ok: false, error: "Offer price is not configured." },
      { status: 500 },
    );
  }

  try {
    const stripe = getStripe();
    const appUrl = getAppUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/offer/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/offer?canceled=1`,
      managed_payments: {
        enabled: true,
      },
      metadata: {
        offer: websiteInADayOffer.slug,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { ok: false, error: "Checkout session did not return a URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, url: session.url, id: session.id });
  } catch (error) {
    console.error("Create offer checkout session failed:", error);
    const message =
      error instanceof Error ? error.message : "Could not start checkout.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
