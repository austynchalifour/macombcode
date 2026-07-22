import { company } from "@/lib/demos/precision-paving/data";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";

export default function QuoteSection() {
  return (
    <section id="quote" className="bg-[var(--pp-slate)] text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--pp-amber)]">
            Free estimates
          </p>
          <h2 className="pp-display mt-3 text-5xl md:text-6xl">
            Ready for a quote?
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            Tell us about the job — driveway, lot, sealcoat, concrete, or
            striping. We&apos;ll follow up with a free estimate.
          </p>
          <div className="mt-10 space-y-3 text-white/80">
            <p>
              <a
                href={company.phoneHref}
                className="pp-display text-2xl text-[var(--pp-amber)] transition hover:text-white"
              >
                {company.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${company.email}`}
                className="text-base underline decoration-white/30 underline-offset-4 hover:decoration-[var(--pp-amber)]"
              >
                {company.email}
              </a>
            </p>
            <p className="pt-2 text-sm text-white/55">{company.city}</p>
          </div>
        </Reveal>

        <Reveal>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
