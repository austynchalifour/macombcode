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

type AnalyzerLead = {
  id: string;
  email: string;
  url: string;
  focusTopic: string | null;
  overallScore: number | null;
  createdAt: string;
  contacted: boolean;
  scanStatus: "ok" | "failed";
  reportSlug: string | null;
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
  const [leads, setLeads] = useState<AnalyzerLead[]>([]);
  const [listError, setListError] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

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

  const loadLists = useCallback(async () => {
    setLoadingList(true);
    setListError("");
    try {
      const [inquiriesRes, leadsRes] = await Promise.all([
        fetch("/api/admin/inquiries"),
        fetch("/api/admin/leads"),
      ]);
      const inquiriesData = (await inquiriesRes.json()) as {
        ok?: boolean;
        inquiries?: Inquiry[];
        error?: string;
      };
      const leadsData = (await leadsRes.json()) as {
        ok?: boolean;
        leads?: AnalyzerLead[];
        error?: string;
      };

      if (!inquiriesRes.ok || !inquiriesData.ok) {
        setListError(inquiriesData.error || "Could not load inquiries.");
        setInquiries([]);
      } else {
        setInquiries(inquiriesData.inquiries ?? []);
      }

      if (!leadsRes.ok || !leadsData.ok) {
        setListError((prev) =>
          prev
            ? prev
            : leadsData.error || "Could not load analyzer leads.",
        );
        setLeads([]);
      } else {
        setLeads(leadsData.leads ?? []);
      }
    } catch {
      setListError("Could not load admin data.");
      setInquiries([]);
      setLeads([]);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      const ok = await loadSession();
      if (ok) await loadLists();
    })();
  }, [loadSession, loadLists]);

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
      await loadLists();
    } catch {
      setLoginError("Login failed.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setInquiries([]);
    setLeads([]);
    setSession({ loading: false, authenticated: false, configured: true });
  }

  async function toggleLeadContacted(lead: AnalyzerLead) {
    setUpdatingLeadId(lead.id);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, contacted: !lead.contacted }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        lead?: AnalyzerLead;
        error?: string;
      };
      if (!response.ok || !data.ok || !data.lead) {
        setListError(data.error || "Could not update lead.");
        return;
      }
      setLeads((prev) =>
        prev.map((item) => (item.id === data.lead!.id ? data.lead! : item)),
      );
    } catch {
      setListError("Could not update lead.");
    } finally {
      setUpdatingLeadId(null);
    }
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
              Leads
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
                  : `${inquiries.length} contact · ${leads.length} analyzer`}
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => void loadLists()}
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

            <section className="mt-10">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                Analyzer leads
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy">
                Website analyzer
              </h2>

              {!loadingList && leads.length === 0 && !listError ? (
                <p className="mt-6 text-ink-muted italic">
                  No analyzer leads yet. Unlocks from /analyze will show up here.
                </p>
              ) : null}

              <ul className="mt-6 divide-y divide-mist">
                {leads.map((lead) => (
                  <li key={lead.id} className="py-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <a
                        href={`mailto:${lead.email}`}
                        className="font-display text-xl font-extrabold text-navy transition-colors hover:text-orange"
                      >
                        {lead.email}
                      </a>
                      <time
                        dateTime={lead.createdAt}
                        className="text-sm text-ink-muted"
                      >
                        {formatDate(lead.createdAt)}
                      </time>
                    </div>
                    <p className="mt-2 text-sm text-ink-muted">
                      <a
                        href={lead.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-orange"
                      >
                        {lead.url}
                      </a>
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                      <span>
                        Score:{" "}
                        {lead.overallScore === null
                          ? "n/a"
                          : lead.overallScore}
                      </span>
                      <span>
                        Scan: {lead.scanStatus === "ok" ? "ok" : "failed"}
                      </span>
                      {lead.focusTopic ? (
                        <span>Topic: {lead.focusTopic}</span>
                      ) : null}
                      {lead.reportSlug ? (
                        <Link
                          href={`/analyze/${lead.reportSlug}`}
                          className="font-medium text-navy transition-colors hover:text-orange"
                        >
                          Open report
                        </Link>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => void toggleLeadContacted(lead)}
                      disabled={updatingLeadId === lead.id}
                      className="mt-3 font-display text-sm font-semibold text-navy/70 transition-colors hover:text-orange disabled:opacity-60"
                    >
                      {updatingLeadId === lead.id
                        ? "Updating…"
                        : lead.contacted
                          ? "Marked contacted · undo"
                          : "Mark contacted"}
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14 border-t border-mist pt-10">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
                Contact inquiries
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy">
                Contact form
              </h2>

              {!loadingList && inquiries.length === 0 && !listError ? (
                <p className="mt-6 text-ink-muted italic">
                  No inquiries yet. Submissions from the contact form will show
                  up here.
                </p>
              ) : null}

              <ul className="mt-6 divide-y divide-mist">
                {inquiries.map((inquiry) => (
                  <li key={inquiry.id} className="py-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-display text-xl font-extrabold text-navy">
                        {inquiry.name}
                      </h3>
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
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
