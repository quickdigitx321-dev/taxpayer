import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PublicLeadershipProfiles } from "@/components/PublicLeadershipProfiles";

export const metadata: Metadata = {
  title: "TPAP Leadership",
  description:
    "Meet the policy professionals, economists, business leaders, and advocates guiding Tax Payers Alliance Pakistan.",
  keywords: [
    "TPAP leadership",
    "tax policy experts Pakistan",
    "taxpayer advocates",
    "fiscal policy Pakistan",
    "TPAP board"
  ]
};

const leadershipGroups = [
  {
    index: "01",
    title: "Board of Advisors",
    description:
      "Senior economists, former policymakers, business figures, and respected academics provide strategic guidance and institutional credibility to TPAP's work."
  },
  {
    index: "02",
    title: "Executive Leadership",
    description:
      "TPAP's executive leadership is responsible for day-to-day operations, stakeholder engagement, research output, and advocacy campaigns."
  },
  {
    index: "03",
    title: "Policy & Research Committee",
    description:
      "Economists, tax lawyers, chartered accountants, and policy analysts develop TPAP's research positions, policy papers, and advocacy briefs."
  },
  {
    index: "04",
    title: "Regional Chapters",
    description:
      "Regional chapters support taxpayer representation, member engagement, and public outreach at provincial and city level."
  }
];

export default function LeadershipPage() {
  return (
    <PageShell
      eyebrow="Leadership"
      title="Leadership committed to credible, evidence-based reform."
      description="TPAP is guided by economists, policy professionals, business leaders, and advocates united by a commitment to taxpayers and responsible fiscal governance."
    >
      {/* Profiles section */}
      <section className="py-24">
        <div className="container-shell">
          {/* Section intro */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Our Leadership
            </p>
            <div className="mx-auto mt-4 flex max-w-xs items-center gap-3">
              <span className="h-px flex-1 bg-charcoal-100" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-tight text-charcoal-950 md:text-[2.6rem]">
              The people guiding TPAP&rsquo;s advocacy and public engagement.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-500">
              Our leadership brings together practical experience, policy knowledge, and a shared
              belief that taxpayers must have a meaningful voice in national decision-making.
            </p>
          </div>

          <PublicLeadershipProfiles />
        </div>
      </section>

      {/* Organisational structure */}
      <section className="border-t border-charcoal-100 bg-white py-24">
        <div className="container-shell">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Organisational Structure
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-5 font-display text-4xl leading-tight text-charcoal-950 md:text-[2.6rem]">
              How TPAP is organised.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {leadershipGroups.map((group) => (
              <article
                key={group.title}
                className="group relative border border-charcoal-100 bg-white p-7 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_8px_32px_rgba(0,38,66,0.10)]"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors duration-200 group-hover:bg-forest-500" />
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-mono text-[10px] font-semibold tracking-widest text-charcoal-300">
                    {group.index}
                  </span>
                  <h3 className="font-display text-2xl text-charcoal-950">{group.title}</h3>
                </div>
                <p className="text-sm leading-[1.8] text-charcoal-500">{group.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
