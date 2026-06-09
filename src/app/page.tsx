import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  MessageSquareText,
  ShieldCheck
} from "lucide-react";
import { PublicFooter } from "@/components/PublicFooter";
import { PublicBlogsList } from "@/components/PublicBlogsList";
import { PublicHeader } from "@/components/PublicHeader";
import { SectionHeading } from "@/components/SectionHeading";
import {
  homeMemberBenefits,
  objectives,
  quickActions,
  services,
  siteStats,
  values
} from "@/data/site";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-charcoal-950 text-white">
        <PublicHeader />
        <div className="absolute inset-0 bg-forest-950" />
        <div className="absolute right-0 top-0 h-full w-[42%] bg-charcoal-950/70" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(214,176,82,.35)_1px,transparent_1px),linear-gradient(rgba(214,176,82,.24)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="container-shell relative z-10 grid flex-1 items-center gap-10 pb-10 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <div>
            <p className="inline-flex border-l-2 border-gold-300 pl-4 text-xs font-bold uppercase tracking-[0.26em] text-gold-200">
              Pakistan&apos;s National Taxpayer Advocacy Alliance
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Pakistan&apos;s Taxpayers Deserve a Seat at the Table.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 lg:text-lg lg:leading-8">
              TPAP is Pakistan&apos;s leading taxpayer advocacy alliance,
              fighting for lower taxes, simpler compliance, and a government
              that spends your money wisely.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-300 px-7 py-3.5 text-sm font-bold text-charcoal-950 transition hover:bg-gold-200"
              >
                Join the Alliance <ArrowRight size={17} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Learn What We Stand For <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -left-8 top-10 h-56 w-40 border border-gold-300/40" />
            <div className="relative ml-auto max-w-[480px] border border-white/12 bg-white/[0.07] p-5 shadow-premium backdrop-blur">
              <div className="bg-[#f8f6f1] p-7 text-charcoal-950">
                <div className="flex items-center justify-between border-b border-charcoal-100 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
                      Taxpayer Action Desk
                    </p>
                    <h2 className="mt-2 font-display text-4xl">TPAP Portal</h2>
                  </div>
                  <span className="grid size-12 place-items-center rounded-full bg-forest-950 text-gold-200">
                    <Landmark size={23} />
                  </span>
                </div>
                <div className="mt-7 grid gap-4">
                  {quickActions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        href={item.href}
                        key={item.title}
                        className="flex items-center justify-between border border-charcoal-100 bg-white p-4 transition hover:border-gold-300"
                      >
                        <span className="flex items-center gap-3 text-sm font-semibold">
                          <Icon size={19} className="text-forest-700" />
                          {item.title}
                        </span>
                        <ArrowRight size={17} className="text-gold-500" />
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-7 bg-forest-950 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
                    Public Access
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/68">
                    Join the alliance, report a taxpayer grievance, explore
                    policy analysis, or connect with TPAP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 border-t border-white/10 bg-charcoal-950/72 backdrop-blur">
          <div className="container-shell grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {siteStats.map((stat) => (
              <div key={stat.label} className="px-4 py-5">
                <p className="font-display text-3xl text-gold-200">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/48">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f7fb] py-16 md:py-20 lg:py-24">
        <div className="container-shell">
          <div className="relative overflow-hidden border border-forest-100 bg-white/80 px-6 py-10 shadow-soft md:px-10 md:py-12 lg:px-14 lg:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-forest-500"
            />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-forest-500" aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                    Why TPAP
                  </p>
                </div>
                <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.06] text-charcoal-950 md:text-5xl lg:text-[3.25rem]">
                  Pakistan&apos;s hardworking taxpayers deserve to be heard.
                </h2>
                <p className="mt-6 max-w-2xl text-justify text-base leading-7 text-charcoal-600 md:leading-8">
                  Pakistan has millions of hardworking taxpayers, including
                  business owners, professionals, entrepreneurs, and salaried
                  citizens, who meet their obligations every year. Yet their
                  voices are rarely heard in the corridors of power. TPAP
                  changes that. We are a national pressure group established
                  under the umbrella of PRIME to organise Pakistan&apos;s
                  taxpaying citizens into a credible, united, and influential
                  force. We don&apos;t just advocate. We research, represent,
                  and reform.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <article
                      key={value.title}
                      className="group relative border border-charcoal-100 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-soft md:p-6"
                    >
                      <div className="flex gap-4 md:block lg:flex lg:items-start">
                        <div className="grid size-12 shrink-0 place-items-center border border-forest-100 bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:border-forest-200 group-hover:bg-forest-100">
                          <Icon size={24} strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0 md:mt-5 lg:mt-0">
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-display text-2xl leading-tight text-charcoal-950">
                              {value.title}
                            </h3>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-gold-600">
                              0{index + 1}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-charcoal-600">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="container-shell">
          <div className="grid overflow-hidden border border-forest-100 bg-[#f6f9fc] shadow-soft lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-forest-500" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                  Why Tax Reform Matters
                </p>
              </div>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.06] text-charcoal-950 md:text-5xl lg:text-[3.25rem]">
                Tax reform is the foundation of a functioning social contract.
              </h2>
              <p className="mt-6 max-w-2xl text-justify text-base leading-7 text-charcoal-600 md:leading-8">
                When taxes are too high, too complex, or applied unfairly, the
                consequences ripple through the entire economy. Businesses
                shrink their formal footprint. Entrepreneurs delay
                registration. Investment flows to friendlier destinations. The
                middle class bears a disproportionate burden while the informal
                sector expands unchecked.
              </p>
            </div>

            <aside className="relative flex flex-col justify-between overflow-hidden bg-forest-950 px-6 py-10 text-white md:px-10 md:py-12 lg:px-12 lg:py-14">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gold-300"
              />
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-7 font-display text-[12rem] leading-none text-white/[0.05]"
              >
                &ldquo;
              </div>
              <div className="relative">
                <div className="grid size-12 place-items-center border border-white/15 bg-white/10 text-gold-200">
                  <Landmark size={24} strokeWidth={1.7} />
                </div>
                <p className="mt-8 max-w-lg font-display text-3xl leading-[1.2] text-white md:text-4xl">
                  Tax reform is not just a fiscal issue. It is the foundation of
                  a functioning social contract between citizens and their
                  state.
                </p>
              </div>
              <div className="relative mt-10 border-t border-white/15 pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-200">
                  TPAP exists to make that contract a reality.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f9fc] py-16 md:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-[38%] border-l border-forest-100 bg-white/35 lg:block"
        />
        <div className="container-shell">
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-14">
            <div className="max-w-xl lg:pt-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-forest-500" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                  Our Services
                </p>
              </div>
              <h2 className="mt-5 font-display text-4xl leading-[1.06] text-charcoal-950 md:text-5xl lg:text-[3.25rem]">
                Representation, research, support, and public accountability.
              </h2>
              <div className="mt-8 flex items-center gap-3" aria-hidden="true">
                <span className="h-1 w-16 bg-forest-500" />
                <span className="h-1 w-5 bg-gold-300" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.slice(0, 4).map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group relative flex h-full flex-col overflow-hidden border border-forest-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-forest-300 hover:shadow-soft md:p-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-forest-500 transition-transform duration-300 group-hover:scale-x-100"
                    />
                    <div className="flex items-start justify-between gap-5">
                      <span className="grid size-12 place-items-center border border-forest-100 bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-100">
                        <Icon size={23} strokeWidth={1.8} />
                      </span>
                      <span className="font-display text-xl text-gold-500">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl leading-tight text-charcoal-950">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-charcoal-600">
                      {service.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-charcoal-100 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-700">
                        Learn more
                      </span>
                      <ArrowRight
                        size={17}
                        className="text-forest-500 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Taxpayer Voices"
            title="Why people choose to stand with TPAP."
            description="Perspectives from taxpayers who support fairer policy, simpler compliance, and accountable public spending."
            align="center"
          />
          <div className="mt-12 grid snap-x snap-mandatory grid-flow-col auto-cols-[88%] gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[68%] md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible md:pb-0">
            {[
              ["Business Owner, Lahore", "TPAP gave us a platform to raise issues that no chamber or trade body had ever taken seriously. For the first time, our compliance burden was acknowledged at a policy level."],
              ["Tax Consultant, Karachi", "The research TPAP produces is among the most credible in Pakistan's policy space. I recommend it to every client navigating FBR."],
              ["SME Entrepreneur, Islamabad", "I joined TPAP because I believe in paying taxes, but I also believe the government owes us accountability. TPAP holds that standard."]
            ].map(([name, quote]) => (
              <blockquote
                key={name}
                className="group relative flex h-full snap-start flex-col overflow-hidden border border-charcoal-100 bg-white p-7 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-forest-300 hover:shadow-premium"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-forest-500 transition-transform duration-300 group-hover:scale-x-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-1 font-display text-8xl leading-none text-forest-100/70 transition-colors duration-300 group-hover:text-gold-100"
                >
                  &ldquo;
                </span>
                <p className="relative flex-1 font-display text-2xl leading-9 text-charcoal-850">
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="relative mt-7 border-t border-charcoal-100 pt-5 text-xs font-bold uppercase tracking-[0.16em] text-forest-700 transition-colors duration-300 group-hover:text-gold-600">
                  {name}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-950 py-16 text-white md:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:96px_96px]"
        />
        <div className="container-shell relative">
          <div className="grid gap-8 border border-white/15 bg-white/[0.055] px-6 py-8 md:px-9 md:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:px-11">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-200">
                TPAP Bulletin
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[1.08] text-white md:text-5xl">
                Stay Ahead of Pakistan&apos;s Tax Policy Curve.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                Subscribe to the TPAP Bulletin, a fortnightly digest of tax
                news, policy updates, budget analysis, and advocacy progress.
                Read by thousands of business owners, accountants, and
                policymakers across Pakistan.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold-300 px-7 py-4 text-center text-sm font-bold text-charcoal-950 transition duration-300 hover:-translate-y-0.5 hover:bg-gold-200 hover:shadow-[0_14px_36px_rgba(214,176,82,0.22)] sm:w-fit"
            >
              Subscribe to the Bulletin
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="my-12 flex items-center gap-4 md:my-14" aria-hidden="true">
            <span className="h-px flex-1 bg-white/15" />
            <span className="size-1.5 rotate-45 bg-gold-300" />
            <span className="h-px flex-1 bg-white/15" />
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start lg:gap-14">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold-300" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-200">
                  Mission &amp; Vision
                </p>
              </div>
              <h2 className="mt-5 font-display text-4xl leading-[1.08] text-white md:text-5xl">
                Resurrecting the contract between state and citizens.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/65">
                TPAP advises, educates, and influences public policy to lower
                taxes, simplify the taxation regime, and eliminate undue and
                wasteful government expenditure.
              </p>
            </div>

            <div className="grid gap-4">
              {objectives.map((objective) => (
                <div
                  key={objective}
                  className="group flex gap-4 border border-white/12 bg-white/[0.055] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-gold-300/45 hover:bg-white/[0.08] hover:shadow-[0_16px_40px_rgba(0,0,0,0.16)] md:p-6"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold-300/30 bg-gold-300/10 text-gold-200 transition-colors duration-300 group-hover:bg-gold-300 group-hover:text-charcoal-950">
                    <CheckCircle2 size={18} strokeWidth={1.8} />
                  </span>
                  <p className="self-center text-sm leading-7 text-white/70">
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9fc] py-16 md:py-20 lg:py-24">
        <div className="container-shell">
          <div className="grid gap-8 border-b border-forest-100 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-forest-500" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                  Member Benefits
                </p>
              </div>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.06] text-charcoal-950 md:text-5xl lg:text-[3.25rem]">
                Your voice becomes stronger when taxpayers organise.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-charcoal-600">
                TPAP membership connects taxpayers with research,
                representation, support, and meaningful participation in
                reform.
              </p>
            </div>
            <Link
              href="/membership"
              className="group inline-flex w-fit items-center justify-center gap-3 rounded-full bg-forest-700 px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-forest-800 hover:shadow-premium"
            >
              Explore membership
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeMemberBenefits.map((benefit, index) => (
              <article
                key={benefit}
                className="group relative flex h-full flex-col overflow-hidden border border-forest-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-forest-300 hover:shadow-soft md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 bg-forest-500 transition-transform duration-300 group-hover:scale-y-100"
                />
                <div className="flex items-center justify-between gap-5">
                  <span className="grid size-11 place-items-center border border-forest-100 bg-forest-50 text-forest-700 transition duration-300 group-hover:border-forest-200 group-hover:bg-forest-100 group-hover:text-forest-800">
                    <CheckCircle2 size={21} strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-xl text-gold-500">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-6 text-base font-semibold leading-7 text-charcoal-800">
                  {benefit}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Latest Blogs"
              title="Insights, analysis, and commentary on Pakistan's tax landscape."
              description="Stay informed with TPAP research, policy briefs, and expert commentary on the developments that affect taxpayers."
            />
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-bold text-forest-800"
            >
              Read all blogs <ArrowRight size={17} />
            </Link>
          </div>
          <PublicBlogsList limit={3} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal-950 py-16 text-white md:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(90deg,rgba(214,176,82,.2)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:104px_104px]"
        />
        <div className="container-shell relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-14">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold-300" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-200">
                  Take Action
                </p>
              </div>
              <h2 className="mt-5 font-display text-4xl leading-[1.06] text-white md:text-5xl lg:text-[3.25rem]">
                Your taxes. Your rights. Your voice.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/65">
                Whether you run a business, work as a professional, or believe
                government must spend more wisely, TPAP is your platform.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/membership"
                className="group relative flex h-full flex-col overflow-hidden bg-gold-300 p-6 text-charcoal-950 transition duration-300 hover:-translate-y-1 hover:bg-gold-200 hover:shadow-[0_20px_50px_rgba(214,176,82,0.2)] md:p-7"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="grid size-12 place-items-center border border-charcoal-950/10 bg-white/35">
                    <ShieldCheck size={24} strokeWidth={1.8} />
                  </span>
                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
                <h3 className="mt-7 font-display text-3xl leading-tight">
                  Become a Member
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-charcoal-700">
                  Join Pakistan&apos;s taxpayer advocacy movement.
                </p>
                <span className="mt-6 border-t border-charcoal-950/15 pt-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Start your application
                </span>
              </Link>

              <Link
                href="/complaints"
                className="group relative flex h-full flex-col border border-white/15 bg-white/[0.06] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold-300/55 hover:bg-white/[0.09] hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)] md:p-7"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="grid size-12 place-items-center border border-gold-300/25 bg-gold-300/10 text-gold-200">
                    <MessageSquareText size={24} strokeWidth={1.8} />
                  </span>
                  <ArrowRight
                    size={19}
                    className="text-gold-200 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
                <h3 className="mt-7 font-display text-3xl leading-tight text-white">
                  Submit Complaint
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/62">
                  Share a grievance and help build the case for reform.
                </p>
                <span className="mt-6 border-t border-white/12 pt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-200">
                  Raise your concern
                </span>
              </Link>
            </div>
          </div>

          <div className="my-12 flex items-center gap-4 md:my-14" aria-hidden="true">
            <span className="h-px flex-1 bg-white/12" />
            <span className="h-0.5 w-12 bg-gold-300" />
            <span className="h-px flex-1 bg-white/12" />
          </div>

          <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div>
              <h2 className="max-w-3xl font-display text-4xl leading-[1.08] text-white md:text-5xl">
                Join Pakistan&apos;s Most Credible Taxpayer Alliance.
              </h2>
              <div className="mt-7 grid gap-3 text-sm text-white/70 md:grid-cols-3">
                {[
                  "Free individual membership",
                  "Business and corporate tiers available",
                  "Policy participation from day one"
                ].map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 border border-white/10 bg-white/[0.045] px-4 py-3.5"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-gold-200"
                      strokeWidth={1.8}
                    />
                    <p className="leading-6">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/membership"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold-300 px-7 py-4 text-sm font-bold text-charcoal-950 transition duration-300 hover:-translate-y-0.5 hover:bg-gold-200 hover:shadow-[0_14px_36px_rgba(214,176,82,0.2)]"
              >
                Join TPAP Today
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-gold-300/60 hover:bg-white/[0.07]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
