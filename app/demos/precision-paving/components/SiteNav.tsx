import Link from "next/link";
import { company } from "@/lib/demos/precision-paving/data";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/demos/precision-paving"
          className="pp-display text-xl text-white md:text-2xl"
        >
          Precision
          <span className="mt-0.5 block text-[0.55em] tracking-[0.14em] text-[var(--pp-amber)]">
            Paving &amp; Sealing
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a href="#services" className="pp-nav-link">
            Services
          </a>
          <a href="#why" className="pp-nav-link">
            Why us
          </a>
          <a href="#areas" className="pp-nav-link">
            Areas
          </a>
          <a href="#quote" className="pp-nav-link">
            Free estimate
          </a>
        </nav>
        <a
          href={company.phoneHref}
          className="pp-cta"
          style={{ fontSize: "0.85rem", padding: "0.7rem 1rem" }}
        >
          Call now
        </a>
      </div>
    </header>
  );
}
