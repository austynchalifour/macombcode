export type FaqItem = {
  question: string;
  answer: string;
};

export default function SeoFaq({
  title,
  faqs,
}: {
  title: string;
  faqs: FaqItem[];
}) {
  return (
    <section className="border-t border-mist bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
          {title}
        </h2>
        <dl className="mt-10 max-w-3xl space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-display text-xl font-bold text-navy">
                {faq.question}
              </dt>
              <dd className="mt-3 leading-relaxed text-ink-muted">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
