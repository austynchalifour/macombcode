import Image from "next/image";
import { store } from "@/lib/demos/northside-supply/products";
import Reveal from "./Reveal";

export default function VisitSection() {
  return (
    <section id="visit" className="bg-[var(--ns-wood)] text-[var(--ns-cream)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-28">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/demos/northside-supply/goods.png"
              alt="Hardware and home goods on a wood counter"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="ns-grain absolute inset-0" />
          </div>
        </Reveal>

        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ns-mustard)]">
              Visit &amp; order
            </p>
            <h2 className="ns-display mt-3 text-4xl md:text-5xl">
              Find it online.
              <br />
              Pick it up on Main.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--ns-cream)]/75">
              Spot something in the catalog? Call and we&apos;ll walk it to the hold
              shelf — usually ready the same afternoon.
            </p>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ns-mustard)]">
                  Address
                </dt>
                <dd className="mt-1 text-base">{store.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ns-mustard)]">
                  Hours
                </dt>
                <dd className="mt-1 text-base">{store.hours}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ns-mustard)]">
                  Call to order
                </dt>
                <dd className="mt-1">
                  <a
                    href={store.phoneHref}
                    className="ns-display text-2xl text-[var(--ns-mustard)]"
                  >
                    {store.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
