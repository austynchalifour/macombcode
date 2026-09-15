import Image from "next/image";
import { company } from "@/lib/demos/van-dyke-electric/data";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--vde-ink)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/demos/van-dyke-electric/hero.png"
          alt="Van Dyke Electric service van in a Warren driveway at dusk"
          fill
          priority
          sizes="100vw"
          className="vde-hero-image object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(11,12,14,0.92) 0%, rgba(11,12,14,0.72) 48%, rgba(11,12,14,0.38) 100%)",
          }}
        />
        <div className="vde-grain absolute inset-0" />
      </div>

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="vde-rise text-xs font-bold uppercase tracking-[0.22em] text-[var(--vde-amp)]">
          Warren · Macomb County · 24/7
        </p>
        <p className="vde-rise vde-rise-1 vde-display mt-3 text-5xl text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Van Dyke
          <br />
          Electric
        </p>
        <h1 className="vde-rise vde-rise-2 mt-5 max-w-xl text-xl font-medium leading-snug text-white/90 md:text-2xl">
          When the lights go out — or you need more power — a local crew that
          actually answers.
        </h1>
        <p className="vde-rise vde-rise-3 mt-4 max-w-md text-base leading-relaxed text-[var(--vde-mist)] md:text-lg">
          {company.tagline} Check what&apos;s going on, get routed to the right
          desk, get an electrician on the way.
        </p>
        <div className="vde-rise vde-rise-3 mt-8 flex flex-wrap items-center gap-5">
          <a href={company.phoneHref} className="vde-cta-danger">
            Emergency call
          </a>
          <a href="#triage" className="vde-cta-ghost">
            What&apos;s going on?
          </a>
        </div>
      </div>
    </section>
  );
}
