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

      {/* ── 1. ORGANISATION OVERVIEW ── */}
      <section className="py-20">
        <div className="container-shell grid items-center gap-16 lg:grid-cols-[1fr_1fr] xl:gap-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Organisation Overview
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal-950 md:text-[2.75rem]">
              A voluntary citizens&rsquo; alliance built to represent taxpayers.
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              Tax Payers Alliance Pakistan is a landmark initiative of PRIME, the Policy Research
              Institute of Market Economy. TPAP is not a political party, conventional trade
              association, or lobbying firm. It is a space where taxpayers can organise, be heard,
              and actively shape the fiscal policies that govern their lives.
            </p>
          </div>

          <div className="grid gap-3">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className="group relative flex items-start gap-5 border border-charcoal-100 bg-white px-6 py-5 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_8px_32px_rgba(0,38,66,0.09)]"
                >
                  <span className="absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors duration-200 group-hover:bg-forest-500" />
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center bg-forest-50 text-forest-700 ring-1 ring-forest-100 transition-all duration-200 group-hover:bg-forest-100 group-hover:ring-forest-300">
                    <Icon size={19} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[10px] font-semibold tracking-widest text-charcoal-300">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-xl leading-snug text-charcoal-950">
                        {value.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-[1.8] text-charcoal-500">
                      {value.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 2. STORY / CONTEXT GRID ── */}
      <section className="border-t border-charcoal-100 bg-charcoal-50 py-20">
        <div className="container-shell grid gap-px bg-charcoal-100 md:grid-cols-2">
          <article className="bg-charcoal-50 p-8 md:p-10">
            <div className="mb-5 h-px w-8 bg-gold-400" />
            <h2 className="font-display text-2xl leading-tight text-charcoal-950 md:text-3xl">Why TPAP Was Created</h2>
            <p className="mt-5 text-sm leading-[1.9] text-charcoal-600">
              Pakistan&apos;s tax debate has long been dominated by two voices: the
              government, which seeks more revenue, and international lenders, who
              advocate for higher taxes as a condition of financial assistance. The
              taxpayer, the citizen who actually bears the burden, has historically had
              no structured platform. PRIME recognised this gap and launched TPAP in
              2020 to give taxpayers an organised, research-backed, credible institution
              that could participate meaningfully in the national fiscal conversation.
            </p>
            <p className="mt-4 text-sm leading-[1.9] text-charcoal-600">
              Millions of Pakistanis pay taxes regularly, run businesses responsibly,
              and contribute to the national economy under extremely difficult
              conditions: complex compliance requirements, arbitrary enforcement,
              delayed refunds, and a system that offers little in return by way of
              public services or accountability. TPAP was created because these
              taxpayers deserved representation.
            </p>
          </article>

          <article className="bg-charcoal-50 p-8 md:p-10">
            <div className="mb-5 h-px w-8 bg-gold-400" />
            <h2 className="font-display text-2xl leading-tight text-charcoal-950 md:text-3xl">The Taxpayer-State Social Contract</h2>
            <p className="mt-5 text-sm leading-[1.9] text-charcoal-600">
              Citizens are not merely subjects of taxation; they are stakeholders in
              governance. When a citizen pays taxes, they are investing in a system that
              must deliver public safety, functional infrastructure, quality public
              services, and accountable institutions. In Pakistan, this contract has
              been strained. TPAP&apos;s mission is to revive and restore it by holding
              both taxpayers and the state to their respective obligations.
            </p>
          </article>

          <article className="bg-charcoal-50 p-8 md:p-10">
            <div className="mb-5 h-px w-8 bg-gold-400" />
            <h2 className="font-display text-2xl leading-tight text-charcoal-950 md:text-3xl">Why Taxpayers Need Representation</h2>
            <p className="mt-5 text-sm leading-[1.9] text-charcoal-600">
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

          <article className="bg-charcoal-50 p-8 md:p-10">
            <div className="mb-5 h-px w-8 bg-gold-400" />
            <h2 className="font-display text-2xl leading-tight text-charcoal-950 md:text-3xl">Our Philosophy</h2>
            <p className="mt-5 text-sm leading-[1.9] text-charcoal-600">
              Taxation is a social contract, not a one-way extraction. Citizens who
              fulfil their obligations have a legitimate right to demand responsible
              spending, transparent governance, and genuine public value.
            </p>
            <p className="mt-4 text-sm leading-[1.9] text-charcoal-600">
              Lower taxes, simpler compliance, broader tax bases, and accountable public
              spending are not opposing goals. They are complementary pillars of a
              thriving economy.
            </p>
          </article>

          <article className="bg-charcoal-50 p-8 md:p-10">
            <span className="inline-block border border-forest-200 bg-forest-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-forest-700">
              Vision
            </span>
            <p className="mt-5 font-display text-2xl leading-snug text-charcoal-950 md:text-3xl">
              Resurrecting the contract between state and citizens through reforming
              taxes and government spending.
            </p>
          </article>

          <article className="bg-charcoal-50 p-8 md:p-10">
            <span className="inline-block border border-forest-200 bg-forest-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-forest-700">
              Mission
            </span>
            <p className="mt-5 font-display text-2xl leading-snug text-charcoal-950 md:text-3xl">
              To create a potent pressure group that advises, educates, and influences
              public policy to lower taxes, simplify taxation, and eliminate undue and
              wasteful government expenditure.
            </p>
          </article>
        </div>
      </section>

      {/* ── 3. IMPACT AREAS + FUTURE ROADMAP ── */}
      <section className="border-t border-charcoal-100 bg-white py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Impact Areas" title="Where TPAP concentrates its work." />
            <ul className="mt-10 space-y-2">
              {impactAreas.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-4 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-150 hover:border-forest-200 hover:shadow-[0_4px_16px_rgba(0,38,66,0.07)]"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-forest-600 transition-colors duration-150 group-hover:text-forest-700" size={17} strokeWidth={2} />
                  <span className="text-sm leading-[1.8] text-charcoal-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Future Roadmap" title="The next stage of taxpayer representation." />
            <ul className="mt-10 space-y-2">
              {futureRoadmap.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-4 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-150 hover:border-gold-200 hover:shadow-[0_4px_16px_rgba(0,38,66,0.07)]"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-gold-500 transition-colors duration-150 group-hover:text-gold-600" size={17} strokeWidth={2} />
                  <span className="text-sm leading-[1.8] text-charcoal-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. OBJECTIVES ── */}
      <section className="border-t border-charcoal-100 bg-charcoal-50 py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Objectives"
            title="A fairer, simpler, and more accountable fiscal system."
            align="center"
          />
          <ul className="mx-auto mt-12 max-w-3xl space-y-2">
            {objectives.map((objective) => (
              <li
                key={objective}
                className="group flex items-start gap-4 border border-charcoal-100 bg-white px-6 py-4 transition-all duration-150 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_6px_24px_rgba(0,38,66,0.08)]"
              >
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-forest-600 transition-colors duration-150 group-hover:text-forest-700"
                  size={18}
                  strokeWidth={2}
                />
                <span className="text-sm leading-[1.85] text-charcoal-600">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. STRATEGIC PRIORITIES ── */}
      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Strategic Priorities"
            title="How TPAP turns taxpayer concerns into public influence."
            light
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {strategicPriorities.map((priority) => (
              <article
                key={priority.title}
                className="flex flex-col border border-white/10 bg-white/[0.04] p-6 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08]"
              >
                <h3 className="font-display text-2xl leading-snug text-gold-200">{priority.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-[1.85] text-white/60">{priority.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-12 text-center text-sm leading-7 text-white/70">
            Ready to take part?{" "}
            <Link className="font-bold text-gold-200" href="/membership">Become a member</Link>,{" "}
            learn about our{" "}
            <Link className="font-bold text-gold-200" href="/policy-advocacy">policy advocacy</Link>,{" "}
            or{" "}
            <Link className="font-bold text-gold-200" href="/complaints">submit a complaint</Link>.
          </p>
        </div>
      </section>

    </PageShell>
  );
}
