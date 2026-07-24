"use client";

import { useState } from "react";

export default function OfferCheckoutButton({
  label = "Buy for $500",
  className = "cta-primary text-base",
}: {
  label?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/offer/checkout", { method: "POST" });
      const payload = (await response.json()) as {
        ok?: boolean;
        url?: string;
        error?: string;
      };

      if (!response.ok || !payload.ok || !payload.url) {
        setError(payload.error || "Could not start checkout.");
        return;
      }

      window.location.href = payload.url;
    } catch {
      setError("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void startCheckout()}
        className={`${className} disabled:opacity-60`}
        disabled={loading}
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error ? <p className="mt-3 text-sm text-orange">{error}</p> : null}
    </div>
  );
}
