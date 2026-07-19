import Link from "next/link";
import { company } from "@/lib/demos/clemens-heating-cooling/data";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--chc-navy)] text-[var(--chc-steel)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="chc-display text-3xl text-white">{company.name}</p>
          <p className="mt-2 max-w-sm text-[var(--chc-mist)]">{company.tagline}</p>
          <p className="mt-4 text-sm text-[var(--chc-mist)]">{company.address}</p>
        </div>
        <div className="text-sm text-[var(--chc-mist)]">
          <p>
            Demo built by{" "}
            <Link
              href="/"
              className="text-white"
              style={{ borderBottom: "1px solid var(--chc-orange)" }}
            >
              Macomb Code
            </Link>
          </p>
          <p className="mt-1">ZIP coverage API · service-routed quotes · trade branding</p>
        </div>
      </div>
    </footer>
  );
}
