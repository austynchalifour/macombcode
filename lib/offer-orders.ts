import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/json-store";

export type OfferOrderStatus = "paid" | "fulfilled" | "refunded";

export type OfferOrder = {
  id: string;
  offerSlug: string;
  stripeCheckoutSessionId: string;
  stripeCustomerId: string | null;
  stripePaymentIntentId: string | null;
  customerEmail: string | null;
  customerName: string | null;
  amountTotal: number | null;
  currency: string | null;
  status: OfferOrderStatus;
  createdAt: string;
};

const ORDERS_PATH = "data/offer-orders.json";

export async function listOfferOrders(): Promise<OfferOrder[]> {
  return readJsonFile<OfferOrder[]>(ORDERS_PATH, []);
}

export async function getOfferOrderBySessionId(
  sessionId: string,
): Promise<OfferOrder | null> {
  const orders = await listOfferOrders();
  return orders.find((order) => order.stripeCheckoutSessionId === sessionId) ?? null;
}

export async function createOfferOrder(input: {
  offerSlug: string;
  stripeCheckoutSessionId: string;
  stripeCustomerId?: string | null;
  stripePaymentIntentId?: string | null;
  customerEmail?: string | null;
  customerName?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
}): Promise<OfferOrder> {
  const orders = await listOfferOrders();
  const existing = orders.find(
    (order) => order.stripeCheckoutSessionId === input.stripeCheckoutSessionId,
  );
  if (existing) return existing;

  const order: OfferOrder = {
    id: randomUUID(),
    offerSlug: input.offerSlug,
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
    stripeCustomerId: input.stripeCustomerId ?? null,
    stripePaymentIntentId: input.stripePaymentIntentId ?? null,
    customerEmail: input.customerEmail ?? null,
    customerName: input.customerName ?? null,
    amountTotal: input.amountTotal ?? null,
    currency: input.currency ?? null,
    status: "paid",
    createdAt: new Date().toISOString(),
  };

  orders.unshift(order);
  await writeJsonFile(ORDERS_PATH, orders);
  return order;
}
