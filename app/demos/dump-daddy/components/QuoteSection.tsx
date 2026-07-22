import { company } from "@/lib/demos/dump-daddy/data";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";

export default function QuoteSection() {
  return (
    <section id="quote" className="bg-[var(--dd-charcoal)] text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--dd-yellow)]">
            Free estimate
          </p>
          <h2 className="dd-display mt-3 text-5xl md:text-6xl">
            Need junk gone?
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            Tell us what you&apos;re clearing out. We&apos;ll follow up with a
            free quote — same-day when we can.
          </p>
          <div className="mt-10 space-y-3 text-white/80">
            <p>
              <a
                href={company.phoneHref}
                className="dd-display text-2xl text-[var(--dd-yellow)] transition hover:text-white"
              >
                {company.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${company.email}`}
                className="text-base underline decoration-white/30 underline-offset-4 hover:decoration-[var(--dd-yellow)]"
              >
                {company.email}
              </a>
            </p>
            <p className="pt-2 text-sm text-white/55">
              Serving {company.counties}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
