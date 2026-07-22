import Link from "next/link";
import { company } from "@/lib/demos/dump-daddy/data";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/demos/dump-daddy"
          className="dd-display text-2xl text-white md:text-3xl"
        >
          Dump Daddy
          <span className="mt-0.5 block text-[0.45em] tracking-[0.18em] text-[var(--dd-red)]">
            Junk Removal
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a href="#services" className="dd-nav-link">
            Services
          </a>
          <a href="#why" className="dd-nav-link">
            Why us
          </a>
          <a href="#areas" className="dd-nav-link">
            Areas
          </a>
          <a href="#quote" className="dd-nav-link">
            Free quote
          </a>
        </nav>
        <a
          href={company.phoneHref}
          className="dd-cta"
          style={{ fontSize: "0.85rem", padding: "0.7rem 1rem" }}
        >
          Call / text
        </a>
      </div>
    </header>
  );
}
