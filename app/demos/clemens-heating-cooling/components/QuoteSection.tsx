import { company } from "@/lib/demos/clemens-heating-cooling/data";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";

export default function QuoteSection() {
  return (
    <section id="quote" className="bg-[var(--chc-steel)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:gap-12 md:px-8 md:py-28">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--chc-orange)]">
              Book the job
            </p>
            <h2 className="chc-display mt-3 text-4xl text-[var(--chc-navy)] md:text-5xl">
              Quotes that
              <br />
              hit the right desk
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--chc-muted)]">
              Emergency no-heat doesn&apos;t belong in the same inbox as a spring tune-up.
              This form tags and routes by service type so the right person calls back first.
            </p>
            <dl className="mt-10 space-y-5 text-[var(--chc-navy)]">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
                  Call / text
                </dt>
                <dd className="mt-1">
                  <a
                    href={company.phoneHref}
                    className="chc-display text-2xl text-[var(--chc-orange)]"
                  >
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
                  Shop
                </dt>
                <dd className="mt-1 text-base">{company.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--chc-muted)]">
                  Hours
                </dt>
                <dd className="mt-1 text-base">{company.hours}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
