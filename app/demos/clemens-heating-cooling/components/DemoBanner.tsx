import Link from "next/link";

export default function DemoBanner() {
  return (
    <div className="chc-demo-banner">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2.5 md:px-8">
        <p>
          Demo site by{" "}
          <Link href="/" className="chc-demo-banner-link">
            Macomb Code
          </Link>
          {" — "}
          ZIP service-area checker + routed quote form
        </p>
        <Link href="/#work" className="chc-demo-banner-back shrink-0">
          ← Back to work
        </Link>
      </div>
    </div>
  );
}
