import { PageShell } from "@/components/PageShell";
import { PublicLeadershipProfiles } from "@/components/PublicLeadershipProfiles";
import { SectionHeading } from "@/components/SectionHeading";

export default function LeadershipPage() {
  const groups = [
    {
      title: "Board of Advisors",
      description:
        "TPAP's Board of Advisors comprises senior economists, former policymakers, leading business figures, and respected academics who provide strategic guidance and lend institutional credibility to TPAP's work. The Board meets quarterly to review TPAP's policy positions, research agenda, and advocacy strategy.",
      roles: [
        "[Advisor Name] — Former Secretary, Ministry of Finance | 30+ years public finance experience | Former IMF consultant | Author of landmark fiscal reform proposals",
        "[Advisor Name] — Founder, [Leading Business Group] | Former FPCCI President | Advocate for business-friendly taxation | Active voice in FBR reform dialogue",
        "[Advisor Name] — Professor of Economics, [University] | Published researcher in taxation and public finance | Advisor to Senate Standing Committee on Finance"
      ]
    },
    {
      title: "Executive Leadership",
      description:
        "TPAP's Executive Leadership is responsible for day-to-day operations, stakeholder engagement, research output, and advocacy campaigns of the Alliance.",
      roles: [
        "[Executive Director] — A seasoned economist and policy advocate with extensive experience in think tank leadership, fiscal policy research, and stakeholder engagement. Holds advanced degrees in economics and public policy.",
        "[Director, Policy & Research] — A specialist in taxation law and fiscal policy with a background in FBR, academic research, and private sector consulting. Leads TPAP's policy submissions, budget analyses, and legislative recommendations.",
        "[Director, Membership & Outreach] — Responsible for TPAP's membership growth, community engagement, and regional chapter development. Background in advocacy communications and civil society leadership."
      ]
    },
    {
      title: "Policy & Research Committee",
      description:
        "The Policy & Research Committee is TPAP's intellectual engine, a standing group of economists, tax lawyers, chartered accountants, and policy analysts who develop TPAP's research positions, policy papers, and advocacy briefs.",
      roles: [
        "[Placeholder] Senior Research Fellow — Taxation Policy",
        "[Placeholder] Research Fellow — Public Finance & Expenditure",
        "[Placeholder] Legal Advisor — Tax Law & Taxpayer Rights",
        "[Placeholder] Industry Specialist — SME Taxation",
        "[Placeholder] Data Analyst — Fiscal Statistics & Modelling"
      ]
    },
    {
      title: "Regional Chapters Leadership",
      description:
        "TPAP maintains regional chapters to ensure taxpayer representation at the provincial and city level. Chapter heads coordinate local advocacy, member engagement, and media outreach in alignment with TPAP's national agenda.",
      roles: [
        "[Placeholder] Punjab Chapter Head — Lahore",
        "[Placeholder] Sindh Chapter Head — Karachi",
        "[Placeholder] KPK Chapter Head — Peshawar",
        "[Placeholder] Balochistan Chapter Head — Quetta",
        "[Placeholder] Federal Chapter Head — Islamabad / Rawalpindi"
      ]
    }
  ];

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
        <div className="container-shell grid gap-8">
          {groups.map((group) => (
            <article key={group.title} className="border border-charcoal-100 p-7">
              <h2 className="font-display text-4xl">{group.title}</h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-charcoal-600">
                {group.description}
              </p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {group.roles.map((role) => (
                  <p key={role} className="bg-charcoal-50 p-4 text-sm leading-7 text-charcoal-700">
                    {role}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
