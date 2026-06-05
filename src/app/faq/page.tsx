import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/data/site";

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="Frequently Asked Questions"
      title="Clear answers about TPAP, membership, and taxpayer support."
      description="Learn how TPAP works, who can join, how complaints are handled, and how the alliance influences public policy."
    >
      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            eyebrow="About TPAP"
            title="What taxpayers commonly ask us."
            description="TPAP is a non-partisan, voluntary alliance. These answers explain the organisation's role and the practical support available to taxpayers."
          />
          <div className="grid gap-5">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border border-charcoal-100 bg-white p-6">
                <summary className="cursor-pointer list-none pr-6 font-display text-2xl text-charcoal-950">
                  {faq.question}
                </summary>
                <p className="mt-4 border-t border-charcoal-100 pt-4 text-sm leading-7 text-charcoal-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
