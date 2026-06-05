import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { memberBenefits, membershipCategories, membershipEligibility } from "@/data/site";

export const metadata: Metadata = {
  title: "Join TPAP | Membership Benefits for Pakistani Taxpayers & Businesses",
  description:
    "Become a TPAP member today. Access exclusive tax research, policy advocacy, complaint support, and networking. Individual, business, student, and corporate memberships available.",
  keywords: ["join TPAP", "taxpayer membership Pakistan", "taxpayer association Pakistan", "tax advocacy membership", "taxpayer rights"]
};

export default function MembershipPage() {
  return (
    <PageShell
      eyebrow="Membership"
      title="Join Pakistan's Most Credible Taxpayer Alliance."
      description="Membership is open to every Pakistani who believes taxpayers deserve representation, simpler compliance, and accountable government spending."
    >
      <section className="bg-white py-20">
        <div className="container-shell max-w-4xl">
          <p className="font-display text-3xl leading-10 text-charcoal-900">
            TPAP membership is your opportunity to move from passive taxpayer to active
            advocate. When you join TPAP, you become part of a growing national movement
            reshaping the conversation on taxation, public finance, and government
            accountability in Pakistan.
          </p>
          <p className="mt-6 text-sm leading-7 text-charcoal-600">
            Membership is open to every Pakistani, regardless of profession, industry,
            or income level. If you pay taxes, support fair taxation, or believe in
            transparent governance, TPAP is your platform.
          </p>
          <p className="mt-5 text-sm leading-7 text-charcoal-600">
            Members strengthen TPAP&apos;s <Link className="font-bold text-forest-800" href="/policy-advocacy">policy advocacy</Link> and can use our structured <Link className="font-bold text-forest-800" href="/complaints">taxpayer complaint channel</Link> when they need support.
          </p>
        </div>
      </section>
      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Why Join TPAP"
            title="Turn individual concerns into a collective national voice."
            description="TPAP brings citizens, professionals, businesses, students, and institutions together to participate meaningfully in Pakistan's tax and fiscal policy dialogue."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {memberBenefits.map((benefit) => (
              <article key={benefit} className="flex gap-4 bg-white p-6 shadow-soft">
                <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={21} />
                <p className="text-sm leading-7 text-charcoal-700">{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Membership Categories"
            title="A place for every taxpayer and reform-minded citizen."
            description="Eligible applicants include Pakistani citizens and non-resident Pakistanis, businesses, students, professionals, and anyone who supports TPAP's mission."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {membershipCategories.map((category) => (
              <article key={category.title} className="border border-charcoal-100 p-7">
                <h3 className="font-display text-3xl">{category.title}</h3>
                <p className="mt-4 text-sm leading-7 text-charcoal-600">
                  {category.description}
                </p>
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-charcoal-600">
                  {category.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={17} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Membership Eligibility"
            title="TPAP is open to Pakistanis from every walk of life."
            description="If you pay taxes, support fair taxation, or believe in transparent governance, TPAP is your platform."
          />
          <div className="grid gap-4">
            {membershipEligibility.map((item) => (
              <div key={item} className="flex gap-4 bg-white p-5 shadow-soft">
                <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={20} />
                <p className="text-sm leading-7 text-charcoal-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Membership Application"
            title="Add your voice to the alliance."
            description="Provide accurate identity, organisation, and contact details. The TPAP team will review your application and contact you regarding its status."
          />
          <MembershipForm />
        </div>
      </section>
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
