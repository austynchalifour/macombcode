import Image from "next/image";
import Reveal from "./Reveal";
import PathfinderTool from "./PathfinderTool";

export default function PathfinderSection() {
  return (
    <section id="pathfinder" className="bg-[var(--lcpl-deep)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:items-start md:gap-12 md:px-8 md:py-16">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lcpl-brass)]">
              Built-in front desk
            </p>
            <h2 className="lcpl-display mt-3 text-4xl md:text-5xl">
              Renewal doesn&apos;t
              <br />
              belong in the
              <br />
              first-time inbox
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--lcpl-mist)]">
              Students often don&apos;t know if they need an 8-hour course or a
              renewal refresher. This tool answers before they call — and tags
              the lead so private lessons never sit behind a group CPL roster.
            </p>
            <div className="relative mt-6 hidden aspect-[16/10] overflow-hidden md:block">
              <Image
                src="/demos/lakeside-cpl/range.png"
                alt="Indoor pistol range lanes at Lakeside CPL"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="lcpl-grain absolute inset-0" />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <PathfinderTool />
        </Reveal>
      </div>
    </section>
  );
}
