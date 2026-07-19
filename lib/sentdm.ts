const SENT_API_URL = "https://api.sent.dm/v3/messages";

type SentDmSendResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string; status?: number };

type SendSmsOptions = {
  to: string;
  text: string;
  /** Optional template parameters when SENT_DM_TEMPLATE_ID is set */
  parameters?: Record<string, string>;
};

function getApiKey() {
  return process.env.SENT_DM_API_KEY || process.env.SENT_API_KEY || "";
}

export function getNotifyPhone() {
  return (
    process.env.SENT_DM_NOTIFY_PHONE ||
    process.env.CONTACT_NOTIFY_PHONE ||
    ""
  ).trim();
}

/**
 * Send an SMS via SentDM (https://docs.sent.dm).
 * Uses free-form text by default, or a template when SENT_DM_TEMPLATE_ID is set.
 */
export async function sendSms({
  to,
  text,
  parameters,
}: SendSmsOptions): Promise<SentDmSendResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { ok: false, error: "SentDM API key is not configured." };
  }

  if (!to.startsWith("+")) {
    return {
      ok: false,
      error: "Notify phone must be E.164 format (e.g. +15865551234).",
    };
  }

  const templateId = process.env.SENT_DM_TEMPLATE_ID?.trim();
  const payload: Record<string, unknown> = {
    to: [to],
    channel: ["sms"],
  };

  if (templateId) {
    payload.template = {
      id: templateId,
      parameters: parameters ?? { message: text },
    };
  } else {
    payload.text = text;
  }

  let response: Response;
  try {
    response = await fetch(SENT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: "Could not reach SentDM." };
  }

  let data: {
    success?: boolean;
    data?: { recipients?: Array<{ message_id?: string }> };
    error?: { message?: string; code?: string };
  } | null = null;

  try {
    data = (await response.json()) as typeof data;
  } catch {
    data = null;
  }

  if (!response.ok || data?.success === false) {
    return {
      ok: false,
      status: response.status,
      error:
        data?.error?.message ||
        `SentDM request failed (${response.status}).`,
    };
  }

  return {
    ok: true,
    messageId: data?.data?.recipients?.[0]?.message_id,
  };
}
