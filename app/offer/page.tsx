import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import OfferCheckoutButton from "@/components/OfferCheckoutButton";
import { business } from "@/data/business";
import { websiteInADayOffer } from "@/data/offer";

const included = [
  "One-page or simple multi-section business site",
  "Mobile-ready layout that looks sharp on every screen",
  "Your services, contact info, and clear call to action",
  "Contact form wired to your email",
  "Basic SEO setup — title, description, and local signals",
  "Live on your domain the same day (domain ready or we use a temporary URL)",
];

const dayPlan = [
  {
    step: "01",
    title: "Morning — kickoff",
    copy: "We lock the goal, gather your copy and photos, and agree on the structure before we start building.",
  },
  {
    step: "02",
    title: "Midday — build",
    copy: "Your site gets designed and developed in one focused session — clean, fast, and built to convert.",
  },
  {
    step: "03",
    title: "Afternoon — launch",
    copy: "We review together, make final tweaks, and push it live before the day is done.",
  },
];

const fit = [
  {
    title: "Right for you if",
    items: [
      "You need a real website online this week — not next quarter",
      "You already know your services, hours, and how to reach you",
      "You want something clean and credible, not a bloated redesign",
    ],
  },
  {
    title: "Not the fit if",
    items: [
      "You need ecommerce, booking systems, or custom software",
      "You want a large multi-page site or brand identity from scratch",
      "You don't have copy or photos ready and can't decide on content that day",
    ],
  },
];

export default async function OfferPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;

  return (
    <>
      <div className="hero-atmosphere relative min-h-[78svh] overflow-hidden md:min-h-[82svh]">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto flex min-h-[calc(78svh-4rem)] max-w-7xl flex-col justify-center px-5 pb-16 pt-8 md:min-h-[calc(82svh-4.5rem)] md:px-10 md:pb-24 md:pt-10">
          <p className="animate-rise font-display text-[clamp(2.2rem,4.8vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-navy">
            {business.name}
          </p>
          <h1 className="animate-rise animate-rise-delay-1 mt-4 max-w-4xl font-display text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-navy">
            {websiteInADayOffer.name}
            <span className="mt-2 block text-orange">
              for {websiteInADayOffer.priceLabel}.
            </span>
          </h1>
          <p className="animate-rise animate-rise-delay-2 mt-6 max-w-xl text-xl leading-relaxed text-ink-muted italic md:text-[1.35rem]">
            One focused day. A live site before sundown. Built for Macomb County
            businesses that need to get online now.
          </p>
          {canceled ? (
            <p className="animate-rise animate-rise-delay-2 mt-4 max-w-xl text-base text-orange">
              Checkout was canceled. You can buy whenever you&apos;re ready.
            </p>
          ) : null}
          <div className="animate-rise animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-5">
            <OfferCheckoutButton label={`Buy for ${websiteInADayOffer.priceLabel}`} />
            <Link
              href="/?plan=Website%20In%20A%20Day#contact"
              className="cta-secondary text-base"
            >
              Ask a question
            </Link>
          </div>
        </section>
      </div>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              What&apos;s included
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
              Everything you need to look open for business.
            </h2>
            <ul className="mt-10 max-w-2xl space-y-0">
              {included.map((item) => (
                <li
                  key={item}
                  className="border-t border-mist py-4 text-lg leading-relaxed text-ink-muted"
                >
                  <span className="mr-3 text-orange">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-mist bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              The day
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
              Kickoff to launch in one stretch.
            </h2>
            <ol className="mt-10 max-w-3xl space-y-8">
              {dayPlan.map((item) => (
                <li key={item.step} className="border-t border-mist pt-6">
                  <p className="font-display text-sm font-bold text-orange">
                    {item.step}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-extrabold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-muted">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-mist bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              Good fit
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
              Simple offer. Clear boundaries.
            </h2>
            <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
              {fit.map((column) => (
                <div key={column.title}>
                  <h3 className="font-display text-xl font-extrabold text-navy">
                    {column.title}
                  </h3>
                  <ul className="mt-5 space-y-0">
                    {column.items.map((item) => (
                      <li
                        key={item}
                        className="border-t border-mist py-4 text-base leading-relaxed text-ink-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-orange">
              {websiteInADayOffer.priceLabel} flat
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
              Ready to get online in a day?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/75 italic">
              Pay securely with Stripe, then we&apos;ll schedule your build day.
              Prefer to talk first? Call or send a note.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <OfferCheckoutButton label="Buy now" />
              <a
                href={business.phoneTel}
                className="font-display text-base font-semibold text-paper underline decoration-orange/50 underline-offset-4 transition-colors hover:text-orange"
              >
                {business.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
