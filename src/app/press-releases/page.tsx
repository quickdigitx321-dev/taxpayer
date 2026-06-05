import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, CircleUserRound, Play } from "lucide-react";
import { PressHero } from "@/components/PressHero";
import { PublicFooter } from "@/components/PublicFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { pressReleases, pressVideos, seminarSpeakers } from "@/data/press";

export const metadata: Metadata = {
  title: "Press Releases & Media",
  description:
    "Official TPAP press releases, taxpayer policy statements, seminar speakers, and media videos.",
  alternates: {
    canonical: "/press-releases"
  },
  openGraph: {
    title: "Press Releases & Media | TPAP",
    description:
      "Official statements, policy positions, expert seminars, and media appearances from Tax Payers Alliance Pakistan.",
    url: "/press-releases",
    images: ["/press/section-7e-panel.jpeg"]
  }
};

export default function PressReleasesPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <PressHero />
      <section className="bg-white py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
          <img
            alt="Tax Payers Alliance Pakistan"
            className="mx-auto w-full max-w-sm"
            src="/brand/tpap-logo-blue.png"
          />
          <SectionHeading
            eyebrow="Public Record"
            title="A clear, evidence-led voice for taxpayer rights."
            description="TPAP's press room brings together formal policy statements, seminar outcomes, expert perspectives, and public media engagement."
          />
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Latest Statements"
            title="Press releases and policy positions."
            description="Read TPAP's complete public statements on tax enforcement, due process, taxpayer rights, and economic policy."
          />
          <div className="mt-12 grid gap-6">
            {pressReleases.map((release) => (
              <article
                className="border border-charcoal-100 bg-white p-6 shadow-soft md:p-9"
                id={release.slug}
                key={release.slug}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal-100 pb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#003c77]">
                    {release.label}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-semibold text-charcoal-500">
                    <CalendarDays size={16} /> {release.date}
                  </p>
                </div>
                <h2 className="mt-7 max-w-5xl font-display text-4xl leading-tight text-charcoal-950 md:text-5xl">
                  {release.title}
                </h2>
                <div className="mt-7 grid gap-5 text-sm leading-7 text-charcoal-700">
                  {release.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-9 grid gap-5 lg:grid-cols-2">
                  {release.sections.map((section) => (
                    <section className="border-l-2 border-[#003c77] bg-charcoal-50 p-5" key={section.title}>
                      <h3 className="font-display text-3xl text-charcoal-950">{section.title}</h3>
                      <div className="mt-4 grid gap-4 text-sm leading-7 text-charcoal-650">
                        {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </section>
                  ))}
                </div>
                {release.externalLink ? (
                  <Link
                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#003c77]"
                    href={release.externalLink}
                    target="_blank"
                  >
                    Read related coverage <ArrowUpRight size={17} />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#003c77] py-24 text-white">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Section 7E Seminar"
            title="Deemed Rental Income Tax: Is It Constitutional?"
            description="An educative discussion on the implications of deemed rental income tax levied through Section 7E of the Income Tax Ordinance on the right to property."
            light
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {seminarSpeakers.map((speaker) => (
              <article className="border border-white/15 bg-white/[0.07] p-6" key={speaker.name}>
                <div className="grid aspect-square place-items-center bg-white/10 text-white/70">
                  <CircleUserRound size={72} strokeWidth={1} />
                </div>
                <h3 className="mt-6 font-display text-3xl">{speaker.name}</h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                  {speaker.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/75">{speaker.topic}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Video Archive"
            title="TPAP in conversation."
            description="Watch public briefings, policy commentary, interviews, and taxpayer-focused discussions."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {pressVideos.map((video) => (
              <article className="overflow-hidden border border-charcoal-100 bg-white shadow-soft" key={video.id}>
                <div className="aspect-video bg-[#003c77]">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                    loading="lazy"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                  />
                </div>
                <div className="flex items-center gap-3 p-5">
                  <Play className="text-[#003c77]" size={19} />
                  <h3 className="font-display text-2xl">{video.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
