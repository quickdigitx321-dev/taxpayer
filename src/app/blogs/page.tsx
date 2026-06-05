import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PublicBlogsList } from "@/components/PublicBlogsList";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TPAP Blog | Tax Reform, Fiscal Policy & Economic Analysis for Pakistan",
  description:
    "Pakistan's most focused publication on tax policy, public finance, and economic reform. Expert analysis for taxpayers, business owners, and policymakers.",
  keywords: ["Pakistan tax policy blog", "tax reform analysis Pakistan", "FBR reform", "taxpayer rights", "fiscal transparency"]
};

export default function BlogsPage() {
  const categories = [
    ["Tax Reforms", "Analysis of proposed and enacted changes to Pakistan's tax laws"],
    ["Economic Policy", "Broader macroeconomic context and its relationship to taxation"],
    ["Public Finance", "Government budgets, expenditures, deficits, and accountability"],
    ["Ease of Doing Business", "Regulatory environment, compliance costs, and business formation"],
    ["SME Development", "Tax issues specific to small and medium enterprises"],
    ["Government Accountability", "Tracking wasteful spending and governance failures"],
    ["Fiscal Transparency", "Public financial management and citizen oversight"],
    ["Investment Climate", "How tax policy affects domestic and foreign investment decisions"]
  ];

  return (
    <PageShell
      eyebrow="Insights & Analysis"
      title="Insights, Analysis & Commentary on Pakistan's Tax Landscape."
      description="Explore TPAP research, policy briefs, and expert commentary on taxation, public finance, business regulation, and government accountability."
    >
      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="The TPAP Blog"
            title="Pakistan's focused publication from the taxpayer's perspective."
            description="Written by economists, policy analysts, legal experts, and business practitioners, our articles cut through the noise to deliver analysis you can act on."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map(([title, description]) => (
              <article key={title} className="border border-charcoal-100 bg-white p-5">
                <h2 className="font-display text-2xl">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-charcoal-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Latest Articles"
            title="Evidence and ideas for a fairer fiscal system."
            description="Our coverage includes tax reforms, economic policy, public finance, ease of doing business, SME development, fiscal transparency, and Pakistan's investment climate."
          />
          <PublicBlogsList />
        </div>
      </section>
      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <h2 className="font-display text-4xl text-gold-200">Contribute and Stay Informed</h2>
            <p className="mt-5 text-sm leading-7 text-white/68">
              New articles are published weekly. Guest contributions from tax
              professionals, economists, and business leaders are welcome, subject to
              editorial review by TPAP&apos;s research team. All articles are
              SEO-optimised and distributed through TPAP&apos;s social media channels
              and partner networks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-gold-300 px-6 py-3 text-sm font-bold text-charcoal-950">
              Subscribe to the TPAP Bulletin
            </Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white">
              Submit a Guest Article
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
