"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type SessionState = {
  loading: boolean;
  authenticated: boolean;
  configured: boolean;
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function AdminPage() {
  const [session, setSession] = useState<SessionState>({
    loading: true,
    authenticated: false,
    configured: true,
  });
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [listError, setListError] = useState("");
  const [loadingList, setLoadingList] = useState(false);

  const loadSession = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/session");
      const data = (await response.json()) as {
        authenticated?: boolean;
        configured?: boolean;
      };
      setSession({
        loading: false,
        authenticated: Boolean(data.authenticated),
        configured: data.configured !== false,
      });
      return Boolean(data.authenticated);
    } catch {
      setSession({ loading: false, authenticated: false, configured: true });
      return false;
    }
  }, []);

  const loadInquiries = useCallback(async () => {
    setLoadingList(true);
    setListError("");
    try {
      const response = await fetch("/api/admin/inquiries");
      const data = (await response.json()) as {
        ok?: boolean;
        inquiries?: Inquiry[];
        error?: string;
      };
      if (!response.ok || !data.ok) {
        setListError(data.error || "Could not load inquiries.");
        setInquiries([]);
        return;
      }
      setInquiries(data.inquiries ?? []);
    } catch {
      setListError("Could not load inquiries.");
      setInquiries([]);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      const ok = await loadSession();
      if (ok) await loadInquiries();
    })();
  }, [loadSession, loadInquiries]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setLoginError(data.error || "Login failed.");
        return;
      }

      setPassword("");
      setSession({ loading: false, authenticated: true, configured: true });
      await loadInquiries();
    } catch {
      setLoginError("Login failed.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setInquiries([]);
    setSession({ loading: false, authenticated: false, configured: true });
  }

  return (
    <main className="min-h-svh bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-10 md:px-10 md:py-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              Admin
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] text-navy">
              Inquiries
            </h1>
          </div>
          <Link
            href="/"
            className="font-display text-sm font-semibold text-navy/60 transition-colors hover:text-orange"
          >
            ← Site
          </Link>
        </div>

        {session.loading ? (
          <p className="mt-10 text-ink-muted">Loading…</p>
        ) : !session.configured ? (
          <p className="mt-10 text-ink-muted">
            Set <code className="text-navy">ADMIN_PASSWORD</code> in your
            environment to enable the dashboard.
          </p>
        ) : !session.authenticated ? (
          <form onSubmit={handleLogin} className="mt-10 max-w-sm space-y-5">
            <label className="block">
              <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="field mt-2"
                placeholder="Admin password"
                disabled={loggingIn}
              />
            </label>
            <button
              type="submit"
              className="cta-primary text-base disabled:opacity-60"
              disabled={loggingIn}
            >
              {loggingIn ? "Signing in…" : "Sign in"}
            </button>
            {loginError ? (
              <p className="text-sm text-orange">{loginError}</p>
            ) : null}
          </form>
        ) : (
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mist pb-4">
              <p className="text-sm text-ink-muted">
                {loadingList
                  ? "Refreshing…"
                  : `${inquiries.length} submission${inquiries.length === 1 ? "" : "s"}`}
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => void loadInquiries()}
                  className="font-display text-sm font-semibold text-navy/70 transition-colors hover:text-orange"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="font-display text-sm font-semibold text-navy/70 transition-colors hover:text-orange"
                >
                  Sign out
                </button>
              </div>
            </div>

            {listError ? (
              <p className="mt-6 text-sm text-orange">{listError}</p>
            ) : null}

            {!loadingList && inquiries.length === 0 && !listError ? (
              <p className="mt-8 text-ink-muted italic">
                No inquiries yet. Submissions from the contact form will show up
                here.
              </p>
            ) : null}

            <ul className="mt-6 divide-y divide-mist">
              {inquiries.map((inquiry) => (
                <li key={inquiry.id} className="py-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h2 className="font-display text-xl font-extrabold text-navy">
                      {inquiry.name}
                    </h2>
                    <time
                      dateTime={inquiry.createdAt}
                      className="text-sm text-ink-muted"
                    >
                      {formatDate(inquiry.createdAt)}
                    </time>
                  </div>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="mt-1 inline-block text-sm font-medium text-navy transition-colors hover:text-orange"
                  >
                    {inquiry.email}
                  </a>
                  <p className="mt-3 whitespace-pre-wrap leading-relaxed text-ink-muted">
                    {inquiry.message}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
