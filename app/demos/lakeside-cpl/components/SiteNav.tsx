import Link from "next/link";
import { company } from "@/lib/demos/lakeside-cpl/data";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
        <Link
          href="/demos/lakeside-cpl"
          className="lcpl-display text-xl text-white md:text-2xl"
        >
          Lakeside
          <span className="block text-[0.65em] tracking-[0.14em] text-[var(--lcpl-brass)]">
            CPL Training
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a href="#courses" className="lcpl-nav-link">
            Courses
          </a>
          <a href="#pathfinder" className="lcpl-nav-link">
            Which class?
          </a>
          <a href="#schedule" className="lcpl-nav-link">
            Schedule
          </a>
          <a href="#enroll" className="lcpl-nav-link">
            Enroll
          </a>
        </nav>
        <a
          href={company.phoneHref}
          className="lcpl-cta"
          style={{ fontSize: "0.9rem", padding: "0.7rem 1rem" }}
        >
          Call now
        </a>
      </div>
    </header>
  );
}
