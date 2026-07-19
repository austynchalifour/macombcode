import Link from "next/link";
import { store } from "@/lib/demos/northside-supply/products";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/demos/northside-supply"
          className="ns-display text-2xl text-[var(--ns-cream)] md:text-[1.7rem]"
        >
          Northside Supply Co.
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a href="#catalog" className="ns-nav-link">
            Catalog
          </a>
          <a href="#about" className="ns-nav-link">
            The shop
          </a>
          <a href="#visit" className="ns-nav-link">
            Visit
          </a>
        </nav>
        <a
          href={store.phoneHref}
          className="ns-cta"
          style={{ fontSize: "0.85rem", padding: "0.7rem 1.1rem" }}
        >
          Call to order
        </a>
      </div>
    </header>
  );
}
