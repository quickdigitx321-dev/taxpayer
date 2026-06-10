import type { Metadata } from "next";
import {
  Scale,
  TrendingUp,
  Landmark,
  Briefcase,
  Store,
  ShieldCheck,
  Eye,
  BarChart2,
  ArrowRight
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PublicBlogsList } from "@/components/PublicBlogsList";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TPAP Blog | Tax Reform, Fiscal Policy & Economic Analysis for Pakistan",
  description:
    "Pakistan's most focused publication on tax policy, public finance, and economic reform. Expert analysis for taxpayers, business owners, and policymakers.",
  keywords: ["Pakistan tax policy blog", "tax reform analysis Pakistan", "FBR reform", "taxpayer rights", "fiscal transparency"]
};

const categories = [
  { title: "Tax Reforms", description: "Analysis of proposed and enacted changes to Pakistan's tax laws", icon: Scale },
  { title: "Economic Policy", description: "Broader macroeconomic context and its relationship to taxation", icon: TrendingUp },
  { title: "Public Finance", description: "Government budgets, expenditures, deficits, and accountability", icon: Landmark },
  { title: "Ease of Doing Business", description: "Regulatory environment, compliance costs, and business formation", icon: Briefcase },
  { title: "SME Development", description: "Tax issues specific to small and medium enterprises", icon: Store },
  { title: "Government Accountability", description: "Tracking wasteful spending and governance failures", icon: ShieldCheck },
  { title: "Fiscal Transparency", description: "Public financial management and citizen oversight", icon: Eye },
  { title: "Investment Climate", description: "How tax policy affects domestic and foreign investment decisions", icon: BarChart2 }
];

export default function BlogsPage() {
  return (
    <PageShell
      eyebrow="Insights & Analysis"
      title="Insights, Analysis & Commentary on Pakistan's Tax Landscape."
      description="Explore TPAP research, policy briefs, and expert commentary on taxation, public finance, business regulation, and government accountability."
    >
      {/* ── Blog intro + Categories ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-shell">
          <div className="flex flex-col gap-3 border-b border-charcoal-100 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                The TPAP Blog
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="h-px w-8 bg-gold-400" />
                <span className="h-px w-16 bg-charcoal-100" />
              </div>
              <h2 className="mt-5 font-display text-4xl leading-tight text-charcoal-950 md:text-[2.6rem]">
                Pakistan&rsquo;s focused publication<br className="hidden md:block" /> from the taxpayer&rsquo;s perspective.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-charcoal-500 md:text-right">
              Written by economists, policy analysts, and legal experts — analysis you can act on.
            </p>
          </div>

          {/* Category grid */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group relative flex flex-col gap-3 border border-charcoal-100 bg-white p-5 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_8px_28px_rgba(0,38,66,0.09)]"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] bg-transparent transition-colors duration-200 group-hover:bg-forest-500" />
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center bg-forest-50 text-forest-700 ring-1 ring-forest-100 transition-colors duration-200 group-hover:bg-forest-100 group-hover:ring-forest-300">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <ArrowRight
                    size={14}
                    className="mt-1 text-charcoal-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-forest-500"
                  />
                </div>
                <div>
                  <h3 className="font-display text-[1.1rem] leading-snug text-charcoal-950">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-[1.7] text-charcoal-500">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Articles ─────────────────────────────────────────────── */}
      <section className="border-t border-charcoal-100 bg-charcoal-50 py-20">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                Latest Articles
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal-950 md:text-4xl">
                Evidence and ideas for a fairer fiscal system.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-charcoal-500 md:text-right">
              Tax reforms · Public finance · Fiscal transparency · Investment climate
            </p>
          </div>
          <PublicBlogsList />
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <h2 className="font-display text-4xl text-gold-200">Contribute and Stay Informed</h2>
            <p className="mt-5 text-sm leading-7 text-white/68">
              New articles are published weekly. Guest contributions from tax professionals,
              economists, and business leaders are welcome, subject to editorial review by
              TPAP&apos;s research team. All articles are distributed through TPAP&apos;s social
              media channels and partner networks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-gold-300 px-6 py-3 text-sm font-bold text-charcoal-950"
            >
              Subscribe to the TPAP Bulletin
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white"
            >
              Submit a Guest Article
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
