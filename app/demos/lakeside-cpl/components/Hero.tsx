import Image from "next/image";
import { company } from "@/lib/demos/lakeside-cpl/data";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--lcpl-deep)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/demos/lakeside-cpl/hero.png"
          alt="Lakeside CPL training facility in Harrison Township at dusk"
          fill
          priority
          sizes="100vw"
          className="lcpl-hero-image object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(18,23,15,0.92) 0%, rgba(18,23,15,0.72) 48%, rgba(18,23,15,0.38) 100%)",
          }}
        />
        <div className="lcpl-grain absolute inset-0" />
      </div>

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="lcpl-rise text-xs font-bold uppercase tracking-[0.22em] text-[var(--lcpl-brass)]">
          Harrison Township · Macomb County
        </p>
        <p className="lcpl-rise lcpl-rise-1 lcpl-display mt-3 text-5xl text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Lakeside
          <br />
          CPL
        </p>
        <h1 className="lcpl-rise lcpl-rise-2 mt-5 max-w-xl text-xl font-medium leading-snug text-white/90 md:text-2xl">
          Michigan Concealed Pistol License training — clear classes, safe
          range time, straight answers.
        </h1>
        <p className="lcpl-rise lcpl-rise-3 mt-4 max-w-md text-base leading-relaxed text-[var(--lcpl-mist)] md:text-lg">
          {company.tagline} Find the right course, pick a date, get on the
          roster.
        </p>
        <div className="lcpl-rise lcpl-rise-3 mt-8 flex flex-wrap items-center gap-5">
          <a href="#pathfinder" className="lcpl-cta">
            Which class do I need?
          </a>
          <a href="#enroll" className="lcpl-cta-ghost">
            Enroll
          </a>
        </div>
      </div>
    </section>
  );
}
