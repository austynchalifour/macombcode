import {
  formatMenuUpdatedAt,
  formatPrice,
} from "@/lib/cms/romeo-and-vine/client";
import type { DailySpecial, MenuSection as MenuSectionType } from "@/lib/cms/romeo-and-vine/types";
import Reveal from "./Reveal";

function dietaryLabel(tag: string) {
  if (tag === "gluten-free") return "GF";
  if (tag === "vegetarian") return "V";
  return tag;
}

export default function MenuSection({
  specials,
  sections,
  updatedAt,
}: {
  specials: DailySpecial[];
  sections: MenuSectionType[];
  updatedAt: string;
}) {
  return (
    <section id="menu" className="bg-[var(--rv-linen-soft)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rv-terracotta)]">
              Live menu
            </p>
            <h2 className="rv-display mt-4 text-4xl leading-[1.05] tracking-[-0.02em] text-[var(--rv-ink)] md:text-5xl">
              What we&apos;re cooking tonight
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--rv-muted)]">
              Menu and daily specials are pulled from a simple CMS — update once,
              live everywhere. Last published {formatMenuUpdatedAt(updatedAt)}.
            </p>
          </div>
        </Reveal>

        {specials.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {specials.map((special, i) => (
              <Reveal key={special.id}>
                <article className="rv-special-card p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rv-terracotta)]">
                    {special.label}
                  </p>
                  <div className="mt-3 flex items-baseline justify-between gap-4">
                    <h3 className="rv-display text-2xl tracking-tight text-[var(--rv-ink)] md:text-3xl">
                      {special.name}
                    </h3>
                    <span className="shrink-0 text-lg font-semibold text-[var(--rv-ink)]">
                      {formatPrice(special.price)}
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-[var(--rv-muted)]">
                    {special.description}
                  </p>
                  {i === 0 ? (
                    <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[var(--rv-gold)]">
                      Updated from CMS · available tonight
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}

        <div className="mt-16 space-y-14">
          {sections.map((section) => (
            <Reveal key={section.id}>
              <div>
                <h3 className="rv-display text-3xl tracking-tight text-[var(--rv-forest)] md:text-4xl">
                  {section.title}
                </h3>
                <ul className="mt-6">
                  {section.items.map((item) => (
                    <li key={item.id} className="rv-menu-row py-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h4 className="text-lg font-semibold text-[var(--rv-ink)]">
                            {item.name}
                          </h4>
                          {item.dietary.length > 0 ? (
                            <span className="text-xs uppercase tracking-[0.12em] text-[var(--rv-muted)]">
                              {item.dietary.map(dietaryLabel).join(" · ")}
                            </span>
                          ) : null}
                        </div>
                        <span className="shrink-0 font-semibold text-[var(--rv-ink)]">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-[var(--rv-muted)]">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
