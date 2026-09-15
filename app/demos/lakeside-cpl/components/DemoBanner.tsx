import Link from "next/link";

export default function DemoBanner() {
  return (
    <div className="lcpl-demo-banner">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2.5 md:px-8">
        <p>
          Demo site by{" "}
          <Link href="/" className="lcpl-demo-banner-link">
            Macomb Code
          </Link>
          {" — "}
          course pathfinder + routed enrollment
        </p>
        <Link href="/#work" className="lcpl-demo-banner-back shrink-0">
          ← Back to work
        </Link>
      </div>
    </div>
  );
}
