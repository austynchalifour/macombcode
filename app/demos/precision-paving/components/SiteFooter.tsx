import Link from "next/link";
import { company } from "@/lib/demos/precision-paving/data";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--pp-ink)] text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="pp-display text-3xl text-white">Precision</p>
          <p className="mt-1 text-sm uppercase tracking-[0.16em] text-[var(--pp-amber)]">
            Paving &amp; Sealing LLC
          </p>
          <p className="mt-4 max-w-sm text-white/65">{company.tagline}</p>
          <p className="mt-2 text-sm text-white/45">{company.city}</p>
          <a
            href={company.phoneHref}
            className="mt-4 inline-block font-semibold text-white hover:text-[var(--pp-amber)]"
          >
            {company.phone}
          </a>
        </div>
        <div className="text-sm">
          <p>
            Private demo by{" "}
            <Link
              href="/"
              className="text-white"
              style={{ borderBottom: "1px solid var(--pp-amber)" }}
            >
              Macomb Code
            </Link>
          </p>
          <p className="mt-1 text-white/45">
            Not listed in the public portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
