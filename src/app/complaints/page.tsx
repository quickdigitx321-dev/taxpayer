import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { ComplaintForm } from "@/components/forms/ComplaintForm";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import {
  complaintAssistance,
  complaintCategories,
  complaintProcess,
  taxpayerRights
} from "@/data/site";

export const metadata: Metadata = {
  title: "File a Taxpayer Complaint | TPAP Taxpayer Support Pakistan",
  description:
    "Facing FBR harassment, delayed refunds, or unfair tax treatment? TPAP provides confidential taxpayer complaint support. Know your rights. Get advocacy.",
  keywords: ["tax complaints Pakistan", "FBR complaint", "taxpayer rights Pakistan", "TPAP complaint support"]
};

export default function ComplaintsPage() {
  return (
    <PageShell
      eyebrow="Complaints & Taxpayer Support"
      title="Your Rights as a Taxpayer Are Not Negotiable."
      description="TPAP provides a confidential channel for taxpayers to report grievances, seek guidance, and help identify systemic issues that require reform."
    >
      <section className="bg-white py-20">
        <div className="container-shell max-w-4xl">
          <p className="font-display text-3xl leading-10 text-charcoal-900">
            Pakistan&apos;s taxpayers deal with some of the most burdensome compliance
            environments in Asia, and yet, when things go wrong, most have nowhere to turn.
          </p>
          <p className="mt-6 text-sm leading-7 text-charcoal-600">
            Filing a complaint with TPAP is not just about your individual case. Every
            complaint you share helps us identify systemic patterns, build evidence-based
            policy cases, and advocate for reforms that protect every taxpayer in Pakistan.
          </p>
        </div>
      </section>
      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Know Your Rights"
            title="Every taxpayer deserves fair and respectful treatment."
            description="TPAP helps taxpayers understand their rights, document concerns, navigate available remedies, and raise recurring policy issues with the relevant institutions."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {taxpayerRights.map((right) => (
              <div key={right} className="flex gap-4 bg-white p-5 shadow-soft">
                <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={20} />
                <p className="text-sm leading-7 text-charcoal-700">{right}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="How TPAP Can Help"
            title="Support for individual concerns and wider reform."
            description="Complaints help TPAP recognise patterns, guide taxpayers towards available remedies, and build evidence for policy advocacy."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {complaintCategories.map((category) => (
              <article key={category.title} className="border border-charcoal-100 p-6">
                <ShieldCheck className="text-forest-700" size={23} />
                <h3 className="mt-5 font-display text-2xl">{category.title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal-600">
                  {category.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="How TPAP Assists Taxpayers"
              title="Guidance, documentation, escalation, and advocacy."
            />
            <div className="mt-10 grid gap-3">
              {complaintAssistance.map((item) => (
                <div key={item} className="flex gap-4 bg-white p-5 shadow-soft">
                  <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={20} />
                  <p className="text-sm leading-7 text-charcoal-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Complaint Submission Process"
              title="What happens after you share a concern."
            />
            <div className="mt-10 grid gap-3">
              {complaintProcess.map((item, index) => (
                <div key={item} className="flex gap-4 border border-charcoal-100 bg-white p-5">
                  <span className="font-display text-2xl text-gold-500">0{index + 1}</span>
                  <p className="text-sm leading-7 text-charcoal-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <article>
            <h2 className="font-display text-4xl text-gold-200">What Happens After Submission</h2>
            <p className="mt-5 text-sm leading-7 text-white/68">
              Individual complaints receive guidance on legal rights, available remedies,
              and practical next steps. Where issues fall within TPAP&apos;s direct
              advocacy scope, they are escalated formally. Systemic complaints are
              compiled into policy briefs and submitted to relevant authorities and
              parliamentary committees.
            </p>
          </article>
          <article>
            <h2 className="font-display text-4xl text-gold-200">Confidentiality Statement</h2>
            <p className="mt-5 text-sm leading-7 text-white/68">
              TPAP treats every complaint with strict confidentiality. Personal and
              business information will not be shared with any third party, including
              government or tax authorities, without explicit written consent. Complaint
              data used in policy research is always anonymised and aggregated.
            </p>
          </article>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Submit a Complaint"
            title="Share your concern confidentially."
            description="Provide clear details and supporting context where possible. TPAP handles complaint information confidentially and will review your submission through its support process."
          />
          <ComplaintForm />
        </div>
      </section>
    </PageShell>
  );
}
