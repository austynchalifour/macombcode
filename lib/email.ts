import { Resend } from "resend";
import type { Booking } from "@/lib/bookings";
import { formatBookingWhen } from "@/lib/bookings";
import { bookingConfig } from "@/data/booking-config";

type SendContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

type SendEmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export function getNotifyEmail() {
  return (
    process.env.CONTACT_NOTIFY_EMAIL ||
    "austynjchalifour@yahoo.com"
  ).trim();
}

function getFromEmail() {
  return (
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Macomb Code <onboarding@resend.dev>"
  );
}

export async function sendContactEmail({
  name,
  email,
  message,
}: SendContactEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const to = getNotifyEmail();
  if (!to) {
    return { ok: false, error: "CONTACT_NOTIFY_EMAIL is not configured." };
  }

  const resend = new Resend(apiKey);
  const subject = `New inquiry from ${name}`;
  const text = [
    "New contact form submission from macombcode.com",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Georgia, serif; color: #102030; line-height: 1.5;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase; color: #d85818; font-weight: 700;">
        Macomb Code inquiry
      </p>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 16px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: getFromEmail(),
    to: [to],
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, id: data?.id };
}

export async function sendBookingEmails(
  booking: Booking,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const to = getNotifyEmail();
  if (!to) {
    return { ok: false, error: "CONTACT_NOTIFY_EMAIL is not configured." };
  }

  const when = formatBookingWhen(booking.startsAt);
  const preferenceLabel =
    booking.preference === "video" ? "Video call" : "Phone call";
  const resend = new Resend(apiKey);
  const from = getFromEmail();

  const guestText = [
    `You're booked for a ${bookingConfig.title} with Macomb Code.`,
    "",
    `When: ${when}`,
    `Preference: ${preferenceLabel}`,
    `Phone on file: ${booking.phone}`,
    "",
    "We'll follow up with a dial-in or video link before the call.",
    "Looking forward to walking you through the live site and demos.",
    "",
    "— Macomb Code",
    "https://macombcode.com",
  ].join("\n");

  const guestHtml = `
    <div style="font-family: Georgia, serif; color: #102030; line-height: 1.5;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase; color: #d85818; font-weight: 700;">
        Macomb Code booking
      </p>
      <p style="margin: 0 0 12px;">You're confirmed for a <strong>${escapeHtml(bookingConfig.title)}</strong>.</p>
      <p style="margin: 0 0 8px;"><strong>When:</strong> ${escapeHtml(when)}</p>
      <p style="margin: 0 0 8px;"><strong>Preference:</strong> ${escapeHtml(preferenceLabel)}</p>
      <p style="margin: 0 0 16px;"><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
      <p style="margin: 0;">We'll follow up with a dial-in or video link before the call so you can see the live site and demos in action.</p>
    </div>
  `;

  const ownerText = [
    "New walkthrough booking on macombcode.com",
    "",
    `When: ${when}`,
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Preference: ${preferenceLabel}`,
    booking.referralSlug ? `Referral: /r/${booking.referralSlug}` : "",
    "",
    "Note:",
    booking.note || "(none)",
  ]
    .filter(Boolean)
    .join("\n");

  const ownerHtml = `
    <div style="font-family: Georgia, serif; color: #102030; line-height: 1.5;">
      <p style="margin: 0 0 16px; font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase; color: #d85818; font-weight: 700;">
        New walkthrough booking
      </p>
      <p style="margin: 0 0 8px;"><strong>When:</strong> ${escapeHtml(when)}</p>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(booking.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(booking.email)}">${escapeHtml(booking.email)}</a></p>
      <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
      <p style="margin: 0 0 8px;"><strong>Preference:</strong> ${escapeHtml(preferenceLabel)}</p>
      ${
        booking.referralSlug
          ? `<p style="margin: 0 0 8px;"><strong>Referral:</strong> /r/${escapeHtml(booking.referralSlug)}</p>`
          : ""
      }
      <p style="margin: 16px 0 8px;"><strong>Note:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(booking.note || "(none)")}</p>
    </div>
  `;

  const [guest, owner] = await Promise.all([
    resend.emails.send({
      from,
      to: [booking.email],
      subject: `Confirmed: ${bookingConfig.title} — ${when}`,
      text: guestText,
      html: guestHtml,
    }),
    resend.emails.send({
      from,
      to: [to],
      replyTo: booking.email,
      subject: `New booking: ${booking.name} — ${when}`,
      text: ownerText,
      html: ownerHtml,
    }),
  ]);

  if (guest.error) return { ok: false, error: guest.error.message };
  if (owner.error) return { ok: false, error: owner.error.message };

  return { ok: true, id: guest.data?.id };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
