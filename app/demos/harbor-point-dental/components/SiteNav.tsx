import Link from "next/link";
import { practice } from "@/lib/demos/harbor-point-dental/data";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/demos/harbor-point-dental"
          className="hp-display text-xl text-[var(--hp-ink)] md:text-2xl"
        >
          Harbor Point
          <span className="mt-0.5 block text-sm font-semibold tracking-normal text-[var(--hp-blue-deep)]">
            Family Dental
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a href="#care" className="hp-nav-link">
            Care
          </a>
          <a href="#book" className="hp-nav-link">
            Book online
          </a>
          <a href="#visit" className="hp-nav-link">
            Visit us
          </a>
        </nav>
        <a
          href={practice.phoneHref}
          className="hp-cta"
          style={{ fontSize: "0.85rem", padding: "0.7rem 1.15rem" }}
        >
          Call office
        </a>
      </div>
    </header>
  );
}
