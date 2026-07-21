import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readLeads } from "@/lib/analyze/leads";
import { readInquiries } from "@/lib/inquiries";
import {
  addConversion,
  readConversions,
  readReferrers,
  setConversionPaid,
} from "@/lib/referrals";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const [referrers, conversions, inquiries, leads] = await Promise.all([
      readReferrers(),
      readConversions(),
      readInquiries(),
      readLeads(),
    ]);

    const stats = referrers.map((referrer) => {
      const inquiryHits = inquiries.filter(
        (item) => item.referralSlug === referrer.slug,
      ).length;
      const leadHits = leads.filter(
        (item) => item.referralSlug === referrer.slug,
      ).length;
      const partnerConversions = conversions.filter(
        (item) => item.referralSlug === referrer.slug,
      );
      const owed = partnerConversions
        .filter((item) => item.status === "owed")
        .reduce((sum, item) => sum + item.commissionAmount, 0);
      const paid = partnerConversions
        .filter((item) => item.status === "paid")
        .reduce((sum, item) => sum + item.commissionAmount, 0);

      return {
        ...referrer,
        attributedLeads: inquiryHits + leadHits,
        conversions: partnerConversions.length,
        owed,
        paid,
      };
    });

    return NextResponse.json({
      ok: true,
      referrers: stats,
      conversions,
    });
  } catch (error) {
    console.error("Failed to read referrals:", error);
    const message =
      error instanceof Error ? error.message : "Could not load referrals.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as {
      inquiryId?: string;
      leadId?: string;
      referralSlug?: string;
      invoiceAmount?: number;
    };

    const result = await addConversion({
      inquiryId: body.inquiryId ?? null,
      leadId: body.leadId ?? null,
      referralSlug: body.referralSlug ?? "",
      invoiceAmount: Number(body.invoiceAmount),
    });

    if ("error" in result) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true, conversion: result });
  } catch (error) {
    console.error("Failed to add referral conversion:", error);
    const message =
      error instanceof Error ? error.message : "Could not save conversion.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      paid?: boolean;
    };

    if (!body.id || typeof body.paid !== "boolean") {
      return NextResponse.json(
        { ok: false, error: "id and paid are required." },
        { status: 400 },
      );
    }

    const conversion = await setConversionPaid(body.id, body.paid);
    if (!conversion) {
      return NextResponse.json(
        { ok: false, error: "Conversion not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, conversion });
  } catch (error) {
    console.error("Failed to update conversion:", error);
    const message =
      error instanceof Error ? error.message : "Could not update conversion.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
