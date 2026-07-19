import Image from "next/image";
import { store } from "@/lib/demos/northside-supply/products";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--ns-wood)] text-[var(--ns-cream)]">
      <div className="absolute inset-0">
        <Image
          src="/demos/northside-supply/hero.png"
          alt="Warm interior of Northside Supply Co."
          fill
          priority
          sizes="100vw"
          className="ns-hero-image object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(62,42,29,0.92) 0%, rgba(62,42,29,0.72) 45%, rgba(62,42,29,0.35) 100%)",
          }}
        />
        <div className="ns-grain absolute inset-0" />
      </div>

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="ns-rise ns-display text-5xl text-[var(--ns-cream)] sm:text-6xl md:text-7xl lg:text-8xl">
          Northside
          <br />
          Supply Co.
        </p>
        <h1 className="ns-rise ns-rise-1 mt-5 max-w-xl text-xl font-medium leading-snug text-[var(--ns-cream)]/90 md:text-2xl">
          Romeo&apos;s hardware &amp; home-goods shop.
        </h1>
        <p className="ns-rise ns-rise-2 mt-4 max-w-md text-base leading-relaxed text-[var(--ns-cream)]/70 md:text-lg">
          {store.tagline} Browse what&apos;s in stock, then call — we&apos;ll pull it
          and hold it at the counter.
        </p>
        <div className="ns-rise ns-rise-3 mt-8 flex flex-wrap items-center gap-5">
          <a href="#catalog" className="ns-cta">
            Browse the catalog
          </a>
          <a href="#visit" className="ns-cta-ghost">
            Store hours &amp; address
          </a>
        </div>
      </div>
    </section>
  );
}
