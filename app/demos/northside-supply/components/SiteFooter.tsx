import Link from "next/link";
import { store } from "@/lib/demos/northside-supply/products";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--ns-cream)_12%,transparent)] bg-[var(--ns-wood-mid)] text-[var(--ns-cream)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="ns-display text-3xl">{store.name}</p>
          <p className="mt-2 max-w-sm text-[var(--ns-cream)]/75">{store.tagline}</p>
          <p className="mt-4 text-sm text-[var(--ns-cream)]/65">{store.address}</p>
        </div>
        <div className="text-sm text-[var(--ns-cream)]/70">
          <p>
            Demo built by{" "}
            <Link
              href="/"
              className="text-[var(--ns-cream)]"
              style={{ borderBottom: "1px solid var(--ns-mustard)" }}
            >
              Macomb Code
            </Link>
          </p>
          <p className="mt-1">Searchable catalog · category filters · call-to-order retail</p>
        </div>
      </div>
    </footer>
  );
}
