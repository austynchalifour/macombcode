import Link from "next/link";
import { company } from "@/lib/demos/van-dyke-electric/data";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--vde-ink)] text-[var(--vde-mist)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="vde-display text-3xl text-white">{company.name}</p>
          <p className="mt-2 max-w-sm text-[var(--vde-mist)]">{company.tagline}</p>
          <p className="mt-4 text-sm text-[var(--vde-mist)]">{company.address}</p>
          <a
            href={company.phoneHref}
            className="mt-3 inline-block font-semibold text-[var(--vde-amp)]"
          >
            {company.phone}
          </a>
        </div>
        <div className="text-sm text-[var(--vde-mist)]">
          <p>
            Demo built by{" "}
            <Link
              href="/"
              className="text-white"
              style={{ borderBottom: "1px solid var(--vde-amp)" }}
            >
              Macomb Code
            </Link>
          </p>
          <p className="mt-1">
            Emergency triage · service-routed quotes · trade branding
          </p>
        </div>
      </div>
    </footer>
  );
}
