import Link from "next/link";
import { company } from "@/lib/demos/van-dyke-electric/data";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/demos/van-dyke-electric"
          className="vde-display text-xl text-white md:text-2xl"
        >
          Van Dyke
          <span className="block text-[0.65em] tracking-[0.14em] text-[var(--vde-amp)]">
            Electric
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a href="#services" className="vde-nav-link">
            Services
          </a>
          <a href="#triage" className="vde-nav-link">
            What&apos;s wrong
          </a>
          <a href="#areas" className="vde-nav-link">
            Areas
          </a>
          <a href="#quote" className="vde-nav-link">
            Get a quote
          </a>
        </nav>
        <a
          href={company.phoneHref}
          className="vde-cta"
          style={{ fontSize: "0.9rem", padding: "0.7rem 1rem" }}
        >
          Call now
        </a>
      </div>
    </header>
  );
}
