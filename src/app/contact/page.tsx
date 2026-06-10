import { ContactForm } from "@/components/forms/ContactForm";
import { PageShell } from "@/components/PageShell";
import { PublicContactDetails } from "@/components/PublicContactDetails";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const departments = [
    {
      title: "General Inquiries",
      text: "Whether you have a question, a complaint, a media inquiry, or a partnership proposal, TPAP's team is ready to hear from you. We are committed to responding to every genuine inquiry promptly and professionally.",
      email: "info@tpap.org.pk"
    },
    {
      title: "Media Inquiries",
      text: "For press statements, interview requests, expert commentary, or media partnership inquiries, please contact TPAP's communications team. We aim to respond to media queries within 4 business hours.",
      email: "media@tpap.org.pk"
    },
    {
      title: "Membership Support",
      text: "For questions about joining TPAP, membership tiers, benefits, or renewal, our membership team is available Monday to Friday.",
      email: "membership@tpap.org.pk"
    },
    {
      title: "Complaint Support",
      text: "To file a formal taxpayer complaint or seek guidance on a tax dispute, use the Complaint Form on our Complaints page or email our support team.",
      email: "support@tpap.org.pk"
    },
    {
      title: "Partnership Opportunities",
      text: "TPAP welcomes collaboration with organisations that share our commitment to fair taxation and accountable governance, including research collaboration, joint events, advocacy coalitions, or co-publications.",
      email: "partners@tpap.org.pk"
    }
  ];

  return (
    <PageShell
      eyebrow="Contact Us"
      title="We're Here to Listen, Advocate, and Act."
      description="Connect with TPAP for general inquiries, membership support, taxpayer complaints, media engagement, research collaboration, and institutional partnerships."
    >
      <section className="py-24">
        <div className="container-shell grid items-start gap-14 lg:grid-cols-[1fr_1.15fr] xl:gap-20">
          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
              Reach TPAP
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400" />
              <span className="h-px flex-1 bg-charcoal-100" />
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal-950 md:text-[2.6rem]">
              Start a conversation with our team.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.85] text-charcoal-600">
              Whether you need support, want to collaborate, or have a question about
              TPAP&rsquo;s work, use the official contact details or send us a message.
            </p>
            <PublicContactDetails />
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Contact Channels"
            title="Connect with the right TPAP team."
            description="Tax Payers Alliance Pakistan, c/o PRIME, Islamabad, Pakistan."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department, i) => (
              <article
                key={department.title}
                className="group relative flex flex-col border border-charcoal-100 bg-white p-6 transition-all duration-200 hover:-translate-y-px hover:border-forest-200 hover:shadow-[0_8px_32px_rgba(0,38,66,0.09)]"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] bg-transparent transition-colors duration-200 group-hover:bg-forest-500" />
                <div className="mb-4 flex h-9 w-9 items-center justify-center bg-forest-50 text-forest-700 ring-1 ring-forest-100 transition-all duration-150 group-hover:bg-forest-100 group-hover:ring-forest-300">
                  <Mail size={15} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl text-charcoal-950">{department.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-[1.8] text-charcoal-500">{department.text}</p>
                <a
                  href={`mailto:${department.email}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-forest-700 underline-offset-2 hover:underline"
                >
                  {department.email}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-charcoal-950 py-20 text-white">
        <div className="container-shell">
          <h2 className="font-display text-5xl">Have a Tax Story That Needs to Be Heard?</h2>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/68">
            Pakistan&apos;s tax system will only change when taxpayers speak up,
            collectively, consistently, and credibly. TPAP is your platform. Share your
            experience, file your complaint, or simply connect with a community working
            every day to make Pakistan&apos;s fiscal system fairer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/membership" className="rounded-full bg-gold-300 px-6 py-3 text-sm font-bold text-charcoal-950">Join TPAP Today</Link>
            <Link href="/complaints" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white">File a Complaint</Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white">Subscribe to Our Bulletin</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
