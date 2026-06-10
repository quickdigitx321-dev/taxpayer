import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { legislativeAdvocacy, policyAwareness, policyWork } from "@/data/site";

export const metadata: Metadata = {
  title: "Policy Advocacy | TPAP | Influencing Pakistan's Tax & Fiscal Policy",
  description:
    "TPAP engages government, parliament, and FBR to advance evidence-based tax reform. Read about our research, submissions, and stakeholder engagement.",
  keywords: ["tax policy advocacy Pakistan", "FBR reform", "Pakistan budget recommendations", "taxpayer representation", "fiscal policy Pakistan"]
};

const engagementPartners = [
  { label: "Federal Board of Revenue (FBR)", detail: "Formal consultations, working groups, and direct submissions" },
  { label: "Ministry of Finance", detail: "Pre-budget processes and reform dialogues" },
  { label: "Parliamentary Standing Committees", detail: "Expert testimony and written submissions" },
  { label: "Provincial Revenue Authorities", detail: "Sales tax, property tax, and local levy matters" },
  { label: "Chambers of Commerce & Trade Bodies", detail: "Building aligned coalitions for tax reform" },
  { label: "Academic & Research Institutions", detail: "Collaboration on data, methodology, and impact assessment" },
  { label: "Media", detail: "Press briefings, op-eds, expert commentary, and social media advocacy" }
];

export default function PolicyAdvocacyPage() {
  return (
    <PageShell
      eyebrow="Policy Advocacy"
      title="Research-Backed. Evidence-Driven. Taxpayer-Centred."
      description="TPAP's policy advocacy is built on a simple principle: change happens through credible evidence, sustained pressure, and strategic engagement. We do not rely on rhetoric. We produce rigorous research, engage decision-makers constructively, and build the coalitions necessary to move Pakistan's fiscal policy in the right direction."
    >

      {/* ── Our Approach ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="container-shell grid items-start gap-16 lg:grid-cols-[1fr_1.2fr] xl:gap-24">

          {/* Left */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">Our Approach</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal-950 md:text-[2.75rem]">
              Constructive pressure for meaningful fiscal reform.
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              TPAP studies the real impact of tax policy, listens to taxpayers and businesses,
              and brings practical recommendations to the institutions shaping Pakistan's fiscal future.
            </p>
          </div>

          {/* Right: policy work items */}
          <div className="grid gap-3">
            {policyWork.map((item, i) => (
              <article
                key={item}
                className="group relative flex items-start gap-5 border border-charcoal-100 bg-white px-6 py-5 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_8px_32px_rgba(0,38,66,0.09)]"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors duration-200 group-hover:bg-forest-500" />
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-forest-50 text-forest-600 ring-1 ring-forest-100 transition-all duration-200 group-hover:bg-forest-100 group-hover:ring-forest-300">
                  <CheckCircle2 size={17} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <span className="font-mono text-[10px] font-semibold tracking-widest text-charcoal-400">
                    0{i + 1}
                  </span>
                  <p className="mt-1 text-[0.875rem] leading-[1.8] text-charcoal-700">{item}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ── Government Consultations + Awareness + Legislative ─ */}
      <section className="border-t border-charcoal-100 bg-charcoal-50/60 py-24">
        <div className="container-shell grid items-start gap-16 lg:grid-cols-[1fr_1.2fr] xl:gap-24">

          {/* Left */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">Government Consultations</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-200" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal-950 md:text-[2.75rem]">
              Formal participation at federal and provincial levels.
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              TPAP participates formally in government consultation processes. Our submissions are
              evidence-based, professionally presented, and developed in consultation with our
              membership, ensuring that the voices reaching policymakers reflect the genuine concerns
              of Pakistan's taxpaying public.
            </p>
          </div>

          {/* Right: two grouped panels */}
          <div className="grid gap-8">

            {/* Public Awareness Campaigns */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-5 w-[3px] bg-forest-500" />
                <h3 className="font-display text-2xl text-charcoal-950">Public Awareness Campaigns</h3>
              </div>
              <div className="grid gap-2.5">
                {policyAwareness.map((item) => (
                  <div
                    key={item}
                    className="group flex items-start gap-4 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-200 hover:border-forest-200 hover:shadow-[0_4px_16px_rgba(0,38,66,0.07)]"
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-forest-600 transition-colors duration-200 group-hover:text-forest-700" size={17} strokeWidth={2} />
                    <p className="text-sm leading-[1.8] text-charcoal-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legislative Advocacy */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-5 w-[3px] bg-gold-400" />
                <h3 className="font-display text-2xl text-charcoal-950">Legislative Advocacy</h3>
              </div>
              <div className="grid gap-2.5">
                {legislativeAdvocacy.map((item) => (
                  <div
                    key={item}
                    className="group flex items-start gap-4 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-200 hover:border-gold-300 hover:shadow-[0_4px_16px_rgba(0,38,66,0.07)]"
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-gold-500 transition-colors duration-200 group-hover:text-gold-600" size={17} strokeWidth={2} />
                    <p className="text-sm leading-[1.8] text-charcoal-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Strategic Engagement ───────────────────────────── */}
      <section className="bg-white py-24">
        <div className="container-shell grid items-start gap-16 lg:grid-cols-[1fr_1.2fr] xl:gap-24">

          {/* Left */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">Strategic Engagement</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal-950 md:text-[2.75rem]">
              Taking taxpayer priorities to the right tables.
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              Reform requires informed dialogue across government, business, academia, civil society,
              and the public. TPAP builds those connections while remaining independent and non-partisan.
            </p>
          </div>

          {/* Right: engagement partners */}
          <div className="grid gap-3">
            {engagementPartners.map((partner, i) => (
              <article
                key={partner.label}
                className="group relative flex items-start gap-5 border border-charcoal-100 bg-charcoal-50/50 px-6 py-5 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:bg-white hover:shadow-[0_8px_32px_rgba(0,38,66,0.09)]"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors duration-200 group-hover:bg-gold-400" />
                <span className="mt-1 font-mono text-xs font-semibold tabular-nums text-charcoal-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold leading-snug text-charcoal-900">{partner.label}</p>
                  <p className="mt-1 text-sm leading-[1.75] text-charcoal-500">{partner.detail}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-300">Take Part</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-px w-8 bg-gold-400" />
                <span className="h-px w-16 bg-white/10" />
              </div>
              <h2 className="mt-6 font-display text-4xl leading-tight text-white md:text-5xl">
                Help shape a fairer, simpler, and more accountable tax system.
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/65">
                Review our latest{" "}
                <Link className="font-semibold text-gold-300 underline-offset-2 hover:underline" href="/blogs">
                  tax policy articles
                </Link>{" "}
                and strengthen this work through{" "}
                <Link className="font-semibold text-gold-300 underline-offset-2 hover:underline" href="/membership">
                  TPAP membership
                </Link>.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/membership"
                className="group inline-flex items-center justify-center gap-2 bg-gold-300 px-7 py-3.5 text-sm font-bold text-charcoal-950 transition-all duration-200 hover:bg-gold-200"
              >
                Join TPAP
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center gap-2 border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-white/40 hover:text-white"
              >
                Read Our Research
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
