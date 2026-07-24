import { websiteProcessSteps } from "@/lib/seo-content";

export default function ProcessSteps({
  title = "Our website process",
}: {
  title?: string;
}) {
  return (
    <section className="border-t border-mist bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
          {title}
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {websiteProcessSteps.map((step, index) => (
            <li key={step.title}>
              <span className="font-display text-sm font-bold tracking-[0.18em] text-orange">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-navy">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
