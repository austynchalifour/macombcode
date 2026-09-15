import { company } from "@/lib/demos/van-dyke-electric/data";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";

export default function QuoteSection() {
  return (
    <section id="quote" className="bg-[var(--vde-paper)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:items-start md:gap-12 md:px-8 md:py-16">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--vde-copper)]">
              Book the job
            </p>
            <h2 className="vde-display mt-3 text-4xl text-[var(--vde-ink)] md:text-5xl">
              Quotes that
              <br />
              hit the right desk
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--vde-muted)]">
              A sparking panel doesn&apos;t belong in the same inbox as an EV
              charger estimate. This form tags and routes by job type so the
              right person calls back first.
            </p>
            <dl className="mt-10 space-y-5 text-[var(--vde-ink)]">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
                  Call / text
                </dt>
                <dd className="mt-1">
                  <a
                    href={company.phoneHref}
                    className="vde-display text-2xl text-[var(--vde-copper)]"
                  >
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
                  Shop
                </dt>
                <dd className="mt-1 text-base">{company.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--vde-muted)]">
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
