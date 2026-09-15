import Link from "next/link";
import { areas, company } from "@/lib/demos/lakeside-cpl/data";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--lcpl-deep)] text-[var(--lcpl-mist)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="lcpl-display text-3xl text-white">{company.name}</p>
            <p className="mt-2 max-w-sm text-[var(--lcpl-mist)]">
              {company.tagline}
            </p>
            <p className="mt-4 text-sm text-[var(--lcpl-mist)]">
              {company.address}
            </p>
            <a
              href={company.phoneHref}
              className="mt-3 inline-block font-semibold text-[var(--lcpl-brass)]"
            >
              {company.phone}
            </a>
          </div>
          <div className="text-sm text-[var(--lcpl-mist)]">
            <p>
              Demo built by{" "}
              <Link
                href="/"
                className="text-white"
                style={{ borderBottom: "1px solid var(--lcpl-brass)" }}
              >
                Macomb Code
              </Link>
            </p>
            <p className="mt-1">
              Course pathfinder · routed enrollment · trade branding
            </p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-6">
          {areas.map((area) => (
            <li key={area} className="lcpl-display text-sm text-white/70">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
