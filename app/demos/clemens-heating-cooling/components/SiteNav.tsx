import Link from "next/link";
import { company } from "@/lib/demos/clemens-heating-cooling/data";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/demos/clemens-heating-cooling"
          className="chc-display text-xl text-white md:text-2xl"
        >
          Clemens
          <span className="block text-[0.65em] tracking-[0.12em] text-[var(--chc-orange)]">
            Heating &amp; Cooling
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a href="#services" className="chc-nav-link">
            Services
          </a>
          <a href="#coverage" className="chc-nav-link">
            Coverage
          </a>
          <a href="#quote" className="chc-nav-link">
            Get a quote
          </a>
        </nav>
        <a
          href={company.phoneHref}
          className="chc-cta"
          style={{ fontSize: "0.9rem", padding: "0.7rem 1rem" }}
        >
          Call now
        </a>
      </div>
    </header>
  );
}
