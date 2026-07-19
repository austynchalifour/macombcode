import Reveal from "./Reveal";
import { projects } from "@/data/projects";

export default function Work() {
  return (
    <section id="work">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-12">
        <Reveal>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-navy md:text-5xl">
              Projects that earn their keep.
            </h2>
            <p className="max-w-xs text-lg italic text-ink-muted md:text-right">
              Selected work — from local business sites to search-driven platforms.
            </p>
          </div>
        </Reveal>
      </div>

      <ul>
        {projects.map((project, i) => {
          const href = project.url ?? "/#contact";
          const external = Boolean(project.url?.startsWith("http"));

          return (
            <li key={project.name}>
              <Reveal>
                <a
                  href={href}
                  className={`work-band block ${project.tone} border-t border-navy/10`}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-8 md:flex-row md:items-end md:gap-8 md:px-10 md:py-10">
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
                        0{i + 1} — {project.type}
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
                        {project.name}
                      </h3>
                      <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-muted">
                        {project.result}
                      </p>
                    </div>
                    <span className="work-arrow shrink-0 font-display text-lg font-bold text-navy">
                      {external ? "View project →" : "Start a project →"}
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
