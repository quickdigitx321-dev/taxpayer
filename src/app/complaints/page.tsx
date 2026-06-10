import type { Metadata } from "next";
import { ShieldCheck, FileText, Scale, Clock, Users, AlertTriangle, Landmark, BookOpen } from "lucide-react";
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

const categoryIcons = [ShieldCheck, FileText, Scale, Clock, AlertTriangle, Landmark, BookOpen];

export default function ComplaintsPage() {
  return (
    <PageShell
      eyebrow="Complaints & Taxpayer Support"
      title="Your Rights as a Taxpayer Are Not Negotiable."
      description="TPAP provides a confidential channel for taxpayers to report grievances, seek guidance, and help identify systemic issues that require reform."
    >
      {/* Intro statement */}
      <section className="bg-white py-20">
        <div className="container-shell max-w-3xl">
          <div className="border-l-[3px] border-gold-400 pl-7">
            <p className="font-display text-[1.6rem] leading-[1.6] text-charcoal-900 md:text-3xl">
              Pakistan&apos;s taxpayers deal with some of the most burdensome compliance
              environments in Asia, and yet, when things go wrong, most have nowhere to turn.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              Filing a complaint with TPAP is not just about your individual case. Every
              complaint you share helps us identify systemic patterns, build evidence-based
              policy cases, and advocate for reforms that protect every taxpayer in Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Know Your Rights */}
      <section className="py-24">
        <div className="container-shell grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] xl:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Know Your Rights
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-tight text-charcoal-950 md:text-[2.6rem]">
              Every taxpayer deserves fair and respectful treatment.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              TPAP helps taxpayers understand their rights, document concerns, navigate
              available remedies, and raise recurring policy issues with the relevant
              institutions.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {taxpayerRights.map((right, i) => (
              <div
                key={right}
                className="group relative flex items-start gap-4 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_6px_24px_rgba(0,38,66,0.09)]"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors duration-200 group-hover:bg-forest-500" />
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-forest-50 text-forest-700 ring-1 ring-forest-100 transition-all duration-200 group-hover:bg-forest-100 group-hover:ring-forest-300">
                  <span className="font-mono text-[10px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-sm leading-[1.75] text-charcoal-700">{right}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How TPAP Can Help */}
      <section className="bg-white py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="How TPAP Can Help"
            title="Support for individual concerns and wider reform."
            description="Complaints help TPAP recognise patterns, guide taxpayers towards available remedies, and build evidence for policy advocacy."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {complaintCategories.map((category, i) => {
              const Icon = categoryIcons[i] ?? ShieldCheck;
              return (
                <article
                  key={category.title}
                  className="group relative flex flex-col border border-charcoal-100 bg-charcoal-50/40 p-6 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:bg-white hover:shadow-[0_8px_32px_rgba(0,38,66,0.10)]"
                >
                  <span className="absolute inset-x-0 top-0 h-[2px] bg-transparent transition-colors duration-200 group-hover:bg-forest-500" />
                  <div className="mb-4 flex h-10 w-10 items-center justify-center bg-forest-50 text-forest-700 ring-1 ring-forest-100 transition-all duration-200 group-hover:bg-forest-100 group-hover:ring-forest-300">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-xl leading-snug text-charcoal-950">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.8] text-charcoal-600">
                    {category.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How TPAP Assists + Process */}
      <section className="py-24">
        <div className="container-shell grid items-start gap-12 lg:grid-cols-2">

          {/* Assistance list */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              How TPAP Assists Taxpayers
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-3xl leading-tight text-charcoal-950 md:text-4xl">
              Guidance, documentation, escalation, and advocacy.
            </h2>
            <div className="mt-8 grid gap-2.5">
              {complaintAssistance.map((item, i) => (
                <div
                  key={item}
                  className="group flex items-start gap-4 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-200 hover:border-forest-200 hover:shadow-[0_4px_16px_rgba(0,38,66,0.08)]"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-gold-50 text-gold-600 ring-1 ring-gold-200 transition-all duration-200 group-hover:bg-gold-100">
                    <span className="font-mono text-[9px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-sm leading-[1.8] text-charcoal-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process timeline */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Complaint Submission Process
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-3xl leading-tight text-charcoal-950 md:text-4xl">
              What happens after you share a concern.
            </h2>
            <div className="relative mt-8 grid gap-0">
              {/* vertical spine */}
              <span className="absolute left-[19px] top-6 h-[calc(100%-3rem)] w-px bg-charcoal-100" />
              {complaintProcess.map((item, i) => (
                <div key={item} className="group relative flex gap-5 pb-4 last:pb-0">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border-2 border-charcoal-100 bg-white font-display text-lg text-gold-500 transition-all duration-200 group-hover:border-forest-300 group-hover:text-forest-700">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-200 group-hover:border-forest-200 group-hover:shadow-[0_4px_16px_rgba(0,38,66,0.08)]">
                    <p className="text-sm leading-[1.8] text-charcoal-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Dark confidentiality section */}
      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <article className="border-l-[3px] border-gold-500/60 pl-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-400/80">
                After Submission
              </p>
              <h2 className="font-display text-3xl leading-snug text-gold-200 md:text-4xl">
                What Happens After Submission
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.85] text-white/65">
                Individual complaints receive guidance on legal rights, available remedies,
                and practical next steps. Where issues fall within TPAP&apos;s direct
                advocacy scope, they are escalated formally. Systemic complaints are
                compiled into policy briefs and submitted to relevant authorities and
                parliamentary committees.
              </p>
            </article>
            <article className="border-l-[3px] border-gold-500/60 pl-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-400/80">
                Privacy Commitment
              </p>
              <h2 className="font-display text-3xl leading-snug text-gold-200 md:text-4xl">
                Confidentiality Statement
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.85] text-white/65">
                TPAP treats every complaint with strict confidentiality. Personal and
                business information will not be shared with any third party, including
                government or tax authorities, without explicit written consent. Complaint
                data used in policy research is always anonymised and aggregated.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Submit a Complaint form */}
      <section className="py-24">
        <div className="container-shell grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] xl:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Submit a Complaint
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-tight text-charcoal-950 md:text-[2.6rem]">
              Share your concern confidentially.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              Provide clear details and supporting context where possible. TPAP handles
              complaint information confidentially and will review your submission through
              its support process.
            </p>
            <div className="mt-8 flex items-start gap-3 border border-forest-100 bg-forest-50 px-5 py-4">
              <ShieldCheck className="mt-0.5 shrink-0 text-forest-600" size={18} />
              <p className="text-sm leading-[1.75] text-forest-800">
                All submissions are handled with strict confidentiality and will not be
                shared with tax authorities without your explicit written consent.
              </p>
            </div>
          </div>
          <ComplaintForm />
        </div>
      </section>
    </PageShell>
  );
}
