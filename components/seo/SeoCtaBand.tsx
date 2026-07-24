import Link from "next/link";
import type { ReactNode } from "react";
import type { SeoCta } from "@/data/seo-ctas";

export default function SeoCtaBand({
  title,
  description,
  ctas,
  children,
}: {
  title: string;
  description: ReactNode;
  ctas: SeoCta[];
  children?: ReactNode;
}) {
  return (
    <section className="bg-paper-warm">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
          {title}
        </h2>
        <div className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted italic">
          {description}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {ctas.map((cta) => (
            <Link
              key={cta.href + cta.label}
              href={cta.href}
              className={
                cta.variant === "primary"
                  ? "cta-primary text-base"
                  : "cta-secondary text-base"
              }
            >
              {cta.label}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
