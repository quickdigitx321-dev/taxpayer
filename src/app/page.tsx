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
  leaders,
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
              Official Digital Platform
            </p>
            <h1 className="mt-7 max-w-5xl font-display text-5xl leading-[0.94] text-white md:text-7xl lg:text-[5.9rem]">
              Tax Payer Alliance Pakistan
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              A premium institutional website for taxpayer representation,
              membership applications, public submissions, leadership, and
              official updates.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-300 px-7 py-3.5 text-sm font-bold text-charcoal-950 transition hover:bg-gold-200"
              >
                Become a Member <ArrowRight size={17} />
              </Link>
              <Link
                href="/complaints"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Submit Complaint <MessageSquareText size={17} />
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
                      Application Desk
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
                    Membership applications, public complaints, articles,
                    leadership updates, and contact channels in one official platform.
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
            eyebrow="About TPAP"
            title="A formal digital presence for taxpayer advocacy and public engagement."
            description="The website is designed to position TPAP as a credible, organized, and accessible institution with clear pathways for membership, complaints, updates, and leadership visibility."
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
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionHeading
              eyebrow="Our Services"
              title="Core public modules built around TPAP's operational needs."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {services.slice(0, 4).map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-24 text-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Mission & Vision"
              title="A trusted platform for taxpayer representation and institutional communication."
              description="TPAP brings membership, advocacy, complaints, articles, and leadership updates into a clear public-facing experience."
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
              eyebrow="Leadership"
              title="Executive profiles with a polished institutional presentation."
              description="Meet the representatives guiding TPAP's public presence, member engagement, and advocacy priorities."
            />
            <Link
              href="/leadership"
              className="inline-flex items-center gap-2 text-sm font-bold text-forest-800"
            >
              View leadership <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {leaders.map((leader, index) => (
              <article key={leader.name} className="bg-white p-6 shadow-soft">
                <div className="grid aspect-square place-items-center bg-forest-950 text-gold-200">
                  <span className="font-display text-7xl">0{index + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-3xl">{leader.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">
                  {leader.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-charcoal-600">{leader.bio}</p>
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
              title="Insights, updates, and taxpayer-focused public education."
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
            title="Start with membership or submit a public concern."
            description="Apply for membership or send a complaint/suggestion through TPAP's official digital channels."
            light
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/membership" className="bg-gold-300 p-7 text-charcoal-950">
              <ShieldCheck size={27} />
              <h3 className="mt-6 font-display text-3xl">Become a Member</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal-700">
                Submit your application for admin review.
              </p>
            </Link>
            <Link href="/complaints" className="border border-white/12 bg-white/[0.06] p-7">
              <MessageSquareText size={27} className="text-gold-200" />
              <h3 className="mt-6 font-display text-3xl">Submit Complaint</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Send a complaint or suggestion securely.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
