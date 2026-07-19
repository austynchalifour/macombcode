import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-[var(--ns-cream)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-28">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ns-mustard)]">
              The shop
            </p>
            <h2 className="ns-display mt-3 text-4xl text-[var(--ns-wood)] md:text-5xl">
              Not a big-box aisle.
              <br />
              A proper general store.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--ns-muted)]">
              Fasteners in bins, cast iron on the shelf, and someone who can tell you
              which hinge actually fits a 1920s door on Main Street.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--ns-muted)]">
              We keep a live shelf list online so you can check stock before you drive
              over — or call and we&apos;ll set it aside.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/demos/northside-supply/aisle.png"
              alt="Organized hardware bins at Northside Supply"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="ns-grain absolute inset-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
