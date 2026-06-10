import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, User, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { memberBenefits, membershipCategories, membershipEligibility } from "@/data/site";

export const metadata: Metadata = {
  title: "Join TPAP | Membership Benefits for Pakistani Taxpayers & Businesses",
  description:
    "Become a TPAP member today. Access exclusive tax reform research, policy advocacy, complaint support, and networking. Individual, business, student, and corporate memberships available.",
  keywords: ["join TPAP", "taxpayer membership Pakistan", "taxpayer association Pakistan", "tax advocacy membership", "taxpayer rights"]
};

const categoryIcons = [User, Briefcase, GraduationCap, Building2];

export default function MembershipPage() {
  return (
    <PageShell
      eyebrow="Membership"
      title="Join Pakistan's Most Credible Taxpayer Alliance."
      description="Membership is open to every Pakistani who believes taxpayers deserve representation, simpler compliance, and accountable government spending."
    >
      {/* ── Intro ── */}
      <section className="bg-white py-20">
        <div className="container-shell max-w-3xl">
          <div className="border-l-[3px] border-gold-400 pl-7">
            <p className="font-display text-[1.6rem] leading-[1.7] text-charcoal-900">
              TPAP membership is your opportunity to move from passive taxpayer to active
              advocate. When you join TPAP, you become part of a growing national movement
              reshaping the conversation on taxation, public finance, and government
              accountability in Pakistan.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              Membership is open to every Pakistani, regardless of profession, industry,
              or income level. If you pay taxes, support fair taxation, or believe in
              transparent governance, TPAP is your platform.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              Members strengthen TPAP&apos;s{" "}
              <Link className="font-semibold text-forest-700 underline underline-offset-2 hover:text-forest-900" href="/policy-advocacy">
                policy advocacy
              </Link>{" "}
              and can use our structured{" "}
              <Link className="font-semibold text-forest-700 underline underline-offset-2 hover:text-forest-900" href="/complaints">
                taxpayer complaint channel
              </Link>{" "}
              when they need support.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Join ── */}
      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Why Join TPAP"
            title="Turn individual concerns into a collective national voice."
            description="TPAP brings citizens, professionals, businesses, students, and institutions together to participate meaningfully in Pakistan's tax and fiscal policy dialogue."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {memberBenefits.map((benefit, i) => (
              <article
                key={benefit}
                className="group relative flex items-start gap-4 border border-charcoal-100 bg-white px-5 py-5 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_8px_32px_rgba(0,38,66,0.09)]"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors duration-200 group-hover:bg-forest-500" />
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-forest-50 ring-1 ring-forest-100 transition-all duration-200 group-hover:bg-forest-100 group-hover:ring-forest-300">
                  <CheckCircle2 className="text-forest-700" size={16} strokeWidth={2} />
                </div>
                <p className="text-sm leading-[1.8] text-charcoal-700">{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Membership Categories ── */}
      <section className="bg-white py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Membership Categories"
            title="A place for every taxpayer and reform-minded citizen."
            description="Eligible applicants include Pakistani citizens and non-resident Pakistanis, businesses, students, professionals, and anyone who supports TPAP's mission."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {membershipCategories.map((category, i) => {
              const Icon = categoryIcons[i];
              return (
                <article
                  key={category.title}
                  className="group flex flex-col border border-charcoal-100 bg-white p-7 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_12px_40px_rgba(0,38,66,0.10)]"
                >
                  {/* header */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-forest-50 ring-1 ring-forest-100 transition-all duration-200 group-hover:bg-forest-100 group-hover:ring-forest-300">
                      <Icon className="text-forest-700" size={19} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-2xl leading-snug text-charcoal-950">
                      {category.title}
                    </h3>
                  </div>

                  {/* divider */}
                  <div className="my-5 h-px bg-charcoal-100" />

                  <p className="text-sm leading-[1.8] text-charcoal-600">
                    {category.description}
                  </p>
                  <ul className="mt-5 grid gap-2.5">
                    {category.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm leading-[1.75] text-charcoal-600">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-forest-600" size={16} strokeWidth={2} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Eligibility ── */}
      <section className="py-24">
        <div className="container-shell grid items-start gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Membership Eligibility
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal-950 md:text-[2.5rem]">
              TPAP is open to Pakistanis from every walk of life.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              If you pay taxes, support fair taxation, or believe in transparent governance, TPAP is your platform.
            </p>
          </div>
          <div className="grid gap-3">
            {membershipEligibility.map((item) => (
              <div
                key={item}
                className="group relative flex items-start gap-4 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-200 hover:border-forest-200 hover:shadow-[0_4px_20px_rgba(0,38,66,0.08)]"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors duration-200 group-hover:bg-gold-400" />
                <CheckCircle2 className="mt-0.5 shrink-0 text-forest-700 transition-colors duration-200 group-hover:text-forest-500" size={18} strokeWidth={2} />
                <p className="text-sm leading-[1.8] text-charcoal-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application ── */}
      <section className="bg-white py-24">
        <div className="container-shell grid items-start gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Membership Application
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal-950 md:text-[2.5rem]">
              Add your voice to the alliance.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              Provide accurate identity, organisation, and contact details. The TPAP team will review your application and contact you regarding its status.
            </p>
          </div>
          <MembershipForm />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell text-center">
          <h2 className="font-display text-5xl">Your Voice Matters. Make It Count.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/68">
            Every member strengthens TPAP&apos;s mandate. Every voice amplifies our
            advocacy. Join today and become part of the movement making Pakistan&apos;s
            tax system fairer, simpler, and more accountable.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
