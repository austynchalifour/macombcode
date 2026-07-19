import Image from "next/image";
import { practice } from "@/lib/demos/harbor-point-dental/data";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--hp-sky)] text-[var(--hp-ink)]">
      <div className="absolute inset-0">
        <Image
          src="/demos/harbor-point-dental/hero.png"
          alt="Bright, welcoming Harbor Point Family Dental reception"
          fill
          priority
          sizes="100vw"
          className="hp-hero-image object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(238,246,250,0.94) 0%, rgba(238,246,250,0.78) 42%, rgba(238,246,250,0.35) 100%)",
          }}
        />
        <div className="hp-grain absolute inset-0" />
      </div>

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="hp-rise hp-display text-5xl text-[var(--hp-ink)] sm:text-6xl md:text-7xl lg:text-8xl">
          Harbor Point
          <br />
          Family Dental
        </p>
        <h1 className="hp-rise hp-rise-1 mt-5 max-w-xl text-xl font-medium leading-snug text-[var(--hp-ink)]/85 md:text-2xl">
          Calm, modern dentistry in St. Clair Shores.
        </h1>
        <p className="hp-rise hp-rise-2 mt-4 max-w-md text-base leading-relaxed text-[var(--hp-muted)] md:text-lg">
          {practice.tagline} Book online and finish your intake before you ever
          sit in the chair.
        </p>
        <div className="hp-rise hp-rise-3 mt-8 flex flex-wrap items-center gap-5">
          <a href="#book" className="hp-cta">
            Book an appointment
          </a>
          <a href="#care" className="hp-cta-ghost">
            How we care for you
          </a>
        </div>
      </div>
    </section>
  );
}
