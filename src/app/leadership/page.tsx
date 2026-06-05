import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PublicLeadershipProfiles } from "@/components/PublicLeadershipProfiles";
import { SectionHeading } from "@/components/SectionHeading";

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
    title: "Board of Advisors",
    description:
      "Senior economists, former policymakers, business figures, and respected academics provide strategic guidance and institutional credibility to TPAP's work."
  },
  {
    title: "Executive Leadership",
    description:
      "TPAP's executive leadership is responsible for day-to-day operations, stakeholder engagement, research output, and advocacy campaigns."
  },
  {
    title: "Policy & Research Committee",
    description:
      "Economists, tax lawyers, chartered accountants, and policy analysts develop TPAP's research positions, policy papers, and advocacy briefs."
  },
  {
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
      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our Leadership"
            title="The people guiding TPAP's advocacy and public engagement."
            description="Our leadership brings together practical experience, policy knowledge, and a shared belief that taxpayers must have a meaningful voice in national decision-making."
            align="center"
          />
          <PublicLeadershipProfiles />
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          {leadershipGroups.map((group) => (
            <article key={group.title} className="border border-charcoal-100 p-7">
              <h2 className="font-display text-4xl">{group.title}</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal-600">{group.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
