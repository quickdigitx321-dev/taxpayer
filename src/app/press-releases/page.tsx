import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ChevronDown, Mail, Play } from "lucide-react";
import { PressHero } from "@/components/PressHero";
import { PublicFooter } from "@/components/PublicFooter";
import { pressReleases, pressVideos, seminarSpeakers } from "@/data/press";

export const metadata: Metadata = {
  title: "Press Releases & Media",
  description:
    "Official TPAP press releases, taxpayer policy statements, seminar speakers, and media videos.",
  keywords: ["TPAP press releases", "tax reform Pakistan", "taxpayer rights", "FBR policy", "fiscal policy Pakistan"],
  alternates: { canonical: "/press-releases" },
  openGraph: {
    title: "Press Releases & Media | TPAP",
    description:
      "Official statements, policy positions, expert seminars, and media appearances from Tax Payers Alliance Pakistan.",
    url: "/press-releases",
    images: ["/brand/tpap-social-share.jpg"]
  }
};

const MUTED_SECTIONS = ["About TPAP", "About the Organisations"];
const QUOTE_SECTIONS = ["Chairman's Perspective"];

export default function PressReleasesPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <PressHero />

      {/* ── Internal navigation ── */}
      <nav className="sticky top-0 z-30 border-b border-charcoal-100 bg-white/95 backdrop-blur-sm">
        <div className="container-shell flex items-center gap-1 overflow-x-auto py-0">
          {[
            { label: "Latest Statements", href: "#latest-statements" },
            { label: "Seminar Archive", href: "#section-7e-seminar" },
            { label: "Video Archive", href: "#video-archive" },
            { label: "Media Contact", href: "#media-contact" }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 border-b-2 border-transparent px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-500 transition-colors hover:border-forest-600 hover:text-charcoal-900"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Public Record ── */}
      <section className="bg-white py-20">
        <div className="container-shell">
          <div className="grid gap-10 border border-charcoal-100 bg-charcoal-50 p-8 md:p-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
            <div className="flex items-center justify-center">
              <img
                alt="Tax Payers Alliance Pakistan"
                className="h-auto w-36 lg:w-44"
                src="/brand/tpap-logo-blue.png"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                Public Record
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="h-px w-8 bg-gold-400" />
                <span className="h-px flex-1 bg-charcoal-200" />
              </div>
              <h2 className="mt-5 font-display text-3xl leading-tight text-charcoal-950 md:text-4xl">
                A clear, evidence-led voice for taxpayer rights.
              </h2>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.85] text-charcoal-600">
                TPAP&rsquo;s press room brings together formal policy statements, seminar outcomes,
                expert perspectives, and public media engagement — all on the public record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Statements ── */}
      <section className="py-24" id="latest-statements">
        <div className="container-shell">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
            Latest Statements
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold-400" />
            <span className="h-px w-24 bg-charcoal-200" />
          </div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-charcoal-950 md:text-5xl">
            Press releases and policy positions.
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.85] text-charcoal-600">
            Read TPAP&rsquo;s complete public statements on tax enforcement, due process, taxpayer rights,
            and economic policy.
          </p>

          <div className="mt-12 grid gap-5">
            {pressReleases.map((release) => (
              <article
                key={release.slug}
                id={release.slug}
                className="border border-charcoal-100 bg-white shadow-soft"
              >
                {/* Card header — always visible */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal-100 px-7 py-5">
                  <span className="inline-flex items-center gap-2 bg-forest-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-forest-700 ring-1 ring-forest-100">
                    {release.label}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-semibold text-charcoal-400">
                    <CalendarDays size={14} />
                    {release.date}
                  </span>
                </div>

                {/* Card body — summary always visible */}
                <div className="px-7 pb-2 pt-6">
                  <h2 className="max-w-4xl font-display text-2xl leading-snug text-charcoal-950 md:text-3xl">
                    {release.title}
                  </h2>
                  {release.paragraphs.slice(0, 1).map((p) => (
                    <p key={p} className="mt-4 text-[0.9375rem] leading-[1.85] text-charcoal-600">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Accordion: full content */}
                <details className="group px-7 pb-7">
                  <summary className="mt-5 flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-forest-700 hover:text-forest-900 [&::-webkit-details-marker]:hidden">
                    <span>Read full statement</span>
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>

                  <div className="mt-6 border-t border-charcoal-100 pt-6">
                    {/* Remaining intro paragraphs */}
                    {release.paragraphs.slice(1).length > 0 && (
                      <div className="grid gap-4 text-[0.9375rem] leading-[1.85] text-charcoal-700">
                        {release.paragraphs.slice(1).map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    )}

                    {/* Sections */}
                    <div className="mt-8 grid gap-5">
                      {release.sections.map((section) => {
                        const isMuted = MUTED_SECTIONS.includes(section.title);
                        const isQuote = QUOTE_SECTIONS.includes(section.title);

                        if (isQuote) {
                          return (
                            <blockquote
                              key={section.title}
                              className="border-l-[3px] border-gold-400 bg-gold-50 px-6 py-5"
                            >
                              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">
                                {section.title}
                              </p>
                              {section.body.map((p) => (
                                <p
                                  key={p}
                                  className="text-[0.9375rem] italic leading-[1.85] text-charcoal-700"
                                >
                                  {p}
                                </p>
                              ))}
                            </blockquote>
                          );
                        }

                        if (isMuted) {
                          return (
                            <div
                              key={section.title}
                              className="border-t border-charcoal-100 pt-5"
                            >
                              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal-400">
                                {section.title}
                              </p>
                              {section.body.map((p) => (
                                <p
                                  key={p}
                                  className="mt-2 text-sm leading-7 text-charcoal-500"
                                >
                                  {p}
                                </p>
                              ))}
                            </div>
                          );
                        }

                        return (
                          <div
                            key={section.title}
                            className="border-l-[3px] border-forest-600 bg-charcoal-50 px-6 py-5"
                          >
                            <h3 className="font-display text-xl text-charcoal-950">
                              {section.title}
                            </h3>
                            <div className="mt-3 grid gap-3 text-[0.9375rem] leading-[1.85] text-charcoal-600">
                              {section.body.map((p) => (
                                <p key={p}>{p}</p>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {release.externalLink ? (
                      <Link
                        className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-forest-700 transition-colors hover:text-forest-900"
                        href={release.externalLink}
                        target="_blank"
                      >
                        Read related media coverage <ArrowUpRight size={16} />
                      </Link>
                    ) : null}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7E Seminar ── */}
      <section className="bg-forest-950 py-24 text-white" id="section-7e-seminar">
        <div className="container-shell">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-300">
            Seminar Archive
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold-400" />
            <span className="h-px w-24 bg-white/20" />
          </div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-5xl">
            Section 7E: Deemed Rental Income Tax
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.85] text-white/65">
            An educative seminar on the constitutionality and implications of deemed rental income
            tax under Section 7E of the Income Tax Ordinance. Held 9 March 2024, Islamabad.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {seminarSpeakers.map((speaker, i) => {
              const initials = speaker.name
                .replace(/^(Mr\.|Dr\.|Barrister)\s+/i, "")
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("");
              return (
                <article
                  key={speaker.name}
                  className="group relative border border-white/10 bg-white/[0.05] p-6 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.09]"
                >
                  <span className="absolute right-5 top-5 font-mono text-[10px] font-semibold tracking-widest text-white/25">
                    0{i + 1}
                  </span>
                  <div className="flex h-14 w-14 items-center justify-center bg-forest-800 font-display text-xl text-gold-200 ring-1 ring-white/10">
                    {initials}
                  </div>
                  <h3 className="mt-5 font-display text-xl leading-snug">{speaker.name}</h3>
                  <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    {speaker.role}
                  </p>
                  <p className="mt-4 text-sm leading-[1.75] text-white/65">{speaker.topic}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Video Archive ── */}
      <section className="py-24" id="video-archive">
        <div className="container-shell">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
            Video Archive
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold-400" />
            <span className="h-px w-24 bg-charcoal-200" />
          </div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-charcoal-950 md:text-5xl">
            TPAP in conversation.
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.85] text-charcoal-600">
            Public briefings, policy commentary, interviews, and taxpayer-focused discussions.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {pressVideos.map((video) => (
              <article
                key={video.id}
                className="group overflow-hidden border border-charcoal-100 bg-white shadow-soft transition-all duration-200 hover:-translate-y-px hover:shadow-md"
              >
                <div className="aspect-video bg-forest-950">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                    loading="lazy"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                  />
                </div>
                <div className="flex items-center gap-3 border-t border-charcoal-100 px-5 py-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-forest-50 text-forest-700 ring-1 ring-forest-100">
                    <Play size={13} fill="currentColor" strokeWidth={0} />
                  </div>
                  <h3 className="font-display text-lg text-charcoal-900">{video.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media Contact ── */}
      <section className="bg-white py-16" id="media-contact">
        <div className="container-shell">
          <div className="border border-charcoal-100 bg-charcoal-50 px-8 py-8 md:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                Press &amp; Media Inquiries
              </p>
              <h2 className="mt-3 font-display text-2xl text-charcoal-950 md:text-3xl">
                Get in touch with our communications team.
              </h2>
              <p className="mt-2 text-sm leading-7 text-charcoal-600">
                For press requests, media accreditation, or statements, contact PRIME
                Institute&rsquo;s communications office.
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <a
                href="mailto:sumaira@primeinstitute.org"
                className="inline-flex items-center gap-2.5 border border-forest-700 bg-forest-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-800"
              >
                <Mail size={16} />
                sumaira@primeinstitute.org
              </a>
              <p className="mt-2 text-xs text-charcoal-400">
                Sumaira Waseem — Communications Officer, PRIME
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
