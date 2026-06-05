import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/data/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about TPAP membership, taxpayer complaints, policy advocacy, and support.",
  keywords: ["TPAP FAQ", "taxpayer support Pakistan", "TPAP membership", "tax complaints Pakistan", "taxpayer rights"]
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
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
                {faq.question.includes("join") || faq.question.includes("member") ? <Link className="mt-3 inline-block text-sm font-bold text-forest-800" href="/membership">Explore TPAP membership</Link> : null}
                {faq.question.includes("complaint") || faq.question.includes("FBR dispute") ? <Link className="mt-3 inline-block text-sm font-bold text-forest-800" href="/complaints">Use the taxpayer complaint channel</Link> : null}
                {faq.question.includes("partner") || faq.question.includes("updated") ? <Link className="mt-3 inline-block text-sm font-bold text-forest-800" href="/contact">Contact TPAP</Link> : null}
              </details>
            ))}
          </div>
        </div>
      </section>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </PageShell>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
