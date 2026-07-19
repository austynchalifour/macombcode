import Image from "next/image";
import type { RestaurantInfo } from "@/lib/cms/romeo-and-vine/types";
import Reveal from "./Reveal";
import ReservationWidget from "./ReservationWidget";

export default function ReserveSection({ restaurant }: { restaurant: RestaurantInfo }) {
  return (
    <section id="reserve" className="bg-[var(--rv-linen)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:gap-12 md:px-8 md:py-28">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rv-terracotta)]">
              Visit us
            </p>
            <h2 className="rv-display mt-4 text-4xl leading-[1.05] tracking-[-0.02em] text-[var(--rv-ink)] md:text-5xl">
              Save a seat by the wine wall
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--rv-muted)]">
              Walk-ins welcome when we can, but Friday and Saturday fill fast. Book ahead
              and we&apos;ll have the table waiting.
            </p>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden">
              <Image
                src="/demos/romeo-and-vine/wine.png"
                alt="Wine poured at the Romeo & Vine bar"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="rv-grain absolute inset-0" />
            </div>

            <dl className="mt-8 space-y-4 text-base text-[var(--rv-ink)]">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                  Address
                </dt>
                <dd className="mt-1">{restaurant.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                  Hours
                </dt>
                <dd className="mt-1">
                  {restaurant.hours.tueSat}
                  <br />
                  {restaurant.hours.sun}
                  <br />
                  {restaurant.hours.closed}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--rv-muted)]">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a href={`tel:${restaurant.phone.replace(/\D/g, "")}`} className="hover:text-[var(--rv-terracotta)]">
                    {restaurant.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal>
          <ReservationWidget />
        </Reveal>
      </div>
    </section>
  );
}
