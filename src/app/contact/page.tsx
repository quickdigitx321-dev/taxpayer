import { ContactForm } from "@/components/forms/ContactForm";
import { PageShell } from "@/components/PageShell";
import { PublicContactDetails } from "@/components/PublicContactDetails";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";

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
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Reach TPAP"
              title="Start a conversation with our team."
              description="Whether you need support, want to collaborate, or have a question about TPAP's work, use the official contact details or send us a message."
            />
            <PublicContactDetails />
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Contact Channels"
            title="Connect with the right TPAP team."
            description="Tax Payers Alliance Pakistan, c/o PRIME, Islamabad, Pakistan. Phone: [Insert TPAP Contact Number]"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <article key={department.title} className="border border-charcoal-100 p-6">
                <h2 className="font-display text-3xl">{department.title}</h2>
                <p className="mt-4 text-sm leading-7 text-charcoal-600">{department.text}</p>
                <a className="mt-5 inline-block text-sm font-bold text-forest-800" href={`mailto:${department.email}`}>
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
