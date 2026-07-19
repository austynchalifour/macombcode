import Link from "next/link";
import type { RestaurantInfo } from "@/lib/cms/romeo-and-vine/types";

export default function SiteFooter({ restaurant }: { restaurant: RestaurantInfo }) {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--rv-linen)_12%,transparent)] bg-[var(--rv-forest)] text-[var(--rv-linen)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="rv-display text-3xl tracking-tight">{restaurant.name}</p>
          <p className="mt-2 max-w-sm text-[var(--rv-stone)]">{restaurant.tagline}</p>
          <p className="mt-4 text-sm text-[var(--rv-stone)]">{restaurant.location}</p>
        </div>
        <div className="text-sm text-[var(--rv-stone)]">
          <p>
            Demo built by{" "}
            <Link href="/" className="text-[var(--rv-linen)] underline decoration-[var(--rv-terracotta)] underline-offset-2">
              Macomb Code
            </Link>
          </p>
          <p className="mt-1">CMS-driven menu · reservation API · custom brand system</p>
        </div>
      </div>
    </footer>
  );
}
