import Nav from "./Nav";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-atmosphere relative flex min-h-[78svh] flex-col overflow-hidden md:min-h-[82svh]"
    >
      <div className="hero-grain absolute inset-0" aria-hidden />
      <Nav />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-12 pt-4 md:px-10 md:pb-16 md:pt-2">
        <div className="grid max-w-5xl gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-12">
          <h1 className="animate-rise font-display text-[clamp(2.6rem,5.8vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-navy">
            Built for the businesses that keep Macomb running.
          </h1>

          <div className="animate-rise animate-rise-delay-1">
            <p className="max-w-sm text-xl leading-relaxed text-ink-muted italic md:text-[1.35rem]">
              Websites and software that look sharp, load fast, and help local
              companies win more work.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <Link href="/book" className="cta-primary text-base">
                Book A Call
              </Link>
              <Link href="/analyze" className="cta-secondary text-base">
                Free Website Review
              </Link>
            </div>
            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
              <Link href="/services" className="transition-colors hover:text-navy">
                Services
              </Link>
              <Link href="/cities" className="transition-colors hover:text-navy">
                Cities
              </Link>
              <Link
                href="/industries"
                className="transition-colors hover:text-navy"
              >
                Industries
              </Link>
              <Link
                href="/guides/web-design-macomb-county"
                className="transition-colors hover:text-navy"
              >
                Guides
              </Link>
              <a href="#work" className="transition-colors hover:text-navy">
                Demos
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
