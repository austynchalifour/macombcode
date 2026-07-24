import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { business } from "@/data/business";
import { websiteInADayOffer } from "@/data/offer";

export const metadata = {
  title: "Purchase confirmed | Macomb Code",
  robots: { index: false, follow: false },
};

export default async function OfferSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  return (
    <>
      <div className="hero-atmosphere relative overflow-hidden">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <Nav />
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Payment received
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy">
            You&apos;re locked in for {websiteInADayOffer.name}.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink-muted italic">
            Thanks for your purchase. We&apos;ll reach out shortly to schedule
            your build day and collect the details we need to launch.
          </p>
          {sessionId ? (
            <p className="mt-4 font-display text-sm text-ink-muted/70">
              Reference: {sessionId}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/book" className="cta-primary text-base">
              Book your build day
            </Link>
            <a href={business.phoneTel} className="cta-secondary text-base">
              Call {business.phone}
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
