import Image from "next/image";
import { company } from "@/lib/demos/dump-daddy/data";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--dd-ink)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/demos/dump-daddy/hero.png"
          alt="Dump Daddy junk removal truck ready for a residential cleanout"
          fill
          priority
          sizes="100vw"
          className="dd-hero-image object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.72) 45%, rgba(10,10,10,0.4) 100%)",
          }}
        />
        <div className="dd-grain absolute inset-0" />
      </div>

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="dd-rise dd-display text-[clamp(3.2rem,10vw,7rem)] text-[var(--dd-red)]">
          Dump Daddy
        </p>
        <h1 className="dd-rise dd-rise-1 mt-3 max-w-2xl dd-display text-[clamp(1.8rem,4.5vw,3.2rem)] text-white">
          We haul. You relax.
        </h1>
        <p className="dd-rise dd-rise-2 mt-5 max-w-lg text-lg leading-relaxed text-white/80 md:text-xl">
          Fast, affordable junk removal in {company.area}. Garage cleanouts,
          furniture, appliances, estate cleanouts, and more — same-day service
          available.
        </p>
        <div className="dd-rise dd-rise-3 mt-8 flex flex-wrap items-center gap-5">
          <a href={company.phoneHref} className="dd-cta">
            Call {company.phone}
          </a>
          <a href="#quote" className="dd-cta-ghost">
            Free quote
          </a>
        </div>
      </div>
    </section>
  );
}
