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
import { ServiceCard } from "@/components/ServiceCard";
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

      <section className="py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <SectionHeading
            eyebrow="Why TPAP"
            title="Pakistan's hardworking taxpayers deserve to be heard."
            description="Pakistan has millions of hardworking taxpayers, including business owners, professionals, entrepreneurs, and salaried citizens, who meet their obligations every year. Yet their voices are rarely heard in the corridors of power. TPAP changes that. We are a national pressure group established under the umbrella of PRIME to organise Pakistan's taxpaying citizens into a credible, united, and influential force. We don't just advocate. We research, represent, and reform."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="border border-charcoal-100 bg-white p-6">
                  <Icon className="text-forest-700" size={26} />
                  <h3 className="mt-7 font-display text-2xl">{value.title}</h3>
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
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Why Tax Reform Matters"
            title="Tax reform is the foundation of a functioning social contract."
            description="When taxes are too high, too complex, or applied unfairly, the consequences ripple through the entire economy. Businesses shrink their formal footprint. Entrepreneurs delay registration. Investment flows to friendlier destinations. The middle class bears a disproportionate burden while the informal sector expands unchecked."
          />
          <div className="border-l-2 border-gold-300 pl-7">
            <p className="font-display text-3xl leading-10 text-charcoal-900">
              Tax reform is not just a fiscal issue. It is the foundation of a
              functioning social contract between citizens and their state.
            </p>
            <p className="mt-6 text-sm leading-7 text-charcoal-600">
              TPAP exists to make that contract a reality.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionHeading
              eyebrow="Our Services"
              title="Representation, research, support, and public accountability."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {services.slice(0, 4).map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Taxpayer Voices"
            title="Why people choose to stand with TPAP."
            description="These client-supplied testimonial placeholders will be replaced with verified member names and organisations when approved."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Business Owner, Lahore", "TPAP gave us a platform to raise issues that no chamber or trade body had ever taken seriously. For the first time, our compliance burden was acknowledged at a policy level."],
              ["Tax Consultant, Karachi", "The research TPAP produces is among the most credible in Pakistan's policy space. I recommend it to every client navigating FBR."],
              ["SME Entrepreneur, Islamabad", "I joined TPAP because I believe in paying taxes, but I also believe the government owes us accountability. TPAP holds that standard."]
            ].map(([name, quote]) => (
              <blockquote key={name} className="bg-white p-7 shadow-soft">
                <p className="font-display text-2xl leading-9 text-charcoal-850">
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-forest-700">
                  {name}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-20 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <SectionHeading
            eyebrow="TPAP Bulletin"
            title="Stay Ahead of Pakistan's Tax Policy Curve."
            description="Subscribe to the TPAP Bulletin, a fortnightly digest of tax news, policy updates, budget analysis, and advocacy progress. Read by thousands of business owners, accountants, and policymakers across Pakistan."
            light
          />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-300 px-7 py-3.5 text-sm font-bold text-charcoal-950"
          >
            Subscribe: Free, No Spam, Unsubscribe Anytime <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="bg-forest-950 py-24 text-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Mission & Vision"
              title="Resurrecting the contract between state and citizens."
              description="TPAP advises, educates, and influences public policy to lower taxes, simplify the taxation regime, and eliminate undue and wasteful government expenditure."
              light
            />
          </div>
          <div className="grid gap-4">
            {objectives.map((objective) => (
              <div key={objective} className="flex gap-4 border border-white/10 bg-white/[0.05] p-5">
                <CheckCircle2 className="mt-1 shrink-0 text-gold-200" size={21} />
                <p className="text-sm leading-7 text-white/68">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Member Benefits"
              title="Your voice becomes stronger when taxpayers organise."
              description="TPAP membership connects taxpayers with research, representation, support, and meaningful participation in reform."
            />
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 text-sm font-bold text-forest-800"
            >
              Explore membership <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {homeMemberBenefits.map((benefit) => (
              <article key={benefit} className="bg-white p-6 shadow-soft">
                <CheckCircle2 className="text-forest-700" size={25} />
                <p className="mt-6 text-sm leading-7 text-charcoal-700">{benefit}</p>
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

      <section className="bg-charcoal-950 py-24 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <SectionHeading
            eyebrow="Take Action"
            title="Your taxes. Your rights. Your voice."
            description="Whether you run a business, work as a professional, or believe government must spend more wisely, TPAP is your platform."
            light
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/membership" className="bg-gold-300 p-7 text-charcoal-950">
              <ShieldCheck size={27} />
              <h3 className="mt-6 font-display text-3xl">Become a Member</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal-700">
                Join Pakistan&apos;s taxpayer advocacy movement.
              </p>
            </Link>
            <Link href="/complaints" className="border border-white/12 bg-white/[0.06] p-7">
              <MessageSquareText size={27} className="text-gold-200" />
              <h3 className="mt-6 font-display text-3xl">Submit Complaint</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Share a grievance and help build the case for reform.
              </p>
            </Link>
          </div>
        </div>
        <div className="container-shell mt-14 border-t border-white/10 pt-10">
          <h2 className="font-display text-4xl text-white">
            Join Pakistan&apos;s Most Credible Taxpayer Alliance.
          </h2>
          <div className="mt-6 grid gap-3 text-sm text-white/68 md:grid-cols-3">
            <p>Free individual membership</p>
            <p>Business and corporate tiers available</p>
            <p>Policy participation from day one</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/membership" className="rounded-full bg-gold-300 px-6 py-3 text-sm font-bold text-charcoal-950">
              Join TPAP Today
            </Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
