import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { faqs } from "@/data/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about TPAP membership, taxpayer complaints, policy advocacy, and support.",
  keywords: ["TPAP FAQ", "taxpayer support Pakistan", "TPAP membership", "tax complaints Pakistan", "taxpayer rights"]
};

const FAQ_GROUPS = [
  {
    label: "About TPAP",
    keys: [
      "What is TPAP?",
      "Is TPAP affiliated with a political party?",
      "Does TPAP oppose all taxation?",
      "How does TPAP engage with the government on tax policy?",
      "Can I contribute to TPAP's research or advocacy campaigns?",
      "What events does TPAP organise?",
      "Can my organisation partner with TPAP?",
      "How can I stay updated on TPAP's activities?"
    ]
  },
  {
    label: "Membership",
    keys: [
      "Who can join TPAP?",
      "How much does membership cost?",
      "What are the benefits of TPAP membership?",
      "How does TPAP handle member information?"
    ]
  },
  {
    label: "Tax & Compliance",
    keys: [
      "How do I know if I must file a tax return?",
      "What is withholding tax and why does it affect my business?",
      "What is the difference between direct and indirect taxes?",
      "Why does Pakistan have a low tax-to-GDP ratio?"
    ]
  },
  {
    label: "Complaints & Support",
    keys: [
      "Can TPAP help with an FBR dispute?",
      "What types of complaints does TPAP accept?",
      "Is complaint information confidential?",
      "How long does TPAP take to respond to a complaint?"
    ]
  }
];

function ctaLink(question: string) {
  if (question.toLowerCase().includes("join") || question.toLowerCase().includes("member"))
    return { href: "/membership", label: "Explore TPAP membership" };
  if (question.toLowerCase().includes("complaint") || question.toLowerCase().includes("fbr dispute"))
    return { href: "/complaints", label: "Use the taxpayer complaint channel" };
  if (question.toLowerCase().includes("partner") || question.toLowerCase().includes("updated"))
    return { href: "/contact", label: "Contact TPAP" };
  return null;
}

export default function FaqPage() {
  const faqMap = Object.fromEntries(faqs.map((f) => [f.question, f]));

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
        <div className="container-shell grid items-start gap-16 lg:grid-cols-[0.65fr_1.35fr] xl:gap-20">

          {/* Left: sticky intro */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              About TPAP
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal-950">
              What taxpayers commonly ask us.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              TPAP is a non-partisan, voluntary alliance. These answers explain the
              organisation&rsquo;s role and the practical support available to taxpayers.
            </p>

            <div className="mt-8 border border-charcoal-100 bg-charcoal-50 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-widest text-charcoal-400">
                Need direct support?
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/membership"
                  className="text-sm font-semibold text-forest-700 underline-offset-2 hover:underline"
                >
                  Join as a member
                </Link>
                <Link
                  href="/complaints"
                  className="text-sm font-semibold text-forest-700 underline-offset-2 hover:underline"
                >
                  Submit a complaint
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-forest-700 underline-offset-2 hover:underline"
                >
                  Contact the team
                </Link>
              </div>
            </div>
          </div>

          {/* Right: grouped accordion */}
          <div className="flex flex-col gap-10">
            {FAQ_GROUPS.map((group) => {
              const items = group.keys.map((k) => faqMap[k]).filter(Boolean);
              if (!items.length) return null;
              return (
                <div key={group.label}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal-400">
                      {group.label}
                    </span>
                    <span className="h-px flex-1 bg-charcoal-100" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {items.map((faq) => {
                      const cta = ctaLink(faq.question);
                      return (
                        <details
                          key={faq.question}
                          className="group border border-charcoal-100 bg-white transition-all duration-150 open:border-forest-200 open:shadow-[0_4px_20px_rgba(0,38,66,0.07)]"
                        >
                          <summary className="flex cursor-pointer select-none list-none items-start justify-between gap-4 px-6 py-5 hover:bg-charcoal-50">
                            <span className="font-display text-[1.05rem] leading-snug text-charcoal-950">
                              {faq.question}
                            </span>
                            <ChevronDown
                              size={18}
                              strokeWidth={2}
                              className="mt-0.5 shrink-0 text-charcoal-400 transition-transform duration-200 group-open:rotate-180"
                            />
                          </summary>
                          <div className="border-t border-charcoal-100 px-6 pb-5 pt-4">
                            <div className="mb-3 h-px w-6 bg-gold-400" />
                            <p className="text-sm leading-[1.85] text-charcoal-600">
                              {faq.answer}
                            </p>
                            {cta && (
                              <Link
                                href={cta.href}
                                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 underline-offset-2 hover:underline"
                              >
                                {cta.label} →
                              </Link>
                            )}
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
    </PageShell>
  );
}
