import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/demos/romeo-and-vine"
          className="rv-display text-2xl tracking-tight text-[var(--rv-linen)] md:text-[1.65rem]"
        >
          Romeo &amp; Vine
        </Link>
        <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary">
          <a href="#menu" className="rv-nav-link">
            Menu
          </a>
          <a href="#story" className="rv-nav-link">
            Our story
          </a>
          <a href="#reserve" className="rv-nav-link">
            Reserve
          </a>
        </nav>
        <a
          href="#reserve"
          className="rv-cta sm:hidden"
          style={{ fontSize: "0.85rem", padding: "0.65rem 1rem" }}
        >
          Reserve
        </a>
      </div>
    </header>
  );
}
