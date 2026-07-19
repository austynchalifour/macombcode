import Image from "next/image";
import { company } from "@/lib/demos/clemens-heating-cooling/data";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--chc-navy)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/demos/clemens-heating-cooling/hero.png"
          alt="Clemens Heating & Cooling service van on a residential call"
          fill
          priority
          sizes="100vw"
          className="chc-hero-image object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(12,30,54,0.92) 0%, rgba(12,30,54,0.72) 48%, rgba(12,30,54,0.35) 100%)",
          }}
        />
        <div className="chc-grain absolute inset-0" />
      </div>

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="chc-rise chc-display text-5xl text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Clemens
          <br />
          Heating &amp; Cooling
        </p>
        <h1 className="chc-rise chc-rise-1 mt-5 max-w-xl text-xl font-medium leading-snug text-white/90 md:text-2xl">
          Fast HVAC &amp; plumbing for Mount Clemens and Macomb County.
        </h1>
        <p className="chc-rise chc-rise-2 mt-4 max-w-md text-base leading-relaxed text-[var(--chc-mist)] md:text-lg">
          {company.tagline} Check your ZIP, request a quote, get a tech on the way.
        </p>
        <div className="chc-rise chc-rise-3 mt-8 flex flex-wrap items-center gap-5">
          <a href="#coverage" className="chc-cta">
            Check my ZIP
          </a>
          <a href="#quote" className="chc-cta-ghost">
            Request a quote
          </a>
        </div>
      </div>
    </section>
  );
}
