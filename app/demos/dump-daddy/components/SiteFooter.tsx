import Link from "next/link";
import { company } from "@/lib/demos/dump-daddy/data";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--dd-ink)] text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="dd-display text-3xl text-[var(--dd-red)]">
            Dump Daddy
          </p>
          <p className="mt-1 text-sm uppercase tracking-[0.16em] text-white/50">
            Junk Removal
          </p>
          <p className="mt-4 max-w-sm text-white/65">{company.tagline}</p>
          <p className="mt-2 text-sm text-white/45">{company.area}</p>
          <a
            href={company.phoneHref}
            className="mt-4 inline-block font-semibold text-white hover:text-[var(--dd-red)]"
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
              style={{ borderBottom: "1px solid var(--dd-red)" }}
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
