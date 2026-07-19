import Reveal from "./Reveal";
import ProductCatalog from "./ProductCatalog";

export default function CatalogSection() {
  return (
    <section id="catalog" className="bg-[var(--ns-paper)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ns-mustard)]">
              Live shelf list
            </p>
            <h2 className="ns-display mt-3 text-4xl text-[var(--ns-wood)] md:text-5xl">
              What&apos;s in stock today
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ns-muted)]">
              Search and filter like a real inventory board — not a full checkout cart.
              Small retailers use this to answer &ldquo;do you have it?&rdquo; without a
              phone marathon.
            </p>
          </div>
        </Reveal>

        <div className="mt-10">
          <ProductCatalog />
        </div>
      </div>
    </section>
  );
}
