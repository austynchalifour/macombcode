import Reveal from "./Reveal";

const projects = [
  {
    name: "Harbor Point Dental",
    type: "Website",
    result: "Bookings up after a clearer patient journey and mobile redesign.",
    tone: "bg-band-a",
  },
  {
    name: "Northside Supply Co.",
    type: "E-commerce",
    result: "Product catalog rebuilt for faster search and checkout.",
    tone: "bg-band-b",
  },
  {
    name: "Lakeside HVAC",
    type: "Custom software",
    result: "Dispatch tools that cut scheduling time for field crews.",
    tone: "bg-band-c",
  },
];

export default function Work() {
  return (
    <section id="work">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-navy md:text-5xl">
              Projects that earn their keep.
            </h2>
            <p className="max-w-xs text-lg italic text-ink-muted md:text-right">
              Selected work for local operators who needed more than a template.
            </p>
          </div>
        </Reveal>
      </div>

      <ul>
        {projects.map((project, i) => (
          <li key={project.name}>
            <Reveal>
              <a
                href="#contact"
                className={`work-band block ${project.tone} border-t border-navy/10`}
              >
                <div className="mx-auto flex min-h-[220px] max-w-7xl flex-col justify-between gap-8 px-5 py-12 md:min-h-[280px] md:flex-row md:items-end md:px-10 md:py-16">
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
                      0{i + 1} — {project.type}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-5xl">
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
                      {project.result}
                    </p>
                  </div>
                  <span className="work-arrow font-display text-lg font-bold text-navy">
                    View project →
                  </span>
                </div>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
