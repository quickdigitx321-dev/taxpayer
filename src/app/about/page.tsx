import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import {
  futureRoadmap,
  impactAreas,
  objectives,
  strategicPriorities,
  values
} from "@/data/site";

export const metadata: Metadata = {
  title: "About TPAP | Pakistan's National Taxpayer Advocacy Organisation",
  description:
    "Established in 2020 under PRIME, TPAP represents Pakistan's taxpaying citizens. Learn about our mission, vision, philosophy, and the social contract we are working to restore.",
  keywords: ["about TPAP", "taxpayer advocacy Pakistan", "PRIME Pakistan", "tax reform organisation", "Pakistan fiscal policy"]
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About TPAP"
      title="Pakistan's national taxpayer advocacy organisation."
      description="Established in 2020 under PRIME, TPAP gives Pakistan's taxpaying citizens an organised, research-backed, and credible voice in fiscal policy."
    >
      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Organisation Overview"
            title="A voluntary citizens' alliance built to represent taxpayers."
            description="Tax Payers Alliance Pakistan is a landmark initiative of PRIME, the Policy Research Institute of Market Economy. TPAP is not a political party, conventional trade association, or lobbying firm. It is a space where taxpayers can organise, be heard, and actively shape the fiscal policies that govern their lives."
          />
          <div className="grid gap-5">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="border border-charcoal-100 bg-white p-6">
                  <Icon className="text-forest-700" size={25} />
                  <h3 className="mt-5 font-display text-3xl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <article className="border-l-2 border-gold-300 pl-6">
            <h2 className="font-display text-4xl">Why TPAP Was Created</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal-600">
              Pakistan&apos;s tax debate has long been dominated by two voices: the
              government, which seeks more revenue, and international lenders, who
              advocate for higher taxes as a condition of financial assistance. The
              taxpayer, the citizen who actually bears the burden, has historically had
              no structured platform. PRIME recognised this gap and launched TPAP in
              2020 to give taxpayers an organised, research-backed, credible institution
              that could participate meaningfully in the national fiscal conversation.
            </p>
            <p className="mt-5 text-sm leading-7 text-charcoal-600">
              Millions of Pakistanis pay taxes regularly, run businesses responsibly,
              and contribute to the national economy under extremely difficult
              conditions: complex compliance requirements, arbitrary enforcement,
              delayed refunds, and a system that offers little in return by way of
              public services or accountability. TPAP was created because these
              taxpayers deserved representation.
            </p>
          </article>
          <article className="border-l-2 border-gold-300 pl-6">
            <h2 className="font-display text-4xl">The Taxpayer-State Social Contract</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal-600">
              Citizens are not merely subjects of taxation; they are stakeholders in
              governance. When a citizen pays taxes, they are investing in a system that
              must deliver public safety, functional infrastructure, quality public
              services, and accountable institutions. In Pakistan, this contract has
              been strained. TPAP&apos;s mission is to revive and restore it by holding
              both taxpayers and the state to their respective obligations.
            </p>
          </article>
          <article className="border-l-2 border-gold-300 pl-6">
            <h2 className="font-display text-4xl">Why Taxpayers Need Representation</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal-600">
              In every mature democracy, taxpayers are organised. In the United Kingdom,
              the TaxPayers&apos; Alliance has influenced policy for two decades. In the
              United States, the National Taxpayers Union has shaped legislation for
              over 50 years. In Pakistan, this space had remained almost entirely vacant
              until TPAP. Without organised representation, taxpayers are passive
              subjects of policy decisions made without their meaningful input. TPAP
              ensures Pakistani taxpayers are active participants in the fiscal
              decisions that shape their lives.
            </p>
          </article>
          <article className="border-l-2 border-gold-300 pl-6">
            <h2 className="font-display text-4xl">Our Philosophy</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal-600">
              Taxation is a social contract, not a one-way extraction. Citizens who
              fulfil their obligations have a legitimate right to demand responsible
              spending, transparent governance, and genuine public value.
            </p>
            <p className="mt-5 text-sm leading-7 text-charcoal-600">
              Lower taxes, simpler compliance, broader tax bases, and accountable public
              spending are not opposing goals. They are complementary pillars of a
              thriving economy.
            </p>
          </article>
          <article className="border-l-2 border-gold-300 pl-6">
            <h2 className="font-display text-4xl">Vision</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal-600">
              Resurrecting the contract between state and citizens through reforming
              taxes and government spending.
            </p>
          </article>
          <article className="border-l-2 border-gold-300 pl-6">
            <h2 className="font-display text-4xl">Mission</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal-600">
              To create a potent pressure group that advises, educates, and influences
              public policy to lower taxes, simplify taxation, and eliminate undue and
              wasteful government expenditure.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Impact Areas" title="Where TPAP concentrates its work." />
            <div className="mt-10 grid gap-3">
              {impactAreas.map((item) => (
                <div key={item} className="flex gap-4 border border-charcoal-100 p-5">
                  <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={20} />
                  <p className="text-sm leading-7 text-charcoal-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Future Roadmap" title="The next stage of taxpayer representation." />
            <div className="mt-10 grid gap-3">
              {futureRoadmap.map((item) => (
                <div key={item} className="flex gap-4 border border-charcoal-100 p-5">
                  <CheckCircle2 className="mt-1 shrink-0 text-gold-500" size={20} />
                  <p className="text-sm leading-7 text-charcoal-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Objectives"
            title="A fairer, simpler, and more accountable fiscal system."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4">
            {objectives.map((objective) => (
              <div key={objective} className="flex gap-4 bg-white p-5 shadow-soft">
                <CheckCircle2 className="mt-1 shrink-0 text-forest-700" size={21} />
                <p className="text-sm leading-7 text-charcoal-600">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-24 text-white">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Strategic Priorities"
            title="How TPAP turns taxpayer concerns into public influence."
            light
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {strategicPriorities.map((priority) => (
              <article key={priority.title} className="border border-white/10 bg-white/[0.05] p-6">
                <h3 className="font-display text-3xl text-gold-200">{priority.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{priority.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-12 text-center text-sm leading-7 text-white/70">
            Ready to take part? <Link className="font-bold text-gold-200" href="/membership">Become a member</Link>, learn about our <Link className="font-bold text-gold-200" href="/policy-advocacy">policy advocacy</Link>, or <Link className="font-bold text-gold-200" href="/complaints">submit a complaint</Link>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
