import Image from "next/image";
import { company } from "@/lib/demos/precision-paving/data";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--pp-asphalt)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/demos/precision-paving/hero.png"
          alt="Freshly paved residential asphalt driveway"
          fill
          priority
          sizes="100vw"
          className="pp-hero-image object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(18,16,14,0.92) 0%, rgba(18,16,14,0.7) 48%, rgba(18,16,14,0.35) 100%)",
          }}
        />
        <div className="pp-grain absolute inset-0" />
      </div>

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="pp-rise pp-display text-[clamp(2.8rem,8vw,5.5rem)] text-white">
          Precision
          <br />
          <span className="text-[var(--pp-amber)]">Paving &amp; Sealing</span>
        </p>
        <h1 className="pp-rise pp-rise-1 mt-5 max-w-xl text-xl font-medium leading-snug text-white/90 md:text-2xl">
          Quality asphalt, concrete, gravel, and excavation — done right in{" "}
          {company.city}.
        </h1>
        <p className="pp-rise pp-rise-2 mt-4 max-w-md text-base leading-relaxed text-[var(--pp-mist)] md:text-lg">
          {company.tagline} Free estimates available.
        </p>
        <div className="pp-rise pp-rise-3 mt-8 flex flex-wrap items-center gap-5">
          <a href={company.phoneHref} className="pp-cta">
            Call {company.phone}
          </a>
          <a href="#quote" className="pp-cta-ghost">
            Free estimate
          </a>
        </div>
      </div>
    </section>
  );
}
