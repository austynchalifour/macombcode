import Nav from "./Nav";

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
              <a href="#contact" className="cta-primary text-base">
                Start a project
              </a>
              <a href="#work" className="cta-secondary text-base">
                See our work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
