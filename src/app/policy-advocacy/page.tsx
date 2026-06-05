import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { legislativeAdvocacy, policyAwareness, policyWork } from "@/data/site";

export const metadata: Metadata = {
  title: "Policy Advocacy | TPAP | Influencing Pakistan's Tax & Fiscal Policy",
  description:
    "TPAP engages government, parliament, and FBR to advance evidence-based tax reform. Read about our research, submissions, and stakeholder engagement.",
  keywords: ["tax policy advocacy Pakistan", "FBR reform", "Pakistan budget recommendations", "taxpayer representation", "fiscal policy Pakistan"]
};

const engagementPartners = [
  "Federal Board of Revenue (FBR), through formal consultations, working groups, and direct submissions",
  "Ministry of Finance, participating in pre-budget processes and reform dialogues",
  "Parliamentary Standing Committees, providing expert testimony and written submissions",
  "Provincial Revenue Authorities, on matters of sales tax, property tax, and local levies",
  "Chambers of Commerce and Trade Bodies, building aligned coalitions for tax reform",
  "Academic and Research Institutions, collaborating on data, methodology, and impact assessment",
  "Media, through press briefings, op-eds, expert commentary, and social media advocacy"
];

export default function PolicyAdvocacyPage() {
  return (
    <PageShell
      eyebrow="Policy Advocacy"
      title="Research-Backed. Evidence-Driven. Taxpayer-Centred."
      description="TPAP's policy advocacy is built on a simple principle: change happens through credible evidence, sustained pressure, and strategic engagement. We do not rely on rhetoric. We produce rigorous research, engage decision-makers constructively, and build the coalitions necessary to move Pakistan's fiscal policy in the right direction."
    >
      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Our Approach"
            title="Constructive pressure for meaningful fiscal reform."
            description="TPAP studies the real impact of tax policy, listens to taxpayers and businesses, and brings practical recommendations to the institutions shaping Pakistan's fiscal future."
          />
          <div className="grid gap-5">
            {policyWork.map((item) => (
              <article key={item} className="flex gap-4 bg-white p-6 shadow-soft">
                <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={21} />
                <p className="text-sm leading-7 text-charcoal-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Government Consultations"
              title="Formal participation at federal and provincial levels."
              description="TPAP participates formally in government consultation processes. Our submissions are evidence-based, professionally presented, and developed in consultation with our membership, ensuring that the voices reaching policymakers reflect the genuine concerns of Pakistan's taxpaying public."
            />
          </div>
          <div className="grid gap-10">
            <div>
              <h2 className="font-display text-4xl">Public Awareness Campaigns</h2>
              <div className="mt-5 grid gap-3">
                {policyAwareness.map((item) => (
                  <p key={item} className="flex gap-3 border border-charcoal-100 bg-white p-4 text-sm leading-7 text-charcoal-700">
                    <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={18} />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl">Legislative Advocacy</h2>
              <div className="mt-5 grid gap-3">
                {legislativeAdvocacy.map((item) => (
                  <p key={item} className="flex gap-3 border border-charcoal-100 bg-white p-4 text-sm leading-7 text-charcoal-700">
                    <CheckCircle2 className="mt-1 shrink-0 text-gold-500" size={18} />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Strategic Engagement"
            title="Taking taxpayer priorities to the right tables."
            description="Reform requires informed dialogue across government, business, academia, civil society, and the public. TPAP builds those connections while remaining independent and non-partisan."
          />
          <div className="grid gap-4">
            {engagementPartners.map((partner) => (
              <div key={partner} className="border-l-2 border-gold-300 bg-charcoal-50 p-5">
                <p className="text-sm font-semibold leading-7 text-charcoal-800">
                  {partner}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-200">
              Take Part
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl md:text-5xl">
              Help shape a fairer, simpler, and more accountable tax system.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68">
              Review our latest <Link className="font-bold text-gold-200" href="/blogs">tax policy articles</Link> and strengthen this work through <Link className="font-bold text-gold-200" href="/membership">TPAP membership</Link>.
            </p>
          </div>
          <Link
            href="/membership"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-300 px-7 py-3.5 text-sm font-bold text-charcoal-950"
          >
            Join TPAP <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
