import Image from "next/image";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--rv-forest)] text-[var(--rv-linen)]">
      <div className="absolute inset-0">
        <Image
          src="/demos/romeo-and-vine/hero.png"
          alt="Candlelit dining room at Romeo & Vine"
          fill
          priority
          sizes="100vw"
          className="rv-hero-image object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(20,34,28,0.88) 0%, rgba(20,34,28,0.62) 42%, rgba(20,34,28,0.28) 100%)",
          }}
        />
        <div className="rv-grain absolute inset-0" />
      </div>

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <p className="rv-rise rv-display text-5xl leading-[0.95] tracking-[-0.02em] text-[var(--rv-linen)] sm:text-6xl md:text-7xl lg:text-8xl">
          Romeo &amp; Vine
        </p>
        <h1 className="rv-rise rv-rise-1 mt-5 max-w-xl text-xl leading-snug text-[var(--rv-linen)]/90 md:text-2xl">
          A family-owned Italian wine bar in the heart of Romeo.
        </h1>
        <p className="rv-rise rv-rise-2 mt-4 max-w-md text-base leading-relaxed text-[var(--rv-stone)] md:text-lg">
          Handmade pasta, a cellar curated for lingering, and tables that feel like home.
        </p>
        <div className="rv-rise rv-rise-3 mt-8 flex flex-wrap items-center gap-5">
          <a href="#reserve" className="rv-cta">
            Reserve a table
          </a>
          <a href="#menu" className="rv-cta-ghost">
            See tonight&apos;s menu
          </a>
        </div>
      </div>
    </section>
  );
}
