import Link from "next/link";

export default function DemoBanner() {
  return (
    <div className="pp-demo-banner">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2.5 md:px-8">
        <p>
          Private demo by{" "}
          <Link href="/" className="pp-demo-banner-link">
            Macomb Code
          </Link>
          {" — "}
          not listed in the public portfolio
        </p>
        <Link href="/" className="pp-demo-banner-back shrink-0">
          ← Macomb Code
        </Link>
      </div>
    </div>
  );
}
