import { Resend } from "resend";

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

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Macomb Code <onboarding@resend.dev>";

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
    from,
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
