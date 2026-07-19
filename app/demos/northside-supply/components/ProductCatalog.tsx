"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
  categories,
  categoryLabels,
  filterProducts,
  formatPrice,
  products,
  store,
  type ProductCategory,
} from "@/lib/demos/northside-supply/products";

export default function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [inStockOnly, setInStockOnly] = useState(true);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () =>
      filterProducts(products, {
        query: deferredQuery,
        category,
        inStockOnly,
      }),
    [deferredQuery, category, inStockOnly],
  );

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-[var(--ns-line)] bg-[var(--ns-paper)]/95 py-5 backdrop-blur-sm">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ns-muted)]">
            Search the shelf
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “hinge”, “skillet”, or SKU NS-2204"
            className="ns-field mt-2"
            autoComplete="off"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`ns-chip ${category === cat.id ? "is-active" : ""}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <label className="mt-4 flex items-center gap-2.5 text-sm text-[var(--ns-muted)]">
          <input
            type="checkbox"
            className="ns-check"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          In stock only
        </label>
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-4 py-4">
        <p className="text-sm text-[var(--ns-muted)]">
          {results.length} {results.length === 1 ? "item" : "items"}
          {deferredQuery.trim() ? ` matching “${deferredQuery.trim()}”` : ""}
        </p>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--ns-wood-soft)]">
          Browse · call to order
        </p>
      </div>

      {results.length === 0 ? (
        <div className="border-t border-[var(--ns-line)] py-12">
          <p className="ns-display text-2xl text-[var(--ns-wood)]">
            Nothing on that shelf.
          </p>
          <p className="mt-2 max-w-md text-base text-[var(--ns-muted)]">
            Try another search, clear filters, or call the shop — we might have it in
            the back.
          </p>
          <a href={store.phoneHref} className="ns-cta mt-6 inline-flex">
            Call {store.phone}
          </a>
        </div>
      ) : (
        <ul>
          {results.map((product) => (
            <li key={product.id} className="ns-product">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`ns-stock ${product.inStock ? "ns-stock-in" : "ns-stock-out"}`}
                    >
                      {product.inStock ? "In stock" : "Call ahead"}
                    </span>
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--ns-muted)]">
                      {categoryLabels[product.category]} · Aisle {product.aisle} ·{" "}
                      {product.sku}
                    </span>
                  </div>
                  <h3 className="ns-display mt-2 text-2xl text-[var(--ns-wood)] md:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-base leading-relaxed text-[var(--ns-muted)]">
                    {product.summary}
                  </p>
                </div>
                <div className="flex shrink-0 flex-row items-center justify-between gap-4 md:flex-col md:items-end">
                  <p className="text-xl font-bold text-[var(--ns-wood)]">
                    {formatPrice(product.price)}
                  </p>
                  <a
                    href={store.phoneHref}
                    className="text-sm font-bold uppercase tracking-[0.1em] text-[var(--ns-wood)] underline decoration-[var(--ns-mustard)] underline-offset-4 transition hover:text-[var(--ns-mustard)]"
                  >
                    {product.inStock ? "Call to hold →" : "Ask about stock →"}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
