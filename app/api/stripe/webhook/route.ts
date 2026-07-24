import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { websiteInADayOffer } from "@/data/offer";
import { sendOfferPurchaseEmail } from "@/lib/email";
import { createOfferOrder, getOfferOrderBySessionId } from "@/lib/offer-orders";
import { getStripe, getStripeWebhookSecret } from "@/lib/stripe";

export const runtime = "nodejs";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const offerSlug = session.metadata?.offer || websiteInADayOffer.slug;
  if (offerSlug !== websiteInADayOffer.slug) return;

  const existing = await getOfferOrderBySessionId(session.id);
  if (existing) return;

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id ?? null;

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const order = await createOfferOrder({
    offerSlug,
    stripeCheckoutSessionId: session.id,
    stripeCustomerId: customerId,
    stripePaymentIntentId: paymentIntentId,
    customerEmail: session.customer_details?.email ?? session.customer_email,
    customerName: session.customer_details?.name ?? null,
    amountTotal: session.amount_total,
    currency: session.currency,
  });

  try {
    const emailResult = await sendOfferPurchaseEmail(order);
    if (!emailResult.ok) {
      console.error("Offer purchase email failed:", emailResult.error);
    }
  } catch (error) {
    console.error("Offer purchase email failed:", error);
  }
}

export async function POST(request: Request) {
  const webhookSecret = getStripeWebhookSecret();
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured.");
    return NextResponse.json(
      { ok: false, error: "Webhook secret is not configured." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { ok: false, error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json(
      { ok: false, error: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Stripe webhook handler failed:", error);
    return NextResponse.json(
      { ok: false, error: "Webhook handler failed." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, received: true });
}
